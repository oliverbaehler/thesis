import Image from "next/image"; 
// GLOBAL CUSTOM COMPONENTS

import { H3, Span } from "components/Typography"; 
// STYLED COMPONENT

import { Card2Wrapper } from "../styles"; 
// IMPORT IMAGES

export default function Card2() {
  return <Card2Wrapper>
      <div className="content">
        <Span fontSize={16}>#NEW</Span>

        <H3 lineHeight={1.2} fontSize={{
        xl: 36,
        lg: 30,
        xs: 28
      }}>
          SPORTS
        </H3>
      </div>
    </Card2Wrapper>;
}