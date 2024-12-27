const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
// const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./Models/user");
const Institute = require("./Models/institute");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const passport = require('./passportConfig');
const authRoutes = require("./Routes/authRoutes");
const path = require("path");
const {ensureAuthenticated, checkRole} = require('./authMiddleware');
// const user = require("./Models/user");

const mongoURI =
  "mongodb+srv://bindrakartik64:QZ9VT2rSpTMBMjTC@edunate-0.2vycy.mongodb.net/?retryWrites=true&w=majority&appName=edunate-0";

mongoose
  .connect(mongoURI, {
    dbName: "Edunate",
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 5000;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
    store: MongoStore.create({
      mongoUrl: mongoURI,
      dbName: "Edunate",
      collectionName: "sessions",
    }),
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with your client URL
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // If using cookies for authentication
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

// redirect user to google for authentication
app.get(
  "/auth/google/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// google callback after authentication
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    console.log("authenticated User: ", req.user);
    res.redirect("http://localhost:5173/home");
  }
);

// app.post("/store-role", (req, res) => {
//   if(!req.session) {
//     return res.status(500).json({ message: "Session not found" });
//   }
//   console.log("Role:", req.body.role);
//   req.session.role = req.body.role;
//   req.session.save((err) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//     console.log(req.session);
//     res.json({ message: "Role stored" });
//   });
// });

app.get("/home", ensureAuthenticated, (req, res) => {
  res.send("Welcome to Edunate", req.user);
});

app.get("/logout", (req, res) => {
  req.logout(() => res.redirect("http://localhost:5173/"));
});

app.get("/fetchUser", ensureAuthenticated, (req, res) => {
  console.log("User: ", req.user);
  res.json(req.user);
});

app.post("/instituteSignUp", (req, res) => {
  const { instituteName, email, password, address, verificationDocument } = req.body;
  // console.log("Institute Name: ", instituteName);
  // res.send("Document uploaded successfully");
  // add data to the database
  Institute.create({
    name: instituteName,
    email,
    password,
    address: address,
    verificationDocument,
  })
  .then(user => {
    console.log("Insitution created: ", user);
    res.json({ message: "Institute created", user });
  })
  .catch(err => {
    console.log(err);
    if(err.code === 11000) {
      res.status(400).json({ message: "Institute already exists" });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  });
});

app.use((req, res, next) => {
  console.log('Session:', req.session);
  console.log('User:', req.user);
  next();
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
