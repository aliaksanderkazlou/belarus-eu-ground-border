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
        checkpoints: [],
        lastUpdatedAt: null,
      };

      for (const checkpoint of pair) {
        const records = await data
          .find({ checkpoint: checkpoint.name })
          .sort({ datetime: -1 })
          .limit(2)
          .toArray();

        if (records.length === 0) {
          pairResult.checkpoints.push({
            name: checkpoint.name,
            title: checkpoint.title,
            latest: null,
            delta: null,
          });
          continue;
        }

        const latest = records[0];
        const previous = records[1] || null;

        const calculateDelta = (key) =>
          previous ? latest[key] - previous[key] : null;

        pairResult.checkpoints.push({
          name: checkpoint.name,
          title: checkpoint.title,
          latest: {
            datetime: latest.datetime,
            buses: latest.buses,
            cars: latest.cars,
            trucks: latest.trucks || null,
          },
          delta: {
            buses: calculateDelta("buses"),
            cars: calculateDelta("cars"),
            trucks: calculateDelta("trucks"),
          },
        });

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
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify(results),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: {
        success: false,
        error: err.message,
      }
    };
  } finally {
    await client.close();
  }
}