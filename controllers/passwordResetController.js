const db = require('../models')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const token = crypto.randomBytes(20).toString('hex');
require('dotenv').config();


module.exports = {
    addToken: function(req, res) {
    //   db.PasswordReset
      db.User
        .findOneAndUpdate(
            { username: req.params.username },
            { $set: { 
                passwordResetToken: token,
                passwordResetExp: Date.now() + 360000, 
              }}
            )
        .then((user) => {
            console.log('USER: ', user)
            console.log('RESET BODY: ', req.body)
        
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: `${process.env.EMAIL_ADDRESS}`,
                pass: `${process.env.EMAIL_PASSWORD}`,
                },
              });

            const mailOptions = {
                from: 'SportHabitsTeam@gmail.com',
                to: `${user.email}`,
                subject: 'Password Reset Link',
                text:
                'You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n'
                + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                + `http://sporthabits.com/updatePassword/${req.body.username}/${req.body.passwordResetToken}\n\n`
                + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
              };

            console.log('sending mail', transporter, mailOptions);

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                console.error('there was an error: ', err);
                } else {
                console.log('here is the res: ', response);
                res.status(200).json('recovery email sent');
                }
              });
            // } else {
            // console.log('no matching emails ')
            // this.setState({
            //     emailError: true,
            //     messageFromServer: '',
            // })
        })
        .catch(err => res.status(422).json(err))
    },
    getToken: function(req, res) {
      db.PasswordReset
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
      }
    
     
}