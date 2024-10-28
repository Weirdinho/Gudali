const Breed = require("../models/Breed");

exports.getBreeds = async (req, res) => {
    try {
      const breeds = await Breed.find();
      res.json({
        data: breeds,
      }); 
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };
   
  // Get course by ID
  exports.getBreedById = async (req, res) => {
    try {
      const breed = await Breed.findById(req.params.id);
      if (!breed) {
        return res.status(404).json({ msg: "Course not found" });
      }
      res.json({
        data: breed,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };
  
  // Adding courses
  exports.addBreed = async (req, res) => {
    try {
      const {imgSrc, title, description, moreLink,} = req.body;
  
      let breed = new Breed({ moreLink, description, title, imgSrc });
      const breedData = await breed.save();
      res.json({
        success: true,
        data: breedData,
      });
    } catch (err) {
      res.json({
        data: "Something wrong happended from our end",
      });
    }
  };
  