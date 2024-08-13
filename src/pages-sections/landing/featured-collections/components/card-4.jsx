import Image from "next/image"; 
// GLOBAL CUSTOM COMPONENTS

import { H3, Span } from "components/Typography"; 
// STYLED COMPONENT

import { Card4Wrapper } from "../styles"; 
// IMPORT IMAGES

export default function Card4() {
  return <Card4Wrapper>
      <div className="content">
        <Span fontSize={16}>#SUNGLASSES</Span>

        <H3 lineHeight={1.2} fontSize={{
        xl: 36,
        lg: 30,
        xs: 28
      }}>
          50% OFF
        </H3>
      </div>
    </Card4Wrapper>;
}