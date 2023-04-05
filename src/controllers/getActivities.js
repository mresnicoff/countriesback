const { Country, Activity } = require("../db.js");
const getActivities = async (req, res) => {
  try {
    var allActivities = await Activity.findAll({
      include: {
        model: Country,
      },
    });

    if (!allActivities.length) {
      throw new Error(`No hay actividades en la base de datos`);
    }
    res.status(200).json(allActivities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = getActivities;
