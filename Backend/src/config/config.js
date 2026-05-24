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

    LLM_PROVIDER: process.env.LLM_PROVIDER,
    EMBEDDING_PROVIDER: process.env.EMBEDDING_PROVIDER,

    GROQ: {
        API_KEY: process.env.GROQ_API_KEY,
        MODEL: process.env.GROQ_MODEL,
    },

    GOOGLE: {
        API_KEY: process.env.GOOGLE_API_KEY,
        MODEL: process.env.GOOGLE_MODEL,
        EMBEDDING_MODEL: process.env.GOOGLE_EMBEDDING_MODEL,
    },
    
}

export default CONFIG;