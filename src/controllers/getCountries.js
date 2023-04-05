const { Op } = require("sequelize");
const { Country, Activity } = require("../db.js");
const getCountries = async (req, res) => {
  try {
    var allCountries = [];
    const { name } = req.query;
    if (!name) {
      allCountries = await Country.findAll({
        include: {
          model: Activity,
        },
      });
    } else {
      allCountries = await Country.findAll({
        include: {
          model: Activity,
        },
        where: { name: { [Op.iLike]: `%${name}%` } },
      });
    }

    if (!allCountries.length) {
      throw new Error(`No hay países que coincidan con la búsqueda`);
    }
    res.status(200).json(allCountries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = getCountries;
