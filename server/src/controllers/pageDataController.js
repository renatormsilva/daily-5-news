const puppeteer = require('puppeteer');
const extractMainUrls = require('../utils/extractMainUrls')
const extractPageData = require('../utils/extractPageData');
const generateResponses = require('../utils/openAiApi');

const PAGE_TIMEOUT = 900000;

const pageDataController = async (selectorData) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(selectorData.newsUrl, {timeout: PAGE_TIMEOUT });
        const mainUrls = await extractMainUrls(page, selectorData);   
        console.log(mainUrls);
        const pageDataArray = [];
        for (const url of mainUrls) {
            const pageData = await extractPageData(page, url, selectorData);
            pageDataArray.push(pageData);
        } 

        const summarys = await generateResponses(pageDataArray, selectorData);

        for (let i = 0; i < summarys.length; i++) {
            summarys[i].text = summarys[i].text.trim();
        }

        for (let i = 0; i < pageDataArray.length; i++) {
            pageDataArray[i].summary = summarys[i]; 
        }

        return pageDataArray
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await browser.close();
    }
};

module.exports = pageDataController;
