"use client";

import { type FormEvent } from "react";
import { Trash2 } from "lucide-react";

interface ConfirmDeleteFormProps {
  id: string;
  action: (formData: FormData) => void | Promise<void>;
  message: string;
  label: string;
}

export function ConfirmDeleteForm({
  id,
  action,
  message,
  label,
}: ConfirmDeleteFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!window.confirm(message)) {
      event.preventDefault();
    }
  }

  return (
    <form action={action} className="inline-block" onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label={label}
        title={label}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}
