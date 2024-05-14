import { useEffect, useState } from "react";
import "./App.css";
import DateNavigation from "../components/DateNavigation";
import { AnimatePresence, motion } from "framer-motion";

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
  console.log(data);
  return (
    <div>
      <DateNavigation setCurrentDate={setCurrentDate} />
      <div className="tidy-up">
        <AnimatePresence>
          {isLoading ? (
            <motion.img
              src="/8419d4ae13f86f040204f83ed6da3d0d.png"
              alt="is loading"
              className="load"
              key={isLoading}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              // exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          ) : (
            <div>
              <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {data.title}
              </motion.h2>
              <motion.img
                src={data.url}
                alt="nasa_image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {data.explanation}
              </motion.p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
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
