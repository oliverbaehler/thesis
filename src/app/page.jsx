import IndexPageView from "pages-sections/landing/page-view";
import LandingLayout from "components/layouts/landing";

export const metadata = {
  title: "Pariahs Fans",
};
export default function IndexPage() {
  return <LandingLayout><IndexPageView></IndexPageView></LandingLayout>;
}
