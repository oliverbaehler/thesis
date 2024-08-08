import Container from "@mui/material/Container"; 
// Local CUSTOM COMPONENTS

import ProductTabs from "../product-tabs";
import ProductIntro from "../product-intro";
import RelatedProducts from "../related-products";


// ==============================================================
export default function CollectionDetailsPageView(props) {
  return <Container className="mt-2 mb-2">
      <ProductIntro collection={props.collection} />

     {/* <RelatedProducts products={props.relatedProducts} />*/}
    </Container>;
}