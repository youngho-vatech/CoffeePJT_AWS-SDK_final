'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async() => {
    const people = await dynamoDb.query({
        TableName: process.env.USER_TABLE,
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
        }
    }).promise().then(r => r.Items)
    const number = [0,0,0,0]
    console.log(people)
    for (let i = 0; i < people.length; i++) {
        if (people[i].status === "주문완료") {
            number[0]++;
        }
        else if(people[i].status === "주문취소"){
            number[1]++;
        }
        else if(people[i].status === "주문포기"){
            number[2]++;
        }
        else{
            number[3]++;
        }
        
    }
    return number
};