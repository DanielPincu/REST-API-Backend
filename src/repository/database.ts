import mongoose from 'mongoose';

export async function connect() {
    try {
        if (!process.env.DBHOST) {
            throw new Error('DBHOST is not defined in environment variables');
        }
        await mongoose.connect(process.env.DBHOST);
        if (mongoose.connection.db?.admin().command({ ping: 1 })) {
            console.log('Database connected successfully');
        }

        else {
            console.error('Database connection failed');
        }
    }

    catch (error) {
        console.error('Database connection error:', error);
    }
}

export async function disconnect() {
    try {
        await mongoose.disconnect();
        console.log('Database disconnected successfully');
    }

    catch (error) {
        console.error('Database disconnection error:', error);
    }
}