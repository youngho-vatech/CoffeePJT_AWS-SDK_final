'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async() => {
    const people = await dynamoDb.scan({TableName: process.env.USER_TABLE}).promise().then(r => r.Items);
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