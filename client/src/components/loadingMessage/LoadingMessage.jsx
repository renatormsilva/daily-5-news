import React, { useState, useEffect } from 'react';
import './loadingMessage.css'; 
import ClipLoader from "react-spinners/ClipLoader";

const LoadingMessage = () => {
    let [color, setColor] = useState("#fffff");
    const override= {
        display: "block",
        margin: "0 auto",
        borderColor: color,
    };

    const phrases = ['Carregando...', 'Salvando os seus dados...', 'Buscando as melhores notícias...', 'Preparando o resumo...', 'Aplicando inteligencia artificial...', 'Quase lá...', 'Aplicando a análise de sentimento...', 'Enviando mensagem ao Telegram...'];
    const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='spinner'>
        <div className="loading-message">
            <p className="fade-in-out">{phrases[index]}</p>
        </div>
        <ClipLoader
            color={color}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
  );
};

export default LoadingMessage;
