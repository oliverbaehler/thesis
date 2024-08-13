import { SectionCreator } from "components/section-header";
import { ProductCard2 } from "components/product-cards/product-card-2"; 
import Light from "icons/Light"; 
import {Carousel} from "components/carousel";

export default async function ProductCarousel({products}) {
  if (!products || products.length === 0) {
    return null;
  }

  return <SectionCreator icon={<Light color="primary" />} title="Items from this collection">
      <Carousel slidesToShow={products.length}>
        {products.map(item => <ProductCard2 key={item.id} type="products" id={item.id} title={item.name} creatorName={item.createdByName} creatorId={item.createdBy} imgUrl={item.thumbnail} />)}
      </Carousel>
    </SectionCreator>;
}