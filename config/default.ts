const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

export default {
    port:3000,
    dbUri:`mongodb+srv://${dbUser}:${dbPassword}@cluster0.efml95k.mongodb.net/api_quiz_login?retryWrites=true&w=majority`,
    token: process.env.TOKEN
}