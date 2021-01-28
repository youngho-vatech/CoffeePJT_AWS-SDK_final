'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = async (data) => {
    let dummy = "유저"
    let _id = data._id
    let username = data.username
    const personparam = {
        TableName: process.env.USER_TABLE,
        Key: { dummy, _id },
    }
    const person = await dynamoDb.get(personparam).promise()
    console.log(person.Item.username)

    const params = {
        TableName: process.env.USER_TABLE,
        Key: { dummy, _id },
        UpdateExpression: "set username = :username", // 어떤 걸 수정할지 정해줘야합니다.

        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":username": username
        }
    };
    const result = await dynamoDb.update(params).promise().then(result => params.Item)

    if (person.Item.status == "주문완료") {
        const updated = await dynamoDb.query({
            TableName: process.env.ORDER_TABLE,
            KeyConditionExpression: "dummy = :dummy",
            FilterExpression: "#username = :username",
            ExpressionAttributeNames: {
                '#username': "username"
            },
            ExpressionAttributeValues: {
                ":dummy": "주문",
                ":username": person.Item.username
            }
        }).promise().then(r => r.Items)
        console.log(updated)
        _id = updated[0]._id
        console.log(_id)

        dummy = "주문"
        const orderparams = {
            TableName: process.env.ORDER_TABLE,
            Key: { dummy, _id },
            UpdateExpression: "set #username = :username", // 어떤 걸 수정할지 정해줘야합니다.
            ExpressionAttributeNames: {
                '#username': "username"
            },
            ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
                ":username": username
            }
        };
        const oresult = await dynamoDb.update(orderparams).promise().then(result => orderparams.Item)

        console.log(oresult)
    }



    return result
};