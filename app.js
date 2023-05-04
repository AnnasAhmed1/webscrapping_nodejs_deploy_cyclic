const express = require("express");
const app = express();
const cheerio = require("cheerio");
const axios = require("axios");

const port = 3000; // Choose any port you like

app.get("/cars", async (req, res) => {
  const carName = [];
  const carPrice = [];
  const finalObj = [];

  const url = "https://www.pakwheels.com/new-cars";
  const response = await axios.get(url);
  const html = response.data;

  const $ = cheerio.load(html);

  $("h3.truncate").each((i, el) => {
    carName.push($(el).text());
  });

  $("div.truncate").each((i, el) => {
    let data = $(el).text().replace(/\s/g, "");
    carPrice.push(data);
  });

  carPrice.forEach((v, i) => {
    finalObj.push({
      carName: carName[i],
      carPrice: v,
    });
  });

  res.json(finalObj);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
