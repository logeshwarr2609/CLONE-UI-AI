import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

async function generateUIDesign(prompt) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
            model: 'gpt-4', // Use the appropriate model
        });

        const output = completion.choices[0].message.content.trim();
        const [html, css] = output.split('\n\n');

        return { html, css };
    } catch (error) {
        console.error('Error generating UI design:', error);
        return { html: '<p>Error generating design.</p>', css: '' };
    }
}

app.post('/generate-design', async (req, res) => {
    const userPrompt = req.body.prompt;
    if (!userPrompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    const design = await generateUIDesign(userPrompt);
    res.json(design);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
