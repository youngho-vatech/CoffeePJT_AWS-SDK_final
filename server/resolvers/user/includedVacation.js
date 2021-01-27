'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async() => {
    const result = dynamoDb.query({ 
    TableName: process.env.USER_TABLE,
    KeyConditionExpression:"dummy = :dummy",
    FilterExpression: "#position = :position",
    ExpressionAttributeNames: {
        '#position': "position"
    },
    ExpressionAttributeValues: {
        ":dummy":"유저",
        ":position": "휴가자"
    }  

 }).promise().then(r => r.Items)
 console.log(result)
 return result
};