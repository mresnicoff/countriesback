const axios = require("axios");
const { Country } = require("../db.js");
const fs = require("fs");
const path = require("path");
var result = {};
const getApiData = async () => {
  try {
    result = await axios(`https://restcountries.com/v3/all`);
  } catch {
    result.data = fs.readFileSync(
      path.resolve(__dirname, "datum.json"),
      "utf8"
    );
    result.data = JSON.parse(result.data);
  }

  const dataToShow = result.data.map((country) => {
    return {
      id: country.cca3,
      name: country.translations.spa.common, // tomé el nombre en castellano. Opción country.name.common (ingles)
      flagImage: country.flags[1], // es la bandera chica, la grande es country.flags[0]
      continent: country.region,
      capital:
        country.capital !== undefined ? country.capital[0] : "Doesn't have", // si filtramos antàrtida, esto queda country.capital[0]
      subregion: country.subregion,
      surface: country.area,
      population: country.population,
    };
  });

  return dataToShow;
};
const saveApidata = async (req, res) => {
  var data = await getApiData();

  const created = await Country.bulkCreate(data);
};
module.exports = saveApidata;
