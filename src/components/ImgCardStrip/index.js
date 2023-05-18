import { getUrlId } from "../../Utils/getUrlId";
import "./styles.scss";
const ImgCardStrip = ({ film }) => {
  return (
    <div className="imgCardStrip">
      <img
        src={`https://starwars-visualguide.com/assets/img/films/${getUrlId(
          film.url
        )}.jpg`}
        alt={film.title}
      />
      <div className="content">
        <h4>{film.title}</h4>
        <p className="description">{film.opening_crawl}</p>
        <i>
          <b>Director: </b>
          {film.director}
        </i>
        <br />
        <i>
          <b>Release date: </b>
          {film.release_date}
        </i>
      </div>
    </div>
  );
};
export default ImgCardStrip;
