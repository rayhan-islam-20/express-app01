import express from "express";
import nodemon from "nodemon";

const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;
// add an new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//get a tea
app.get("/teas/:id", (req, res) => {
  const tea = teaData.filter((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  res.status(200).send(tea);
});

// updata tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  console.log(tea);

  if (!tea) {
    return res.status(404).send("tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  return res.status(200).send(tea);
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));

  // if (index === -1) {
  //   return res.status(404).send("te not found");
  // }
  // teaData.splice(index, 1);
  // return res.status(200);

  if (index !== -1) {
    teaData.splice(index, 1);
    return res.status(200).send("tea is deleted");
  } else {
    return res.status(404).send("tea not found");
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
