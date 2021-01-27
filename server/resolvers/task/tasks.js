'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async() => {
    const result = await dynamoDb.scan({ TableName: process.env.TASK_TABLE }).promise().then(r => r.Items)
    if(result.length == 0) return null
    console.log(result)
    console.log("tasks")
    return result
};