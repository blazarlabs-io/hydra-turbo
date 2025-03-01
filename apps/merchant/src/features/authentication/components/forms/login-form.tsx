"use client";

import { loginFormSchema } from "~/src/features/authentication/data/form-schemas";
import { toast } from "@repo/ui/hooks/use-toast";
import { auth } from "@/lib/firebase/client";
import { firebaseAuthErrors } from "~/src/features/authentication/utils/firebase-auth-errors";
import { cn } from "@/utils/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@repo/ui/components/ui/button";
import { Form } from "@repo/ui/components/ui/form";
import { AuthInputField } from "../fields/auth-input-field";
import { PasswordInputField } from "./password-input-field";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";

export const LoginForm = () => {
  const provider = new GoogleAuthProvider();

  // * HOOKS
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email:
        (typeof window !== "undefined" &&
          window.localStorage.getItem("email")) ||
        "",
      password:
        (typeof window !== "undefined" &&
          window.localStorage.getItem("password")) ||
        "",
    },
  });
  const router = useRouter();

  // * STATES
  const recaptchaRef = useRef<typeof ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  // * HANDLERS
  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("email", values.email);
      window.localStorage.setItem("password", values.password);
    }

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        if (user.emailVerified) {
          toast({
            description: "Login successful",
            title: "Success",
            variant: "default",
          });
        } else {
          toast({
            description: "Please verify your email",
            title: "Error",
            variant: "destructive",
          });
          // router.push("/verify-email");
        }
      })
      .catch((error) => {
        toast({
          description: firebaseAuthErrors[error.code],
          title: "Error",
          variant: "destructive",
        });
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const handleCaptchaSubmission = async (token: string | null) => {
    try {
      if (token) {
        await fetch("/api/recaptcha", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        setIsVerified(true);
      }
    } catch (e) {
      setIsVerified(false);
    }
  };

  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  const handleExpired = () => {
    setIsVerified(false);
  };

  const handleForgotPassword = async () => {
    router.push("/forgot-password");
  };

  return (
    <div className="flex w-full min-w-[360px] max-w-[360px] flex-col gap-3 rounded-[12px] p-6">
      <div className="mb-4">
        <h1 className="text-center text-2xl font-semibold">Login Hydrapay</h1>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            onClick={handleSignInWithGoogle}
            disabled={!isVerified}
            type="button"
            className="flex w-full min-w-[320px] max-w-[320px] items-center justify-center gap-3 rounded-md border border-border bg-foreground px-4 py-2 text-base text-background disabled:bg-slate-400 disabled:text-slate-300"
          >
            <Image
              src="/images/google-color-icon.svg"
              alt="Logo"
              width={24}
              height={24}
              className={cn(!isVerified && "opacity-30 grayscale")}
            />
            Continue With Google
          </TooltipTrigger>
          <TooltipContent>
            <p>Please check the I&apos;m not a robot checkbox</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex items-center justify-center gap-4 py-2">
        <div className="h-[1px] w-full bg-border" />
        <span className="min-w-fit">or log in with</span>
        <div className="h-[1px] w-full bg-border" />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <AuthInputField
            name="email"
            placeholder="Email"
            inputType="email"
            formControl={form.control}
          />
          <PasswordInputField
            name="password"
            placeholder="Password"
            formControl={form.control}
          />
          <div className="flex w-full items-center justify-end text-sm">
            <button
              type="button"
              // href="/forgot-password"
              className="text-sm font-medium text-primary underline"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>
          <div className="flex w-full items-center justify-center">
            <ReCAPTCHA
              sitekey={
                (process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY as string) || ""
              }
              ref={recaptchaRef}
              onChange={handleChange}
              onExpired={handleExpired}
            />
          </div>
          <Button
            disabled={!isVerified}
            size="lg"
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Form>
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="text-sm">Don&apos;t have an account?</span>
        <Link
          href="/signup"
          className="text-sm font-medium text-primary underline"
        >
          Sign Up
        </Link>
      </div>
      <div className="mt-[16px] min-w-[320px] max-w-[320px]">
        <p className="text-xs leading-[20px] text-muted-foreground">
          By clicking on Login, Continue With Google or Continue With Facebook,
          I state that I have read and understood the
          <Link
            href="/legal/terms-and-conditions"
            className="font-bold text-primary underline"
          >
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/legal/privacy-policy"
            className="font-bold text-primary underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
