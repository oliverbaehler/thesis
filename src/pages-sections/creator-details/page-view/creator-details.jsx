import Container from "@mui/material/Container"; 
// Local CUSTOM COMPONENTS

import ProductIntro from "../creator-intro";
import CollectionsCarousel from "../collections";
import CreatorDescription from "../creator-description";

// ==============================================================
export default function CreatorDetailsPageView(props) {
  return <Container className="mt-2 mb-2">
      <ProductIntro user={props.user} />
      <CreatorDescription description={props.user.content} />
      <CollectionsCarousel collections={props.collections} />
    </Container>;
}