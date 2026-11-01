import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Students } from './collections/Students'
import { LoginCodes } from './collections/LoginCodes'
import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { migrations } from './migrations'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' – CMS' },
  },
  collections: [Users, Media, Pages, Students, LoginCodes],
  globals: [SiteSettings, Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    // Dev: schema auto-syncs. On a fresh production database set RUN_MIGRATIONS=true so
    // the committed migrations run at startup. Leave unset locally (`pnpm start` on a dev DB).
    prodMigrations: process.env.RUN_MIGRATIONS === 'true' ? migrations : undefined,
  }),
  // English only today. Adding a language later = adding one entry here;
  // fields marked `localized: true` already store per-locale values.
  localization: {
    locales: [{ label: 'English', code: 'en' }],
    defaultLocale: 'en',
    fallback: true,
  },
  // Sends real email when SMTP settings are in .env (e.g. a Gmail account with an app password).
  // Without them, Payload prints emails to the terminal and sign-in codes are logged there for testing.
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER || '',
        defaultFromName: process.env.EMAIL_FROM_NAME || 'ScholarshipHive Edutancy',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 465,
          secure: (Number(process.env.SMTP_PORT) || 465) === 465,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        },
      })
    : undefined,
  sharp,
})
