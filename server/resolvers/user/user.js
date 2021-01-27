'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async (word, category) => {
    let result=[]
    if (word == "") return result
    result =  await dynamoDb.scan({
        TableName: process.env.USER_TABLE,
        FilterExpression: "contains(#username, :username)",
        ExpressionAttributeNames: {
            "#username": "username",
        },
        ExpressionAttributeValues: {
            ":username": word,
        }
    }).promise().then(r => r.Items);

    console.log(result)
    console.log("user")
    return result

};