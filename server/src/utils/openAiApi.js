const { text } = require('express');
const OpenAI = require('openai');
const Sentiment = require('sentiment'); // Importa a biblioteca de análise de sentimento
const config = require('../../config');
const sendMessage = require('../utils/telegraf');
const formatMessage = require('../utils/formatMessage'); 
const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY
});

const sentiment = new Sentiment(); 

async function generateResponses(pageDataArray, selectorData) {
    const summaries = [];
    for (const data of pageDataArray) {
        const summary = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct', 
            prompt: "Resumo do texto abaixo: " + data.content,
            max_tokens: 200
        });
        const summaryText = summary.choices[0].text;
        const sentimentScore = sentiment.analyze(summaryText).score;
        summaries.push({ text: summaryText, sentimentScore }); 

        const formattedMessage = await formatMessage(data, summaryText);

        
        await sendMessage(formattedMessage, selectorData);
    }

    summaries.sort((a, b) => b.sentimentScore - a.sentimentScore);
    
    return summaries;
    
}
module.exports = generateResponses;