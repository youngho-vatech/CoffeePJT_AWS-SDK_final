'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = async (data) => {
    const isthere = await dynamoDb.scan({ TableName: process.env.TASK_TABLE }).promise()
    
    if(isthere.Items.length != 0) return "이미 진행중인 주문이 있습니다."

    let _id = data.userid
    let dummy = "유저"
    console.log(_id)
    let params = {
        TableName: process.env.USER_TABLE,
        Key: { dummy, _id }
    };
    const user = await dynamoDb.get(params).promise()
    
    const creater = user.Item.username
    console.log(creater)
    params = {
        TableName: process.env.USER_TABLE, 
        Key: {dummy, _id},
        UpdateExpression: "set #position = :position", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeNames: {
            '#position': "position"
        },
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":position": "결제자"
        }
    };
    const uuser = await dynamoDb.update(params).promise()
    console.log("userupdate",uuser.Item)
    
    params = {
        TableName: process.env.TASK_TABLE,
        Item: {
            creater: creater,
            title: data.title,
            _id: uuid.v1(),
            createdAt: String(Date.now()),
            dummy:"게시글"
        }
    };
    const result = await dynamoDb.put(params).promise().then(result => params.Item)
    return result
};