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
      const result = await db.collection('emissionlogs').updateMany(
        { userId: user._id.toString() },
        { $set: { userId: user.userId } }
      );
      if (result.modifiedCount > 0) {
        console.log(`Updated ${result.modifiedCount} emission logs for user ${user.name}`);
        updated += result.modifiedCount;
      }
    }
    console.log(`Total emission logs updated: ${updated}`);
  } catch (err) {
    console.error('Error updating emission logs:', err);
  } finally {
    await client.close();
  }
})(); 