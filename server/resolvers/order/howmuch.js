'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
    const orders = await dynamoDb.scan({ TableName: process.env.ORDER_TABLE }).promise();
    let sum = 0
    console.log(orders)
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].menu === "아메리카노") {

            sum += 2000;
        }
        else if (orders[i].menu === "카페라떼") {

            sum += 2500;
        }
        else if (orders[i].menu === "바닐라라떼") {

            sum += 3000;
        }
        else if (orders[i].menu === "카페모카") {

            sum += 3000;
        }
        else if (orders[i].menu === "아시나요") {

            sum += 3000;
        }
        else if (orders[i].menu === "돼지콘") {

            sum += 3000;
        }
        else if (orders[i].menu === "브라보") {

            sum += 3000;
        }
        else if (orders[i].menu === "녹차마루") {

            sum += 3000;
        }
        else if (orders[i].menu === "아이스티") {

            sum += 2000;
        }
        else if (orders[i].menu === "망고 요거트 스무디") {

            sum += 3400;
        }
        else if (orders[i].menu === "딸기 요거트 스무디") {

            sum += 3400;
        }
        else if (orders[i].menu === "플레인 요거트 스무디") {

            sum += 3400;
        }
    }
    return sum;
};