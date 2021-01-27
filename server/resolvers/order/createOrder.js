'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = async (data) => {
    const _id = data._id
    const dummy = "유저"
    
    const userparams = {
        TableName: process.env.USER_TABLE,
        Key: { dummy, _id }
    };
    const user = await dynamoDb.get(userparams).promise()
    const updateparams = {
        TableName: process.env.USER_TABLE, 
        Key: {dummy, _id},
        UpdateExpression: "set #status = :status", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeNames: {
            '#status': "status"
        },
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":status": "주문완료",
            
        }
    };
    await dynamoDb.update(updateparams).promise().then(result => updateparams.Item)
    const params = {
        TableName: process.env.ORDER_TABLE,
        Item: {
            menu: data.menu,
            hi: data.hi,
            username: user.Item.username,
            _id: uuid.v1(),
            createdAt: String(Date.now()),
            dummy:"주문"
        }
    };
    const result = await dynamoDb.put(params).promise().then(result => params.Item);
    console.log(result)
    return result
};