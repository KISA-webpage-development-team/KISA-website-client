import React from "react";

export default function PostContent({ text }) {
  return <div className="py-3" dangerouslySetInnerHTML={{ __html: text }} />;
}
