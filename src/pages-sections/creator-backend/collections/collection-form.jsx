"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { db, storage } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "contexts/SessionContext";

// GLOBAL CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box"; 
import { Editor } from "components/editor"; 
// STYLED COMPONENTS
import { UploadImageBox, StyledClear } from "../styles"; 

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!")
});

export default function CollectionForm({ initialData, collectionId }) {
  const router = useRouter();
  const { user } = useAuth(); // Get the logged-in user
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const INITIAL_VALUES = initialData || {
    name: "",
    published: false,
    content: "", 
  };


  const handleFormSubmit = async (values, { resetForm }) => {
    if (!user) {
      console.error("User is not logged in");
      return;
    }

    console.log("values", values);

    try {
      let docRef;
      if (collectionId) {
        const docRef = doc(db, "collections", collectionId);
        await updateDoc(docRef, {
          ...values,
          published: values.published,
          name: values.name,
          content: values.content,
          imageUrls: await uploadFiles(files, collectionId, user.uid),
          updatedAt: new Date(),
        });
      } else {
        const newCollectionId = uuidv4();
        const docRef = doc(db, "collections", newCollectionId);
        await setDoc(docRef, {
          ...values,
          published: values.published,
          name: values.name,
          content: values.content,
          imageUrls: await uploadFiles(files, newCollectionId, user.uid),
          createdBy: user.uid,
          createdAt: new Date(),
        });
        router.push(`/dashboard/collections/${newCollectionId}`);
      }

      resetForm();
      setFiles([]);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const uploadFiles = async (files, collectionId, userId) => {
    let imageUrls = [];
    for (const file of files) {
      const storageRef = ref(storage, `${userId}/collections/${collectionId}/${uuidv4()}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      imageUrls.push(downloadURL);
    }
    return imageUrls;
  };

  const handleChangeDropZone = (files) => {
    files.forEach(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(files);
  };

  const handleFileDelete = (file) => () => {
    setFiles((files) => files.filter(item => item.name !== file.name));
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
              <Editor content={content} setContent={setContent} />
              </Grid>
              
              {content}

              <Grid item xs={12}>
                <DropZone
                  title="Drop & drag category image"
                  onChange={(files) => handleChangeDropZone(files)}
                />

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
                    </UploadImageBox>
                  ))}
                </FlexBox>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControlLabel label="Publish" control={<Checkbox color="info" name="published" onBlur={handleBlur} onChange={handleChange} value={values.published} />} />
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