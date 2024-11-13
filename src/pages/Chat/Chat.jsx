import React, { useEffect, useState, useRef } from "react";
import Message from "./components/Message/Message";
import Reply from "./components/Reply/Reply";
import { useParams } from "react-router-dom";
import { useAiContext } from "../../context/AiContext";
import Input from "./components/Input/Input";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import CustomToast from "./components/toast/Toast";
import { toast } from "react-toastify";
import Loading from "./components/Loading/Loading";

export default function Chat() {
  const {  setChat, getChatById, getResponseFromAi, loading } = useAiContext();
  const { currentUser } = useAuth();
  const messagesEndRef = useRef(null);

  const { id } = useParams();


  const chat = getChatById(id);

  console.log("chats", chat);

  const handleSubmit = async (prompt) => {
    try {
      await getResponseFromAi(id, prompt);
    } catch (e) {
      toast.error(e.message || "OOPS, Something went Wrong!");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  useEffect(() => {
    const chat = getChatById(id);
    if (chat) {
      setChat(chat);
    } else {
      console.log("Chat not found!");
    }
  }, [id, getChatById, setChat]);

  if(loading){
    <Loading/>
  }

  return (
    <>
      <CustomToast />
      <div
        className="w-100 col-10"
        style={{ height: "100vh", overflowY: "hidden" }}
      >
        <Navbar username={currentUser.displayName} />

        <div
          className="chat-container container mb-3 pb-5"
          style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        >
          {chat.chats.map((chat, idx) => {
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
