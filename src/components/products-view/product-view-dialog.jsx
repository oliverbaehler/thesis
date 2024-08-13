import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent"; 

import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove"; 

import { Carousel } from "components/carousel";
import TruncatedParagraph from "components/trunc-paragraph";
import BazaarImage from "components/BazaarImage";
import FlexBox from "components/flex-box/flex-box";
import { H1, H2, H3, H6, Paragraph } from "components/Typography"; 

// =====================================================


// =====================================================
export default function ProductViewDialog(props) {
  const {
    product,
    openDialog,
    handleCloseDialog
  } = props;

  return <Dialog open={openDialog} maxWidth={false} onClose={handleCloseDialog} sx={{
    zIndex: 1501
  }}>
      <DialogContent sx={{
      maxWidth: 900,
      width: "100%"
    }}>
        <div>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Carousel slidesToShow={1} arrowStyles={{
              boxShadow: 0,
              color: "primary.main",
              backgroundColor: "transparent"
            }}>
                {product.images.map((item, index) => <BazaarImage key={index} src={item} alt="product" sx={{
                mx: "auto",
                width: "100%",
                objectFit: "contain",
                height: {
                  sm: 400,
                  xs: 250
                }
              }} />)}
              </Carousel>
            </Grid>

            <Grid item md={6} xs={12} alignSelf="center">
              <H1 color="primary.main">{product.name}</H1>

              <FlexBox alignItems="center" gap={1} mt={1}>
                <Rating color="warn" value={4} readOnly />
                <H6 lineHeight="1">(50)</H6>
              </FlexBox>

              <TruncatedParagraph description={product.description} maxLength={100} />

              <Divider sx={{
              mb: 2
            }} />
            </Grid>
          </Grid>
        </div>

        <IconButton sx={{
        position: "absolute",
        top: 3,
        right: 3
      }} onClick={handleCloseDialog}>
          <Close fontSize="small" color="secondary" />
        </IconButton>
      </DialogContent>
    </Dialog>;
}