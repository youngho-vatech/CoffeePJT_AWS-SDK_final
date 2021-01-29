'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
    const result = await dynamoDb.query({
        TableName: process.env.USER_TABLE,
        IndexName: "username_index",
        KeyConditionExpression: "dummy = :dummy",
        FilterExpression: "#status = :status and #position <> :position",
        ExpressionAttributeNames: {
            '#status': "status",
            '#position': "position"
        },
        ExpressionAttributeValues: {
            ":dummy": "유저",
            ":status": "대기중",
            ":position": "휴가자"
        },
        ScanIndexForward:true
    }).promise().then(r => r.Items)
    console.log(result)
    return result
};