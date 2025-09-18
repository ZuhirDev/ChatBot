import dotenv from 'dotenv';

dotenv.config();

const CONFIG = {
    APP_NAME: process.env.APP_NAME,
    FRONTEND_URL: process.env.FRONTEND_URL,
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,

    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,

    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    MAIL_FROM: process.env.MAIL_FROM,
}

export default CONFIG;