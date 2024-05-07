import { useEffect, useState } from "react";
import "./App.css";
import DateNavigation from "../components/DateNavigation";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNasaData = async () => {
      try {
        // prova a fare una fetch
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${
            import.meta.env.VITE_NASA_API_KEY
          }`
        );
        // se la response non è andata ok
        if (!response.ok) {
          // allora mostra il perché no
          throw new Error(`qualcosa è andato storto: ${response.status}`);
        }
        // sennò, estrai il body response (i dati veri e propri)
        let data = await response.json();
        // e assegnali allo stato che ho chiamato 'data'
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNasaData();
  }, []);

  return (
    <>
      <h1>Hello World</h1>
      <DateNavigation />
    </>
  );
}

export default App;
