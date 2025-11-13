import nodemailer from "nodemailer";
import { env } from "@/lib/env";

export type CommentNotificationPayload = {
  type: "created" | "updated";
  pageId: string;
  elementLabel?: string | null;
  commentId: string;
  authorFullName: string;
  commentBody: string;
  linkUrl?: string | null;
  status: string;
  editorName?: string;
  historySummary?: string;
};

function getSmtpTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_SECURITY } = env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    console.warn("SMTP configuration incomplete. Skipping email notification.");
    return null;
  }

  const portNumber = Number(SMTP_PORT);
  if (Number.isNaN(portNumber)) {
    console.warn("Invalid SMTP_PORT value. Expected numeric string.");
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: portNumber,
    secure: SMTP_SECURITY?.toLowerCase() === "ssl" || portNumber === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });
}

const transporter = getSmtpTransport();

export async function sendCommentNotification(payload: CommentNotificationPayload) {
  if (!transporter) return false;

  if (!env.COMMENTS_NOTIFY_TO) {
    console.warn("COMMENTS_NOTIFY_TO not set. Skipping email notification.");
    return false;
  }

  const recipients = env.COMMENTS_NOTIFY_TO.split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    console.warn("COMMENTS_NOTIFY_TO empty after parsing. Skipping email notification.");
    return false;
  }

  const subjectPrefix = payload.type === "created" ? "Nuevo comentario" : "Comentario actualizado";
  const elementInfo = payload.elementLabel ? `Sección: ${payload.elementLabel}\n` : "";
  const history = payload.historySummary ? `\nHistorial reciente:\n${payload.historySummary}` : "";
  const editorInfo = payload.editorName ? `Editado por: ${payload.editorName}\n` : "";
  const linkLine = payload.linkUrl ? `Enlace: ${payload.linkUrl}\n` : "";

  const textBody = [
    `${subjectPrefix} en la página ${payload.pageId}`,
    "",
    `${elementInfo}Estado: ${payload.status}`,
    `Autor del comentario: ${payload.authorFullName}`,
    editorInfo,
    linkLine,
    "Comentario:",
    payload.commentBody,
    history,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await transporter.sendMail({
      from: env.SMTP_USER,
      to: recipients,
      subject: `${subjectPrefix} en ${payload.pageId}`,
      text: textBody,
    });
    return true;
  } catch (error) {
    console.error("Failed to send comment notification email", error);
    return false;
  }
}
