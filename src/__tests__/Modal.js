import { render, waitFor, screen, act, shallow } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../components/Modal";
import React from "react";
import { get } from "../services/api";

describe("Modal", () => {
  const setIsOpen = jest.fn();
  const films = ["/films/1", "/films/2", "/films/3"];
  const currentShip = "Starship";

  test("renders with correct heading", () => {
    const filmsData = [
      {
        title: "Film 1",
        opening_crawl: "Lorem ipsum dolor sit amet",
        director: "Director 1",
        release_date: "2023-01-01",
        url: "/films/1",
      },
    ];
    const isLoading = true;
    render(
      <Modal
        setIsOpen={setIsOpen}
        films={films}
        currentShip={currentShip}
        filmsData={filmsData}
        isLoading={isLoading}
      />
    );
    const headingElement = screen.getByRole("heading", {
      name: "Starship involved Films",
    });
    expect(headingElement).toBeInTheDocument();
  });
  test("renders with Loading text", () => {
    const isLoading = true;
    render(
      <Modal
        setIsOpen={setIsOpen}
        films={films}
        currentShip={currentShip}
        filmsData={[]}
        isLoading={isLoading}
      />
    );
    const LoadingElement = screen.getByText("Loading...");
    expect(LoadingElement).toBeInTheDocument();
  });
});
