import * as sgMail from "@sendgrid/mail";
import { ActionCodeSettings } from "firebase-admin/auth";
import { emailTemplates } from "@/data/email-templates";
import {
  NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SENDGRID_API_KEY,
  NEXT_PUBLIC_TRACECORK_EMAIL,
} from "@/data/env-constants";
import { adminAuth, initAdmin } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  await initAdmin();

  const data = await request.json();

  sgMail.setApiKey(NEXT_PUBLIC_SENDGRID_API_KEY as string);

  const baseUrl = NEXT_PUBLIC_APP_URL + "/confirm-email";

  const actionCodeSettings: ActionCodeSettings = {
    url: baseUrl,
    handleCodeInApp: true,
  };

  const url = await adminAuth.generateEmailVerificationLink(
    data.email as string,
    actionCodeSettings,
  );

  const params = url.split("?")[1];
  const verificationUrl = `${baseUrl}?${params}`;

  const msg: sgMail.MailDataRequired = {
    to: data.email,
    from: NEXT_PUBLIC_TRACECORK_EMAIL, // Use the email address or domain you verified above
    templateId: emailTemplates["confirmation-email"],
    personalizations: [
      {
        to: [{ email: data.email }],
        dynamicTemplateData: {
          verificationUrl,
        },
      },
    ],
  };

  await sgMail.send(msg);

  return Response.json({
    success: true,
  });
}
