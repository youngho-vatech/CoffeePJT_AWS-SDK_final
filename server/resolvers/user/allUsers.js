'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async() => {
    const result = await dynamoDb.scan({ 
        TableName: process.env.USER_TABLE,
        IndexName: "username_index",
    })
    .promise()
    .then(r => r.Items)

    console.log("allusers")
    return result
};