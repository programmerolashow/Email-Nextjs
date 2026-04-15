"use client";

import { cn } from "@/lib/utils";
import { Send, Archive, Trash, Settings, Plus, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

interface SidebarProps {
  className?: string;
  onCompose: () => void;
}

export function Sidebar({ className, onCompose }: SidebarProps) {
  return (
    <div className={cn("flex flex-col h-full bg-white dark:bg-slate-900 border-r shadow-sm", className)}>
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-2xl font-black bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent italic tracking-tighter">
          E-MASS
        </h1>
        <div className="flex items-center gap-2">
          <UserButton afterSignOutUrl="/welcome" />
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5 text-slate-500" />
          </Button>
        </div>
      </div>

      <div className="px-4 mb-4">
        <Button 
          onClick={onCompose}
          className="w-full h-12 gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold text-base rounded-xl transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" /> Compose
        </Button>
      </div>

      <div className="flex-1 px-2 space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-3 bg-slate-100 dark:bg-slate-800">
          <Inbox className="w-4 h-4" /> Inbox
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Send className="w-4 h-4" /> Sent
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Archive className="w-4 h-4" /> Archive
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Trash className="w-4 h-4" /> Trash
        </Button>
      </div>

      <div className="p-4 border-t">
        <Button className="w-full gap-2 shadow-lg shadow-blue-500/20">
          <Plus className="w-4 h-4" /> New Account
        </Button>
      </div>
    </div>
  );
}
