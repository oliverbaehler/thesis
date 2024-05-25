import Image from "next/image"; 

import { H5 } from "components/Typography";
import FlexRowCenter from "components/flex-box/flex-row-center"; 

import logo from "../../../../public/assets/images/bazaar-black-sm.svg";
export default function LogoWithTitle() {
  return <FlexRowCenter flexDirection="column" gap={1.5} mb={4}>
      <Image src={logo} alt="pariahs" />
      <H5 fontWeight={700}>Welcome To Pariahs</H5>
    </FlexRowCenter>;
}