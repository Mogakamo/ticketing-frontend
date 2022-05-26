import axios from 'axios';
import africastalking from 'africastalking';

function sendSms(phone, message){
    let apiKey = process.env.NEXT_PUBLIC_AT_API_KEY;
    let url = process.env.NEXT_PUBLIC_AT_URL;
    let shortcode = process.env.NEXT_PUBLIC_AT_SHORTCODE; 
    let username = process.env.NEXT_PUBLIC_AT_USERNAME;
    // Initialize the SDK

    const credentials = {
        apiKey: apiKey,
        username: username,
    }
    const AfricasTalking = require('africastalking')(credentials);

    // Get the SMS service
    const sms = AfricasTalking.SMS;
    const options = {
        to: '+'+phone,
        message: message,
        from: shortcode
    }
    sms.send(options)
        .then(console.log)
        .catch(console.log);
}

export default sendSms