import { render, waitFor, screen, act, shallow } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../components/Modal";
import React from "react";
import { get } from "../services/api";
import ImgCardStrip from "../components/ImgCardStrip";

jest.mock("../services/api", () => ({
  get: jest.fn(),
}));

jest.mock("../components/ImgCardStrip", () => jest.fn().mockReturnValue(null));

describe("Modal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders with correct heading", () => {
    const setIsOpen = jest.fn();
    const films = ["/films/1", "/films/2", "/films/3"];
    const currentShip = "Starship";
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
  test("should fetch film data and render film cards", async () => {
    const setIsOpen = jest.fn();
    const films = ["/films/1", "/films/2", "/films/3"];
    const currentShip = "Starship";

    const filmData = [{ url: "film1" }, { url: "film2" }, { url: "film3" }];

    get.mockImplementation(async () => ({ data: filmData }));

    render(
      <Modal setIsOpen={setIsOpen} films={films} currentShip={currentShip} />
    );

    await waitFor(() => {
      expect(get).toHaveBeenCalledTimes(3);
    });
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  test("should render loader when data is loading", () => {
    const setIsOpen = jest.fn();
    const films = ["/films/1", "/films/2", "/films/3"];
    const currentShip = "Starship";

    get.mockImplementation(() => new Promise(() => {}));

    render(
      <Modal setIsOpen={setIsOpen} films={films} currentShip={currentShip} />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(ImgCardStrip).not.toHaveBeenCalled();
  });

  // test("should render loader when films prop is null", () => {
  //   const setIsOpen = jest.fn();
  //   const films = null;
  //   const currentShip = "Starship";

  //   render(
  //     <Modal setIsOpen={setIsOpen} films={films} currentShip={currentShip} />
  //   );

  //   expect(screen.getByText("Loading...")).toBeInTheDocument();
  //   expect(ImgCardStrip).not.toHaveBeenCalled();
  // });
});

// describe("Modal", () => {
//   const setIsOpen = jest.fn();
//   const films = ["/films/1", "/films/2", "/films/3"];
//   const currentShip = "Starship";

//   test("renders with correct heading", () => {
//     const filmsData = [
//       {
//         title: "Film 1",
//         opening_crawl: "Lorem ipsum dolor sit amet",
//         director: "Director 1",
//         release_date: "2023-01-01",
//         url: "/films/1",
//       },
//     ];
//     const isLoading = true;
//     render(
//       <Modal
//         setIsOpen={setIsOpen}
//         films={films}
//         currentShip={currentShip}
//         filmsData={filmsData}
//         isLoading={isLoading}
//       />
//     );
//     const headingElement = screen.getByRole("heading", {
//       name: "Starship involved Films",
//     });
//     expect(headingElement).toBeInTheDocument();
//   });
//   // test("renders with Loading text", async () => {
//   //   const isLoading = true;
//   //   const filmsData = [
//   //     {
//   //       title: "Film 1",
//   //       opening_crawl: "Lorem ipsum dolor sit amet",
//   //       director: "Director 1",
//   //       release_date: "2023-01-01",
//   //       url: "/films/1",
//   //     },
//   //   ];
//   //   render(
//   //     <Modal
//   //       setIsOpen={setIsOpen}
//   //       films={films}
//   //       currentShip={currentShip}
//   //       filmsData={filmsData}
//   //       isLoading={isLoading}
//   //     />
//   //   );
//   //   screen.getByRole("");
//   //   expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
//   // });

//   test("should display films when data is loaded", async () => {
//     const filmsData = [{ url: "film1" }, { url: "film2" }, { url: "film3" }];
//     render(
//       <Modal
//         filmsData={filmsData}
//         films={films}
//         currentShip={currentShip}
//         isLoading={false}
//       />
//     );
//     screen.getByRole("");
//     expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
//   });
// });
