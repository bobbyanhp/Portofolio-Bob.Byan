"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {
  error: null,
};

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <label className="block">
        <span className="text-sm font-bold text-slate-700">Email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </label>

      <label className="block">
        <span className="text-sm font-bold text-slate-700">Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </label>

      <div aria-live="polite" className="min-h-5 text-sm font-bold text-rose-700">
        {state.error}
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="w-full rounded-xl bg-indigo-700 px-5 py-3 text-center text-sm font-black text-white shadow-lg shadow-indigo-700/20 transition hover:bg-indigo-800 disabled:cursor-wait disabled:bg-slate-400">
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}
