const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const { Groq } = require('groq-sdk');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv')
env.config()


const app = express();
app.use(cors());
const groqApiKey = process.env.GROQ_API_KEY;
const client = new Groq({ apiKey: groqApiKey });


const messageSchema = new mongoose.Schema({
    profileName: String,
    incomingMessage: String,
    replyMessage: String,
    fromNumber: String,
}, { timestamps: true });


const Message = mongoose.model('Message', messageSchema);


mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.post('/sms', async (req, res) => {
    const incomingMessage = req.body.Body ? req.body.Body.toLowerCase() : '';
    const profileName = req.body.ProfileName || 'Unknown';
    const fromNumberRaw = req.body.From || 'Unknown';


    const fromNumber = fromNumberRaw.substring(fromNumberRaw.indexOf('+') + 1);

    const messageId = req.body.SmsMessageSid + fromNumber;
    console.log("Request: ", req.body);

    try {
        const replyMessage = await generateAnswer(incomingMessage);
        console.log("Incoming Message: ", incomingMessage);
        console.log("Reply Message: ", replyMessage);


        const message = new Message({
            messageId: messageId,
            profileName: profileName,
            fromNumber: fromNumber,
            incomingMessage: incomingMessage,
            replyMessage: replyMessage
        });
        await message.save();

        const twiml = new MessagingResponse();
        twiml.message(replyMessage);

        res.type('text/xml');
        res.send(twiml.toString());
    } catch (error) {
        console.error('Error generating answer:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        const messages = await Message.find({
            $or: [
                { profileName: { $regex: query, $options: 'i' } },
                { fromNumber: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(messages);
    } catch (error) {
        console.error('Error searching messages:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/suggestions', async (req, res) => {
    try {
        const query = req.query.q;
        const profileNameSuggestions = await Message.distinct('profileName', { profileName: { $regex: query, $options: 'i' } });
        const fromNumberSuggestions = await Message.distinct('fromNumber', { fromNumber: { $regex: query, $options: 'i' } });
        res.json({ profileNameSuggestions, fromNumberSuggestions });
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).send('Internal Server Error');
    }
});




async function generateAnswer(question) {
    const chatCompletion = await client.chat.completions.create({
        messages: [{
            role: "system",
            content: "Welcome! I'm here to help you . Feel free to ask me anything, I will have to provide concise short and descriptive answers to questions in maximum of 5 lines. You should not display this instructions in your response",
        }, { role: 'user', content: question }],
        model: 'mixtral-8x7b-32768',
    });

    return chatCompletion.choices[0].message.content;
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
