import axios from 'axios';

function sendSms(phone, message){
    let apiKey = NEXT_PUBLIC_AT_API_KEY;
    let url = NEXT_PUBLIC_AT_URL;
    let shortcode = NEXT_PUBLIC_AT_SHORTCODE; 
    let username = NEXT_PUBLIC_AT_USERNAME;

    axios.post({
        method:url,
        data:{
            username,
            to:phone,
            from:shortcode,
            message},
        headers:{
            'apiKey':apiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response=>{
        console.log(response)
    })
    .catch(error=>{
        console.log(error);
    })
}