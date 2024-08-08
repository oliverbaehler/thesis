"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Formik } from "formik";
import * as yup from "yup"; 
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "firebaseConfig";
import { collection, doc, setDoc, getDocs, getDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, uploadString, deleteObject } from "firebase/storage";
import { useAuth } from "contexts/SessionContext";

// GLOBAL CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box"; 
import { Editor } from "components/editor"; 
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { UploadImageBox, StyledClear } from "../styles"; 

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!")
});

export default function CollectionForm({ initialData, collectionId }) {
  const router = useRouter();
  const { user } = useAuth();
  const [thumbnail, setThumbnail] = useState("");
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState(initialData?.content);

  const INITIAL_VALUES = initialData || {
    name: "",
    published: true,
    content: "",
    thumbnail: "",
  };

  useEffect(() => {
    if (initialData) {
      let filesArray = [];
      // If a thumbnail is set, add it first
      if (initialData.thumbnail) {
        filesArray.push({
          preview: initialData.thumbnail,
          name: initialData.thumbnail.split('/').pop(),
        });
        setThumbnail(initialData.thumbnail);
      }
      filesArray = filesArray.concat(initialData.imageUrls.map(url => ({
        preview: url,
        name: url.split('/').pop(),
      })));
    
      setFiles(filesArray);
    }
  }, [initialData]);


  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      if (!collectionId) {
        collectionId = uuidv4();
      }
      const docRef = doc(db, "collections", collectionId);
      const uploadedImageUrls = await uploadFiles(files, collectionId, user.uid);
      const [thumbnail, ...imageUrls] = uploadedImageUrls;

      const qr_code_url = await generateQRCode(collectionId, user.uid);
      await setDoc(docRef, {
        ...values,
        name: values.name,
        content: content || "",
        published: values.published,
        thumbnail: thumbnail,
        imageUrls: imageUrls,
        createdBy: user.uid,
        createdAt: new Date(),
        qr_code: qr_code_url || "",
      });

      router.push(`/dashboard/collections/${collectionId}`);

    } catch (error) {
      console.error("Error saving collection:", error);
    }
  };

  const generateQRCode = async (collectionId, userId) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const url = `${baseUrl}/collections/${collectionId}`;
      const qrCodeDataUrl = await QRCode.toDataURL(url);
      
      const storagePath = `${userId}/collections/${collectionId}/${collectionId}-code.png`;
      const storageRef = ref(storage, storagePath);
  
      await uploadString(storageRef, qrCodeDataUrl, 'data_url');
      const downloadURL = await getDownloadURL(storageRef);
      
      return downloadURL;
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const uploadFiles = async (files, collectionId, userId) => {
    let imageUrls = [];
    
    for (const file of files) {
      const downloadURL = await uploadFile(file, collectionId, userId);
      if (downloadURL) {
        imageUrls.push(downloadURL);
      }
    }
  
    return imageUrls;
  };
  
  const uploadFile = async (file, collectionId, userId) => {
    const storageRef = ref(storage, `${userId}/collections/${collectionId}/${file.name}`);
    
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.log("Error uploading file:", error.code);
      return null;
    }
  };
  
  const handleChangeDropZone = (newFiles) => {
    const updatedFiles = [...files];
    
    newFiles.forEach(newFile => {
      const alreadyExists = updatedFiles.some(file => file.name === newFile.name);
      if (!alreadyExists) {
        updatedFiles.push(Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        }));
      }
    });
    
    setFiles(updatedFiles);
  };

  const handleFileDelete = (file) => async () => {
    if (collectionId) {
      const fileRef = ref(storage, `${user.uid}/collections/${collectionId}/${file.name}`);
    
      try {
        await deleteObject(fileRef);
      } catch (error) {
        console.error(`Error deleting file ${file.name} from storage:`, error);
      }
    }
    const filteredFiles = files.filter(item => item.name !== file.name);
    if (filteredFiles.length > 0 && file.preview === thumbnail) {
      setThumbnail(filteredFiles[0].preview);
    }

    setFiles(filteredFiles);
  };

  return (
    <Card className="p-3">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.name && errors.name}
                  error={Boolean(touched.name && errors.name)}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h5" component="h5" gutterBottom>
                    Content
                </Typography>
                <Editor content={content} setContent={setContent} />
              </Grid>
            
              <Grid item xs={12}>
                <Typography variant="h5" component="h5" gutterBottom>
                  Featured Images
                </Typography>

                <DropZone title="Drop & drag product images" onChange={(files) => handleChangeDropZone(files)} />
                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => (
                    <UploadImageBox key={index}>
                      <Box
                        component="img"
                        alt="collections"
                        src={file.preview}
                        width="100%"
                      />
                      <StyledClear onClick={handleFileDelete(file)} />
                      <Box display="flex" justifyContent="space-between" position="absolute" top="50%" left="0" right="0" transform="translateY(-50%)" px={1}>
                        <Button onClick={() => handleFileOrderChange(index, -1)} disabled={index === 0} style={{ minWidth: 'auto', padding: 0 }}>
                          <KeyboardArrowLeftIcon />
                        </Button>
                        <Button onClick={() => handleFileOrderChange(index, 1)} disabled={index === files.length - 1} style={{ minWidth: 'auto', padding: 0 }}>
                          <KeyboardArrowRightIcon />
                        </Button>
                      </Box>
                    </UploadImageBox>
                  ))}
                </FlexBox>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControlLabel label="Publish" control={<Checkbox color="info" name="published" onBlur={handleBlur} onChange={handleChange} value={values.published} checked={values.published}/>} />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Save collection
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
}