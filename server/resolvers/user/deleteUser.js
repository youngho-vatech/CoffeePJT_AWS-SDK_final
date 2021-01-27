'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async(ids) => {
    for (let i = 0; i < ids.length; i++) {
        const _id = ids[i]
        const dummy = "유저"
        const params = {
            TableName: process.env.USER_TABLE,
            Key: {dummy, _id}
        };
        await dynamoDb.delete(params).promise()
        
    }
    return "유저가 삭제 되었습니다."
};