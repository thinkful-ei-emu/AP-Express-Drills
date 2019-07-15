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
});

app.listen(9000, () => console.log("Server is running on 9000"));
