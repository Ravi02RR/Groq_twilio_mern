// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MessageCard.css';

const MessageCard = ({ name, fromNumber, message, replyMessage }) => {
    const [userExpanded, setUserExpanded] = useState(false);
    const [botExpanded, setBotExpanded] = useState(false);

    const toggleUserExpanded = () => {
        setUserExpanded(!userExpanded);
    };

    const toggleBotExpanded = () => {
        setBotExpanded(!botExpanded);
    };

    const sliceMessage = (msg) => {
        return typeof msg === 'string' ? (msg.length > 100 ? `${msg.slice(0, 100)}...` : msg) : msg;
    };

    return (
        <div className="message-card">
            <div className="message-header">
                <h3>Name: {name}</h3>
                <p>From: {fromNumber}</p>
            </div>
            <div className="message-content">
                {message && (
                    <p className="user-message">
                        <strong>{name}:</strong> {userExpanded ? message : sliceMessage(message)}
                        {!userExpanded && message.length > 100 && (
                            <span onClick={toggleUserExpanded} className="read-more-btn">Read More</span>
                        )}
                    </p>
                )}
                {replyMessage && (
                    <p className="bot-message">
                        <strong>Bot:</strong> {botExpanded ? replyMessage : sliceMessage(replyMessage)}
                        {!botExpanded && replyMessage.length > 100 && (
                            <span onClick={toggleBotExpanded} className="read-more-btn">Read More</span>
                        )}
                    </p>
                )}
            </div>
        </div>
    );
};

MessageCard.propTypes = {
    name: PropTypes.string.isRequired,
    fromNumber: PropTypes.string.isRequired,
    message: PropTypes.string,
    replyMessage: PropTypes.string.isRequired,
};

export default MessageCard;
