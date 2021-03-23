import { createTransport } from "nodemailer";

const transport = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});


interface MailResponse {
    message: string;
}

const makeEmail = (text: string): string => {
    return `
        <div style="
            border: 1px solid black;
            padding: 20px;
            font-family: "sans-serif";
            line-height: 2;
            font-size: 20px;
            ">
            <h2>Hello There!</h2>
            <p>${text}</p>
            <p>By!</p>
        </div>
    `
}

export const sendPassWordResetMail = async (resetToken: string, to: string): Promise<void> => {
    const info =  await transport.sendMail({
        to,
        from: 'test@example.com',
        subject: 'Password reset',
        html: makeEmail(`Your password reset token is here
        
            <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset your password</a>
        `)
    }) as MailResponse;
}
