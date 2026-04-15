"use client";

import { motion } from "framer-motion";
import { 
  Inbox, 
  Send, 
  ShieldAlert, 
  Clock, 
  FileText, 
  Mail, 
  Sparkles, 
  Mic, 
  ChevronRight,
  Zap,
  Lock,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Unified Inbox",
    description: "Manage your inbox, sent, and archive items in one powerful view.",
    icon: Inbox,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "AI Smart Compose",
    description: "Let our AI draft perfect responses based on your writing style.",
    icon: Sparkles,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    title: "Voice-to-Text",
    description: "Compose emails hands-free with state-of-the-art voice recognition.",
    icon: Mic,
    color: "text-red-500",
    bg: "bg-red-500/10"
  },
  {
    title: "RAG AI Assistant",
    description: "Ask anything about your past emails and get instant context-aware answers.",
    icon: MessageSquare,
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  {
    title: "Advanced Shield",
    description: "Intelligent spam and snoozing features to keep your focus on what matters.",
    icon: ShieldAlert,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    title: "Draft Evolution",
    description: "Save and iterate on drafts with automatic version control.",
    icon: FileText,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10"
  }
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black italic tracking-tighter">E-MASSCOM</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full -z-10 animate-pulse" />
        
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-blue-400 inline-block mb-8">
              Now with AI Voice-to-Text
            </span>
            <h1 className="text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8">
              The Evolution of <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Communication</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed font-light mb-12 max-w-2xl mx-auto">
              Welcome to the future of messaging. Seamlessly manage your correspondence with our fast, secure, and AI-powered workspace designed for the modern professional.
            </p>
            <div className="flex items-center justify-center gap-6">
              <Link href="/sign-up">
                <Button className="h-16 px-10 text-lg bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-500/30 font-bold rounded-2xl group active:scale-95 transition-all">
                  Get Started for Free <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden ring-2 ring-white/5">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-slate-950 bg-blue-600 flex items-center justify-center text-xs font-bold">
                  +2k
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-slate-950 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className={cn("p-4 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110", feature.bg)}>
                  <feature.icon className={cn("w-6 h-6", feature.color)} />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-light">{feature.description}</p>
                <div className="absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Zap className="w-4 h-4 text-blue-500/50" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             {/* Logo placeholders */}
             <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">AURINKO</div>
             <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">ORAMA</div>
             <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">OPENAI</div>
             <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">STRIPE</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-black italic tracking-tighter">E-MASSCOM</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-sm text-slate-600 italic font-medium">© 2026 E-MassCom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
