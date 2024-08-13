import Image from "next/image"; 
// GLOBAL CUSTOM COMPONENTS

import { H3, Span } from "components/Typography"; 
// STYLED COMPONENT

import { Card3Wrapper } from "../styles"; 
// IMPORT IMAGES

export default function Card3() {
  return <Card3Wrapper>
      <div className="content">
        <Span fontSize={16}>#DRESS</Span>

        <H3 lineHeight={1.2} fontSize={{
        lg: 30,
        xs: 28
      }}>
          WOMEN
        </H3>
      </div>
    </Card3Wrapper>;
}