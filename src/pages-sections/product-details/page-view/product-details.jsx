import Container from "@mui/material/Container"; 

import ProductDescription from "../product-description";
import ProductIntro from "../product-intro";

// ==============================================================
export default function ProductDetailsPageView(props) {
  return <Container className="mt-2 mb-2">
      <ProductIntro product={props.product} collection={props.collection}/>
      <ProductDescription description={props.product.description}/>
    </Container>;
}