import { render, screen } from "@testing-library/react";
import ImgCard from "../components/ImgCard";

describe("ImgCard", () => {
  test("renders with correct image source", () => {
    const ship = {
      name: "",
      url: "https://swapi.dev/api/starships/2/",
      films: ["film1", "film2"],
      model: "Model A",
    };
    const maxNumberFilms = 2;
    const setIsOpen = jest.fn();
    const setFilms = jest.fn();
    const setCurrentShip = jest.fn();

    render(
      <ImgCard
        ship={ship}
        maxNumberFilms={maxNumberFilms}
        setIsOpen={setIsOpen}
        setFilms={setFilms}
        setCurrentShip={setCurrentShip}
      />
    );

    const imgElement = screen.getByAltText(ship.name);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toBe(
      "https://starwars-visualguide.com/assets/img/starships/2.jpg"
    );
  });
  test("renders with correct ship name and film details when films length matches maxNumberFilms", () => {
    const ship = {
      name: "Starship",
      url: "https://swapi.dev/api/starships/2/",
      films: ["film1", "film2"],
      model: "Model A",
    };
    const maxNumberFilms = 2;
    const setIsOpen = jest.fn();
    const setFilms = jest.fn();
    const setCurrentShip = jest.fn();
    render(
      <ImgCard
        ship={ship}
        maxNumberFilms={maxNumberFilms}
        setIsOpen={setIsOpen}
        setFilms={setFilms}
        setCurrentShip={setCurrentShip}
      />
    );

    const shipNameElement = screen.getByText(ship.name);
    const filmDetailsElement = screen.getByText(
      `No. of films: ${ship.films.length}`
    );

    expect(shipNameElement).toBeInTheDocument();
    expect(filmDetailsElement).toBeInTheDocument();

    const trophyAnimationElement = screen.getByText("🏆");
    expect(trophyAnimationElement).toBeInTheDocument();
  });
});
