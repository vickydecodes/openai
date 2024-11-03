import React, { useState, useEffect } from "react";
import { marked } from "marked";
import { useTypewriter } from "react-simple-typewriter";
import DOMPurify from "dompurify";
import "./MarkDown.css";

export default function MarkDown({ markdown }) {
  const [text] = useTypewriter({
    words: [markdown],
    loop: 1, // Do not loop
    typeSpeed: 1, // Adjust for faster typing speed
    deleteSpeed: 0, // No deletion
    onLoopDone: () => {
      // No need to do anything here since we don't loop
    },
    onDone: () => {
      // When done typing, set the display text to the final result
      setDisplayText(markdown);
    },
  });

  // Convert markdown to HTML
  const html = marked(text);
  const sanitizedHtml = DOMPurify.sanitize(html); // Sanitize HTML output

  return (
    <div
      className="markdown-container"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }} // Render sanitized HTML
    />
  );
}
