async function formatMessage(data, summaryText) {
    let message = ''; 
    message += `Título: ${data.title}\n\n`;
    message += `Conteudo: ${summaryText}\n\n\n\n`; 
    return message;
}

module.exports = formatMessage;