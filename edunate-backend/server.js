const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
// const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./Models/user");
const Institute = require("./Models/institute");
const Fundraiser = require("./Models/fundraiser");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const passport = require("./passportConfig");
const authRoutes = require("./Routes/authRoutes");
const path = require("path");
const { ensureAuthenticated, checkRole } = require("./authMiddleware");
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

app.post("/storeOCdeets", (req, res) => {
  console.log("OC deets: ", req.body);
  const { openCampusID, walletAdd, user } = req.body;
  // add data to the database
  try {
    const Model =
      user.role === "student"
        ? User
        : user.role === "alumni"
        ? User
        : Institute;

    Model.findByIdAndUpdate(user._id, {
      openCampusId: openCampusID,
      walletAddress: walletAdd,
    }).then((user) => {
      console.log(user.openCampusId, user.walletAddress);
      res.json({ message: "Data stored", user });
    });
    // Model.findById(user._id).then((user) => {
    //   console.log(user.openCampusId, user.walletAddress);
    //   res.json({ message: "Data stored", user });
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/storeRole", async (req, res) => {
  const { role, user } = req.body;

  // Validate required fields
  if (!role || !user || !user._id) {
    return res
      .status(400)
      .json({ message: "Invalid request: Role or user details missing." });
  }

  try {
    // Determine the correct model based on the role
    const Model = role === "student" || role === "alumni" ? User : Institute;

    // Find and update the user's role
    const updatedUser = await Model.findByIdAndUpdate(
      user._id,
      { role },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log("Updated Role:", updatedUser.role);
    return res.json({
      message: "Role stored successfully.",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating role:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/instituteSignUp", (req, res) => {
  const { instituteName, email, password, address, verificationDocument } =
    req.body;
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
    .then((user) => {
      console.log("Insitution created: ", user);
      res.json({ message: "Institute created", user });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        res.status(400).json({ message: "Institute already exists" });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    });
});

app.use((req, res, next) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);
  next();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post("/updateDetails", async (req, res) => {
  const { role, details, user } = req.body;
  console.log("Role:", role);
  console.log("Details:", details);
  console.log("User:", user);
  // add data to the database
  try {
    const Model =
      role === "student" ? User : role === "alumni" ? User : Institute;
    const newDetails = details[role];
    console.log("New Details:", newDetails);
    if (role === "institution") {
      // create a new institute in mongo
      const response = await User.findById(user._id);
      newDetails._id = response._id;
      newDetails.email = response.email;

      newDetails.role = "Institution";
      newDetails.googleId = response.googleId;
      console.log("New Details:", newDetails);
      Model.create(newDetails).then((user) => {
        console.log(user);
        res.json({ message: "Details updated", user });
      });
      // Update the user from the user collection role to institution
      User.findByIdAndUpdate(user._id, {
        role: "Institution",
        username: newDetails.name,
      }).then((user) => {
        console.log(user);
      });
    }
    if (role === "student" || role === "alumni") {
      const response = await Institute.findOne({ name: newDetails.institute });
      newDetails.institute = response._id;
      Model.findByIdAndUpdate(user._id, newDetails).then((user) => {
        console.log(user);
        res.json({ message: "Details updated", user });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getActiveFundRaisers", async (req, res) => {
  console.log("Institution ID:", req.query.institutionId);
  await Fundraiser.find({
    institutionId: req.query.institutionId,
    status: "Active",
  })
    .then((fundRaisers) => {
      console.log("Fundraisers:", fundRaisers);
      res.json(fundRaisers);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/getPastFundRaisers", async (req, res) => {
  console.log("Institution ID:", req.query.institutionId);
  await Fundraiser.find({
    institutionId: req.query.institutionId,
    status: "Completed",
  })
    .then((fundRaisers) => {
      console.log("Fundraisers:", fundRaisers);
      res.json(fundRaisers);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/getOtherFundraisers", async (req, res) => {
  console.log("Institution ID:", req.query.institutionId);
  await Fundraiser.find({
    institutionId: { $ne: req.query.institutionId },
    status: "Active",
  })
    .then((fundRaisers) => {
      console.log("Fundraisers:", fundRaisers);
      res.json(fundRaisers);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.post("/createFundRaiser", async (req, res) => {
  const data = req.body;
  console.log("Data:", data);
  Fundraiser.create(data)
    .then((fundRaiser) => {
      console.log(fundRaiser);
      res.json({ message: "Fundraiser created", fundRaiser });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});
