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
  const [chat, setChat] = useState(null);
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("chatsForChatGPTClone");
    return savedChats
      ? JSON.parse(savedChats)
      : [
          {
            id: crypto.randomUUID(),
            title: `chat ${crypto.randomUUID()}`,
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
      const userPrompt = prompt.trim();

      if (userPrompt.length > 0) {
        const aiResponse = await getGeminiAiResponse(userPrompt);

        const newChat = {
          prompt: userPrompt,
          response: aiResponse,
          lastMsg: true,
        };

        if (chat) {
          const updatedChats = chat.chats
            .map((message) => ({
              ...message,
              lastMsg: false,
            }))
            .concat(newChat); 

          setChats((prevChats) =>
            prevChats.map((c) => (c.id === id ? { ...c, chats: updatedChats } : c))
          );
        }
      }
    } catch (e) {
      toast.error("Sorry, something went wrong!");
      navigate("/");
      console.error("Error fetching response from AI:", e);
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    const chatId = crypto.randomUUID();
    const newChat = {
      id: chatId,
      title: `chat ${chatId}`,
      chats: [
        { prompt: "Hey!", response: "Hiii! how can I help you Today? :)" },
      ],
    };
    setChats((prevChats) => [...prevChats, newChat]);
    navigate(`/chats/${chatId}`);
  };

  const getChatById = (id) => {
    return  chats.find((chat) => chat.id === id);
  };

  const deleteChat = (id) => {
    try {
      if (chats.length > 1) {
        setChats((prevChats) => {
          return prevChats.filter((chat) => chat.id !== id);
        });
        const remainingChats = chats.filter((chat) => chat.id !== id);
        navigate(`/chats/${remainingChats[remainingChats.length - 1].id}`);
      } else {
        toast.error("Sorry, You can't delete!");
      }
    } catch (e) {
      toast.error("An error occured while deleting the chat.");
      toast.error(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("chatsForChatGPTClone", JSON.stringify(chats));
  }, [chats]);

  const functions = {
    chat,
    setChat,
    chats,
    getResponseFromAi,
    loading,
    newChat,
    getChatById,
    deleteChat,
  };

  return (
    <AiContext.Provider value={functions}>
      <CustomToast />
      {children}
    </AiContext.Provider>
  );
};
