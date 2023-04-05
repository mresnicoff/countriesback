const { Country } = require("../db.js");
const fs = require("fs");
const path = require("path");
var result;
const getApiData = () => {
  try {
    result = fs.readFileSync(path.resolve(__dirname, "datum.json"), "utf8");
  } catch (err) {
    console.error(err);
  }
  var resultObject = JSON.parse(result);
  dataToShow = resultObject.map((country) => {
    return {
      id: country.cca3,
      name: country.translations.spa.common,
      flagImage: country.flags[1],
      continent: country.region,
      capital:
        country.capital !== undefined ? country.capital[0] : "Doesn't have",
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
