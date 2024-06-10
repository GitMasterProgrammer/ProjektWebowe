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
                html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Nowe zgłoszenie</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      padding: 20px;
    }
    
    .container {
    border-radius: 20px;
  padding: 30px 40px;
  border: 1px solid black;
  position: relative;
  background-color: ;
  -webkit-box-shadow: -16px 16px 0px 0px black;
  -moz-box-shadow: -16px 16px 0px 0px black;
  box-shadow: -16px 16px 0px 0px black;
    }
    
    h1 {
      color: ;
      
    }
    
    p {
      line-height: 1.5;
    }
    
    a {
      color: #007bff;
      text-decoration: none;
    }
    
        .button-link {
          background-color: #007bff; 
          border: none; 
          color: white; 
          padding: 7px 22px; 
          text-align: center;
          text-decoration: none; 
          display: inline-block; 
          font-size: 16px; 
          border-radius: 5px;
          font-weight:bold;
        }
    
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Nowe zgłoszenie</h1>
    <p>Witaj,<br>pojawiło się nowe zgłoszenie ${target.name}.<br><a class="button-link" href="http://localhost:5173/reports/${locationId}">Zobacz ogłoszenie</a>.<br><br>Z poważaniem<br>Zespół Pysstektor</p>
  </div>
</body>
</html>
`,
            };

            await transporter.sendMail(mailOptions);
        }

        console.log('Emails sent successfully');
    } catch (error) {
        console.error('Error sending emails:', error);
    }
}

export default sendEmailToTargetLikers;