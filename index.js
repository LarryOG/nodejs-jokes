require("dotenv").config();

const express = require("express");
const db = require("./lib/db");
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get(`/`, (req, res) =>{

 
    const sql = "SELECT setup, punchline FROM jokes ORDER BY RAND() LIMIT 1";
    db.query(sql, (err, results, fields)=>{
        if (err) throw err;
    
        Object.keys(results).forEach(function(key) {
            var row = results[key];
            res.render('index',{setup: `${row.setup}`, 
            punchline: `${row.punchline}`})
           
          });
    });
    
} )

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

























// const mysql = require("mysql");

// const connection = mysql.createConnection({
// 	host: process.env.MYSQL_HOST,
// 	user: process.env.MYSQL_USER,
// 	password: process.env.MYSQL_PASSWORD,
// 	database: process.env.MYSQL_DB
// });
// connection.connect((err) =>{
// 	if(!!err) {
// 		console.log("Connection error", err);
// 	} else {
// 		console.log('Connected to database');
// 	}
// });

// const sql = "SELECT setup, punchline FROM jokes ORDER BY RAND() LIMIT 1";
// connection.query(sql, (err, results, fields)=>{
//     if (err) throw err;

//     Object.keys(results).forEach(function(key) {
//         var row = results[key];
//         console.log(row.setup);
//         console.log(row.punchline);

//       });
// });

// connection.end();
