import React from "react";
import { render, screen } from "@testing-library/react";
import ImgCardStrip from "../components/ImgCardStrip";

describe("ImgCardStrip", () => {
  it("renders film details correctly", () => {
    const film = {
      url: "https://swapi.dev/api/films/1/",
      title: "Film 1",
      opening_crawl: "Lorem ipsum dolor sit amet",
      director: "Director 1",
      release_date: "2023-01-01",
    };

    render(<ImgCardStrip film={film} />);

    // Assert the presence of film details
    const titleElement = screen.getByText("Film 1");
    const descriptionElement = screen.getByText("Lorem ipsum dolor sit amet");
    const directorElement = screen.getByText("Director 1");
    const releaseDateElement = screen.getByText("2023-01-01");

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(directorElement).toBeInTheDocument();
    expect(releaseDateElement).toBeInTheDocument();

    // Assert the correct image source
    const imageElement = screen.getByAltText("Film 1");
    expect(imageElement).toHaveAttribute(
      "src",
      "https://starwars-visualguide.com/assets/img/films/1.jpg"
    );
  });
});
