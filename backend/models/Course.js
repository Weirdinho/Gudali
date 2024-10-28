const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  _id: Object,
  img: String,
  title: String,
  description: String,
  price: Number,
  pdfPath:String 
});

const Course = mongoose.model("Course", courseSchema);
module.exports= mongoose.model("Course", courseSchema);

const course1 = new Course({
 _id: 1,
 img:"/icon/some-cows.jpg",
  title: "Beginner Cow Rearing",
  description: "Learn the basics of how to rear cows for dairy and beef.",
  price: 50000,
 pdfPath:"/pdfs/calf-rearing.pdf",
});

const course2 = new Course({
 _id: 2,
 img:"/icon/cows-horns.png",
  title: "Advanced Cow Rearing Techniques",
  description:
    "Deep dive into advanced techniques for maximizing cow health and productivity.",
  price: 100000,
   pdfPath:"/pdfs/advanced-cattle-farming.pdf",
});
const course3 = new Course({
 _id: 3,
 img:"/icon/milking-cow.webp",
    title: 'Dairy Farming Basics',
    description: 'A comprehensive guide to dairy farming and milk production.',
    price: 60000,
 pdfPath:"/pdfs/diary-farming-basics.pdf",
})
const course4 = new Course({
 _id: 4,
 img:"/icon/sustainance-cow.jpg",
    title: 'Sustainable Farming Practices',
    description: 'Learn sustainable cow rearing techniques to benefit your farm and the environment.',
    price: 75000,
 pdfPath:"/pdfs/sustainable-cattle-farming.pdf",
})

// Course.updateOne({_id: "670d0bf5aac3c0e4f33d94a7"},{_id: 1})
// .then((name) =>{
//   console.log(name)
//  })
//  .catch((err)=>{
//   console.error(err)
//  })
  


//  Course.insertMany([course1, course2, course3, course4])
// .then((docs)=>{
//    console.log("successfully added Fruits")
//  })
//   .catch((err) =>{
//    console.error(err)
//  })