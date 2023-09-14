/*********************************************************************************

* WEB322 – Assignment 1

* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 

* No part of this assignment has been copied manually or electronically from any other source

* (including web sites) or distributed to other students.

*

* Name: Keyurkumar Shankarlal Patel Student 
* ID: 170852214 
* Date: 14th SEP 2023

*

********************************************************************************/
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('Do you wish to process a File (f) or directory (d): ', function (userInput) {
    if (userInput == "f") {
        rl.question('Enter the filename: ', function (filename) {
            processFile(filename);
            rl.close();
        });
    } else if (userInput == "d") {
        rl.question('Enter the directory name: ', function (dirname) {
            processDirectory(dirname);
            rl.close();
        });
    } else {
        console.log("Invalid Selection");
        rl.close();
    }
});

function processFile(filename) {
    fs.readFile(filename, "utf-8", function (err, data) {
        if (err) {
            console.log(err.message);
            return;
        }

        const text = data.toString().replace(/\s+/g, ' ');
        const words = text.replace(/[^\w\s\']/g, '').split(' ');

        const numCharacters = text.length;
        const numWords = words.length;
        const longestWord = findLongestWord(words);
        
        console.log(`Number of Characters (including spaces): ${numCharacters}`);
        console.log(`Number of Words: ${numWords}`);
        console.log(`Longest Word: ${longestWord}`);
    });
}

function findLongestWord(words) {
    return words.reduce((longest, word) => {
        return word.length > longest.length ? word : longest;
    }, '');
}

function processDirectory(dirname) {
    fs.readdir(dirname, function (err, arrayFiles) {
        if (err) {
            console.log(err.message);
            return;
        }

        var final = arrayFiles.sort().reverse();

        console.log(`Files (reverse alphabetical order): ${final.join(', ')}`);
    });
}
