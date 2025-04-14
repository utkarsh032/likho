import { config } from 'dotenv'

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, MONGODB_URI, SERVER_URL, NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN } = process.env