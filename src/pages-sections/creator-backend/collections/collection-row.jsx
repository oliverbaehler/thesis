import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; 
// MUI ICON COMPONENTS

import Link from '@mui/material/Link';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";  
import { Paragraph, Small } from "components/Typography";
// GLOBAL CUSTOM COMPONENT

import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch"; 
// STYLED COMPONENTS

import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles"; 
// ========================================================================


// ========================================================================
export default function CollectionRow({
  collection,
  selected
}) {
  const {
    id,
    name,
    thumbnail,
    published,
    image,
  } = collection || {};
  const router = useRouter();
  const [featuredCategory, setFeaturedCategory] = useState(featured);
  const hasSelected = selected.indexOf(name) !== -1;

  const handleNavigate = () => router.push(`/admin/categories/${slug}`);

  return <StyledTableRow tabIndex={-1} role="checkbox" selected={hasSelected}>
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



      <StyledTableCell align="center">#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align="center">{name}</StyledTableCell>

      <StyledTableCell align="center">
        <Avatar alt={name} src={logo} sx={{
        width: 55,
        height: "auto",
        margin: "auto",
        borderRadius: 0
      }} />
      </StyledTableCell>

      <StyledTableCell align="center">
        <BazaarSwitch color="info" checked={featuredCategory} onChange={() => setFeaturedCategory(state => !state)} />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={handleNavigate}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
}