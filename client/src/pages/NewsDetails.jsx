
import './NewsDetails.css'
function NewsDetails({values, allData, onClose}) {
    return (
        <div className="news-container">
            <button className="button-close" onClick={onClose}>
                    X
            </button>
           <div className="news-content">
            <h1>Bem vindo, {values.username}</h1>
            <h4>5 melhores notíciais do portal: {values.newsSource}</h4>
            <div className='article-container'>
              {allData && allData.message.map((item, index) => (
                <div className="description-container" key={index}>
                  <p className="description-title">{item.title}</p>
                  <p className='description-content'>{item.summary.text}</p>
                  <p className='description-content-sen'>Análise de sentimento: {item.summary.sentimentScore}</p>
                </div>
              ))}
            </div>
        
           </div>
        </div>
      );
};
    
export default NewsDetails;
