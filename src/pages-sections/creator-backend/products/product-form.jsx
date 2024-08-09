"use client";

import QRCode from "qrcode";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Formik } from "formik";
import * as yup from "yup"; 
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "firebaseConfig";
import { collection, doc, setDoc, getDocs, getDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, uploadString, deleteObject } from "firebase/storage";
import { useAuth } from "contexts/SessionContext";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box"; 
import { UploadImageBox, StyledClear } from "../styles"; 
import { Editor } from "components/editor"; 
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// FORM VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!"),
  productId: yup.string().required("Collection is required!"),
});

export default function ProductForm({ initialData, productId }) {
  const router = useRouter();
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState(initialData?.content);
  const [collections, setCollections] = useState([]);
  
  useEffect(() => {
    // Fetch collections created by the logged-in user
    const fetchCollections = async () => {
      const collectionRef = collection(db, "collections");
      const q = query(collectionRef, where("createdBy", "==", user.uid));
      const collectionSnapshot = await getDocs(q);
      const collectionList = collectionSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setCollections(collectionList);
    };
    
    fetchCollections();
  }, [user]);

  const INITIAL_VALUES = initialData || {
    name: "",
    description: "",
    productId: "",
    published: true,
    content: "",
    thumbnail: "",
  };

  useEffect(() => {
    if (initialData) {
      const filesArray = initialData.imageUrls.map(url => ({
        preview: url,
        name: url.split('/').pop(),
      }));
      if (initialData.thumbnail) {
        filesArray.unshift({
          preview: initialData.thumbnail,
          name: initialData.thumbnail.split('/').pop(),
        });
      }
      setFiles(filesArray);
    }
  }, [initialData]);

  const handleFormSubmit = async (values, { resetForm }) => {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();

    try {
      if (!productId) {
        productId = uuidv4();
      }
      const docRef = doc(db, "products", productId);

      const thumbnailFile = files[0];
      const thumbnailUrl = await uploadFile(thumbnailFile, productId, user.uid);
      const uploadedImageUrls = await uploadFiles(files.slice(1), productId, user.uid);
      const qr_code_url = await generateQRCode(productId, user.uid);

      await setDoc(docRef, {
        ...values,
        name: values.name,
        content: content || "",
        published: values.published,
        collectionName: collections.find(collection => collection.id === values.productId).name,
        productId: values.productId, // Store the productId as an attribute
        thumbnail: thumbnailUrl,
        imageUrls: uploadedImageUrls,
        createdBy: user.uid,
        createdByName: userData.displayName,
        createdAt: new Date(),
        qr_code: qr_code_url || "",
      });

      router.push(`/dashboard/products/${productId}`);

    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const generateQRCode = async (productId, userId) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const url = `${baseUrl}/collections/${productId}`;
      const qrCodeDataUrl = await QRCode.toDataURL(url);
      
      const storagePath = `${userId}/products/${productId}/${productId}-code.png`;
      const storageRef = ref(storage, storagePath);
  
      await uploadString(storageRef, qrCodeDataUrl, 'data_url');
      const downloadURL = await getDownloadURL(storageRef);
      
      return downloadURL;
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const uploadFiles = async (files, productId, userId) => {
    return Promise.all(files.map(file => uploadFile(file, productId, userId)));
  };

  const uploadFile = async (file, productId, userId) => {
    const storageRef = ref(storage, `${userId}/products/${productId}/${file.name}`);
    try {
      const existingDownloadURL = await getDownloadURL(storageRef);
      return existingDownloadURL;
    } catch (error) {
      if (error.code == "storage/object-not-found") {
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
      } 
      throw error;
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
    if (productId) {
      const fileRef = ref(storage, `${user.uid}/products/${productId}/${file.name}`);
    
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


  const handleFileOrderChange = (index, direction) => {
    setFiles((files) => {
      const newFiles = [...files];
      const [movedFile] = newFiles.splice(index, 1);
      newFiles.splice(index + direction, 0, movedFile);
      
      if (index + direction === 0) {
        setThumbnail(movedFile.preview);
      }
  
      return newFiles;
    });
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
                  label="Product Name"
                  color="info"
                  size="medium"
                  placeholder="Product Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.name && errors.name}
                  error={Boolean(touched.name && errors.name)}
                />
              </Grid>

              <Grid item xs={12}>
                <Editor content={content} setContent={setContent} />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="collection-select-label">Collection</InputLabel>
                  <Select
                    labelId="collection-select-label"
                    id="collection-select"
                    name="productId"
                    value={values.productId}
                    label="Collection"
                    onChange={handleChange}
                  >
                    {collections.map((collection) => (
                      <MenuItem key={collection.id} value={collection.id}>
                        {collection.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.productId && errors.productId && (
                    <div style={{ color: "red", marginTop: "0.5rem" }}>
                      {errors.productId}
                    </div>
                  )}
                </FormControl>
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
                        alt="product"
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
                  Save Product
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
}