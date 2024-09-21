import { Image } from 'next/image';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from 'firebaseConfig';

import { useAuth } from 'contexts/SessionContext'; 

import { HexColorPicker } from 'react-colorful';
import { db } from 'firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import { Box, Button, Card, CardContent, Typography, Popover, Grid, IconButton, TextField, Slider } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { H2, H3, H4, H5 } from 'components/Typography';

export default function QRCodeCustomizer({ open, anchorEl, handleClose, popup_id, collection, id, url, initialData }) {
  const { user } = useAuth(); 
  const [darkColor, setDarkColor] = useState(initialData?.darkColor || '#000000');
  const [lightColor, setLightColor] = useState(initialData?.lightColor || '#FFFFFF');
  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState(initialData?.logo);
  const [logoOpacity, setLogoOpacity] = useState(initialData?.logoOpacity || 0.2);
  const [logoWidth, setLogoWidth] = useState(initialData?.logoWidth || 150);

  const handleLogoUpload = async (event) => {
    console.log("ERRRRRR")
    console.log(event)
    //if (event.target.files[0] && user) {
    //  const file = event.target.files[0];
    //  const storageRef = ref(storage, `${user.uid}/qr-code-logos/${id}`);
//
    //  try {
    //    await uploadBytes(storageRef, file);
    //    const downloadURL = await getDownloadURL(storageRef);
    //    setLogoUrl(downloadURL);
    //    setLogoFile(file);
    //  } catch (error) {
    //    console.error("Error uploading logo: ", error);
    //  }
    //}
  };

  const handleSaveSettings = async () => {
    const collectionDocRef = doc(db, collection, id);
    const qrCodeSettings = {
      darkColor,
      lightColor,
      logoOpacity,
      logoWidth,
    };

    if (logoFile) {
      qrCodeSettings.logo = logoUrl;
    }

    await updateDoc(collectionDocRef, { qrCodeSettings });
  };

  const handleDownload = () => {
        var canvas = document.getElementById("react-qrcode-logo");
        var url = canvas.toDataURL("image/png");
        var link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = url;
        link.click();
  };

  return (
    <Popover
      id={popup_id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Customize QR Code
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 1 }}>
            <QRCode 
                value={url}
                bgColor={lightColor}
                fgColor={darkColor}
                logoImage={logoUrl}
                size={350}
                logoWidth={logoWidth}
                logoOpacity={logoOpacity}
                logoPaddingStyle="square"
            />
        
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <H3>Select Foreground Color</H3>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <HexColorPicker color={darkColor} onChange={setDarkColor} style={{ width: '100%' }} />
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <H3>Select Background Color</H3>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <HexColorPicker color={lightColor} onChange={setLightColor} style={{ width: '100%' }} />
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <H3>Logo Settings</H3>
              <Box sx={{ mt: 2 }}>
                <H5>Upload Logo</H5>
                <Button variant="contained" component="label" sx={{ mt: 1 }}>
                  Upload Logo
                  <input type="file" hidden onChange={handleLogoUpload} />
                </Button>
              </Box>
        
              <Box sx={{ mt: 2 }}>
                <H5>Set Logo Opacity</H5>
                <Slider
                  value={logoOpacity}
                  onChange={(e, newValue) => setLogoOpacity(newValue)}
                  aria-labelledby="logo-opacity-slider"
                  min={0}
                  max={1}
                  step={0.01}
                />
              </Box>
        
              <Box sx={{ mt: 2 }}>
                <H5>Set Logo Width</H5>
                <Slider
                  value={logoWidth}
                  onChange={(e, newValue) => setLogoWidth(newValue)}
                  aria-labelledby="logo-width-slider"
                  min={50}
                  max={350}
                  step={1}
                />
              </Box>
            </Grid>

            <Grid item xs={12} container justifyContent="space-between" sx={{ mt: 3 }}>
              <Button variant="contained" color="primary" startIcon={<DownloadIcon />} onClick={handleDownload}>
                Download
              </Button>
              <Button variant="contained" color="primary" onClick={handleSaveSettings}>
                Save Settings
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Popover>
  );
}
