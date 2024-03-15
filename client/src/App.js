import { useState } from "react";
import "./App.css";
import FormInput from "./components/forminput/Forminput"
import NewsDetails from './pages/NewsDetails'
import LoadingMessage from "./components/loadingMessage/LoadingMessage";

const App = () => {
  const [values, setValues] = useState({
    username: "",
    newsSource: "G1",
    telegramCheck: "sim"
  });

  const [loading, setLoading] = useState(false);

  const [allData, setAllData] = useState();

  const [showInfo, setShowInfo] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Nome Completo",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "newsSource",
      type: "select",
      placeholder: "Select a news source",
      label: "Selecione o Jornal desejado",
      options: ["G1", "O Globo", "CBN"],
      required: true,
    },
    {
      id: 3,
      name: "telegramCheck",
      type: "select",
      placeholder: "Select a Telegram check",
      label: "Você deseja receber as notícias no seu telegram ?",
      options: ["SIM", "NAO"],
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const telegramCheck = formData.get('telegramCheck');
    const telegramCheckBoolean = (telegramCheck === "SIM");
    const newValues = {
      username: values.username,
      newsSource: values.newsSource,
      telegramCheck: telegramCheckBoolean
    };
  
    setValues(newValues);

    try {
      const response = await fetch('http://localhost:8080/api', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newValues)
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Response from backend:', data);
          setAllData(data);
          setShowInfo(true);
      } else {
          console.error('Failed to fetch data:', response.statusText);
          // Lidar com falha na resposta
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }  finally {
        setLoading(false);
    }
  
  };

  const handleClose = () => {
    setShowInfo(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  if(!showInfo) {
    return (
      <div className="app">
        {
          loading ? 
            <>
              <LoadingMessage/>
            </>
          : 
          <form onSubmit={handleSubmit}>
            <h1>Principais Notícias</h1>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button className="submit-button">Enviar</button>
          </form>
        }
      </div>
    );
  } else {
    return (
      <div className="app">
        <NewsDetails values={values} allData={allData} onClose={handleClose}/>
      </div>
    )
  }

  
};

export default App;
