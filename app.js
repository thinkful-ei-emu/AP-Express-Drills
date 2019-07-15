const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/sum", (req, res) => {
  if (!req.query.a || !req.query.b) {
    return res.status(400).send("Invalid request");
  }

  let numA = parseInt(req.query.a);
  let numB = parseInt(req.query.b);

  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).send("Must be numbers");
  }

  let c = numA + numB;

  res.status(200).send(`The sum of a and b is ${c}`);

  //works upon testing
});

app.get("/cipher", (req, res) => {
  if (!req.query.text || !req.query.shift) {
    return res.status(400).send("Invalid request");
  }

  let shiftNum = parseInt(req.query.shift);

  if (typeof req.query.text !== "string" || isNaN(shiftNum)) {
    return res.status(400).send("Invalid query types");
  }

  //charcode65 = A, 66 = B, 67=C from mdn, and A.charcode0 = 65, 65 is int val of A in utf-16
  //String.fromCharCode() method returns a string created from the specified sequence of UTF-16 code units.

  // const apple = 'A'.charCodeAt(0);
  // console.log(apple);

  let cipher = "";

  for (let i = 0; i < req.query.text.length; i++) {
    let newUTF = req.query.text.charCodeAt(i) + shiftNum;
    cipher += String.fromCharCode(newUTF);
  }

  res.status(200).send(`${cipher}`);

  //works upon testing
  
});

app.get('/lotto', (req, res) => {

  if (!req.query.numbers || !Array.isArray(req.query.numbers)) {
    return res.status(400).send("Query not an array");
  }

  if(req.query.numbers.length != 6 || req.query.numbers < 1 || req.query.numbers > 20){
    return res.status(400).send("Array must be 6 numbers and between 1-20");
  }

  //takes arr of 6 distinct nums between 1-20 named numbers
  //randomly generates 6 numbers between 1-20
  //compare numbers to determine how many match
  //if < 4 then "sorry you lose"
  //if = 4 then congrats you win a free ticket
  //if = 5 then $100
  //if all 6 then mega mill

  let num = req.query.numbers.map(int => parseInt(int));
  let winningNumbers = [];
  let matchTotal = 0;

  for (let i = 0; i < 6; i++){
    winningNumbers.push(Math.floor(Math.random() * 20));
  }

  for (let i = 0; i < num.length; i++){
    for (let j = 0; j < winningNumbers.length; j++){
      if (num[i] === winningNumbers[j]){
        winningNumbers.splice(j, 1);
        matchTotal ++;
      }
    }
  }

  let string;

  if(matchTotal === 6){
    string = "Wow! Unbelievable! You could have won the mega millions!";
  }

  if(matchTotal === 5){
    string = "Congratulations! You win $100!";
  }

  if(matchTotal === 4){
    string = "Congratulations, you win a free ticket";
  }

  if(matchTotal < 4) {
    string = "Sorry, you lose";
  }

  res.status(200).send(`${string}`);

  //works upon testing and hardcoding
  //also addressed server thing with Chris

})

app.listen(8080, () => console.log("Server is running on 8080"));
