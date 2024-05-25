import IndexPageView from "pages-sections/landing/page-view";
import LandingLayout from "components/layouts/landing";

export const metadata = {
  title: "Bazaar - Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function IndexPage() {
  return <LandingLayout><IndexPageView></IndexPageView></LandingLayout>;
}
