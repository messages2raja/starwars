import { useEffect, useState, useCallback } from "react";
import "./App.scss";
import { Header } from "./components/Header";
import { get } from "./services/api";
import Modal from "./components/Modal";
import ImgCard from "./components/ImgCard";
import { sortShipData } from "./Utils/sortShipData";
function App() {
  const [sortedShipData, setSortedShipData] = useState([]);
  const [maxNumberFilms, setMaxNumberFilms] = useState(0);
  const [currentShip, setCurrentShip] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getShipsData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await get(`/starships`);
      const sortedData = sortShipData(response.results);
      setMaxNumberFilms(sortedData.maxFilms);
      setSortedShipData(sortedData.sortedShipData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getShipsData();
  }, [getShipsData]);
  return (
    <div className="App">
      <Header />
      <div className="main">
        <h2>Spaceships</h2>
        <div className="cardLayout">
          {!isLoading &&
            sortedShipData &&
            sortedShipData.map((ship, index) => (
              <ImgCard
                ship={ship}
                maxNumberFilms={maxNumberFilms}
                setIsOpen={setIsOpen}
                setFilms={setFilms}
                key={index}
                setCurrentShip={setCurrentShip}
              />
            ))}
        </div>
        {isLoading && <div className="loader">Loading...</div>}
        {isOpen && (
          <Modal
            setIsOpen={setIsOpen}
            films={films}
            currentShip={currentShip}
          />
        )}
      </div>
    </div>
  );
}

export default App;
