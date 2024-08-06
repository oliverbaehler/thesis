"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; 
// MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; 
import Link from '@mui/material/Link';
// GLOBAL CUSTOM COMPONENTS
import dynamic from 'next/dynamic';
import { QRCode } from "components/qr-code";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography"; 

import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles"; 

// Dynamically import the QR code component with SSR disabled
const QRCodeComponent = dynamic(() => import("components/qr-code").then(mod => mod.QRCode), { ssr: false });


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
    published
  } = product || {};
  const router = useRouter();
  const [productPublish, setProductPublish] = useState(published);
  const [showQRCode, setShowQRCode] = useState(false);

  const handleQRCodeClick = () => {
    setShowQRCode(!showQRCode);
  };


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
        <button onClick={handleQRCodeClick}>
          {showQRCode ? "Hide QR Code" : "Generate QR Code"}
        </button>
        {showQRCode && <QRCodeComponent url={`https://example.com/products/${id}`} />}
      </StyledTableCell>

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