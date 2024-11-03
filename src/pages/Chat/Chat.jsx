import React, { useEffect, useState, useRef } from "react";
import Message from "./components/Message/Message";
import Reply from "./components/Reply/Reply";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  getOpenAIResponse,
  getGeminiAiResponse,
} from "../../scripts/OpenAiFunctions";
import { useParams } from "react-router-dom";
import { useAiContext } from "../../context/AiContext";
import Input from "./components/Input/Input";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import CustomToast from "./components/toast/Toast";

export default function Chat() {
  const { chats, getChatById, getResponseFromAi } = useAiContext();
  const {currentUser} = useAuth();
  const messagesEndRef = useRef(null);

  const { id } = useParams();

  const handleSubmit = async (prompt) => {
    getResponseFromAi(id, prompt);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const chatFromParams = getChatById(id);


  useEffect(() => {
    scrollToBottom();
  }, [chatFromParams.chats]);



  return (
    <>
    <CustomToast/>
      <div className="w-100 col-10" style={{ height: "100vh", overflowY: 'hidden' }}>
        <Navbar username={currentUser.displayName}/>

        <div
          className="chat-container container mb-3 pb-5"
          style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        >
          {chatFromParams.chats.map((chat, idx) => {
            return (
              <div className="fullchat" key={idx}>
                <Message prompt={chat.prompt} />
                <Reply response={chat.response} isLastMsg={chat.lastMsg} />
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-auto container">
          <Input handleSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
