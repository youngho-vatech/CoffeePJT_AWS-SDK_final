'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    let _id = data._id
    let title = data.title
    let dummy = "게시글"
    const params = {
        TableName: process.env.TASK_TABLE, 
        Key: {dummy, _id},
        UpdateExpression: "set title = :title", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":title": title
        }
    };
    return dynamoDb.update(params).promise()
        .then(result => params.Item)
};