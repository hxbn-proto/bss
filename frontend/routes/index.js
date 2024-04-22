const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Index page" });
});

// Placeholder server data
const serverData = {
  datesForDisable: ["25.04.2024", "27.04.2024"],
  availableMasters: [
    {
      masterId: 0,
      masterName: "Beauty Master 0",
      busyWindows: {
        "22.04.2024": [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
    },
    {
      masterId: 1,
      masterName: "Beauty Master 1",
      busyWindows: {
        "22.04.2024": [0, 2, 4, 6, 8],
        "25.04.2024": [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
    },
    {
      masterId: 2,
      masterName: "Beauty Master 2",
      busyWindows: {
        "22.04.2024": [0, 3, 6],
        "26.04.2024": [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
    },
    {
      masterId: 3,
      masterName: "Beauty Master 3",
      busyWindows: {
        "22.04.2024": [1, 2, 3, 4, 8],
        "23.04.2024": [0, 1, 2, 3, 4, 5, 6, 7, 8],
        "24.04.2024": [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
    },
  ],
};

router.get("/register", (req, res) => {
  // Get masters data from backend
  // show calendar with free days
  // todo: get server data

  res.render("register", {
    title: "Register Appointment",
    serverData: serverData,
  });
});

router.post(
  "/register",
  [
    check("name").isLength({ min: 1 }).withMessage("Please enter a name"),
    check("email").isLength({ min: 1 }).withMessage("Please enter an email"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // todo: get server data
    if (errors.isEmpty()) {
      res.send("Thank you for your registration!");
    } else {
      res.render("form", {
        title: "Registration form",
        errors: errors.array(),
        userData: req.body,
        serverData: serverData,
      });
    }
  }
);

router.get("/check", (req, res) => {
  res.render("check", { title: "Check/Remove Appointment" });
});

module.exports = router;
