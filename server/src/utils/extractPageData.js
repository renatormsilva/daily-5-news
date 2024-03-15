async function extractPageData(page, url, selectorData) {
    await page.goto(url, { timeout: 90000 });

    const pageData = await page.evaluate((selectorData) => {
        const title = document.querySelector(selectorData.titleSelector).innerText;
        const contentElements = document.querySelectorAll(selectorData.contentSelector);
       
        let content = '';
        let count = 0;
        contentElements.forEach(element => {
            if (count < 4) {
                content += element.innerText;
                count++;
            }
        });
        return { title, content };
    }, selectorData); 

    return pageData;
}

module.exports = extractPageData;

