'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async(_id) => {
    const dummy = "유저"
    const params = {
        TableName: process.env.USER_TABLE,
        Key: { dummy,_id }
    };
    const result = await dynamoDb.get(params).promise();
    console.log(result.Item)
    console.log("me")
    return result.Item
};