"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Bot, X, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";

interface ChatbotDrawerProps {
  className?: string;
}

export function ChatbotDrawer({ className }: ChatbotDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/ai/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! I'm your AI email assistant. I can help you find information across your emails or draft replies. How can I help today?",
      },
    ],
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl bg-gradient-to-br from-blue-600 to-indigo-700 hover:scale-110 transition-transform z-50"
        )}
      >
        <Bot className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5",
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span className="font-bold">AI Assistant</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "max-w-[80%] p-3 rounded-2xl text-sm",
                m.role === "assistant"
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 self-start"
                  : "bg-blue-600 text-white self-end ml-auto"
              )}
            >
              {m.content}
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 self-start max-w-[80%] p-3 rounded-2xl text-sm animate-pulse flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Thinking...
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white dark:bg-slate-900">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask anything about your emails..."
            className="rounded-full bg-slate-100 dark:bg-slate-800 border-none"
          />
          <Button type="submit" size="icon" className="rounded-full bg-blue-600 shrink-0" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
