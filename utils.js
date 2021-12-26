
// Util method to bulk add data to the database and return a promise

const bulkAdd = (data, model) => {
  return new Promise((resolve, reject) => {
    model.insertMany(data, (err, docs) => {
      if (err) {
        reject(err);
      }
      resolve(docs);
    });
  });
};

module.exports = { bulkAdd };