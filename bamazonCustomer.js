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
    productSearch();
  });

  function productSearch() {
      connection.query("SELECT product_name FROM products", function(err, res) {
        if (err) throw err;
      //console.log(res);
        var resChoices = [];
        for(var i = 0; i < res.length; i++){
           resChoices.push(res[i].product_name)
        }
      //console.log(resChoices);
      runSearch(resChoices);
      });
    }

function runSearch(products) {
    inquirer
    .prompt([
    {
        type: "list",
        name: "options",
        message: "What are you looking for today?",
        choices: products
    },
    {
        type: "input",
        name: "quant",
        message: "How many of are you looking to buy?",
        //create an array of 15 choices without hard coding it.
    }
    ]).then(function(answer) {
        console.log(JSON.stringify(answer));
        quantitySearch(answer.options, answer.quant);
                   
    })
};

  function quantitySearch(userSelection, quantity) {
      debugger;
    connection.query("SELECT stock_quantity FROM products WHERE product_name = '" + userSelection + "'", function(err, res) {
      if (err) throw err;
        var userQuantity = parseInt(quantity);
        var productQuantity = parseInt(res[0].stock_quantity);

      if(userQuantity < productQuantity){
        var remainder = productQuantity - userQuantity;
        console.log(remainder);
        update(userSelection,remainder)
      }else{
          console.log("Insufficient quantity!");
      }
    });
  }

  function update(userSelection, quantity) {
    connection.query("UPDATE products SET stock_quantity = " + quantity + " WHERE product_name = '" + userSelection + "'" , function(err, res) {
      if (err) throw err;
      console.log("Quantity updated");
    });
  }
