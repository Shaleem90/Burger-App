// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const burger = {
  all: cb => {
    orm.all("burgers", res => {
        cb(res);
    });
  },

  create: (cols, vals, cb) => {
    orm.create("burgers", cols, vals, res => {
      cb(res);
    })
  },
  update: (objColVals, condition, cb) => {
    orm.update("burgers", objColVals, condition, res => {
      cb(res);
    });
  },

}
// Export burger_controller.js).
module.exports = burger;