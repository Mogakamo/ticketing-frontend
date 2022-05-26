import { data } from 'autoprefixer'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import sendSms from '../utils/sms'

const Dashboard = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    getTickets()
  }, [session])

  const getTickets = async () => {
    try {
      setLoading(true)
      let { data, error, status } = await supabase.from('tickets').select('*')

      if (data) {
        setTickets(data)
        console.log(data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const selectTicket = () => {
    sendSms()
  }

  return (
    <div className='flex items-center flex-col container'>
      <h1>Tickets</h1>
      <div className='bg-gray-500 p-10'>
      {tickets.map((ticket)=> {
        return (
          <div className='flex '>
          <h1>Ticket id: {ticket.id}</h1>
          {/* <h1>Ticket phone number: {ticket.phone}</h1> */}
          <button onClick={() => selectTicket()}>Select Ticket</button>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Dashboard
