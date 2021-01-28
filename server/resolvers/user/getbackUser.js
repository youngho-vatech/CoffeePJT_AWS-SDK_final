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
            UpdateExpression: "set #position = :position, #status = :status", // 어떤 걸 수정할지 정해줘야합니다.
            ExpressionAttributeNames: {
                '#status':"status",
                '#position': "position"
            },
            ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
                ":status":"대기중",
                ":position": "주문자"
            }
        };
         dynamoDb.update(params).promise().then(result => params.Item)
        
    }
    
    return "해당 인원은 주문자로 다시 바뀌었습니다."
};