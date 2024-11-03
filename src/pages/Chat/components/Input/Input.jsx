import React, { useRef } from "react";
import "./Input.css";

export default function Input({ handleSubmit }) {
  const promptRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    const userPrompt = promptRef.current.value;
    handleSubmit(userPrompt);
    promptRef.current.value =''
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick(e); 
    }
  };

  const sendSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      className="bi bi-arrow-up-short"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
      />
    </svg>
  );
  return (
    <div className="d-flex justify-content-center">
      <div
        className="input-group mb-3 custom-group shadow"
        style={{
          width: "90%",
          border: "0px",
          backgroundColor: "#3c3c3c",
          borderRadius: "32px",
        }}
      >
        <input
          type="text"
          ref={promptRef}
          onKeyDown={handleKeyDown}
          className="form-control custom-input shadow-none"
          placeholder="Message ChatGPT"
        />
        <span
          className="input-group-text  custom-group"
          id="basic-addon2"
          style={{ borderRadius: "0px 32px 32px 0px" }}
        >
          <button className="m-1 custom-button" onClick={handleClick}>{sendSvg}</button>
        </span>
      </div>
    </div>
  );
}
