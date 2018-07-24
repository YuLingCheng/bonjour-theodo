const mongojs = require('mongojs');

const getDatabase = () => {
    const mongoUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;
    console.log(mongoUri);
    return mongojs(mongoUri);
};

const insertPeople = people => {
    const db = getDatabase();
    const peopleManager = db.collection('people');
    peopleManager.insert(people, function(err, result) {
    if (err) throw err;
    console.log(`insert people ${JSON.stringify(people)}`);
    db.close();
  });
}

module.exports = { insertPeople };
