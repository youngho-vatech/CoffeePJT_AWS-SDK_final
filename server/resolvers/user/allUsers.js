'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async() => {
    const result = await dynamoDb.scan({ TableName: process.env.USER_TABLE })
    .promise()
    .then(r => r.Items)

    console.log("allusers")
    return result
};