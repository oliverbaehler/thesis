"use client";

import dynamic from "next/dynamic";
import React, { memo, useMemo, useRef, useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const Editor = ({ content, setContent }) => {
  const config = useMemo(
    () => ({
      uploader: {         
        insertImageAsBase64URI: true,
        imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp']
      },
    }),
    []
  );

  return (
    <JoditEditor
      config={config}
      value={content}
      onChange={(newContent) => setContent(newContent)}
    />
  );
};

export default memo(Editor); 