import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAiContext } from "../../../../context/AiContext";

export default function Navbar({ username }) {
  const { chats, newChat } = useAiContext();

  const navigate = useNavigate();

  const handleClickForChats = (id) => {
    navigate(`/chats/${id}`);
  };

  const handleClearClick = () => {
    localStorage.clear();
  };

  const clearSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="currentColor"
      className="bi bi-trash"
      viewBox="0 0 16 16"
    >
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
    </svg>
  );

  const sideBarSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="currentColor"
      className="bi bi-layout-text-sidebar"
      viewBox="0 0 16 16"
    >
      <path d="M3.5 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM3 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm12-1v14h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm-1 0H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9z" />
    </svg>
  );

  const newChatSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="currentColor"
      className="bi bi-pencil"
      viewBox="0 0 16 16"
    >
      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
    </svg>
  );

  const handleClickForNewChat = () => {
    newChat();
  };
  return (
    <div>
      <nav className="navbar sticky-top pt-3">
        <div className="container-fluid row d-sm-flex">
          <div className="col-5 d-flex justify-content-start align-items-center">
            <button
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
              style={{
                backgroundColor: "transparent",
                color: "#b4b4b4",
                border: "0px",
              }}
            >
              {sideBarSvg}
            </button>{" "}
            <h4 className="heading-1 ms-3">ChatGPT</h4>
          </div>
          <div className="col-7 d-flex justify-content-end align-items-center">
            <h5 className="heading-2">{username}</h5>
            <button onClick={handleClearClick} className="ms-3" style={{backgroundColor: 'transparent', border: '0px', color: 'white'}}>{clearSvg}</button>
          </div>
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{ backgroundColor: "#1b1b1b", color: "white", height: "100%" }}
      >
        <div className="offcanvas-header">
          <button
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            style={{
              color: "white",
              backgroundColor: "transparent",
              border: "0px",
            }}
          >
            {" "}
            {sideBarSvg}
          </button>
          <button
            className="ms-3"
            onClick={handleClickForNewChat}
            type="button"
            style={{
              color: "white",
              backgroundColor: "transparent",
              border: "0px",
            }}
          >
            {" "}
            {newChatSvg}
          </button>
          <h5 className="offcanvas-title ms-auto" id="offcanvasExampleLabel">
            ChatGPT
          </h5>
        </div>
        <div>
          <h5 className="ms-3">History</h5>
        </div>
        <div className="offcanvas-body">
          <div
            className=""
            style={{ height: "calc(100vh- 500px)", overflow: "auto" }}
          >
            {chats.map((chat, idx) => {
              return (
                <div
                  className="card title-card"
                  style={{
                    backgroundColor: "#3b3b3b",
                    color: "white",
                    borderRadius: "20px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                  onClick={() => handleClickForChats(chat.id)}
                  key={idx}
                >
                  <div className="card-body">{chat.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
