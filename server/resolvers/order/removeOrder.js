'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async(userid, orderid) => {
    let _id = userid
    let dummy = "유저"
    const userparams = {
        TableName: process.env.USER_TABLE, 
        Key: {dummy, _id},
        UpdateExpression: "set #status = :status", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeNames: {
            '#status': "status"
        },
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":status": "주문취소",
        }
    }
    let result = await dynamoDb.update(userparams).promise()
    
    _id = orderid
    dummy = "주문"
    const params = {
        TableName: process.env.ORDER_TABLE,
        Key: { dummy,_id }
    };
    
    result = await dynamoDb.delete(params).promise() 
    console.log(result)
    return result
};