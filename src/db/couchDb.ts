import Nano from "nano";
import "dotenv/config";

const couchdbUrl = `${process.env.COUCH_DB_URL}`;

const couch = Nano(couchdbUrl);

const databases = {
  users: createDatabase('users'),
  gameRoom: createDatabase('gameroom'),
  messages: createDatabase('messages'), 

};

async function createDatabase(dbName: string) {
  const dbExists = await couch.db.get(dbName).catch((err) => {
    if (err.statusCode === 404) {
      return false;
    } else {
      throw err;
    }
  });

  if (!dbExists) {
    //creates database if it doesn't exist
    await couch.db.create(dbName);
  }
  //get a reference to the database if exists
  return couch.use(dbName);
}

export { databases }; //in other file this would be database.user.create for example
