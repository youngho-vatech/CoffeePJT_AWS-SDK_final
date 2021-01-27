'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    const _id = data.userid
    const dummy = "유저"
    
    const userparams = {
        TableName: process.env.USER_TABLE, 
        Key: {dummy, _id},
        UpdateExpression: "set #status = :status", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeNames: {
            '#status': "status"
        },
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":status": "주문포기",
        }
    }
    dynamoDb.update(userparams).promise()
    return "주문을 포기하셨습니다."
};