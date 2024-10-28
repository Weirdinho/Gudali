const Course = require("../models/Course");

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({
      data: courses,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.json({
      data: course,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Adding courses
exports.addCourse = async (req, res) => {
  try {
    const { img, title, description, price,} = req.body;

    let course = new Course({ title, description, price, img });
    const courseData = await course.save();
    res.json({
      success: true,
      data: courseData,
    });
  } catch (err) {
    res.json({
      data: "Something wrong happended from our end",
    });
  }
};
