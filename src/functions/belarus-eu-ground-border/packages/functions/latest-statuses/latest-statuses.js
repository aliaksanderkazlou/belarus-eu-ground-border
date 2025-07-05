import { MongoClient } from "mongodb";

const uri = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(uri);

export async function main() {
  try {
    await client.connect();

    const db = client.db("useful-collections");
    const connections = db.collection("border-checkpoint-connections");
    const data = db.collection("border-data");

    const connectionDocs = await connections.find().toArray();

    const results = [];

    for (const connection of connectionDocs) {
      const pair = connection.checkpoints;

      const pairResult = {
        checkpoints: {},
        lastUpdatedAt: null,
      };

      for (const checkpoint of pair) {
        const records = await data
          .find({ checkpoint: checkpoint.name })
          .sort({ datetime: -1 })
          .limit(2)
          .toArray();

        if (records.length === 0) {
          pairResult.checkpoints[checkpoint.name] = null;
          continue;
        }

        const latest = records[0];
        const previous = records[1] || null;

        const calcDelta = (key) =>
          previous ? latest[key] - previous[key] : null;

        pairResult.checkpoints[checkpoint.name] = {
          latest: {
            datetime: latest.datetime,
            buses: latest.buses,
            cars: latest.cars,
            trucks: latest.trucks || null,
          },
          delta: {
            buses: calcDelta("buses"),
            cars: calcDelta("cars"),
            trucks: calcDelta("trucks"),
          },
        };

        if (
          !pairResult.lastUpdatedAt ||
          latest.datetime > pairResult.lastUpdatedAt
        ) {
          pairResult.lastUpdatedAt = latest.datetime;
        }
      }

      results.push(pairResult);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  } finally {
    await client.close();
  }
}