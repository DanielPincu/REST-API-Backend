import mongoose from 'mongoose';

export async function connect() {
  try {
    if (!process.env.DBHOST) {
      throw new Error('DBHOST environment variable is not defined');
    }
    await mongoose.connect(process.env.DBHOST);

    // ping the server to check if we have a connection
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().command({ ping: 1 });
      //console.log('Connection established');
    }
    else {
      throw new Error('Database connection is not established');
    }

  }
  catch (error) {
    console.log('Error connecting to the database. Error: ' + error);
  }
}


export async function disconnect() {
  try {
    await mongoose.disconnect();
    console.log('Connection closed');
  }
  catch (error) {
    console.log('Error closing database connection. Error: ' + error);
  }
}