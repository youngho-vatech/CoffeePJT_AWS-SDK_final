'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async(data) => {
    let _id = data._id
    let dummy = "게시글"
    let params = {
        TableName: process.env.TASK_TABLE,
        Key: { dummy,_id }
    };
    const result = await dynamoDb.delete(params).promise()

    _id = data.userid
    dummy = "유저"
    params = {
        TableName: process.env.USER_TABLE,
        Key: {dummy,_id},
        UpdateExpression: "set #position = :position", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeNames: {
            '#position': "position"
        },
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":position": "주문자"
        }
    }
    await dynamoDb.update(params).promise()


    return result
};