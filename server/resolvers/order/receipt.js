'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
    const orders = await dynamoDb.scan({ TableName: process.env.ORDER_TABLE }).promise().then(r => r.Items);
    const orderV = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let mention = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].menu === "아메리카노" && orders[i].hi === "hot") {
            orderV[0]++;
        }
        else if (orders[i].menu === "아메리카노" && orders[i].hi === "ice") {
            orderV[1]++;
        }
        else if (orders[i].menu === "카페라떼" && orders[i].hi === "hot") {
            orderV[2]++;
        }
        else if (orders[i].menu === "카페라떼" && orders[i].hi === "ice") {
            orderV[3]++;
        }
        else if (orders[i].menu === "바닐라라떼" && orders[i].hi === "hot") {
            orderV[4]++;
        }
        else if (orders[i].menu === "바닐라라떼" && orders[i].hi === "ice") {
            orderV[5]++;
        }
        else if (orders[i].menu === "카페모카" && orders[i].hi === "hot") {
            orderV[6]++;
        }
        else if (orders[i].menu === "카페모카" && orders[i].hi === "ice") {
            orderV[7]++;
        }
        else if (orders[i].menu === "아시나요" && orders[i].hi === "icecream") {
            orderV[8]++;
        }
        else if (orders[i].menu === "돼지콘" && orders[i].hi === "icecream") {
            orderV[9]++;
        }
        else if (orders[i].menu === "브라보" && orders[i].hi === "icecream") {
            orderV[10]++;
        }
        else if (orders[i].menu === "녹차마루" && orders[i].hi === "icecream") {
            orderV[11]++;
        }
        else if (orders[i].menu === "아이스티" && orders[i].hi === "etc") {
            orderV[12]++;
        }
        else if (orders[i].menu === "망고 요거트 스무디" && orders[i].hi === "etc") {
            orderV[13]++;
        }
        else if (orders[i].menu === "딸기 요거트 스무디" && orders[i].hi === "etc") {
            orderV[14]++;
        }
        else if (orders[i].menu === "플레인 요거트 스무디" && orders[i].hi === "etc") {
            orderV[15]++;
        }
    }
    for (let i = 0; i < orderV.length; i++) {
        if (orderV[i] != 0 && i == 0) {
            mention[i] = "Hot 아메리카노 : " + orderV[i] + "잔"
        }
        else if (orderV[i] != 0 && i == 1) {
            mention[i] = "Ice 아메리카노 : " + orderV[i] + "잔"
        }
        else if (orderV[i] != 0 && i == 2) {
            mention[i] = "Hot 카페라떼 : " + orderV[i] + "잔"
        }
        else if (orderV[i] != 0 && i == 3) {
            mention[i] = "Ice 카페라떼 : " + orderV[i] + "잔"
        }
        else if (orderV[i] != 0 && i == 4) {
            mention[i] = "Hot 바닐라라떼 : " + orderV[i] + "잔"
        }
        else if (orderV[i] != 0 && i == 5) {
            mention[i] = "Ice 바닐라라떼 : " + orderV[i] + "잔"
        }
        else if (orderV[i] != 0 && i == 6) {
            mention[i] = "Hot 카페모카 : " + orderV[i] + "잔"
        }
        else if (orderV[i] != 0 && i == 7) {
            mention[i] = "Ice 카페모카 : " + orderV[i] + "잔"
        }
        else if (orderV[i] != 0 && i == 8) {
            mention[i] = "아시나요 : " + orderV[i] + "개"
        }
        else if (orderV[i] != 0 && i == 9) {
            mention[i] = "돼지콘 : " + orderV[i] + "개"
        }
        else if (orderV[i] != 0 && i == 10) {
            mention[i] = "브라보 : " + orderV[i] + "개"
        }
        else if (orderV[i] != 0 && i == 11) {
            mention[i] = "녹차마루 : " + orderV[i] + "개"
        }
        else if (orderV[i] != 0 && i == 12) {
            mention[i] = "아이스티 : " + orderV[i] + "잔"
        }
        else if (orderV[i] != 0 && i == 13) {
            mention[i] = "망고 요거트 스무디 : " + orderV[i] + "잔"
        }
        else if (orderV[i] != 0 && i == 14) {
            mention[i] = "딸기 요거트 스무디 : " + orderV[i] + "잔"
        }
        else if (orderV[i] != 0 && i == 15) {
            mention[i] = "플레인 요거트 스무디 : " + orderV[i] + "잔"
        }
    }
    return mention
};