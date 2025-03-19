"use client";

import { useEffect, useState, useTransition } from "react";
import { useActionState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { formSubmissions } from "@/db/schema";
import { FormSubmission } from "@/db/types";
import { submitForm } from "./actions";

export type ContactFormData = Pick<FormSubmission, "name" | "email" | "reason" | "message"> & { isBot?: boolean };

const contactFormDefaults: ContactFormData = {
  name: "",
  email: "",
  reason: null,
  message: "",
};

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(contactFormDefaults);
  const [dirty, setDirty] = useState<Partial<Record<keyof ContactFormData, boolean>>>();
  const [pending, startTransition] = useTransition();
  const [state, formAction] = useActionState(submitForm, { success: false });

  useEffect(() => setDirty(undefined), [state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => formAction(formData));
  };

  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>Send a message</CardTitle>
        <CardDescription>
          I'd love to hear from you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
                setDirty((prev) => ({ ...prev, name: true }));
              }}
              placeholder="Your Name"
              disabled={pending || state.success}
              error={!dirty?.name ? state.fieldErrors?.name?.[0] : undefined}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                setDirty((prev) => ({ ...prev, email: true }));
              }}
              placeholder="your.email@example.com"
              error={!dirty?.email ? state.fieldErrors?.email?.[0] : undefined}
              disabled={pending || state.success}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="mb-2 block text-sm font-medium">
              Subject
            </label>
            <Select
              value={formData.reason || undefined}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, reason: value as FormSubmission["reason"] }));
                setDirty((prev) => ({ ...prev, reason: true }));
              }}
              disabled={pending || state.success}
            >
              <SelectTrigger className="w-full" error={!dirty?.reason ? state.fieldErrors?.reason?.[0] : undefined}>
                <SelectValue placeholder="Select an inquiry type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(formSubmissions.reason.enumValues).map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason.charAt(0).toUpperCase() + reason.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              Message
            </label>
            <Textarea
              className="min-h-[100px]"
              id="message"
              name="message"
              value={formData.message || ""}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, message: e.target.value }));
                setDirty((prev) => ({ ...prev, message: true }));
              }}
              placeholder="Your message here..."
              error={!dirty?.message ? state.fieldErrors?.message?.[0] : undefined}
              disabled={pending || state.success}
            />
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              onChange={(e) => {
                if (e.target.value !== "") {
                  setFormData((prev) => ({ ...prev, isBot: true }));
                }
              }}
            />
          </div>

          <Button type="submit" disabled={pending || state.success} variant="colorful" size="lg" className="w-full">
            {pending ? "Sending..." : "Send Message"}
          </Button>

          {state.success && (
            <p className="mt-4 text-center text-sm font-semibold">
              Message sent successfully! I'll get back to you soon.
            </p>
          )}

          {state.rootError && (
            <p className="text-destructive mt-4 text-center text-sm font-semibold">{state.rootError}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
