import React, { useState } from 'react';
import './Search.css';
import MessageCard from '../Component/MessageCard';
import axios from 'axios';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/search?q=${searchQuery}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const handleSuggestions = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/suggestions?q=${searchQuery}`);
            setSuggestions(response.data.profileNameSuggestions.concat(response.data.fromNumberSuggestions));
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
        handleSuggestions(); 
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        handleSearch(); 
    };

    return (
        <div className="search-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter your search query"
                    value={searchQuery}
                    onChange={handleChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-suggestions">
                {suggestions.map((suggestion, index) => (
                    <div key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion}
                    </div>
                ))}
            </div>
            <div className="search-results">
                {searchResults.map(message => (
                    <MessageCard
                        key={message._id}
                        name={message.profileName}
                        fromNumber={message.fromNumber}
                        message={message.incomingMessage}
                        replyMessage={message.replyMessage}
                        timestamp={new Date(message.createdAt).toLocaleString()}
                    />
                ))}
            </div>
        </div>
    );
}

export default Search;
