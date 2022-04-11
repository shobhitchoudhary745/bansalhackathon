const sg=require('@sendgrid/mail')
const api=process.env.API
sg.setApiKey(api)

const sendWelcomeEmail=(email,name)=>{
    sg.send({
        to:email,
        from:'coding.souls@sdbc.ac.in',
        subject:'For joining coding soul',
        html:`<p>You are Registered Successfully. please attach your college I'd and payment receipt to:<br/>Email:anmolagrawal873@gmail.com<br/><br/>For any other query contact us at: 9131399266</p><h3>Thanks and regards!</h3><p>Team coding souls.`
     }) 
}

module.exports = {sendWelcomeEmail}
