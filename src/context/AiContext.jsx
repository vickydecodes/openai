import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getGeminiAiResponse,
  getOpenAIResponse,
} from "../scripts/OpenAiFunctions";
import CustomToast from "../pages/Chat/components/toast/Toast";
import { toast } from "react-toastify";

const AiContext = createContext();

export function useAiContext() {
  return useContext(AiContext);
}

export const AiProvider = ({ children }) => {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("chatsForChatGPTClone");
    return savedChats
      ? JSON.parse(savedChats)
      : [
          {
            id: crypto.randomUUID(),
            title: "chat 1",
            chats: [
              {
                prompt: "Hey!",
                response: "Hiii! how can I help you Today? :)",
              },
            ],
          },
        ];
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatsForChatGPTClone", JSON.stringify(chats));
  }, [chats]);

  const getResponseFromAi = async (id, prompt) => {
    setLoading(true);
    try {
      const chat = getChatById(id);
      const userPrompt = prompt;
      if (prompt.length > 0) {
        const aiResponse = await getGeminiAiResponse(userPrompt);
        const newChat = {
          prompt: userPrompt,
          response: aiResponse,
          lastMsg: true,
        };
        const updatedChats = chat.chats.map((c, index) => {
          return {
            ...c,
            lastMsg: false,
          };
        });

        updatedChats.push(newChat);

        setChats((prevChats) =>
          prevChats.map((c) =>
            c.id === id ? { ...c, chats: updatedChats } : c
          )
        );
      } else {
        return;
      }
    } catch (e) {
      toast.error("Sorry, something went wrong!");
      navigate("/");
      console.error("Error fetching response from AI:", e);
      return "Sorry, something went wrong!";
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      title: `chat ${chats.length + 1}`,
      chats: [
        { prompt: "Hey!", response: "Hiii! how can I help you Today? :)" },
      ],
    };
    setChats((prevChats) => [...prevChats, newChat]);
  };

  const getChatById = (id) => {
    return chats.find((chat) => chat.id === id);
  };

  const functions = {
    chats,
    getResponseFromAi,
    loading,
    newChat,
    getChatById,
  };

  return (
    <AiContext.Provider value={functions}>
      <CustomToast />
      {children}
    </AiContext.Provider>
  );
};
