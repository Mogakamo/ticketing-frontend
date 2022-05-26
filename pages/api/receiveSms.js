import {supabase} from '../../utils/supabaseClient'
import sendSms from '../../utils/sms'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {from, text} = req.body;
        const { data, error } = await supabase
            .from('tickets')
            .select('*')
            .eq('phone', from)
            .eq('resolved', false)

        let tickets = data;
        if (error) {
            console.log(error)
        }else{
            const {data,error} = await supabase
                .from('services')
                .select('*')

            let services =  data
            if(tickets.length > 0){
                console.log(services);
                let selectedService = services.find(service => service.id === parseInt(text))
                const { data, error } = await supabase
                    .from('tickets')
                    .update({ service_id: selectedService.id })
                    .match({ phone: from })
                    .single()
                    
                    let $mes = `Your ticket number is  ${data.id}`;
                    sendSms(from, $mes);
            }else{
            const { data, error } = await supabase
                .from('tickets')
                .insert([
                    { phone: from}
                ])
            let message = "Please select a service:"
            services.forEach((element,index) => {
                message += `\n${index + 1} : ${element.name}`;
            });
            sendSms(from, message);
            }

        }
        res.status(200).json("OK");
    }
  }