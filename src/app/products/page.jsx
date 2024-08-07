
// PAGE VIEW COMPONENT
import { ProductSearchPageView } from "pages-sections/product-details/page-view";
export const metadata = {
  title: "Product Search",
  description: `Search for all products`,
  keywords: ["search"]
};
export default async function ProductSearch({
  params
}) {
  return <ProductSearchPageView />;
}