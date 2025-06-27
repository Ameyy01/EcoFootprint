const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecofootprint';
const client = new MongoClient(uri);

(async () => {
  try {
    await client.connect();
    const db = client.db();
    const users = await db.collection('users').find({}).toArray();
    let updated = 0;
    for (const user of users) {
      // Sum all emission logs for this user
      const agg = await db.collection('emissionlogs').aggregate([
        { $match: { userId: user.userId } },
        { $group: { _id: null, total: { $sum: "$totalEmissionKg" } } }
      ]).toArray();
      const totalEmission = agg.length > 0 ? agg[0].total : 0;
      // Update the user document
      const result = await db.collection('users').updateOne(
        { _id: user._id },
        { $set: { totalEmissionKg: Number(totalEmission.toFixed(2)) } }
      );
      if (result.modifiedCount > 0) {
        console.log(`Updated user ${user.name} with totalEmissionKg: ${totalEmission}`);
        updated++;
      }
    }
    console.log(`Total users updated: ${updated}`);
  } catch (err) {
    console.error('Error backfilling user total emissions:', err);
  } finally {
    await client.close();
  }
})(); 