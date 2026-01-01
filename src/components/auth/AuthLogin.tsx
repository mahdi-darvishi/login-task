"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Mail, Smartphone, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

// Local imports (Refactored parts)

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AuthFormValues,
  AuthMethod,
  AuthStep,
  createAuthSchema,
} from "@/lib/AuthSchema";
import { AuthSocials } from "./AuthSocials";

export default function LoginForm() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const isRtl = locale === "fa";

  // --- State ---
  const [method, setMethod] = useState<AuthMethod>("email");
  const [step, setStep] = useState<AuthStep>("input");
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false); // Controls animation visibility

  // --- Form Hooks ---
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(createAuthSchema(t, method)),
    defaultValues: {
      identifier: "",
    },
  });

  // --- Handlers ---

  const toggleMethod = (newMethod: AuthMethod) => {
    if (method === newMethod) return;
    setMethod(newMethod);
    reset();
    setStep("input");
    setShowOtp(false);
  };

  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);

    // Simulate API request delay
    setTimeout(() => {
      setIsLoading(false);

      if (step === "input") {
        setStep("otp");
        setTimeout(() => setShowOtp(true), 50); // Trigger animation
      } else {
        // Final submission (OTP verification would happen here)
        alert("Login Successful! (Mock)");
        console.log("Submitted Data:", data);
      }
    }, 1000);
  };

  const handleResetFlow = () => {
    setStep("input");
    setShowOtp(false);
  };

  // --- Render ---

  return (
    <Card className="md:min-w-125 px-4 md:p-10">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{t("welcome")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>

      <CardContent className="md:space-y-4">
        {/* Extracted Social Buttons Component */}
        <AuthSocials t={t} />

        {/* Divider */}
        <div className="relative py-2 md:py-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              {t("or")}
            </span>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Method Toggle (Email/Phone) */}
          <div
            className={`flex justify-center transition-all duration-300 ${
              step === "otp" ? "opacity-50 pointer-events-none grayscale" : ""
            }`}
          >
            <Tabs
              value={method}
              onValueChange={(val) => toggleMethod(val as AuthMethod)}
              className="w-auto"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-full h-auto p-1 bg-muted">
                <TabsTrigger
                  value="email"
                  className="rounded-full px-5 py-3 md:py-4 text-xs gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <Mail size={14} />
                  {t("email")}
                </TabsTrigger>
                <TabsTrigger
                  value="phone"
                  className="rounded-full px-5 py-3 md:py-4 text-xs gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <Smartphone size={14} />
                  {t("phone")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-4">
            {/* Identifier Input Field */}
            <div
              className={`space-y-2 transition-all duration-300 ${
                step === "otp" ? "opacity-50" : ""
              }`}
            >
              <Label
                htmlFor="identifier"
                className="text-xs text-muted-foreground ml-1"
              >
                {method === "email" ? t("emailLabel") : t("phoneLabel")}
              </Label>
              <div className="relative">
                <Input
                  id="identifier"
                  type={method === "phone" ? "tel" : "text"}
                  disabled={step === "otp" || isLoading}
                  placeholder={
                    method === "email"
                      ? t("placeholderEmail")
                      : t("placeholderPhone")
                  }
                  {...register("identifier")}
                  dir="ltr"
                  className={`h-12 rounded-lg bg-muted/30 focus:bg-background  transition-all ${
                    method === "phone" ? "pl-13" : "pl-3"
                  } `}
                />
                {method === "phone" && (
                  <span className=" absolute top-1/2 -translate-y-1/2 left-3 text-xs bg-background px-1.5 py-0.5 rounded border text-muted-foreground font-mono">
                    +98
                  </span>
                )}
              </div>
              {errors.identifier && (
                <p className="text-xs text-destructive font-medium animate-in slide-in-from-top-1 fade-in">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* OTP Input Section (Animated Reveal) */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out space-y-3 ${
                showOtp ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <Label className="text-xs text-muted-foreground">
                {t("otpLabel")}
              </Label>
              <div className="flex justify-center" dir="ltr">
                <InputOTP maxLength={6} disabled={isLoading} className="gap-2">
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} className="h-11 w-10" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">
                {t("otpDesc")}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 rounded-full md:mt-2 font-semibold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                {step === "input" ? t("continue") : t("signIn")}
                {isRtl ? (
                  <ArrowLeft className="mr-2 h-4 w-4" />
                ) : (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </>
            )}
          </Button>

          {/* Reset / Guest Actions */}
          <div className="flex flex-col gap-2 md:pt-1">
            {step === "otp" && (
              <Button
                variant={"ghost"}
                onClick={handleResetFlow}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors inline"
              >
                {isRtl ? "تغییر شماره / ایمیل" : "Change Number / Email"}
              </Button>
            )}

            {step === "input" && (
              <button
                type="button"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("guest")}
              </button>
            )}
          </div>
        </form>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col md:flex-row items-center gap-1 border-t text-muted-foreground text-xs -mt-3 md:mt-0">
        <span>{t("Footer.termsPrefix")}</span>
        <div className="flex items-center gap-1">
          <Link className="underline" href={"#"}>
            {t("Footer.terms")}
          </Link>
          <span>{t("Footer.and")}</span>
          <Link className="underline" href={"#"}>
            {t("Footer.privacy")}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
