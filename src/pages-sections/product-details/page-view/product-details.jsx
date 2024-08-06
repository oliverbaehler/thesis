import Container from "@mui/material/Container"; 
// Local CUSTOM COMPONENTS

import ProductTabs from "../product-tabs";
import ProductIntro from "../product-intro";
import AvailableShops from "../available-shops";
import RelatedProducts from "../related-products";


// ==============================================================
export default function ProductDetailsPageView(props) {
  return <Container className="mt-2 mb-2">
      <ProductIntro product={props.product} />
      <ProductTabs description={props.product.description}/>
      <AvailableShops />

      {
      /* RELATED PRODUCTS AREA 
      <RelatedProducts products={props.relatedProducts} /> */
    }
    </Container>;
}