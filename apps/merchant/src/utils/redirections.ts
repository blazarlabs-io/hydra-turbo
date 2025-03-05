import { useRouter } from "next/navigation";

export class Redirect {
  static toVerifyEmailPage(): void {
    try {
      const path = "/verify-email";
      const router = useRouter();
      router.replace(path);
    } catch (error) {
      console.log(error);
    }
  }
  static toDashboardHomePage(): void {
    try {
      const path = "/dashboard/home";
      const router = useRouter();
      router.replace(path);
    } catch (error) {
      console.log(error);
    }
  }
  static toGetStartedPage(): void {
    try {
      const path = "/verify-email";
      const router = useRouter();
      router.replace(path);
    } catch (error) {
      console.log(error);
    }
  }
  static toLoginPage(): void {
    try {
      const path = "/login";
      const router = useRouter();
      router.replace(path);
    } catch (error) {
      console.log(error);
    }
  }
  static toSignupPage(): void {
    try {
      const path = "/signup";
      const router = useRouter();
      router.replace(path);
    } catch (error) {
      console.log(error);
    }
  }
  static forgotPasswordPage(): void {
    try {
      const path = "/forgot-password";
      const router = useRouter();
      router.replace(path);
    } catch (error) {
      console.log(error);
    }
  }
}
