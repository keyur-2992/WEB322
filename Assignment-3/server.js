/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: keyurkumar Patel    Student ID: 170852214    Date: 20-OCT-2023
*
*  Published URL: https://important-gray-fossa.cyclic.app
*
********************************************************************************/

const express = require("express");
const path = require("path");

const legoData = require("./modules/legoSets");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/view/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/view/about.html"));
});

app.get("/lego/sets", (req, res) => {
  if (req.query.theme) {
    legoData
      .getSetsByTheme(req.query.theme)
      .then((data) => res.status(200).json(data))
      .catch((err) =>
        res.status(404).sendFile(path.join(__dirname, "/view/404.html"))
      );
  }

  legoData
    .getAllSets()
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(404).sendFile(path.join(__dirname, "/view/404.html"))
    );
});

app.get("/lego/sets/:id", (req, res) => {
  legoData
    .getSetByNum(req.params.id)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(404).sendFile(path.join(__dirname, "/view/404.html"))
    );
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/view/404.html"));
});

legoData
  .initialize()
  .then(() => app.listen(PORT, () => console.log(`listening on port ${PORT}`)))
  .catch((error) => console.log(`Failed to listen on port ${PORT}`));
