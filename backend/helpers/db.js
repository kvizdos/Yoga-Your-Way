const MongoClient = require("mongodb");

const find = (collection, query) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true }, function(err, db) {
          if (err) throw err;
          var dbo = db.db("yogayourway");
          dbo.collection(collection).findOne(query, function(err, result) {
            if (err) throw err;

            db.close();

            resolve(result);

          });
        });
    })
}

const insert = (collection, item) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true }, function(err, db) {
          if (err) throw err;
          var dbo = db.db("yogayourway");
          dbo.collection(collection).insertOne(item, function(err, result) {
            if (err) throw err;

            db.close();

            resolve(result);

          });
        });
    })
}

exports.find = find;
exports.insert = insert;