'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    const params = {
        TableName: process.env.USER_TABLE,
        Item: {
            username: data.username,
            status: "대기중",
            position: "주문자",
            _id: uuid.v1(),
            createdAt: String(Date.now()),
            dummy:"유저"
        }
    };
    
    return dynamoDb.put(params).promise()
        .then(result => params.Item)
};