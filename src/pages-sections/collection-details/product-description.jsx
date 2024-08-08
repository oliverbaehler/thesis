"use client";

export default function ProductDescription({ description }) {
  return <div dangerouslySetInnerHTML={{ __html: description }}></div>
}