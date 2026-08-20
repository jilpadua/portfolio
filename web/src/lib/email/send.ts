import nodemailer from 'nodemailer'
import { sanitizeHeaderValue } from '@/lib/email/template'

type MailPayload = {
  subject: string
  text: string
}

function readSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim()
  const portValue = process.env.SMTP_PORT?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASSWORD
  const from = process.env.NOTIFICATION_FROM?.trim()
  const to = process.env.NOTIFICATION_TO?.trim()
  const port = portValue ? Number(portValue) : NaN

  if (!host || !Number.isInteger(port) || port <= 0 || !user || !pass || !from || !to) {
    return null
  }

  return { host, port, user, pass, from, to }
}

export function isSmtpConfigured(): boolean {
  return readSmtpConfig() !== null
}

let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  const config = readSmtpConfig()
  if (!config) return null
  if (transporter) return transporter

  transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  })

  return transporter
}

export async function sendNotificationEmail(payload: MailPayload): Promise<boolean> {
  const config = readSmtpConfig()
  const mailer = getTransporter()
  if (!config || !mailer) return false

  await mailer.sendMail({
    from: sanitizeHeaderValue(config.from),
    to: sanitizeHeaderValue(config.to),
    subject: sanitizeHeaderValue(payload.subject),
    text: payload.text,
  })

  return true
}
