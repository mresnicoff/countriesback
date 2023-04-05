const { Country, Activity } = require("../db.js");
const getCountriesById = async (req, res) => {
  const { idPais } = req.params;
  console.log(req.params);
  try {
    var foundCountry = await Country.findOne({         include: {
      model: Activity
    }, where: { id: idPais } });

    console.log(foundCountry);
    res.status(200).json(foundCountry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = getCountriesById;
