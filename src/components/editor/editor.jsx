"use client";

import dynamic from "next/dynamic";
import React, { memo, useMemo, useRef, useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false, // This ensures the editor is only loaded on the client side
});

const Editor = ({ content, setContent }) => {
  const config = useMemo(() => ({
    readonly: false,
    placeholder: content ? content : "Type something...",
  }), [content]);

  return (
    <JoditEditor
      value={content}
      onChange={(newContent) => setContent(newContent)}
    />
  );
};

export default memo(Editor); 