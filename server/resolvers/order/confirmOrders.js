'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async() => {
    const orders = await dynamoDb.scan({ TableName: process.env.ORDER_TABLE }).promise();
    const tasks = await dynamoDb.scan({ TableName: process.env.TASK_TABLE }).promise();
    const users = await dynamoDb.scan({ TableName: process.env.USER_TABLE }).promise();

    for (let i = 0; i < orders.Items.length; i++) {
        let _id = orders.Items[i]._id
        let dummy = "주문"
        const params = {
            TableName: process.env.ORDER_TABLE,
            Key: { dummy,_id}
        };
        await dynamoDb.delete(params).promise().then(result => true)
    }
    for (let i = 0; i < tasks.Items.length; i++) {
        let _id = tasks.Items[i]._id
        let dummy = "게시글"
        const params = {
            TableName: process.env.TASK_TABLE,
            Key: { dummy,_id}
        };
        await dynamoDb.delete(params).promise().then(result => true)
        
    }
    for (let i = 0; i < users.Items.length; i++) {
        let _id = users.Items[i]._id
        console.log(_id)
        const dummy = "유저"
        const params = {
            TableName: process.env.USER_TABLE, 
            Key: {dummy,_id},
            UpdateExpression: "set status = :status, position = :position", // 어떤 걸 수정할지 정해줘야합니다.
            ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
                ":status": "대기중",
                ":position": "주문자"
            }
        };
        await dynamoDb.update(params).promise().then(result => params.Item)
        
    }

    return "주문이 완료되었습니다. 맛있게 드세요!"
};