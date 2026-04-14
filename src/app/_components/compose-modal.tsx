"use client";

import { useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { X, Send, Sparkles, Paperclip, MoreVertical, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { readDataStream } from "ai";

interface ComposeModalProps {
  onClose: () => void;
}

export function ComposeModal({ onClose }: ComposeModalProps) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const handleAiCompose = async () => {
    if (isAiGenerating) return;
    setIsAiGenerating(true);
    
    try {
      const response = await fetch("/api/ai/compose", {
        method: "POST",
        body: JSON.stringify({
          subject,
          prompt: content || "Write a professional email.",
        }),
      });

      if (!response.ok) throw new Error("Failed to generate");

      if (response.body) {
        for await (const part of readDataStream(response.body)) {
          if (part.type === "text-part") {
            setContent((prev) => prev + part.value);
          }
        }
      }
    } catch (error) {
      console.error("AI Compose error:", error);
    } finally {
      setIsAiGenerating(false);
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 right-24 w-150 bg-white dark:bg-slate-900 shadow-2xl rounded-t-xl border flex flex-col z-[100] animate-in slide-in-from-bottom-full duration-300",
        isAiGenerating && "ring-2 ring-blue-500"
      )}
    >
      {/* Header */}
      <div className="p-3 bg-slate-900 border-b border-white/10 rounded-t-xl flex items-center justify-between text-white">
        <span className="text-sm font-semibold ml-2">New Message</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 hover:bg-white/10">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Inputs */}
      <div className="p-1 space-y-0.5">
        <div className="flex items-center px-4 py-2 border-b">
          <span className="text-sm text-slate-500 w-10">To</span>
          <Input
            value={to}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTo(e.target.value)}
            className="border-none shadow-none focus-visible:ring-0 text-sm h-7"
          />
        </div>
        <div className="flex items-center px-4 py-2 border-b">
          <span className="text-sm text-slate-500 w-10">Subject</span>
          <Input
            value={subject}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
            className="border-none shadow-none focus-visible:ring-0 text-sm h-7"
          />
        </div>
      </div>

      {/* Editor */}
      <div className="relative flex-1">
        <Textarea
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          placeholder="Write your message..."
          className="min-h-[300px] border-none shadow-none focus-visible:ring-0 p-6 text-base resize-none"
        />

        {/* AI Smart Compose Trigger */}
        <Button
          onClick={() => void handleAiCompose()}
          variant="outline"
          size="sm"
          disabled={isAiGenerating}
          className="absolute bottom-4 right-4 rounded-full gap-2 border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400"
        >
          <Sparkles className={cn("w-4 h-4", isAiGenerating && "animate-pulse")} />
          {isAiGenerating ? "AI is thinking..." : "AI Smart Compose"}
        </Button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex items-center justify-between bg-white dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 px-6 rounded-md">
            Send <Send className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="ghost" size="icon">
            <Paperclip className="w-5 h-5 text-slate-500" />
          </Button>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5 text-slate-500" />
        </Button>
      </div>
    </div>
  );
}
