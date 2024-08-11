import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; 
import Image from 'next/image'

import Link from "next/link";
import { useAuth } from "contexts/SessionContext";
import { QRCodePopover } from 'components/qr-code';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";  
import { Paragraph, Small } from "components/Typography";
// GLOBAL CUSTOM COMPONENT

import { db, storage } from "firebaseConfig";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject, listAll } from "firebase/storage";

import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch"; 

import { StyledTableRow, StyledTableCell, CategoryWrapper, StyledIconButton } from "../styles"; 
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
    qrCodeSettings
  } = collection || {};

  const user = useAuth();
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


  const handleDelete = async () => {
    try {
      const docRef = doc(db, "collections", id);
      await deleteDoc(docRef);

      const storageRef = ref(storage, `${user.uid}/collections/${id}`);
      const { items, prefixes } = await listAll(storageRef);

      // Delete files in the folder
      const deletePromises = items.map((fileRef) => deleteObject(fileRef));
      await Promise.all(deletePromises);

      const deleteFolderPromises = prefixes.map(async (folderRef) => {
        const { items: subItems, prefixes: subPrefixes } = await listAll(folderRef);
        const subDeletePromises = subItems.map((subFileRef) => deleteObject(subFileRef));
        await Promise.all(subDeletePromises);
        return deleteFolderPromises;
      });

      await Promise.all(deleteFolderPromises);

      console.log('Collection and associated files deleted successfully.');
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  <QRCodePopover
    open={open}
    anchorEl={anchorEl}
    handleClose={handleClose}
    popup_id={popup_id}
    collection="collections"
    id={id}
    url={`https://example.com/collections/${id}`}
    initialData={qrCodeSettings}
  />
  <StyledTableCell align="left">
    <CategoryWrapper>{likes}</CategoryWrapper>
  </StyledTableCell>

  <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={cpublished} onChange={handleTogglePublish} />
   </StyledTableCell>

  <StyledTableCell align="right">
    <StyledIconButton onClick={() => router.push(`/dashboard/collections/${id}`)}>
      <Edit />
    </StyledIconButton>

    <StyledIconButton onClick={() => router.push(`/collections/${id}`)}>
      <RemoveRedEye/>
    </StyledIconButton>

    <StyledIconButton onClick={handleDelete}>
      <Delete />
    </StyledIconButton>
  </StyledTableCell>
</StyledTableRow>;
}