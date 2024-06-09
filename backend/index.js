// /*
// ------------------------------------------------------------------------
// |                       Add Node Module Here                            |
// ------------------------------------------------------------------------
// */
// require("dotenv").config();
// var express = require("express");
// var bodyparser = require("body-parser");
// const mongoose = require("mongoose");
// var Session = require("express-session");

// /*
// ------------------------------------------------------------------------
// |                      Include Midlewares                               |
// ------------------------------------------------------------------------
// */
// var app = express();
// sessionTime = 1000 * 60 * 60;

// app.use(
//   Session({
//     secret: "skdfjsklfgjslkgfjlsdfjslkdfg",
//     saveUninitialized: true,
//     resave: false,
//     cookie: { maxAge: sessionTime },
//   })
// );
// app.use(bodyparser.json());
// /*
// ------------------------------------------------------------------------
// |                      Include App Modules                             |
// ------------------------------------------------------------------------
// */

// /*
//             --------------------------------------------------
//             |                  App Routings                  |
//             --------------------------------------------------
// */

// require("./routing")(app);

// /*
// ------------------------------------------------------------------------
// |                          Database Setup                                |
// ------------------------------------------------------------------------
// */

// mongoose
//   .connect(process.env.DB_CONN)
//   .then(() => console.log("Database is Connected!"));

// /*
// ------------------------------------------------------------------------
// |                          Server Setup                                |
// ------------------------------------------------------------------------
// */

// const port = process.env.BACKEND_PORT || "8082";
// app.listen(port, () => {
//   console.log(`Server is running of port ${port}`);
// });

/*
------------------------------------------------------------------------
|                       Add Node Module Here                            |
------------------------------------------------------------------------
*/
require("dotenv").config();
var express = require("express");
var bodyparser = require("body-parser");
const mongoose = require("mongoose");
var Session = require("express-session");
var path = require("path");
const hbs = require("express-handlebars"); // Imported handlebars engine
const { seeding } = require("./seed");
/*
------------------------------------------------------------------------
|                      Include Midlewares                               |
------------------------------------------------------------------------
*/

var app = express();

sessionTime = 1000 * 60 * 60;

app.use(
  Session({
    secret: "skdfjsklfgjslkgfjlsdfjslkdfg",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: sessionTime },
  })
);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// ("c://programfile/project/index.js/public");
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

// Setting up the view Engine for HBS
app.engine("hbs", hbs.engine()); // init template engine
app.set("view engine", "hbs");
app.set("views", "/views");

// app.use((req,res,next)=>{
//     VerifyUser(req,res,next)
// })
/*
------------------------------------------------------------------------
|                      Include App Modules                             |
------------------------------------------------------------------------
*/

/*
            --------------------------------------------------
            |                  App Routings                  |
            --------------------------------------------------
*/

require("./routing")(app);

/*
------------------------------------------------------------------------
|                          Database Setup                                |
------------------------------------------------------------------------
*/

mongoose
  .connect(process.env.DB_CONN)
  .then(() => console.log("Database is Connected!"));
seeding();
/*
------------------------------------------------------------------------
|                          Server Setup                                |
------------------------------------------------------------------------
*/

const port = process.env.BACKEND_PORT || "8081";
app.listen(port, () => {
  console.log(`Server is running of port ${port}`);
});
