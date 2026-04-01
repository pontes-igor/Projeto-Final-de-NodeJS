const mongoose = require('mongoose')

let isConnected = false

async function startConnection () {
    if (isConnected || mongoose.connection.readyState === 1) {
        return
    }

    const uri = process.env.DATABASE_NOSQL_URI
    console.log('attempting MongoDB connection to:', uri)

    try {
        await mongoose.connect(uri)
        isConnected = true
        console.log('MongoDB connection established')
    } catch (err) {
        console.error('MongoDB connection error:', err.message)
        throw err
    }
}

async function closeConnection () {
    if (!isConnected && mongoose.connection.readyState !== 1) {
        return
    }
    await mongoose.disconnect()
    isConnected = false
}

module.exports = {
    startConnection,
    closeConnection
}