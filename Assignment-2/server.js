/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: keyurkumar Patel    Student ID: 170852214       Date: 25-SEP-2023
*
********************************************************************************/

const express = require("express");
const app = express();

//const legoData = require("../modules/legoSets");


// Import your legoSets module
const legoSets = require("./modules/legoSets"); // Adjust the path as needed

// Initialize the legoSets data
legoSets.initialize().then(() => {
  // GET "/"
  app.get("/", (req, res) => {
    const studentInfo = "keyurkumar Patel - 170852214"; // Replace with your name and student ID
    res.send(`Assignment 2: ${studentInfo}`);
  });

  // GET "/lego/sets"
  app.get("/lego/sets", (req, res) => {
    const allSets = legoSets.getAllSets();
    res.json(allSets);
  });

  // GET "/lego/sets/num-demo"
  app.get("/lego/sets/num-demo", (req, res) => {
    const setNum = "001-1"; // Replace with a known setNum value from your data set
    legoSets
      .getSetByNum(setNum)
      .then((set) => {
        res.json(set);
      })
      .catch((error) => {
        res.status(404).send("Error: " + error);
      });
  });

  // GET "/lego/sets/theme-demo"
  app.get("/lego/sets/theme-demo", (req, res) => {
    const theme = "tech"; // Replace with a known theme value from your data set (lowercase)
    legoSets
      .getSetsByTheme(theme)
      .then((sets) => {
        res.json(sets);
      })
      .catch((error) => {
        res.status(404).send("Error: " + error);
      });
  });

  // Start the server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
