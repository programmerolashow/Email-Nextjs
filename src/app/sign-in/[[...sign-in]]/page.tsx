"use client";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-white font-sans selection:bg-blue-500/30">
      {/* Left side: Premium Branding */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          src="/images/auth-bg.png"
          alt="Authentication background"
          fill
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/40 to-transparent" />
        
        <div className="relative z-10 flex h-full flex-col p-12">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="p-2 bg-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">E-MassCom</span>
          </div>

          <div className="mt-auto max-w-lg">
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
              Master Your <span className="text-blue-500">Communication</span>
            </h1>
            <p className="mt-6 text-xl text-slate-400 leading-relaxed font-light">
              Welcome to the future of messaging. Seamlessly manage your correspondence across all platforms with our fast, secure, and AI-powered workspace.
            </p>
            <div className="mt-10 flex gap-4">
              <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex-1 hover:bg-white/10 transition-colors">
                <p className="text-sm font-medium text-slate-300">Fast & Secure</p>
                <div className="mt-1 h-1 w-12 bg-blue-500 rounded-full" />
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex-1 hover:bg-white/10 transition-colors">
                <p className="text-sm font-medium text-slate-300">Multi-Platform</p>
                <div className="mt-1 h-1 w-12 bg-blue-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Authentication Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-slate-950">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">E-MassCom</span>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white">Sign In</h2>
            <p className="text-sm text-slate-400">Continue your journey with E-MassCom</p>
          </div>

          <div className="flex justify-center">
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary: 
                    "bg-blue-600 hover:bg-blue-700 text-sm normal-case transition-all duration-200 py-2 shadow-lg shadow-blue-900/20",
                  card: "bg-transparent shadow-none w-full p-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: 
                    "bg-white/5 hover:bg-white/10 border-white/10 text-white font-medium transition-all duration-200",
                  socialButtonsIconButton: 
                    "bg-white/5 hover:bg-white/10 border-white/10 text-white",
                  formFieldInput: 
                    "bg-white/5 border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 rounded-lg",
                  formFieldLabel: "text-slate-400 font-medium",
                  footerActionLink: "text-blue-400 hover:text-blue-300 font-semibold",
                  dividerLine: "bg-white/10",
                  dividerText: "text-slate-500",
                  identityPreview: "bg-white/10 border-white/10 text-white",
                  userButtonPopoverCard: "bg-slate-900 border-white/10",
                  breadcrumbsItemLink: "text-slate-400",
                  breadcrumbsItemLinkActive: "text-white",
                  formResendCodeLink: "text-blue-400",
                },
                layout: {
                  socialButtonsVariant: "blockButton",
                  showOptionalFields: false,
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
