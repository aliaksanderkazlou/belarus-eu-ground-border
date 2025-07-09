import { MongoClient } from "mongodb";

const uri = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(uri);

const shiftFromMinskToUTC = (date) => {
  const minskOffset = 3 * 60;
  const corrected = new Date(date.getTime() - minskOffset * 60000);
  return corrected.toISOString();
}

export async function main(args) {
  const { checkpoint, range } = args;

  if (!checkpoint || typeof range !== "string") {
    return {
      statusCode: 400,
      body: "Missing or invalid 'checkpoint' or 'range'",
    };
  }

  const now = new Date();
  const toDate = new Date(now);
  toDate.setDate(now.getDate() + 1);

  const rangeToConfig = {
    today: { from: new Date(now.setHours(0, 0, 0, 0)), raw: true },
    "3d": { from: new Date(now.setDate(now.getDate() - 2)), raw: true },
    "5d": { from: new Date(now.setDate(now.getDate() - 4)), unit: "hour", binSize: 12 },
    "10d": { from: new Date(now.setDate(now.getDate() - 6)), unit: "day" },
    "1m": { from: new Date(now.setMonth(now.getMonth() - 1)), unit: "day" },
    "1y": { from: new Date(now.setFullYear(now.getFullYear() - 1)), unit: "day" },
    all: { from: new Date("2022-01-01"), unit: "day" },
  };

  const config = rangeToConfig[range];
  if (!config) {
    return {
      statusCode: 400,
      body: "Invalid range value",
    };
  }

  try {
    await client.connect();
    const db = client.db("useful-collections");
    const collection = db.collection("border-data");

    if (config.raw) {
      const results = await collection
        .find({
          checkpoint,
          datetime: { $gte: config.from, $lte: toDate },
        })
        .project({ _id: 0, datetime: 1, cars: 1, buses: 1, trucks: 1 })
        .sort({ datetime: 1 })
        .toArray();

      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: results.map((r) => ({
          ...r,
          datetime: shiftFromMinskToUTC(new Date(r.datetime)),
        })),
      };
    } else {
      const results = await collection
        .aggregate([
          {
            $match: {
              checkpoint,
              datetime: { $gte: config.from, $lte: toDate },
            },
          },
          {
            $addFields: {
              bucket: {
                $dateTrunc: {
                  date: "$datetime",
                  unit: config.unit,
                  ...(config.binSize ? { binSize: config.binSize } : {}),
                },
              },
            },
          },
          {
            $group: {
              _id: "$bucket",
              avgCars: { $avg: "$cars" },
              avgBuses: { $avg: "$buses" },
              avgTrucks: { $avg: "$trucks" },
            },
          },
          { $sort: { _id: 1 } },
          {
            $project: {
              _id: 0,
              datetime: "$_id",
              cars: { $round: ["$avgCars", 0] },
              buses: { $round: ["$avgBuses", 0] },
              trucks: { $round: ["$avgTrucks", 0] },
            },
          },
        ])
        .toArray();

      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: results.map((r) => ({
          ...r,
          datetime: shiftFromMinskToUTC(new Date(r.datetime)),
        })),
      };
    }
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: { success: false, error: err.message },
    };
  } finally {
    await client.close();
  }
}

function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}