"use client";

import { useState } from "react";
import { Sidebar } from "./_components/sidebar";
import { ThreadList } from "./_components/thread-list";
import { ThreadDetails } from "./_components/thread-details";
import { ChatbotDrawer } from "./_components/chatbot-drawer";
import { ComposeModal } from "./_components/compose-modal";

export default function Home() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <main className="flex h-screen w-full bg-white dark:bg-slate-950 overflow-hidden font-sans antialiased text-slate-900 dark:text-slate-100">
      <Sidebar className="w-64 border-r" onCompose={() => setIsComposeOpen(true)} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <div className="w-[400px] border-r">
          <ThreadList />
        </div>
        
        <div className="flex-1 bg-white dark:bg-slate-950">
          <ThreadDetails />
        </div>

        {isComposeOpen && (
          <ComposeModal onClose={() => setIsComposeOpen(false)} />
        )}
      </div>

      <ChatbotDrawer />
    </main>
  );
}
