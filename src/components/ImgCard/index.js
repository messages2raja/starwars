import { useState } from "react";
import { getUrlId } from "../../Utils/getUrlId";
import "./styles.scss";
import FALLBACK_IMAGE from "../../images/no-image.png";
export default function ImgCard({
  ship,
  maxNumberFilms,
  setIsOpen,
  setFilms,
  setCurrentShip,
}) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  const imageUrl = `https://starwars-visualguide.com/assets/img/starships/${getUrlId(
    ship.url
  )}.jpg`;
  return (
    <div className="card">
      <img
        src={imageError ? FALLBACK_IMAGE : imageUrl}
        onError={handleImageError}
        alt={ship.name}
      />
      <div className="cardContent">
        <h4>
          {ship.name}
          {ship.films.length === maxNumberFilms && (
            <span className="trophy-animation">🏆</span>
          )}
        </h4>
        <p>Model: {ship.model}</p>
        <p>No. of films: {ship.films.length}</p>
        <button
          onClick={() => {
            setIsOpen(true);
            setFilms(ship.films);
            setCurrentShip(ship.name);
          }}
        >
          View Film details
        </button>
      </div>
    </div>
  );
}
