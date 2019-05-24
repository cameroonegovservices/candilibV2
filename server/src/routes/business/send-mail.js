import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import { htmlToText } from 'nodemailer-html-to-text'

import getMailData from './message-templates'
import config, { smtpOptions } from '../../config'
import { appLogger, techLogger } from '../../util'

export const sendMail = async (
  to,
  { subject, content: html },
  fileAttachement
) => {
  const transporter = nodemailer.createTransport(smtpTransport(smtpOptions))

  transporter.use('compile', htmlToText())

  const mailOptions = {
    from: config.mailFrom,
    to,
    subject,
    html,
  }

  if (fileAttachement) {
    mailOptions.attachments = [
      {
        filename: fileAttachement.fileName,
        content: fileAttachement.buffer,
        contentType: 'application/pdf',
      },
    ]
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    appLogger.info('Mail sent: ' + info.response)
  } catch (error) {
    techLogger.error(error)
    throw error
  } finally {
    transporter.close()
  }
}

export const sendMailToAccount = async (candidat, flag) => {
  const message = await getMailData(candidat, flag)
  return sendMail(candidat.email, message)
}

export const sendMagicLink = async (candidat, token) => {
  const flag = 'CHECK_OK'
  const authUrl = `${config.PUBLIC_URL}${config.CANDIDAT_ROUTE}`

  const url = `${authUrl}?token=${encodeURIComponent(token)}&redirect=calendar`

  const message = await getMailData(candidat, flag, url)
  return sendMail(candidat.email, message)
}
