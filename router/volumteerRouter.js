const express = require("express");
const sqlite3 = require("sqlite3").verbose();
// const path = require("path");
// const Sequelize = require("sequelize");

const router = express.Router();
// const dbPath = path.resolve(__dirname, "db");
// const dbFile = path.resolve(dbPath, "myDatabase.db");

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   Storage: dbFile,
// });

// console.log(dbFile);

let db = new sqlite3.Database("./db/myDatabase.db", (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Connected to the chinook database");
});

// db.run('CREATE TABLE volunteerInfo(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL UNIQUE, location TEXT, part TEXT, time TEXT, day TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
//     (err)=>{
//         if (err) {
//             console.error(err);
//             return;
//         }
//         console.log('complete create table')
//     }
// )

// CREATE TABLE users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL UNIQUE, location TEXT, part TEXT, time TEXT, day TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

router.get("/", async (req, res) => {
  console.log("volun");
  //   const data = db.run(`SELECT * FROM volunteerInfo`);

  db.all(`SELECT * FROM volunteerInfo`, [], (err, rows) => {
    if (err) {
      console.error("Failed to retrieve data:", err.message);
      return;
    }

    let resultData = [];

    rows.forEach((row) => {
      if (row) {
        resultData.push(row);
      }
    });

    res.send(resultData);
  });
  //   console.log(data);
});

router.post("/", (req, res) => {
  const data = req.body;

  //   CREATE TABLE volunteerInfo(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL UNIQUE, location TEXT, part TEXT, time TEXT, day TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
  db.run(
    `INSERT INTO volunteerInfo (name, phone, email, location, part, time, day) VALUES ("${data.name}", "${data.phone}", "${data.email}", "${data.location}", "${data.part}", "${data.time}", "${data.day}")`,
    (err) => {
      if (err) {
        console.log(err);
        console.log("data didn't send");
        return;
      }
      console.log("data sent");
    }
  );
  //   (${data.name}, ${data.phone}, ${data.email}, ${data.location}, ${data.part}, ${data.time}, ${data.day})
  //   (name, phone, email, locaation, part, time, day)
  console.log(data);
  res.send(data);
});

// db.close((err) => {
//   if (err) {
//     console.log("failed");
//     return;
//   }
//   console.log("closed connection");
// });

// db.all(`SELECT * FROM volunteerInfo`, [], (err, rows) => {
//   if (err) {
//     console.error("Failed to retrieve data:", err.message);
//     return;
//   }

//   rows.forEach((row) => {
//     console.log(row);
//     res.send(row);
//   });
// });

module.exports = router;
