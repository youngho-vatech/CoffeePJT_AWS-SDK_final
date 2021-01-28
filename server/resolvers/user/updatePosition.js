'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = async (ids) => {
    for (let i = 0; i < ids.length; i++) {
        let _id = ids[i]
        let dummy = "유저"
        const params = {
            TableName: process.env.USER_TABLE,
            Key: { dummy, _id },
            UpdateExpression: "set #position = :position", // 어떤 걸 수정할지 정해줘야합니다.
            ExpressionAttributeNames: {
                '#position': "position"
            },
            ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
                ":position": "휴가자"
            }
        };
        await dynamoDb.update(params).promise().then(result => params.Item)

        const userparams = {
            TableName: process.env.USER_TABLE,
            Key: { dummy, _id }
        };
        const result = await dynamoDb.get(userparams).promise().then(r => r.Item);
        
        if (result.status == "주문완료") {
            const updated = await dynamoDb.query({
                TableName: process.env.ORDER_TABLE,
                KeyConditionExpression: "dummy = :dummy",
                FilterExpression: "#username = :username",
                ExpressionAttributeNames: {
                    '#username': "username"
                },
                ExpressionAttributeValues: {
                    ":dummy": "주문",
                    ":username": result.username
                }
            }).promise().then(r => r.Items)
            if (updated) {
                _id = updated[0]._id

                dummy = "주문"
                const orderparams = {
                    TableName: process.env.ORDER_TABLE,
                    Key: { dummy, _id }
                };

                await dynamoDb.delete(orderparams).promise().then(r => r.Item);
            }

        }

    }

    return "휴가자 등록이 완료 되었습니다."
};