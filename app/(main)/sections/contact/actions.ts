"use server";

import { z } from "zod";
import { db } from "@/db";
import { formSubmissions } from "@/db/schema";
import { type ContactFormData } from "./ContactForm";
import TelegramService from "@/lib/services/telegram";

type SubmitFormState = {
  success: boolean;
  fieldErrors?: Record<string, string[]>;
  rootError?: string;
};

const SubmitFormSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name is invalid",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is invalid",
    })
    .email(),
  reason: z.enum(formSubmissions.reason.enumValues, {
    required_error: "Reason is required",
    invalid_type_error: "Invalid selection provided",
  }),
  message: z.string({
    required_error: "Message is required",
    invalid_type_error: "Message is invalid",
  }),
});

export const submitForm = async (_prevState: SubmitFormState, form: ContactFormData): Promise<SubmitFormState> => {
  try {
    if (form.isBot) {
      return { success: true };
    }

    const { name, email, reason, message } = form;
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const validatedFields = SubmitFormSchema.safeParse({
      name: name || undefined,
      email: email || undefined,
      reason: reason || undefined,
      message: message || undefined,
    });

    if (!validatedFields.success) {
      return { success: false, fieldErrors: validatedFields.error.flatten().fieldErrors };
    }
    await db.insert(formSubmissions).values(form);

    await TelegramService.sendMessage(
      `New contact form submission!\n\nFrom:\n${name}\n${email}\n\nIntent: ${reason}\n\n${message}`,
    );

    return { success: true };
  } catch (error) {
    return { success: false, rootError: "An unknown error occurred" };
  }
};
