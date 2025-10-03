import "server-only";
import * as sgMail from "@sendgrid/mail";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  const data = await request.json();

  sgMail.setApiKey(env.SENDGRID_API_KEY);

  let msg: sgMail.MailDataRequired = {
    to: data.to,
    from: env.TRACECORK_EMAIL, // Use the email address or domain you verified above
    templateId: data.templateId,
  };

  if (data.attachments !== undefined) {
    msg = {
      ...msg,
      personalizations: [
        {
          to: [{ email: data.to }],
          dynamicTemplateData: data.dynamicTemplateData,
        },
      ],
      attachments: data.attachments,
    };
  } else {
    msg = {
      ...msg,
      personalizations: [
        {
          to: [{ email: data.to }],
          dynamicTemplateData: data.dynamicTemplateData,
        },
      ],
    };
  }

  await sgMail.send(msg);

  return Response.json({
    success: true,
  });
}
