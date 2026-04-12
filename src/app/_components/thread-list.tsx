"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ThreadListProps {
  className?: string;
}

export function ThreadList({ className }: ThreadListProps) {
  // Mock data for now
  const threads = [
    { id: "1", subject: "Welcome to E-MassCom", from: "Team", snippet: "Thanks for joining us! We are excited to...", date: "10:30 AM", unread: true },
    { id: "2", subject: "Your Subscription", from: "Stripe", snippet: "Your premium plan has been activated successfully.", date: "9:15 AM", unread: false },
    { id: "3", subject: "New Search Engine Features", from: "Orama", snippet: "We've added vector search to your indexing pipeline...", date: "Yesterday", unread: false },
  ];

  return (
    <div className={cn("flex flex-col h-full bg-slate-50 dark:bg-slate-900 border-r", className)}>
      <div className="p-4 border-b bg-white dark:bg-slate-900">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input className="pl-9 bg-slate-100 dark:bg-slate-800 border-none" placeholder="Search emails..." />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className={cn(
              "p-4 border-b cursor-pointer transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
              thread.unread && "bg-white dark:bg-slate-950 border-l-4 border-l-blue-600"
            )}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-semibold text-slate-900 dark:text-slate-100">{thread.from}</span>
              <span className="text-xs text-slate-500">{thread.date}</span>
            </div>
            <div className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate mb-1">
              {thread.subject}
            </div>
            <div className="text-xs text-slate-500 line-clamp-2">
              {thread.snippet}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
