// Import MySQL connection.
const connection = require("../config/connection.js");


function printQuestionMarks(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  }
  
  //Covert to SQL syntax
  function objToSql(ob) {
    let arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
      let value = ob[key];
      
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations 
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
  
   
    return arr.toString();
  }
  
  // Object for all our SQL statement functions.
  const orm = {
    all: (tableInput, cb) => {
      const queryString = `SELECT * FROM ${tableInput};`;
      connection.query(queryString, (err, result) => {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    create: (table, cols, vals, cb) => {
      const queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`

      console.log(queryString);
  
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    
    update: (table, objColVals, condition, cb) => {
      const queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;

      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

  };

// Export the orm object for the model (burger.js).
module.exports = orm;