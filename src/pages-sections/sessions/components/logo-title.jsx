import Image from "next/image"; 

import { H5 } from "components/Typography";
import FlexRowCenter from "components/flex-box/flex-row-center"; 

import logo from "../../../../public/assets/images/brand/black.png";
export default function LogoWithTitle() {
  return <FlexRowCenter flexDirection="column" gap={1.5} mb={4}>
      <Image src={logo} width={100} layout="responsive" height="auto" alt="pariahs" />
      <H5 fontWeight={700}>Pariahs Fans</H5>
    </FlexRowCenter>;
}