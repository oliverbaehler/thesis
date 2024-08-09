"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Image from 'next/image' 
// MUI ICON COMPONENTS

import QrCodeIcon from '@mui/icons-material/QrCode';
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; 
import Link from "next/link";
// GLOBAL CUSTOM COMPONENTS
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography"; 
import { useAuth } from "contexts/SessionContext";

import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles"; 
import Popover from '@mui/material/Popover';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject, listAll } from "firebase/storage";
import { db, storage } from "firebaseConfig";


export default function ProductRow({
  product
}) {
  const {
    id,
    name,
    collectionId,
    collectionName,
    image,
    likes,
    published,
    qrCodeImage
  } = product || {};
  const user = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cpublished, setPublished] = useState(published);

  const handleTogglePublish = async () => {
    const newPublishState = !cpublished;

    setPublished(newPublishState);
    try {
      const docRef = doc(db, "products", id);
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

  const handleDelete = useCallback(async () => {
    const productDirRef = ref(storage, `${user.uid}/products/${id}`);

    console.log(productDirRef)
    try {
      // List all files in the directory
      const filesList = await listAll(productDirRef);
      
      // Delete all files
      const deletePromises = filesList.items.map(fileRef => deleteObject(fileRef));
      await Promise.all(deletePromises);

      // Delete the document from Firestore
      const docRef = doc(db, "products", id);
      await deleteDoc(docRef);

      console.log("Product and associated files deleted successfully.");
      // Optionally, you can redirect the user or update the UI
      router.push('/dashboard'); // Redirect to dashboard after deletion
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  }, [id, collectionId, router]);



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
        <FlexBox alignItems="center" gap={1.5}>
            <Link href={`/dashboard/collections/${collectionId}`} passHref>
              <Paragraph fontWeight={600}>{collectionName}</Paragraph>
            </Link>
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
        <BazaarSwitch color="info" checked={cpublished} onChange={handleTogglePublish} />
      </StyledTableCell>

      <StyledTableCell align="right">
        <StyledIconButton onClick={() => router.push(`/dashboard/products/${id}`)}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton onClick={() => router.push(`/products/${id}`)}>
          <RemoveRedEye/>
        </StyledIconButton>

        <StyledIconButton onClick={handleDelete}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
}