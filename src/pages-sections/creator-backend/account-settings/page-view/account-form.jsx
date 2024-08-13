"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik } from "formik";
import * as yup from "yup"; 
import Typography from '@mui/material/Typography';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "firebaseConfig"; 

import { Editor } from "components/editor"; 
import UploadButton from "../upload-button";

const ACCOUNT_SCHEMA = yup.object().shape({
  creator_name: yup.string().optional(),
  content: yup.string().optional()
});

export default function AccountSettingsPageView({initialData, user}) {
  const router = useRouter();
  const [content, setContent] = useState(initialData?.content);
  const [profileImage, setProfileImage] = useState(initialData?.profileImage || null);

  console.log("initialData", initialData);
  console.log("user", user);
  const INITIAL_VALUES = initialData || {
    content: "",
    displayName: ""
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        displayName: values.displayName,
        content: content || "",
      });

      router.push(`/dashboard/account-settings`);

    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, path);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.log("Error uploading file:", error.code);
      return null;
    }
  };

  const handleProfileImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };


  return <Card className="p-2">
        <Formik onSubmit={handleFormSubmit} initialValues={INITIAL_VALUES} validationSchema={ACCOUNT_SCHEMA}>
          {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        }) => <form onSubmit={handleSubmit}>

              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField fullWidth color="info" size="medium" name="displayName" label="Creator Name" onBlur={handleBlur} onChange={handleChange} value={values.displayName} error={!!touched.displayName && !!errors.displayName} helperText={touched.displayName && errors.displayName} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" component="h5" gutterBottom>
                    Biographie
                  </Typography>
                  <Editor content={content} setContent={setContent} />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="info">
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </form>}
        </Formik>
      </Card>;
}