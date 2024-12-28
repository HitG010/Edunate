const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
// const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./Models/user");
const Insitution = require("./Models/institute");
const Fundraising = require("./Models/fundraiser");
const Milestone = require("./Models/milestone");
const Review = require("./Models/review");
const AdminPayment = require("./Models/adminPayments");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const passport = require("./passportConfig");
const authRoutes = require("./Routes/authRoutes");
const path = require("path");
const { ensureAuthenticated, checkRole } = require("./authMiddleware");
// const user = require("./Models/user");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    const Model = role === "student" || role === "alumni" ? User : Insitution;

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
  Insitution.create({
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
      role === "student" ? User : role === "alumni" ? User : Insitution;
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
      const response = await Insitution.findOne({ name: newDetails.institute });
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
  try {
    console.log("Institution ID:", req.query.institutionId);
    const institutionId = new mongoose.Types.ObjectId(req.query.institutionId);
    const fundRaisers = await Fundraising.find({
      institutionId,
      status: "Active",
    });

    console.log("Fundraisers Found:", fundRaisers);
    res.json(fundRaisers);
  } catch (err) {
    console.error("Error finding active fundraisers:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getPastFundRaisers", async (req, res) => {
  console.log("Institution ID past:", req.query.institutionId);
  await Fundraising.find({
    institutionId: req.query.institutionId,
    status: "Completed",
  })
    .then((fundRaisers) => {
      console.log("Fundraisers past:", fundRaisers);
      res.json(fundRaisers);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/getOtherFundraisers", async (req, res) => {
  console.log("Institution ID:", req.query.institutionId);
  await Fundraising.find({
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

  const prompt =
    "I am giving you a title, description and raised amount of a fundraiser of an educational institute. Please generate an array of milestone objects response that splits the fundraiser into 3 milestones which makes the institute reach its goal. Give me the title, description and raised amount of each milestone. Ensure that the milestone amount is distributed on the basis of the milestone motive and not simply divided quickly. Here are the details of the fundraiser: Title: " +
    data.title +
    " Description: " +
    data.description +
    " Raised Amount: " +
    data.goalAmount;

  let response;

  try {
    // Generate content using model
    response = await model.generateContent(prompt);

    // Process the response
    response = response.response.text();
    response = response.replace(/```json/g, "").replace(/```/g, "");
    const milestones = JSON.parse(response);

    // Add fundraiser to the database
    const fundraiser = await Fundraising.create(data);
    console.log("Fundraiser created:", fundraiser);

    // Prepare milestones data
    console.log("Milestones:", milestones);
    let i = 1;
    const milestonesData = milestones.map((milestone) => ({
      onGoing: i == 1 ? true : false,
      index: i++,
      title: milestone.title,
      description: milestone.description,
      targetAmount: milestone.raisedAmount,
      fundraiserId: fundraiser._id,
    }));

    // Add milestones to the database
    await Milestone.insertMany(milestonesData);
    console.log("Milestones created:", milestonesData);

    // Send response to the client
    res.json({ message: "Fundraiser created successfully", fundraiser });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the fundraiser" });
  }
});

app.get("/getFundraiser/:id", async (req, res) => {
  console.log("Fundraiser ID:", req.params.id);
  await Fundraising.findById(req.params.id)
    .then((fundRaiser) => {
      console.log("Fundraiser:", fundRaiser);
      res.json(fundRaiser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/getMilestones/:id", async (req, res) => {
  console.log("Fundraiser ID:", req.params.id);
  await Milestone.find({ fundraiserId: req.params.id })
    .then((milestones) => {
      console.log("Milestones:", milestones);
      res.json(milestones);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/getInstituteReviews", async (req, res) => {
  await Review.find({
    institutionId: req.query.institutionId,
  })
    .then((reviews) => {
      console.log("Reviews:", reviews);
      res.json(reviews);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.post("/postReview", async (req, res) => {
  const data = req.body;
  Review.create(data)
    .then((review) => {
      console.log("Review created:", review);
      res.json({ message: "Review created successfully", review });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/getInstituteDetails", async (req, res) => {
  await Insitution.findOne({ fundraiserId: req.query.fundraiserId })
    .then((institute) => {
      console.log("Institute:", institute);
      res.json(institute);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.post("/addPayment", async (req, res) => {
  const data = req.body;
  AdminPayment.create(data)
    .then((payment) => {
      console.log("Payment created:", payment);
      const milestoneId = payment.milestoneId;
      Milestone.findByIdAndUpdate(milestoneId, {
        completed: true,
        onGoing: false,
        mlApproved: true,
        mlChecked: true,
      }).then((milestone) => {
        Milestone.findOne({
          fundraiserId: milestone.fundraiserId,
          index: milestone.index + 1,
        }).then((nextMilestone) => {
          if (nextMilestone) {
            Milestone.findByIdAndUpdate(nextMilestone._id, {
              onGoing: true,
            }).then((updatedMilestone) => {
              console.log("Milestone updated:", updatedMilestone);
            });
          }
        });
      });
      res.json({ message: "Payment added successfully", payment });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/getPayments", async (req, res) => {
  await AdminPayment.find({})
    .then((payments) => {
      console.log("Payments:", payments);
      res.json(payments);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});
