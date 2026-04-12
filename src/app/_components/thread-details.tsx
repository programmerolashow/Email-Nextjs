"use client";

import { cn } from "@/lib/utils";
import { Reply, Forward, Star, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ThreadDetailsProps {
  className?: string;
}

export function ThreadDetails({ className }: ThreadDetailsProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    <div className={cn("flex flex-col h-full bg-white dark:bg-slate-950", className)}>
      {/* Thread Header */}
      <div className="p-6 border-b flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            Welcome to E-MassCom
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100">Inbox</Badge>
            <Badge variant="outline">Important</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <Button variant="ghost" size="icon"><Star className="w-5 h-5" /></Button>
          <Button variant="ghost" size="icon"><Reply className="w-5 h-5" /></Button>
          <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="flex gap-4">
          <Avatar>
            <AvatarFallback>TM</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-semibold mr-2">E-MassCom Team</span>
                <span className="text-sm text-slate-500">&lt;support@e-masscom.com&gt;</span>
              </div>
              <span className="text-sm text-slate-500">Oct 12, 10:30 AM</span>
            </div>
            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
              <p>Hi there,</p>
              <p>Welcome to <strong>E-MassCom</strong>, the future of AI-powered email management.</p>
              <p>We&apos;ve integrated OpenAI&apos;s GPT-4o and Orama&apos;s vector search to give you the most powerful inbox experience ever built. You can now chat with your emails, get smart suggestions, and search semantically.</p>
              <p>Best regards,<br />The Team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Area - Placeholder for Compose */}
      <div className="p-4 border-t bg-slate-50 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <Button className="rounded-full px-6 bg-blue-600 hover:bg-blue-700">
            <Reply className="w-4 h-4 mr-2" /> Reply
          </Button>
          <Button variant="outline" className="rounded-full px-6">
            <Forward className="w-4 h-4 mr-2" /> Forward
          </Button>
        </div>
      </div>
    </div>
  );
}
