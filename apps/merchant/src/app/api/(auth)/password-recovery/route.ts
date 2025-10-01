import * as sgMail from "@sendgrid/mail";
import { emailTemplates } from "@/utils/";
import { ActionCodeSettings } from "firebase-admin/auth";
import {
  NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SENDGRID_API_KEY,
  NEXT_PUBLIC_TRACECORK_EMAIL,
} from "@/data/env-constants";
import { getAdminAuth, initAdmin } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  await initAdmin();
  const auth = getAdminAuth();

  sgMail.setApiKey(NEXT_PUBLIC_SENDGRID_API_KEY);

  const baseUrl = NEXT_PUBLIC_APP_URL + "/password-reset";

  const actionCodeSettings: ActionCodeSettings = {
    url: baseUrl,
    handleCodeInApp: true,
  };

  const data = await request.json();

  const url = await auth.generatePasswordResetLink(
    data.email,
    actionCodeSettings,
  );

  const params = url.split("?")[1];
  const recoveryLink = `${baseUrl}?${params}`;

  const msg: sgMail.MailDataRequired = {
    to: data.email,
    from: NEXT_PUBLIC_TRACECORK_EMAIL, // Use the email address or domain you verified above
    templateId: emailTemplates["password-recovery"],
    personalizations: [
      {
        to: [{ email: data.email }],
        dynamicTemplateData: {
          recoveryLink,
        },
      },
    ],
  };

  await sgMail.send(msg);

  return Response.json({
    success: true,
  });
}
