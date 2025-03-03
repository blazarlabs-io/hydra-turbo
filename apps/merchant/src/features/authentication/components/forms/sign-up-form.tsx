"use client";

import { signUpFormSchema, signUpFormProps } from "../../data";
import { auth } from "@/lib/firebase/client";
import { cn } from "@/utils/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@repo/ui/components/ui/button";
import { Form } from "@repo/ui/components/ui/form";
import { SignUpInputField } from "../fields/signup-input-field";
import { SignUpPasswordInputField } from "../fields/signup-password-input-field";
import { toast } from "@repo/ui/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/ui/alert-dialog";
import { useAuth } from "../../context";
import { useCaptcha, useGoogleSignIn } from "../../hooks";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  // * HOOKS
  const router = useRouter();
  const form = useForm<signUpFormProps>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  // * AUTH HOOKS
  const { isGoogleLogin, handleSignInWithGoogle } = useGoogleSignIn();
  const { setUserHandler } = useAuth();
  // This avoid doing validation and showing errors after captcha validation if the input values are not dirty (different from the default values)
  const handleRefreshForm = useCallback(() => {
    try {
      if (form.formState.isDirty) form.trigger();
      return;
    } catch (e) {
      console.error(e);
    }
  }, [form.formState.isDirty]);
  const { recaptchaRef, isVerified, handleExpired, handleChange } = useCaptcha({
    synchWithFormState: handleRefreshForm,
  });

  // * STATES
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // * HANDLERS
  async function onSubmit(values: signUpFormProps) {
    try {
      // Create user with email and password
      setIsSubmitting(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      // Signed in
      const user = userCredential.user;
      await setUserHandler(user);
      const userEmail = user.email ? user.email : values.email;

      // User redirection to validate email
      await sendEmailVerification(user);
      router.replace("/email-verification");
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "error",
        description: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      {showError && (
        <AlertDialog open={true} onOpenChange={(state) => setShowError(state)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Email already exists</AlertDialogTitle>
              <AlertDialogDescription>
                The email you entered is already in use. Please try again with a
                different email or login with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="w-[80px]">Ok</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <div className="mb-4 flex w-full min-w-[360px] max-w-[360px] flex-col gap-3 rounded-[12px]  p-6">
        <h1 className="pb-4 text-center text-2xl font-semibold">
          Your micropayments system is only one sign-up away
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <SignUpInputField
              name="email"
              placeholder="Email"
              inputType="email"
              formControl={form.control as Control<signUpFormProps>}
            />
            <SignUpPasswordInputField
              name="password"
              placeholder="Password"
              formControl={form.control as Control<signUpFormProps>}
            />
            <SignUpPasswordInputField
              name="confirmPassword"
              placeholder="Confirm Password"
              formControl={form.control as Control<signUpFormProps>}
            />
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
              disabled={!isVerified || isSubmitting || !form.formState.isValid}
              size="lg"
              type="submit"
              className="w-full"
            >
              Signup
            </Button>
            <div className="flex items-center justify-center gap-3">
              <p className="text-sm leading-[20px] text-muted-foreground">
                Already have an account?
              </p>
              <Link
                href="/login"
                className="text-sm font-bold text-primary underline"
              >
                Login
              </Link>
            </div>
          </form>
        </Form>
        <div className="flex w-full items-center justify-between gap-4 py-2">
          <div className="h-[1px] w-full bg-border" />
          <span className="min-w-fit">or</span>
          <div className="h-[1px] w-full bg-border" />
        </div>
        <button
          disabled={!isVerified}
          onClick={handleSignInWithGoogle}
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
        </button>
        <div className="mt-[16px]">
          <p className="text-xs leading-[20px] text-muted-foreground">
            By clicking on Sign Up, Continue With Google or Continue With
            Facebook, I state that I have read and understood the
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
    </>
  );
};
