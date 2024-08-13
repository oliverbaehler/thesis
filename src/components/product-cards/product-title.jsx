import Link from "next/link";
import { H2 } from "components/Typography"; 
// ==============================================================


// ==============================================================
export default function ProductTitle({
  title,
  slug,
  type
}) {
  return <Link href={`/${type}/${slug}`}>
      <H2 mb={1} ellipsis title={title} fontSize={14} fontWeight={600} className="title" color="text.secondary">
        {title}
      </H2>
    </Link>;
}