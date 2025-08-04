import { useCallback, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { sendRecaptchaService } from "../services";

interface useCaptchaProps {
  synchWithFormState: () => void;
}

export const useCaptcha = ({ synchWithFormState }: useCaptchaProps) => {
  const recaptchaRef = useRef<typeof ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleExpired = () => {
    setIsVerified(false);
  };

  const handleCaptchaSubmission = useCallback(async (token: string | null) => {
    try {
      if (!token) return;
      await sendRecaptchaService(token);
      setIsVerified(true);
    } catch (e) {
      setIsVerified(false);
    }
  }, []);

  const handleChange = useCallback((token: string | null) => {
    handleCaptchaSubmission(token);
    try {
      // Synchronize the form state with the captcha state
      synchWithFormState();
    } catch (e) {
      return;
    }
  }, []);

  return { recaptchaRef, isVerified, handleExpired, handleChange };
};
