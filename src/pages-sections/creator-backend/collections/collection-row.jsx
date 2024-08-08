import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; 
import Image from 'next/image' 
// MUI ICON COMPONENTS

import Link from '@mui/material/Link';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";  
import { Paragraph, Small } from "components/Typography";
// GLOBAL CUSTOM COMPONENT

import { db } from "firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch"; 
// STYLED COMPONENTS

import { StyledTableRow, StyledTableCell, CategoryWrapper, StyledIconButton } from "../styles"; 
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
// ========================================================================


// ========================================================================
export default function CollectionRow({
  collection,
  selected
}) {
  const {
    id,
    name,
    image,
    likes,
    published,
    qrCodeImage
  } = collection || {};

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cpublished, setPublished] = useState(published);

  const handleTogglePublish = async () => {
    const newPublishState = !cpublished;

    setPublished(newPublishState);
    try {
      const docRef = doc(db, "collections", id);
      await updateDoc(docRef, {
        published: newPublishState,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      setPublished(!newPublishState);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeImage;
    link.download = name + "-qrcode.png";
    link.click();
  };

  const open = Boolean(anchorEl);
  const popup_id = open ? 'qr-popover' : undefined;

  return <StyledTableRow tabIndex={-1} role="checkbox">
  <StyledTableCell align="left">
    <FlexBox alignItems="center" gap={1.5}>
      <Avatar alt={name} src={image} sx={{
      borderRadius: 2
    }} />

      <div>
        <Paragraph fontWeight={600}>{name}</Paragraph>
      </div>
    </FlexBox>
  </StyledTableCell>

  <StyledTableCell align="left">
    <StyledIconButton onClick={handleClick}>
      <QrCodeIcon />
    </StyledIconButton>
  </StyledTableCell>

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
        <Typography variant="h6" gutterBottom>
          Product Code
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            width: { xs: '250px', sm: '300px', md: '350px' },
            height: 'auto',
          }}
        >
          <Image
                src={qrCodeImage}
                width={350}
                height={350}
                alt="QR Code"
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
          >
            Download
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Popover>

  <StyledTableCell align="left">
    <CategoryWrapper>{likes}</CategoryWrapper>
  </StyledTableCell>

  <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={published} onChange={handleTogglePublish} />
   </StyledTableCell>

  <StyledTableCell align="right">
    <StyledIconButton onClick={() => router.push(`/dashboard/collections/${id}`)}>
      <Edit />
    </StyledIconButton>

    <StyledIconButton onClick={() => router.push(`/collections/${id}`)}>
      <RemoveRedEye/>
    </StyledIconButton>

    <StyledIconButton>
      <Delete />
    </StyledIconButton>
  </StyledTableCell>
</StyledTableRow>;
}