const sgMail = require('@sendgrid/mail')

export default async (req, res) => {
    sqMail.setApiKey(process.env.SENDGRID_API_KEY)

    const { email, message } = req.body;

    const content = {
        to: '[rosterboxHQ@gmail.com]',
        from: email,
        subject: `rosterbox newsletter test subject ${email}`,
        text: message,
        html: `<p>${message}</p>`
    }

    try {
        await sgMail.send(content)
        res.status(200).send('Message send success.')
    } catch (error) {
        console.log('ERROR', error)
        res.status(400).send('Message send failure')
    }

    if (!email) {
        return res.status(400).json({ error: 'Email is required' })
    }
}