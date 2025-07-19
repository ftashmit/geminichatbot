"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";


interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
}

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export default function ChatbotUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pdfText, setPdfText] = useState("");
  const [numPages, setNumPages] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const extractTextFromPDF = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
      const maxPages = pdf.numPages;
      const textArray: string[] = [];

      for (let i = 1; i <= maxPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(" ");
        textArray.push(pageText);
      }

      setPdfText(textArray.join("\n\n"));
      setNumPages(maxPages);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      extractTextFromPDF(file);
    }
  };

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: prompt,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    const contents = updatedMessages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    contents.push({
      role: "user",
      parts: [{ text: `${prompt}\n\n${pdfText}` }],
    });

    const body = JSON.stringify({
      contents,
      tools: [
        {
          googleSearch: {},
        },
      ],
    });

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        }
      );

      const data = await response.json();
      const replyText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Sorry, I couldn't generate a response.";

      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: replyText,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "ai",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4"> My Chatbot</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="mb-4"
      />

      <div className="w-full max-w-2xl space-y-2 mb-4 overflow-y-auto max-h-[60vh]">
        {messages.map((msg) => (
          <Card
            key={msg.id}
            className={`${
              msg.sender === "user" ? "bg-white" : "bg-gray-200"
            } shadow`}
          >
            <CardContent className="p-4">
              <p className="text-sm">
                <strong>{msg.sender === "user" ? "You" : "AI"}:</strong>{" "}
                {msg.text}
              </p>
            </CardContent>
          </Card>
        ))}
        {isTyping && (
          <Card className="bg-gray-200 shadow animate-pulse">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <LoaderCircle className="h-4 w-4 animate-spin" /> AI is typing...
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex w-full max-w-2xl gap-2">
        <Input
          placeholder="Ask something about the PDF..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleSend} disabled={isTyping}>
          Send
        </Button>
      </div>
    </main>
  );
}
