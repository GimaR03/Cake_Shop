/**
 * Script to fix email index issue in MongoDB
 * This removes any unique index on email field that might be causing registration issues
 * Run with: node scripts/fixEmailIndex.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

const fixEmailIndex = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('users');

    // Get all indexes
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes);

    // Check if there's a unique index on email
    const emailIndex = indexes.find(idx => 
      idx.key && idx.key.email && idx.unique === true
    );

    if (emailIndex) {
      console.log('⚠️  Found unique index on email field');
      console.log('   Index name:', emailIndex.name);
      console.log('   Dropping unique index on email...');
      
      // Drop the unique index
      await collection.dropIndex(emailIndex.name);
      console.log('✅ Unique index on email removed');
      
      // Create a sparse index instead (allows multiple null/undefined values)
      await collection.createIndex(
        { email: 1 }, 
        { 
          unique: true, 
          sparse: true,
          name: 'email_1_sparse'
        }
      );
      console.log('✅ Created sparse unique index on email (allows multiple null values)');
    } else {
      console.log('✅ No unique index found on email field');
      console.log('   Email field should work correctly with sparse: true');
    }

    // Verify username has unique index
    const usernameIndex = indexes.find(idx => 
      idx.key && idx.key.username && idx.unique === true
    );
    
    if (!usernameIndex) {
      console.log('⚠️  No unique index found on username');
      console.log('   Creating unique index on username...');
      await collection.createIndex({ username: 1 }, { unique: true });
      console.log('✅ Created unique index on username');
    } else {
      console.log('✅ Username has unique index');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing email index:', error.message);
    console.error('   Full error:', error);
    process.exit(1);
  }
};

// Run the script
fixEmailIndex();

