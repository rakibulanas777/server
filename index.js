const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wrj79b8.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

async function run() {
	try {
		await client.connect();
		const database = client.db("restCountries");
		const countries = database.collection("countries");

		app.get("/countries", async (req, res) => {
			const query = {};
			const cursor = countries.find(query);
			const restCountries = await cursor.toArray();
			res.send(restCountries);
		});
	} finally {
	}
}
app.get("/", (req, res) => {
	res.send("Hello from server");
});
run().catch(console.dir);

app.listen(port, () => {
	console.log("Listening to port", port);
});
