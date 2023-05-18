export function sortShipData(shipdata) {
  let maxNoFilms = 0;
  const sortedData = shipdata
    .reduce((accumulator, item) => {
      const crew = parseInt(item.crew.replace(/,/g, ""));
      if (crew > 10) {
        accumulator.push({ ...item, crew });
        maxNoFilms = Math.max(maxNoFilms, item.films.length);
      }
      return accumulator;
    }, [])
    .sort((a, b) => a.crew - b.crew);
  return {
    maxFilms: maxNoFilms,
    sortedShipData: sortedData,
  };
}
