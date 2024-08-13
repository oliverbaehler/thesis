import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

import { HexColorPicker } from 'react-colorful';
import { db } from 'firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import { Box, Button, Card, CardContent, Typography, Popover, Grid, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { H2, H4 } from 'components/Typography';

export default function QRCodeCustomizer({ open, anchorEl, handleClose, popup_id, collection, id, url, initialData }) {
  const logo = "/assets/images/brand/qr-default-image.jpg"
  const [darkColor, setDarkColor] = useState(initialData?.darkColor || '#000000');
  const [lightColor, setLightColor] = useState(initialData?.lightColor || '#FFFFFF');

  const handleSaveSettings = async () => {
    const collectionDocRef = doc(db, collection, id);
    await updateDoc(collectionDocRef, {
      'qrCodeSettings': {
        darkColor,
        lightColor
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
