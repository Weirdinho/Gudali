const express = require("express");
const cors = require("cors");
const fs = require('fs');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Grid = require('gridfs-stream');
const { Readable } = require('stream');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const breedRoutes = require("./routes/breedRoutes");
const path = require("path");
const nodemailer = require("nodemailer");
const User = require("./models/User");
const Course = require("./models/Course");


const app = express();
connectDB();

// Middleware
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/breeds", breedRoutes);



const conn = mongoose.connection;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('pdfs'); 
});

const PORT = process.env.PORT || 3000;
// Function to send an email
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com", 
  port: 465, 
  secure: true, 
  auth: {
    user: "ruruwhygee@gmail.com", 
    pass: "fyzcoirujgiqfsyy", 
  },
});
// Purchase route to process the purchase and send the PDF via email
app.post('/purchase', async (req, res) => {
  const { courseId, email, title, name } = req.body;

 const pdfPath = courseId;  // Path to the PDF file
 const pdfFullPath = path.join(__dirname, pdfPath);  // Get full path to the PDF file
 const pdfBuffer = fs.readFileSync(pdfFullPath);
      const mailOptions = {  
          from: 'ruruwhygee@gmail.com',  
          to: email,  
          subject: `Thank you for purchasing ${title}`,
          text: `Hello, ${name}, Thank you for purchasing the course "${title}". Attached is your PDF: `,
          attachments: [
            {
                filename: courseId,  // Extract the PDF filename from the path
                content: pdfBuffer,  // Attach the PDF file content
            }
        ]
       
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Error sending email:', error);
              return res.status(500).json({ error: 'Failed to send email' });
          }

          console.log('Email sent:', info.response);
          res.status(200).json({ message: 'Purchase successful, PDF sent to your email!' });
      });
  } 

)

// Forgot Password
app.post("/forgot-password", async (req, res) => {
  console.log("Request Body:", req.body); // Add this to log the request body
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    // Find the user in MongoDB by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Extract the password
    const password = user.password;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com", // Gmail SMTP server
      port: 465, // Use SSL (recommended)
      secure: true, // Use SSL
      auth: {
        user: "ruruwhygee@gmail.com", // Your email
        pass: "fyzcoirujgiqfsyy", // Your email password (for Gmail, consider using an App Password for security)
      },
    });
    // Send an email with the password to the user's email
    const mailOptions = {
      from: "ruruwhygee@gmail.com",
      to: email,
      subject: "Your Password Recovery", 
      text: `Hello, your password is: ${password}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // Log the error
        return res.status(500).send("Error sending email");
      }

      res.status(200).send("Password sent to your email");
    });
  } catch (error) {
    console.error(error); 
    res.status(500).send("Server error");
  }
});

if(path==="/testing"){
  return"testing route"
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/landing-page.html"));
});


app.get("/courses", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/courses.html"));
});


app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/cart.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.get("/Adamawa-gudali", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/Adamawa-gudali.html"));
});
app.get("/azawak", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/azawak.html"));
});
app.get("/breeds", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/breeds.html"));
});
app.get("/cultural", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/cultural.html"));
});
app.get("/diseases", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/diseases.html"));
});
app.get("/economic", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/economic.html"));
});
app.get("/Fulani-white", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/Fulani-white.html"));
});
app.get("/herd-size", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/herd-size.html"));
});
app.get("/keteku", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/keteku.html"));
});
app.get("/kuri", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/kuri.html"));
});

app.get("/muturu", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/muturu.html"));
});
app.get("/ndama", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/ndama.html"));
});
app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/products.html"));
});
app.get("/red-bororo", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/red-bororo.html"));
});
app.get("/reproduction", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/reproduction.html"));
});
app.get("/sokoto-gudali", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/sokoto-gudali.html"));
});
app.get("/wadara", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/wadara.html"));
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
