const express = require('express');
const app = express();
const legoData = require('./modules/legoSets');

// Initialize Lego data
legoData.initialize()
    .then(() => {
        console.log('Lego data initialized successfully.');
    })
    .catch((error) => {
        console.error('Error initializing Lego data:', error);
    });

// Routes
app.get('/', (req, res) => {
    res.send('Assignment 2: Keyurkumar Patel - 170852214');
});

app.get('/lego/sets', (req, res) => {
    legoData.getAllSets()
        .then((sets) => {
            res.json(sets);
        })
        .catch((error) => {
            res.status(500).send('Internal Server Error');
        });
});

app.get('/lego/sets/num-demo', (req, res) => {
    const setNum = '03093-1'; // Replace with a valid set number from your data set
    legoData.getSetByNum(setNum)
        .then((set) => {
            res.json(set);
        })
        .catch((error) => {
            res.status(404).send('Unable to find requested set');
        });
});

app.get('/lego/sets/theme-demo', (req, res) => {
  const theme = 'basic'; // Replace with a valid theme from your data set
  legoData.getSetsByTheme(theme)
      .then((sets) => {
          res.json(sets);
      })
      .catch((error) => {
          console.error('Error:', error); // Log any errors
          res.status(404).send('Unable to find requested sets');
      });
});



// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
