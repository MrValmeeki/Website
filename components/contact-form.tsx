"use client";

import { Check, Copy, Mail, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { profile } from "@/data/profile";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const update = (field: keyof FormValues, val: string) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setStatus("");
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: FormErrors = {};

    if (values.name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (values.message.trim().length < 10) {
      nextErrors.message = "Please write a message of at least 10 characters.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("Please fix the fields highlighted in red.");
      return;
    }

    const subject = encodeURIComponent(`Project Enquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(
      `From: ${values.name.trim()} (${values.email.trim()})\n\nMessage:\n${values.message.trim()}`
    );

    setStatus("Opening your email client to dispatch message directly to Atharv...");
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6">
      {/* Direct Copy Bar (Solid Colors, No Gradients) */}
      <div className="p-4 rounded-xl bg-slate-900 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <Mail size={15} className="text-cyan-400" />
          <span>Direct Channel: <strong className="text-white">{profile.email}</strong></span>
        </div>
        <button
          type="button"
          onClick={copyEmail}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all active:scale-95 border border-white/10"
          title="Copy email to clipboard"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Form */}
      <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 rounded-xl bg-slate-900 border border-white/10 shadow-2xl space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-mono text-slate-400">YOUR NAME</span>
            <input
              type="text"
              name="name"
              placeholder="e.g. Elena Rostova"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded bg-slate-950 border border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 text-sm text-white placeholder-slate-600 outline-none transition-all font-sans"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <span className="text-xs text-rose-400 block">{errors.name}</span>}
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-mono text-slate-400">EMAIL ADDRESS</span>
            <input
              type="email"
              name="email"
              placeholder="name@organization.com"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded bg-slate-950 border border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 text-sm text-white placeholder-slate-600 outline-none transition-all font-sans"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <span className="text-xs text-rose-400 block">{errors.email}</span>}
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="text-xs font-mono text-slate-400">MESSAGE</span>
          <textarea
            name="message"
            rows={5}
            placeholder="Tell me about your project, ideas in robotics/AI, or simply say hi..."
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded bg-slate-950 border border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 text-sm text-white placeholder-slate-600 outline-none transition-all font-sans"
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && <span className="text-xs text-rose-400 block">{errors.message}</span>}
        </label>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button type="submit" className="btn btn-primary group active:scale-95">
            <span>Send Message</span>
            <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {status && (
            <p className="text-xs font-mono text-slate-400" role="status">
              {status}
            </p>
          )}
        </div>

        <p className="text-[0.72rem] font-mono text-slate-500 pt-2 border-t border-white/5">
          Dispatches straight to <span className="text-slate-300 font-semibold">{profile.email}</span> with zero third-party tracking.
        </p>
      </form>
    </div>
  );
}
