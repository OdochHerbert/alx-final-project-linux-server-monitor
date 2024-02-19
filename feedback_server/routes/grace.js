const express=require('express')
const router=express.Router()
const session=require('express-session')
//Post Model
const Email=require('../models/email')

//Posting information
router.get('/',(req,res)=>{
res.send('alive')
})
router.post('/send-email', (req, res) => { 
     console.log(req)
    const emailer = new Email();
    let d = new Date();
    emailer.name = req.body.name;
    emailer.email = req.body.email;
    emailer.msg = req.body.message;
    emailer.date = d.getDate();
    console.log(emailer)
  
    emailer.save()
      .then(() => {
        console.log(emailer);
        res.send('done');
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
  });
router.get('/api/messages', async (req, res) => {
  try {
    const messages = await Email.find().sort({ createdAt: -1 }).limit(3);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
router.post('/send-emailer', async (req, res) => {
    const { email, subject, message } = req.body;

    // Send email
    await transporter.sendMail({
        from: 'your-email@gmail.com',
        to: email,
        subject: subject,
        text: message
    });

    res.send('Email sent successfully');
});

module.exports=router
