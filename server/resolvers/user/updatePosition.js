'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports =  (ids) => {
    for (let i = 0; i < ids.length; i++) {
        const _id = ids[i]
        const dummy = "유저"
        const params = {
            TableName: process.env.USER_TABLE, 
            Key: {dummy,_id},
            UpdateExpression: "set #position = :position", // 어떤 걸 수정할지 정해줘야합니다.
            ExpressionAttributeNames: {
                '#position': "position"
            },
            ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
                ":position": "휴가자"
            }
        };
         dynamoDb.update(params).promise().then(result => params.Item)
        
    }
    
    return "휴가자 등록이 완료 되었습니다."
};