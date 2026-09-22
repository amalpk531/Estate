import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

import type { Property } from "@/lib/properties";

type Fields = {
  name: string;
  phone: string;
  email: string;
  message: string;
  visitDate: string;
};

const EMPTY: Fields = { name: "", phone: "", email: "", message: "", visitDate: "" };

function validate(values: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!values.phone.trim()) errors.phone = "Phone is required";
  else if (!/^\d{10}$/.test(values.phone.trim()))
    errors.phone = "Enter a valid 10-digit phone number";
  if (!values.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Enter a valid email address";
  if (!values.message.trim()) errors.message = "Message is required";
  if (!values.visitDate) errors.visitDate = "Preferred visit date is required";
  return errors;
}

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/25";

export function EnquiryForm({ property }: { property: Property }) {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof Fields>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const payload = { propertyId: property.id, propertySlug: property.slug, ...values };
    console.log("Enquiry submitted:", payload);
    setSubmitted(true);
    setValues(EMPTY);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center shadow-card">
        <CheckCircle2 className="mx-auto size-10 text-success" />
        <h3 className="mt-3 text-lg font-semibold">Enquiry sent</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Thanks! Our team will contact you about {property.id} shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 rounded-lg border border-input px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-card"
    >
      <div>
        <h3 className="text-lg font-semibold">Enquire about this property</h3>
        <p className="text-sm text-muted-foreground">Property ID #{property.id}</p>
      </div>

      <Field label="Name" error={errors.name}>
        <input
          className={inputClass}
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Your full name"
        />
      </Field>

      <Field label="Phone" error={errors.phone}>
        <input
          className={inputClass}
          inputMode="numeric"
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="10-digit mobile number"
        />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          className={inputClass}
          type="email"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@example.com"
        />
      </Field>

      <Field label="Preferred visit date" error={errors.visitDate}>
        <input
          className={inputClass}
          type="date"
          value={values.visitDate}
          onChange={(e) => set("visitDate", e.target.value)}
        />
      </Field>

      <Field label="Message" error={errors.message}>
        <textarea
          className={`${inputClass} min-h-24 resize-y`}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us what you'd like to know"
        />
      </Field>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Send enquiry
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error && <span className="block text-xs text-destructive">{error}</span>}
    </label>
  );
}
