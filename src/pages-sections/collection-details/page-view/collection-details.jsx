import Container from "@mui/material/Container"; 
// Local CUSTOM COMPONENTS

import CollectionDescription from "../collection-description";
import CollectionIntro from "../collection-intro";
import ProductCarousel from "../related-products";


// ==============================================================
export default function CollectionDetailsPageView(props) {
  return <Container className="mt-2 mb-2">
      <CollectionIntro collection={props.collection} />
      <CollectionDescription description={props.collection.description}/>
      <ProductCarousel products={props.relatedProducts} />
    </Container>;
}