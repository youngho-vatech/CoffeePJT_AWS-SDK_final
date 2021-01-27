'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports =  async(_id,username) => {
    const dummy = "유저"
    const params = {
        TableName: process.env.USER_TABLE, 
        Key: {dummy, _id},
        UpdateExpression: "set username = :username", // 어떤 걸 수정할지 정해줘야합니다.
            
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":username": username
        }
    };
    const result = await dynamoDb.update(params).promise().then(result => params.Item)
    
    return result
};