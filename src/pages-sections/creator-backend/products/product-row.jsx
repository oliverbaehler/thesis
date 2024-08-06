"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Image from 'next/image' 
// MUI ICON COMPONENTS

import QrCodeIcon from '@mui/icons-material/QrCode';
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; 
import Link from '@mui/material/Link';
// GLOBAL CUSTOM COMPONENTS
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography"; 

import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles"; 
import Popover from '@mui/material/Popover';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';


// ========================================================================


// ========================================================================
export default function ProductRow({
  product
}) {
  const {
    id,
    name,
    collectionId,
    collectionName,
    image,
    published,
    qrCodeImage
  } = product || {};
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

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

  console.log("published" + published + "qrcode" + qrCodeImage);

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
          <div>
            <Link href={`/dashboard/collections/${collectionId}`} passHref>
              <Paragraph fontWeight={600}>{collectionName}</Paragraph>
            </Link>
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
                    width='100%'
                    height='auto'
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




      <StyledTableCell align="right">
        <StyledIconButton onClick={() => router.push(`/dashboard/products/${id}`)}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton onClick={() => router.push(`/products/${id}`)}>
          <RemoveRedEye/>
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
}