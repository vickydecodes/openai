import React from "react";
import MarkDown from "../marked/MarkDown";
import { Typewriter } from "react-simple-typewriter";
import "./Reply.css";
import { useAiContext } from "../../../../context/AiContext";

export default function Reply({ response, isLastMsg }) {
  const { loading } = useAiContext();
  return (
    <div className="mt-4 row d-flex flex-row px-2">
      <div className="col-1 d-md-flex justify-content-end">
        <img
          src="/chatgptIcon.png"
          className=""
          style={{ width: "25px", height: "25px", marginRight: '20px' }}
          alt=""
        />
      </div>
      <div className="col-11 px-4 reply-box">
        {loading && isLastMsg? (
          <p> {" "}
          <Typewriter
            words={["Loading..........."]}
            cursorBlinking={true}
            loop={true}
          />{" "}</p> // Display loading message or spinner
        ) : (
          <MarkDown markdown={response} isLastMsg={isLastMsg} /> // Render Markdown response
        )}
      </div>
    </div>
  );
}
