// You'd need to install the mysql package to make it work.
var mySQL = require("mysql");

require("console.table");

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
    runSearch()
  });

  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          viewProduct();
          break;
  
        case "View Low Inventory":
          viewLowInv();
          break;
  
        case "Add to Inventory":
          addInv();
          break;
  
        case "Add New Product":
          addProduct();
          break;
  
        case "exit":
          connection.end();
          break;
        }
      });
  };

  function viewProduct() {
      var query = "SELECT * FROM products";
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch()
      }) 
  };

  function viewLowInv() {
    var query = "SELECT * FROM products WHERE stock_quantity <= 1000";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch()
    })
  };

  function addInv() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "itemId",
            message: "Please enter the id",
            //To validate only if user adds a number.
            validate: function(val) {
                return !isNaN(val)
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many items would you like to add?",
            validate: function(val) {
                return !isNaN(val)
            }
        }
    ]).then(function(answer) {
        var query = 'SELECT stock_quantity FROM products WHERE ?'
        connection.query(query, [{id: answer.itemId}], function(err,res) {
            if (err) throw err;
            var newQuantity = res[0].stock_quantity + answer.quantity;
            var query = "UPDATE products SET ? WHERE ?";
            connection.query(query, [{stock_quantity: newQuantity}, {id: answer.itemId}], function(err,res) {
                if (err) throw err;
                console.log("Quantity successfully updated");
                runSearch();
            })
        })
    })
  };



function addProduct() {
      inquirer  
        .prompt([
            {
                type: "input",
                name: "Name",
                message: "Please add the Name of the Item: ",
            },
            {
                type: "input",
                name: "Department",
                message: "Please add the Name of the Department: ",
            },
            {
                type: "input",
                name: "Price",
                message: "Please add the Price of the Item: ",
            },
            {
                type: "input",
                name: "Quantity",
                message: "Please add the Quantity of the Item: ",
            }
        ]).then(function(answer) {
            var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + answer.Name + "','" + answer.Department + "','" + answer.Price + "','" + answer.Quantity + "')";
            console.log(query);
            connection.query(query ,function(err,res) {
                if(err) throw err;
                console.log("Item added!");
                runSearch();
            } )
        })
  }