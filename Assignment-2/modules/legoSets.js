
const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

// Initialize function to populate the 'sets' array
function initialize() {
  return new Promise((resolve) => {
    sets = setData.map((set) => {
      const theme_id = set.theme_id;
      const theme = themeData.find((theme) => theme.id === theme_id)?.name || "Unknown";
      return { ...set, theme };
    });
    resolve(); // Resolve with no data once the operation is complete
  });
}

// Function to get all sets
function getAllSets() {
  return new Promise((resolve) => {
    resolve(sets); // Resolve with the completed 'sets' array
  });
}

// Function to get a set by its set_num
function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    const foundSet = sets.find((set) => set.set_num === setNum);
    if (foundSet) {
      resolve(foundSet); // Resolve with the found 'set' object
    } else {
      reject("Unable to find requested set"); // Reject with an appropriate message if not found
    }
  });
}

// Function to get sets by theme (case-insensitive partial match)
function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    theme = theme.toLowerCase();
    const matchingSets = sets.filter((set) => set.theme.toLowerCase().includes(theme));
    if (matchingSets.length > 0) {
      resolve(matchingSets); // Resolve with the found 'set' objects
    } else {
      reject("Unable to find requested sets"); // Reject with an appropriate message if not found
    }
  });
}

// Export the functions as a module
module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
