import React, { useCallback, useEffect, useState } from "react";
import "./styles.scss";
import { RiCloseLine } from "react-icons/ri";
import { get } from "../../services/api";
import ImgCardStrip from "../ImgCardStrip";
const Modal = ({ setIsOpen, films, currentShip }) => {
  const [filmsData, setFilmsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Request film data for specific spaceships based on the film id
  const getFilmData = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const response = await get(`/films/${id}`);
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const mapFilmsData = useCallback(async () => {
    if (films === null) {
      setFilmsData([]);
      return;
    }

    const filmDataPromises = films.map((film) => {
      const id = film.split("/").splice(-2, 1)[0];
      return getFilmData(id);
    });
    setFilmsData(await Promise.all(filmDataPromises));
  }, [films, getFilmData]);

  useEffect(() => {
    mapFilmsData();
  }, [mapFilmsData]);

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">{currentShip} involved Films</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
            {!isLoading && filmsData?.length > 0 && (
              <>
                {filmsData
                  .filter((film) => film?.url)
                  .map((film) => (
                    <>
                      <ImgCardStrip key={film.url} film={film} />
                    </>
                  ))}
              </>
            )}

            {isLoading && filmsData.length === 0 && (
              <div className="loader">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
