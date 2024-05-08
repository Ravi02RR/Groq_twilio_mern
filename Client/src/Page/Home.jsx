import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageCard from '../Component/MessageCard';
import './Home.css';


const Home = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://api-ravi02rrs-projects.vercel.app/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <>
      <div className="message-list">
        <h1 className='test'><a target='blank' href="http://wa.me/+14155238886?text=join%20sing-grass">Testhere*</a> </h1>
        {messages.map(message => (
          <MessageCard
            key={message._id}
            name={message.profileName}
            fromNumber={message.fromNumber}
            message={message.incomingMessage}
            replyMessage={message.replyMessage}

          />
        ))}
      </div>
    </>
  )
}

export default Home