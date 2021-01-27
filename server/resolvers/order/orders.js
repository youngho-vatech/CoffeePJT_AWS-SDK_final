'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async() => {
    const result = await dynamoDb.query({ 
        TableName: process.env.ORDER_TABLE,
        KeyConditionExpression:"dummy = :dummy",
        ExpressionAttributeValues: {
            ":dummy":"주문"
        }  
     }).promise().then(r => r.Items)
     console.log(result)
     return result
    // if(hi=="icecream"){
    //     return dynamoDb.scan({
    //         TableName: process.env.ORDER_TABLE,
    //         FilterExpression: "#hi = :hi",
    //         ExpressionAttributeNames: {
    //             "#hi": "hi",
    //         },
    //         ExpressionAttributeValues: {
    //             ":hi": hi,
    //         }   
    //     }).promise().then(r => r.Items);
    // }
    // else if(hi=="etc"){
    //     return dynamoDb.scan({
    //         TableName: process.env.ORDER_TABLE,
    //         FilterExpression: "#hi = :hi",
    //         ExpressionAttributeNames: {
    //             "#hi": "hi"
    //         },
    //         ExpressionAttributeValues: {
    //             ":hi": hi
    //         }   
    //     }).promise().then(r => r.Items);
    // }
    // else{
    //     return dynamoDb.scan({
    //         TableName: process.env.ORDER_TABLE,
    //         FilterExpression: "NOT #hi in (:hi1, :hi2)",
    //         ExpressionAttributeNames: {
    //             "#hi": "hi"
    //         },
    //         ExpressionAttributeValues: {
    //             ":hi1": "icecream",
    //             ":hi2": "etc"
    //         }   
    //     }).promise().then(r => r.Items);
    // }
}