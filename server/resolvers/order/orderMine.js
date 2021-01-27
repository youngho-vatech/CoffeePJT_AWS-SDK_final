'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = async (id) => {
    let dummy = "유저"
    let _id = id
    
    
    const userparams = {
        TableName: process.env.USER_TABLE,
        Key: { dummy,_id }
    };
    const user = await dynamoDb.get(userparams).promise()
    console.log(user)
    dummy = "주문"
    const result = await dynamoDb.query({
        TableName: process.env.ORDER_TABLE,
        KeyConditionExpression:"dummy = :dummy",
        FilterExpression: "username = :username",
        ExpressionAttributeValues: {
            ":dummy":dummy,
            ":username": user.Item.username,
        }   
    }).promise().then(r => r.Items);
    console.log(result)
    return result
};