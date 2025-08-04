import * as sgMail from "@sendgrid/mail";
import {
  NEXT_PUBLIC_SENDGRID_API_KEY,
  NEXT_PUBLIC_TRACECORK_EMAIL,
} from "@/data/env-constants";

export async function POST(request: Request) {
  const data = await request.json();

  sgMail.setApiKey(NEXT_PUBLIC_SENDGRID_API_KEY as string);

  let msg: sgMail.MailDataRequired = {
    to: data.to,
    from: NEXT_PUBLIC_TRACECORK_EMAIL as string, // Use the email address or domain you verified above
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
