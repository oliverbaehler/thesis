import { useState } from 'react';
import { Paragraph, Link } from '@mui/material';

export default function TruncatedParagraph({ description, maxLength = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = description.length > maxLength && !isExpanded 
    ? `${description.substring(0, maxLength)}...` 
    : description;

  return (
    <Paragraph my={2}>
      {truncatedText}
      {description.length > maxLength && (
        <Link
          component="button"
          variant="body2"
          onClick={toggleExpand}
          sx={{ marginLeft: 1, cursor: 'pointer' }}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </Link>
      )}
    </Paragraph>
  );
}