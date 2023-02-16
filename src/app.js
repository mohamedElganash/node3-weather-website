const forecast = require("./utils/forecast");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//app.com  (root:home bage)
app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "Mohamed Esmail",
  });
});

//app.com/about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mohamed Esmail",
  });
});

//app.com/help
app.get("/help", (req, res) => {
  res.render("help", {
    content: "this is help content",
    title: "Help",
    name: "Mohamed Esmail",
  });
});

//app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address term",
    });
  }
  forecast(req.query.address, (error, forecastData, location) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    return res.send({
      forecast: forecastData,
      location, //i used here shorthand for object property and value have the same name
      address: req.query.address,
    });
  });
});

//test
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//not found(404) a page under /page like (/page/somthing)
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "MohamedEsmail",
    errorMessage: "help article is not found",
  });
});

//404 page not found under the root like (/something)
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "MohamedEsmail",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server is uo on port 3000");
});
