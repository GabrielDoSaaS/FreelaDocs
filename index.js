require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/lead', async (req, res) => {
    const { lead } = req.body;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
                user: 'diasemterapia@gmail.com',
                pass: process.env.PASS
            }
        });
            
let mailOptions = {
        from: 'diasemterapia@gmail.com',
        to: 'gabrieldosaas@gmail.com',
        subject: 'Lead - Demonstração de interesse',
        text: `Olá o ${lead} tem interesse no FreelaDocs, vc está mais próximo da validação do seu produto!`
};


transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('Erro:', error);
        } else {
                console.log('Email enviado:', info.response);
        }
});

console.log('Lead recebido:', lead);

res.status(200).json({ message: 'Lead recebido com sucesso!' });
} )


app.get('/ping', (req, res) => {
        res.status(200).json({ message: 'pong' });
})


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});