import { useEffect, useState } from "react";
import "./App.css";
import DateNavigation from "../components/DateNavigation";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNasaData = async () => {
      setIsLoading(true);
      try {
        // prova a fare una fetch
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${
            import.meta.env.VITE_NASA_API_KEY
          }&date=${formatDate(currentDate)}`
        );
        // se la response non è andata ok
        if (!response.ok) {
          // allora mostra il perché no
          throw new Error(`qualcosa è andato storto: ${response.status}`);
        }
        // sennò, estrai il body response (i dati veri e propri)
        let responseData = await response.json();
        // e assegnali allo stato che ho chiamato 'data'
        setData(responseData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNasaData();
  }, [currentDate]);

  console.log(currentDate);
  return (
    <>
      <div>{isLoading ? <h2>Is Loading...</h2> : <h2>{data.title}</h2>}</div>
      <DateNavigation setCurrentDate={setCurrentDate} />
    </>
  );
}

export default App;

function formatDate(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month; // Adding leading zero for single digit months
  }
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day; // Adding leading zero for single digit days
  }
  return `${year}-${month}-${day}`;
}
