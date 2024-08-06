import Section1 from "../featured-collections";
import Section2 from "../featured-items-2";
import Section3 from "../feed";
import Section4 from "../featured-items";
export default function LandingPage() {
  return <div className="bg-white">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>;
}