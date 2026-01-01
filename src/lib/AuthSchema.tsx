import z from "zod";

export const MOBILE_REGEX = /^(\+98|0)?9\d{9}$/;
// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
export type AuthMethod = "email" | "phone";
export type AuthStep = "input" | "otp";

export type AuthFormValues = {
  identifier: string;
};
// -----------------------------------------------------------------------------
// Validation Schemas
// -----------------------------------------------------------------------------
export const createAuthSchema = (t: any, method: AuthMethod) => {
  return z.object({
    identifier: z
      .string()
      .min(1, {
        message:
          method === "email"
            ? t("validation.emailRequired")
            : t("validation.phoneRequired"),
      })
      .refine(
        (value) => {
          if (method === "email") {
            return z.string().email().safeParse(value).success;
          } else {
            return MOBILE_REGEX.test(value);
          }
        },
        {
          message:
            method === "email"
              ? t("validation.emailInvalid")
              : t("validation.phoneInvalid"),
        }
      ),
  });
};
