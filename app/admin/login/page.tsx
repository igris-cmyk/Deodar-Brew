'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { loginAction } from './actions';
import { Coffee } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-cedar-brown px-4 py-3 font-semibold text-white transition-colors hover:bg-cedar-espresso disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Signing in…' : 'Sign In'}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(loginAction, { error: "" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-cedar-cream px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cedar-brown">
            <Coffee className="h-8 w-8 text-cedar-cream" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-cedar-espresso">
            Deodar-Brew Admin
          </h1>
          <p className="mt-2 text-cedar-charcoal/70">
            Sign in to manage your cafe
          </p>
        </div>

        <form
          action={formAction}
          className="rounded-2xl border border-cedar-border bg-white p-8 shadow-lg"
        >
          {state.error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-cedar-charcoal"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-cedar-border bg-cedar-cream/40 px-4 py-2.5 text-cedar-espresso placeholder:text-cedar-charcoal/40 focus:border-cedar-caramel focus:outline-none focus:ring-2 focus:ring-cedar-caramel/20"
              placeholder="admin@deodarbrew.com"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-cedar-charcoal"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-cedar-border bg-cedar-cream/40 px-4 py-2.5 text-cedar-espresso placeholder:text-cedar-charcoal/40 focus:border-cedar-caramel focus:outline-none focus:ring-2 focus:ring-cedar-caramel/20"
              placeholder="••••••••"
            />
          </div>

          <SubmitButton />
        </form>

        <p className="mt-6 text-center text-sm text-cedar-charcoal/50">
          &copy; {new Date().getFullYear()} Deodar-Brew. All rights reserved.
        </p>
      </div>
    </div>
  );
}
