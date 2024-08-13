import Image from "next/image";
import Link from 'next/link';
// GLOBAL CUSTOM COMPONENTS

import { H3, Paragraph, Span } from "components/Typography"; 
// STYLED COMPONENT

import { Card1Wrapper } from "../styles"; 

export default function Card1({product, color}) {

  const capitalizeName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return <Link href={`/collections/${product.id}`} passHref> 
  <Card1Wrapper
      style={{
        backgroundImage: `url(${product.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
        backgroundColor: {color},
      }}>

      <div className="content">
        <H3 lineHeight={1.2} fontSize={{
        xl: 48,
        lg: 40,
        xs: 34
      }}>
          {capitalizeName(product.name)}
        </H3>

        <Paragraph mt={4} fontSize={18} fontWeight={600}>
          By {product.createdByName}
        </Paragraph>
      </div>
    </Card1Wrapper>
    </Link>
    ;
}