import express from "express";
import mysql from "mysql";
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test",
});

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});


app.listen(8800, () => {
  console.log("Backend server is running!");
});

app.get("/books", (req, res) => {
    const query = "SELECT * FROM books";
    db.query(query, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.json(result);
    })
});
// alter user 'root'@'localhost' identified with mysql_native_password by '1234';

app.post("/books", (req, res) => {
    const query = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    const values =  [
        req.body.title,
        req.body.desc,
        req.body.cover, 
    ];
    db.query(query, [values], (err, result) => {
        if(err) {
            console.log(err);
            return res.json("error", err, 500)
        } else {

            return res.json("books created");
        }
    })
});