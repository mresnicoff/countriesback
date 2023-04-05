const { Router } = require("express");
const { Activity, Country } = require("../db.js");
const { Op } = require("sequelize");

const router = Router();

// Se postea algo como esto {
//      "name": "Fly", "difficulty": "5", "duration": "1:00:09", "season": "spring"
// }

// post a -> http://localhost:3001/activity
const postActivities = async (req, res) => {

  const  countries=req.body.countries
  const name= req.body.name
  const difficulty=parseInt(req.body.difficulty) 
  const duration=parseInt(req.body.duration)  
  const season=req.body.season 
  console.log(typeof duration)
  try {
    if (countries.length == 0) {
      throw new Error(`No indicó paìs para la actividad `);
    }

    const paises=  await Country.findAll({ attributes:['id'], where:{name:countries}
    })
    console.log(paises)
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    // idCountries es un array de ids de los Countries. Por cada id, se le agrega la actividad posteada
    paises.forEach((id) => {
      newActivity.addCountries(id);
    });
    res.json(newActivity);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = postActivities;
