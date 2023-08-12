import { Resend } from "resend";

export default async function handler(req, res) {
    const body = req.body;
    const resend = new Resend('re_Ym2uwzE4_2AamgU4D8EiDiwXxFGn45UF1');

    if (!body.subject || !body.email || !body.message) {
        return res.status(400).json({
            data: 'All fields are required'
        });
    } else{
        const data = await resend.emails.send({
            from: "Post Verses <hello@mofizul.com>",
            to: body.email,
            subject: "New Message from Post Verses",
            text: body.message,
        });

        // You can only send testing emails to your own email address (mofizul21@gmail.com)
    }

    return res.status(200).json({
        data: 'Form submitted successfully'
    });
}