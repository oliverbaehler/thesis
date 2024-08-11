import { useState } from 'react';
import { useQRCode } from 'next-qrcode';
import { QRCode } from 'react-qrcode-logo';

import { HexColorPicker } from 'react-colorful';
import { db, storage } from 'firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Box, Button, Card, CardContent, Typography, Popover, Grid, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { H2, H4 } from 'components/Typography';
import { idText } from 'typescript';

export default function QRCodeCustomizer({ open, anchorEl, handleClose, popup_id, collection, id, url, initialData }) {
  const { Canvas } = useQRCode();
  const [darkColor, setDarkColor] = useState(initialData?.darkColor || '#010599FF');
  const [lightColor, setLightColor] = useState(initialData?.lightColor || '#FFFFFF');
  const [logo, setLogo] = useState(initialData?.logo || "/assets/images/brand/qr-default-image.jpg");
  const [logoFile, setLogoFile] = useState(null);

  const handleLogoUpload = (event) => {
    if (event.target.files[0]) {
      setLogoFile(event.target.files[0]);
      const logoURL = URL.createObjectURL(event.target.files[0]);
      setLogo(logoURL);
    }
  };

  const handleSaveSettings = async () => {
    let logoUrl = logo;
    if (logoFile) {
      const logoStorageRef = ref(storage, `${userId}/${collection}/${id}/custom-qr-code.png`);
      const snapshot = await uploadBytes(logoStorageRef, logoFile);
      logoUrl = await getDownloadURL(snapshot.ref);
    }

    const collectionDocRef = doc(db, collection, id);
    await updateDoc(collectionDocRef, {
      'qrCodeSettings': {
        darkColor,
        lightColor,
        logo: logoUrl,
      }
    });
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
                logoImage={logo}
                removeQrCodeBehindLogo="false"
                size={350}
                logoPadding={5}
                quietZone={20}
                logoPaddingStyle="square"
            />
        
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <H4>Select Foreground Color</H4>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <HexColorPicker color={darkColor} onChange={setDarkColor} style={{ width: '100%' }} />
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <H4>Select Background Color</H4>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <HexColorPicker color={lightColor} onChange={setLightColor} style={{ width: '100%' }} />
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <H4>Upload Logo</H4>
              <Button variant="contained" component="label" sx={{ mt: 1 }}>
                Upload Logo
                <input type="file" hidden onChange={handleLogoUpload} />
              </Button>
              {logo && (
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={logo} alt="Logo Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </Box>
              )}
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
