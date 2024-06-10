import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const nodemailer = require("nodemailer");
async function sendEmailToTargetLikers(targetId: number, locationId: number) {
    try {
        const likedUsers = await prisma.targetsOnUsers.findMany({
            where: { targetId },
            include: { user: true, target: true },
        });

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'pysstektormailer@gmail.com',
                pass: 'qncy jugl jezh dild ',
            },
        });

        for (const { user, target } of likedUsers) {
            const mailOptions = {
                from: 'pysstektormailer@gmail.com',
                to: user.email,
                subject: 'Nowe zgłoszenie dla ' + target.name,
                html: `Witaj, <br> pojawiło się nowe zgłoszenie ${target.name}.<br>Zobacze je klikając w ten <a href="http://localhost:5173/reports/${locationId}">link</a><br<Z poważaniem<br>Zespół Pysstektor`,
            };

            await transporter.sendMail(mailOptions);
        }

        console.log('Emails sent successfully');
    } catch (error) {
        console.error('Error sending emails:', error);
    }
}

export default sendEmailToTargetLikers;