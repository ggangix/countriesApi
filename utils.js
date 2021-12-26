const bcrypt = require('bcrypt');

// Util method to bulk add data to the database and return a promise

const bulkAdd = (data, model, hasPassword) => {
  return new Promise((resolve, reject) => {
    // check if data has password and if so, encrypt it
    if (hasPassword) {
      data.forEach((item) => {
        item.password = bcrypt.hashSync(item.password, 10);
      });
    }

    model.insertMany(data, (err, docs) => {
      if (err) {
        reject(err);
      }
      resolve(docs);
    });
  });
};

module.exports = { bulkAdd };