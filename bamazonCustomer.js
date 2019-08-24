// You'd need to install the mysql package to make it work.
var mySQL = require("mysql");

// npm install inquirer is required.
var inquirer = require("inquirer")

var connection = mySQL.createConnection({
    host: "localhost",

    //Your port; if not 3306
    port: 3306,

    //Your username
    user: "root",

    //Your password
    password: "Quimper123!",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    getProducts();
  });
  
  function getProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }

//   //PROBABLY WILL BE IN A DIFFERENT FOLDER 

// User interaction from the inquirer
inquirer
    .prompt([
    {
        type: "list",
        name: "options",
        message: "What are you looking for today?",
        choices: []
        //loop through the items on the table
    },
    {
        type: "list",
        name: "quant",
        message: "How many of: " +       + "are you looking to buy?",
        choices: []
        //create an array of 15 choices without hard coding it.
    }
    ])


