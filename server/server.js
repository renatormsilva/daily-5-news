const express = require("express");
const cors = require("cors");
const cron = require('node-cron');
const pageDataController = require('./src/controllers/pageDataController');

app.use(express.json()); 
app.use(cors()); 
const PORT = 8080;
const app = express();

cron.schedule('0 */12 * * *', async () => {
    try {
        const data = await pageDataController(selectorData);
        console.log('Data fetched successfully:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

app.post("/api", async (req, res) => {
    try {
        const { username, newsSource, telegramCheck } = req.body;

        let selectorData;
        switch (newsSource) {
            case 'O Globo':
                selectorData = {
                    newsUrl: "https://oglobo.globo.com/ultimas-noticias/",
                    urlSelector: ".feed-post-link > a",
                    titleSelector: ".content-head__title",
                    contentSelector: ".content-text__container",
                    username,
                    telegramCheck
                };
                break;
            case 'G1':
                selectorData = {
                    newsUrl: "https://g1.globo.com/ultimas-noticias/",
                    urlSelector: ".feed-post-link",
                    titleSelector: ".content-head__title",
                    contentSelector: ".content-text__container",
                    username,
                    telegramCheck
                };
                break;
            case 'CBN':
                selectorData = {
                    newsUrl: "https://cbn.globo.com/",
                    urlSelector: ".feed-post-link > a",
                    titleSelector: ".content-head__title",
                    contentSelector: ".content-text__container",
                    username,
                    telegramCheck
                };
                break;
            default:
                throw new Error('Invalid news source');
        }

        const data = await pageDataController(selectorData);
        
        res.json({ message: data });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});