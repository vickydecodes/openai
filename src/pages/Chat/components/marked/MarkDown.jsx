import React, { useState, useEffect } from "react";
import { marked } from "marked";
import { useTypewriter } from "react-simple-typewriter";
import DOMPurify from "dompurify";
import "./MarkDown.css";

export default function MarkDown({ markdown, isLastMsg }) {
  let sanitizedHtml;
  if (isLastMsg) {
    const [text] = useTypewriter({
      words: [markdown],
      loop: 1,
      typeSpeed: 1,
      deleteSpeed: 0,
      onLoopDone: () => {},
      onDone: () => {
        setDisplayText(markdown);
      },
    });

    const html = marked(text);
    sanitizedHtml = DOMPurify.sanitize(html);
  } else {
    const html = marked(markdown);
    sanitizedHtml = DOMPurify.sanitize(html);
  }

  return (
    <div
      className="markdown-container"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
