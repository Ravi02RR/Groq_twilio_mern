import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageCard from '../Component/MessageCard';


const Home = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const response = await axios.get('https://api-h6rooktcg-ravi02rrs-projects.vercel.app/messages');
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
  
      fetchMessages();
    }, []);
  
  return (
    <div className="message-list">
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
  )
}

export default Home