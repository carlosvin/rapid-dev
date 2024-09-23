import * as mongoDB from 'mongodb';

// Class to connect to MongoDB
export class Db {
	private _db?: mongoDB.Db;
	private _client?: mongoDB.MongoClient;

	// Getter to get the Mongodb DB instance
	get db() {
		if (!this._db) {
			throw new Error('Database not connected');
		}

		return this._db;
	}

	// Get the collection "teams" from the DB
	get teams() {
		return this.db.collection('teams');
	}

	// Connect to MongoDB DB connection URL and DB name
	async connect(dbUrlConnection: string, dbName: string) {
		if (this._db) {
			console.debug('Already connected to MongoDB');
			return;
		}
		this._client = await new mongoDB.MongoClient(dbUrlConnection).connect();
		this._db = this._client.db(dbName);
		console.info('Connected to MongoDB', this.db.databaseName);
	}
}

// Export the instance of the Db helper class
export const DB = new Db();
