async function extractMainUrls(page, selectorData) {
    await page.waitForSelector(selectorData.urlSelector);
    const mainUrls = await page.evaluate((selectorData) => {
        const urls = [];
        const newsElements = document.querySelectorAll(selectorData.urlSelector);
        newsElements.forEach((news, index) => {
            if (index < 5) {
                urls.push(news.href);
            }
        });
        return urls;
    }, selectorData); 
    return mainUrls;
}

module.exports = extractMainUrls;
