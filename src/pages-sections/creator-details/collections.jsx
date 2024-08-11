
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { SectionCreator } from "components/section-header";
import { ProductCard2 } from "components/product-cards/product-card-2"; 
import Light from "icons/Light"; 

export default async function CollectionsCarousel({collections}) {
  if (!collections || collections.length === 0) {
    return null;
  }

  return <SectionCreator icon={<Light color="primary" />} title="Published Collections">
      <Carousel slidesToShow={collections.length} arrowStyles={{
      color: "#2B3445",
      backgroundColor: "white"
    }}>
        {collections.map(item => <ProductCard2 key={item.id} type="collections" id={item.id} title={item.name} imgUrl={item.thumbnail} />)}
      </Carousel>
    </SectionCreator>;
}