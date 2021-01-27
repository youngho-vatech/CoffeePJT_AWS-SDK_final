module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./handler/handler.js":
/*!****************************!*\
  !*** ./handler/handler.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "queryhandler": () => /* binding */ queryhandler
/* harmony export */ });
const express = __webpack_require__(/*! express */ "express");

const serverless = __webpack_require__(/*! serverless-http */ "serverless-http");

const graphiql = __webpack_require__(/*! graphql-playground-middleware-express */ "../../../node_modules/graphql-playground-middleware-express/dist/index.js");

const {
  ApolloServer,
  gql
} = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");

const schema = __webpack_require__(/*! ../schema/schema */ "./schema/schema.js");

const app = express();
const server = new ApolloServer({
  schema,
  path: "/graphql"
});
server.applyMiddleware({
  app
});
const queryhandler = serverless(app);


/***/ }),

/***/ "./resolvers/order/confirmOrders.js":
/*!******************************************!*\
  !*** ./resolvers/order/confirmOrders.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  const orders = await dynamoDb.scan({
    TableName: process.env.ORDER_TABLE
  }).promise();
  const tasks = await dynamoDb.scan({
    TableName: process.env.TASK_TABLE
  }).promise();
  const users = await dynamoDb.scan({
    TableName: process.env.USER_TABLE
  }).promise();

  for (let i = 0; i < orders.Items.length; i++) {
    let _id = orders.Items[i]._id;
    let dummy = "주문";
    const params = {
      TableName: process.env.ORDER_TABLE,
      Key: {
        dummy,
        _id
      }
    };
    await dynamoDb.delete(params).promise().then(result => true);
  }

  for (let i = 0; i < tasks.Items.length; i++) {
    let _id = tasks.Items[i]._id;
    let dummy = "게시글";
    const params = {
      TableName: process.env.TASK_TABLE,
      Key: {
        dummy,
        _id
      }
    };
    await dynamoDb.delete(params).promise().then(result => true);
  }

  for (let i = 0; i < users.Items.length; i++) {
    let _id = users.Items[i]._id;
    console.log(_id);
    const dummy = "유저";
    const params = {
      TableName: process.env.USER_TABLE,
      Key: {
        dummy,
        _id
      },
      UpdateExpression: "set status = :status, position = :position",
      // 어떤 걸 수정할지 정해줘야합니다.
      ExpressionAttributeValues: {
        // 수정할 것의 값을 정해줘야합니다.
        ":status": "대기중",
        ":position": "주문자"
      }
    };
    await dynamoDb.update(params).promise().then(result => params.Item);
  }

  return "주문이 완료되었습니다. 맛있게 드세요!";
};

/***/ }),

/***/ "./resolvers/order/createOrder.js":
/*!****************************************!*\
  !*** ./resolvers/order/createOrder.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const uuid = __webpack_require__(/*! uuid */ "uuid");

module.exports = async data => {
  const _id = data._id;
  const dummy = "유저";
  const userparams = {
    TableName: process.env.USER_TABLE,
    Key: {
      dummy,
      _id
    }
  };
  const user = await dynamoDb.get(userparams).promise();
  const updateparams = {
    TableName: process.env.USER_TABLE,
    Key: {
      dummy,
      _id
    },
    UpdateExpression: "set #status = :status",
    // 어떤 걸 수정할지 정해줘야합니다.
    ExpressionAttributeNames: {
      '#status': "status"
    },
    ExpressionAttributeValues: {
      // 수정할 것의 값을 정해줘야합니다.
      ":status": "주문완료"
    }
  };
  await dynamoDb.update(updateparams).promise().then(result => updateparams.Item);
  const params = {
    TableName: process.env.ORDER_TABLE,
    Item: {
      menu: data.menu,
      hi: data.hi,
      username: user.Item.username,
      _id: uuid.v1(),
      createdAt: String(Date.now()),
      dummy: "주문"
    }
  };
  const result = await dynamoDb.put(params).promise().then(result => params.Item);
  console.log(result);
  return result;
};

/***/ }),

/***/ "./resolvers/order/giveupOrder.js":
/*!****************************************!*\
  !*** ./resolvers/order/giveupOrder.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const uuid = __webpack_require__(/*! uuid */ "uuid");

module.exports = data => {
  const _id = data.userid;
  const dummy = "유저";
  const userparams = {
    TableName: process.env.USER_TABLE,
    Key: {
      dummy,
      _id
    },
    UpdateExpression: "set #status = :status",
    // 어떤 걸 수정할지 정해줘야합니다.
    ExpressionAttributeNames: {
      '#status': "status"
    },
    ExpressionAttributeValues: {
      // 수정할 것의 값을 정해줘야합니다.
      ":status": "주문포기"
    }
  };
  dynamoDb.update(userparams).promise();
  return "주문을 포기하셨습니다.";
};

/***/ }),

/***/ "./resolvers/order/howmuch.js":
/*!************************************!*\
  !*** ./resolvers/order/howmuch.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  const orders = await dynamoDb.scan({
    TableName: process.env.ORDER_TABLE
  }).promise();
  let sum = 0;
  console.log(orders);

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].menu === "아메리카노") {
      sum += 2000;
    } else if (orders[i].menu === "카페라떼") {
      sum += 2500;
    } else if (orders[i].menu === "바닐라라떼") {
      sum += 3000;
    } else if (orders[i].menu === "카페모카") {
      sum += 3000;
    } else if (orders[i].menu === "아시나요") {
      sum += 3000;
    } else if (orders[i].menu === "돼지콘") {
      sum += 3000;
    } else if (orders[i].menu === "브라보") {
      sum += 3000;
    } else if (orders[i].menu === "녹차마루") {
      sum += 3000;
    } else if (orders[i].menu === "아이스티") {
      sum += 2000;
    } else if (orders[i].menu === "망고 요거트 스무디") {
      sum += 3400;
    } else if (orders[i].menu === "딸기 요거트 스무디") {
      sum += 3400;
    } else if (orders[i].menu === "플레인 요거트 스무디") {
      sum += 3400;
    }
  }

  return sum;
};

/***/ }),

/***/ "./resolvers/order/orderMine.js":
/*!**************************************!*\
  !*** ./resolvers/order/orderMine.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const uuid = __webpack_require__(/*! uuid */ "uuid");

module.exports = async id => {
  let dummy = "유저";
  let _id = id;
  const userparams = {
    TableName: process.env.USER_TABLE,
    Key: {
      dummy,
      _id
    }
  };
  const user = await dynamoDb.get(userparams).promise();
  console.log(user);
  dummy = "주문";
  const result = await dynamoDb.query({
    TableName: process.env.ORDER_TABLE,
    KeyConditionExpression: "dummy = :dummy",
    FilterExpression: "username = :username",
    ExpressionAttributeValues: {
      ":dummy": dummy,
      ":username": user.Item.username
    }
  }).promise().then(r => r.Items);
  console.log(result);
  return result;
};

/***/ }),

/***/ "./resolvers/order/orders.js":
/*!***********************************!*\
  !*** ./resolvers/order/orders.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  const result = await dynamoDb.query({
    TableName: process.env.ORDER_TABLE,
    KeyConditionExpression: "dummy = :dummy",
    ExpressionAttributeValues: {
      ":dummy": "주문"
    }
  }).promise().then(r => r.Items);
  console.log(result);
  return result; // if(hi=="icecream"){
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
};

/***/ }),

/***/ "./resolvers/order/receipt.js":
/*!************************************!*\
  !*** ./resolvers/order/receipt.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  const orders = await dynamoDb.scan({
    TableName: process.env.ORDER_TABLE
  }).promise().then(r => r.Items);
  const orderV = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let mention = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].menu === "아메리카노" && orders[i].hi === "hot") {
      orderV[0]++;
    } else if (orders[i].menu === "아메리카노" && orders[i].hi === "ice") {
      orderV[1]++;
    } else if (orders[i].menu === "카페라떼" && orders[i].hi === "hot") {
      orderV[2]++;
    } else if (orders[i].menu === "카페라떼" && orders[i].hi === "ice") {
      orderV[3]++;
    } else if (orders[i].menu === "바닐라라떼" && orders[i].hi === "hot") {
      orderV[4]++;
    } else if (orders[i].menu === "바닐라라떼" && orders[i].hi === "ice") {
      orderV[5]++;
    } else if (orders[i].menu === "카페모카" && orders[i].hi === "hot") {
      orderV[6]++;
    } else if (orders[i].menu === "카페모카" && orders[i].hi === "ice") {
      orderV[7]++;
    } else if (orders[i].menu === "아시나요" && orders[i].hi === "icecream") {
      orderV[8]++;
    } else if (orders[i].menu === "돼지콘" && orders[i].hi === "icecream") {
      orderV[9]++;
    } else if (orders[i].menu === "브라보" && orders[i].hi === "icecream") {
      orderV[10]++;
    } else if (orders[i].menu === "녹차마루" && orders[i].hi === "icecream") {
      orderV[11]++;
    } else if (orders[i].menu === "아이스티" && orders[i].hi === "etc") {
      orderV[12]++;
    } else if (orders[i].menu === "망고 요거트 스무디" && orders[i].hi === "etc") {
      orderV[13]++;
    } else if (orders[i].menu === "딸기 요거트 스무디" && orders[i].hi === "etc") {
      orderV[14]++;
    } else if (orders[i].menu === "플레인 요거트 스무디" && orders[i].hi === "etc") {
      orderV[15]++;
    }
  }

  for (let i = 0; i < orderV.length; i++) {
    if (orderV[i] != 0 && i == 0) {
      mention[i] = "Hot 아메리카노 : " + orderV[i] + "잔";
    } else if (orderV[i] != 0 && i == 1) {
      mention[i] = "Ice 아메리카노 : " + orderV[i] + "잔";
    } else if (orderV[i] != 0 && i == 2) {
      mention[i] = "Hot 카페라떼 : " + orderV[i] + "잔";
    } else if (orderV[i] != 0 && i == 3) {
      mention[i] = "Ice 카페라떼 : " + orderV[i] + "잔";
    } else if (orderV[i] != 0 && i == 4) {
      mention[i] = "Hot 바닐라라떼 : " + orderV[i] + "잔";
    } else if (orderV[i] != 0 && i == 5) {
      mention[i] = "Ice 바닐라라떼 : " + orderV[i] + "잔";
    } else if (orderV[i] != 0 && i == 6) {
      mention[i] = "Hot 카페모카 : " + orderV[i] + "잔";
    } else if (orderV[i] != 0 && i == 7) {
      mention[i] = "Ice 카페모카 : " + orderV[i] + "잔";
    } else if (orderV[i] != 0 && i == 8) {
      mention[i] = "아시나요 : " + orderV[i] + "개";
    } else if (orderV[i] != 0 && i == 9) {
      mention[i] = "돼지콘 : " + orderV[i] + "개";
    } else if (orderV[i] != 0 && i == 10) {
      mention[i] = "브라보 : " + orderV[i] + "개";
    } else if (orderV[i] != 0 && i == 11) {
      mention[i] = "녹차마루 : " + orderV[i] + "개";
    } else if (orderV[i] != 0 && i == 12) {
      mention[i] = "아이스티 : " + orderV[i] + "잔";
    } else if (orderV[i] != 0 && i == 13) {
      mention[i] = "망고 요거트 스무디 : " + orderV[i] + "잔";
    } else if (orderV[i] != 0 && i == 14) {
      mention[i] = "딸기 요거트 스무디 : " + orderV[i] + "잔";
    } else if (orderV[i] != 0 && i == 15) {
      mention[i] = "플레인 요거트 스무디 : " + orderV[i] + "잔";
    }
  }

  return mention;
};

/***/ }),

/***/ "./resolvers/order/removeOrder.js":
/*!****************************************!*\
  !*** ./resolvers/order/removeOrder.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async (userid, orderid) => {
  let _id = userid;
  let dummy = "유저";
  const userparams = {
    TableName: process.env.USER_TABLE,
    Key: {
      dummy,
      _id
    },
    UpdateExpression: "set #status = :status",
    // 어떤 걸 수정할지 정해줘야합니다.
    ExpressionAttributeNames: {
      '#status': "status"
    },
    ExpressionAttributeValues: {
      // 수정할 것의 값을 정해줘야합니다.
      ":status": "주문취소"
    }
  };
  let result = await dynamoDb.update(userparams).promise();
  _id = orderid;
  dummy = "주문";
  const params = {
    TableName: process.env.ORDER_TABLE,
    Key: {
      dummy,
      _id
    }
  };
  result = await dynamoDb.delete(params).promise();
  console.log(result);
  return result;
};

/***/ }),

/***/ "./resolvers/task/createTask.js":
/*!**************************************!*\
  !*** ./resolvers/task/createTask.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const uuid = __webpack_require__(/*! uuid */ "uuid");

module.exports = async data => {
  const isthere = await dynamoDb.scan({
    TableName: process.env.TASK_TABLE
  }).promise();
  if (isthere.Items.length != 0) return "이미 진행중인 주문이 있습니다.";
  let _id = data.userid;
  let dummy = "유저";
  console.log(_id);
  let params = {
    TableName: process.env.USER_TABLE,
    Key: {
      dummy,
      _id
    }
  };
  const user = await dynamoDb.get(params).promise();
  const creater = user.Item.username;
  console.log(creater);
  params = {
    TableName: process.env.USER_TABLE,
    Key: {
      dummy,
      _id
    },
    UpdateExpression: "set #position = :position",
    // 어떤 걸 수정할지 정해줘야합니다.
    ExpressionAttributeNames: {
      '#position': "position"
    },
    ExpressionAttributeValues: {
      // 수정할 것의 값을 정해줘야합니다.
      ":position": "결제자"
    }
  };
  const uuser = await dynamoDb.update(params).promise();
  console.log("userupdate", uuser.Item);
  params = {
    TableName: process.env.TASK_TABLE,
    Item: {
      creater: creater,
      title: data.title,
      _id: uuid.v1(),
      createdAt: String(Date.now()),
      dummy: "게시글"
    }
  };
  const result = await dynamoDb.put(params).promise().then(result => params.Item);
  return result;
};

/***/ }),

/***/ "./resolvers/task/removeTask.js":
/*!**************************************!*\
  !*** ./resolvers/task/removeTask.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async data => {
  let _id = data._id;
  let dummy = "게시글";
  let params = {
    TableName: process.env.TASK_TABLE,
    Key: {
      dummy,
      _id
    }
  };
  const result = await dynamoDb.delete(params).promise();
  _id = data.userid;
  dummy = "유저";
  params = {
    TableName: process.env.USER_TABLE,
    Key: {
      dummy,
      _id
    },
    UpdateExpression: "set #position = :position",
    // 어떤 걸 수정할지 정해줘야합니다.
    ExpressionAttributeNames: {
      '#position': "position"
    },
    ExpressionAttributeValues: {
      // 수정할 것의 값을 정해줘야합니다.
      ":position": "주문자"
    }
  };
  await dynamoDb.update(params).promise();
  return result;
};

/***/ }),

/***/ "./resolvers/task/tasks.js":
/*!*********************************!*\
  !*** ./resolvers/task/tasks.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  const result = await dynamoDb.scan({
    TableName: process.env.TASK_TABLE
  }).promise().then(r => r.Items);
  if (result.length == 0) return null;
  console.log(result);
  console.log("tasks");
  return result;
};

/***/ }),

/***/ "./resolvers/task/updateTask.js":
/*!**************************************!*\
  !*** ./resolvers/task/updateTask.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const uuid = __webpack_require__(/*! uuid */ "uuid");

module.exports = data => {
  let _id = data._id;
  let title = data.title;
  let dummy = "게시글";
  const params = {
    TableName: process.env.TASK_TABLE,
    Key: {
      dummy,
      _id
    },
    UpdateExpression: "set title = :title",
    // 어떤 걸 수정할지 정해줘야합니다.
    ExpressionAttributeValues: {
      // 수정할 것의 값을 정해줘야합니다.
      ":title": title
    }
  };
  return dynamoDb.update(params).promise().then(result => params.Item);
};

/***/ }),

/***/ "./resolvers/user/allUsers.js":
/*!************************************!*\
  !*** ./resolvers/user/allUsers.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  const result = await dynamoDb.scan({
    TableName: process.env.USER_TABLE
  }).promise().then(r => r.Items);
  console.log("allusers");
  return result;
};

/***/ }),

/***/ "./resolvers/user/deleteUser.js":
/*!**************************************!*\
  !*** ./resolvers/user/deleteUser.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async ids => {
  for (let i = 0; i < ids.length; i++) {
    const _id = ids[i];
    const dummy = "유저";
    const params = {
      TableName: process.env.USER_TABLE,
      Key: {
        dummy,
        _id
      }
    };
    await dynamoDb.delete(params).promise();
  }

  return "유저가 삭제 되었습니다.";
};

/***/ }),

/***/ "./resolvers/user/getbackStatus.js":
/*!*****************************************!*\
  !*** ./resolvers/user/getbackStatus.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const uuid = __webpack_require__(/*! uuid */ "uuid");

module.exports = _id => {
  const dummy = "유저";
  const params = {
    TableName: process.env.USER_TABLE,
    Key: {
      dummy,
      _id
    },
    UpdateExpression: "set #status = :status",
    // 어떤 걸 수정할지 정해줘야합니다.
    ExpressionAttributeNames: {
      '#status': "status"
    },
    ExpressionAttributeValues: {
      // 수정할 것의 값을 정해줘야합니다.
      ":status": "대기중"
    }
  };
  dynamoDb.update(params).promise().then(result => params.Item);
  return "해당 인원은 주문포기에서 대기중으로 다시 바뀌었습니다.";
};

/***/ }),

/***/ "./resolvers/user/getbackUser.js":
/*!***************************************!*\
  !*** ./resolvers/user/getbackUser.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const uuid = __webpack_require__(/*! uuid */ "uuid");

module.exports = ids => {
  for (let i = 0; i < ids.length; i++) {
    const _id = ids[i];
    const dummy = "유저";
    const params = {
      TableName: process.env.USER_TABLE,
      Key: {
        dummy,
        _id
      },
      UpdateExpression: "set #position = :position",
      // 어떤 걸 수정할지 정해줘야합니다.
      ExpressionAttributeNames: {
        '#position': "position"
      },
      ExpressionAttributeValues: {
        // 수정할 것의 값을 정해줘야합니다.
        ":position": "주문자"
      }
    };
    dynamoDb.update(params).promise().then(result => params.Item);
  }

  return "해당 인원은 주문자로 다시 바뀌었습니다.";
};

/***/ }),

/***/ "./resolvers/user/howmany.js":
/*!***********************************!*\
  !*** ./resolvers/user/howmany.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  const people = await dynamoDb.scan({
    TableName: process.env.USER_TABLE
  }).promise().then(r => r.Items);
  const number = [0, 0, 0, 0];
  console.log(people);

  for (let i = 0; i < people.length; i++) {
    if (people[i].status === "주문완료") {
      number[0]++;
    } else if (people[i].status === "주문취소") {
      number[1]++;
    } else if (people[i].status === "주문포기") {
      number[2]++;
    } else {
      number[3]++;
    }
  }

  return number;
};

/***/ }),

/***/ "./resolvers/user/includedNothing.js":
/*!*******************************************!*\
  !*** ./resolvers/user/includedNothing.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  const result = await dynamoDb.query({
    TableName: process.env.USER_TABLE,
    KeyConditionExpression: "dummy = :dummy",
    FilterExpression: "#status = :status and #position <> :position",
    ExpressionAttributeNames: {
      '#status': "status",
      '#position': "position"
    },
    ExpressionAttributeValues: {
      ":dummy": "유저",
      ":status": "대기중",
      ":position": "휴가자"
    }
  }).promise().then(r => r.Items);
  console.log(result);
  return result;
};

/***/ }),

/***/ "./resolvers/user/includedOrdermen.js":
/*!********************************************!*\
  !*** ./resolvers/user/includedOrdermen.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  const result = await dynamoDb.query({
    TableName: process.env.USER_TABLE,
    KeyConditionExpression: "dummy = :dummy",
    FilterExpression: "#position = :position",
    ExpressionAttributeNames: {
      '#position': "position"
    },
    ExpressionAttributeValues: {
      ":dummy": "유저",
      ":position": "주문자"
    }
  }).promise().then(r => r.Items);
  console.log(result);
  return result;
};

/***/ }),

/***/ "./resolvers/user/includedVacation.js":
/*!********************************************!*\
  !*** ./resolvers/user/includedVacation.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async () => {
  const result = dynamoDb.query({
    TableName: process.env.USER_TABLE,
    KeyConditionExpression: "dummy = :dummy",
    FilterExpression: "#position = :position",
    ExpressionAttributeNames: {
      '#position': "position"
    },
    ExpressionAttributeValues: {
      ":dummy": "유저",
      ":position": "휴가자"
    }
  }).promise().then(r => r.Items);
  console.log(result);
  return result;
};

/***/ }),

/***/ "./resolvers/user/me.js":
/*!******************************!*\
  !*** ./resolvers/user/me.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async _id => {
  const dummy = "유저";
  const params = {
    TableName: process.env.USER_TABLE,
    Key: {
      dummy,
      _id
    }
  };
  const result = await dynamoDb.get(params).promise();
  console.log(result.Item);
  console.log("me");
  return result.Item;
};

/***/ }),

/***/ "./resolvers/user/receiptUser.js":
/*!***************************************!*\
  !*** ./resolvers/user/receiptUser.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async cmenu => {
  let result = "";

  if (cmenu == 0) {
    // const orders0 = await Order.query("dummy").eq("주문").where("menu").eq("아메리카노").and().where("hi").eq("hot").exec()
    const orders0 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "아메리카노",
        ":hi": "hot"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders0.length; i++) {
      if (i == orders0.length - 1) {
        result += orders0[i].username;
      } else {
        result += orders0[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 1) {
    const orders1 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "아메리카노",
        ":hi": "ice"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders1.length; i++) {
      if (i == orders1.length - 1) {
        result += orders1[i].username;
      } else {
        result += orders1[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 2) {
    const orders2 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "카페라떼",
        ":hi": "hot"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders2.length; i++) {
      if (i == orders2.length - 1) {
        result += orders2[i].username;
      } else {
        result += orders2[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 3) {
    const orders3 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "카페라떼",
        ":hi": "ice"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders3.length; i++) {
      if (i == orders3.length - 1) {
        result += orders3[i].username;
      } else {
        result += orders3[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 4) {
    const orders4 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "바닐라라떼",
        ":hi": "hot"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders4.length; i++) {
      if (i == orders4.length - 1) {
        result += orders4[i].username;
      } else {
        result += orders4[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 5) {
    const orders5 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "바닐라라떼",
        ":hi": "ice"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders5.length; i++) {
      if (i == orders5.length - 1) {
        result += orders5[i].username;
      } else {
        result += orders5[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 6) {
    const orders6 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "카페모카",
        ":hi": "hot"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders6.length; i++) {
      if (i == orders6.length - 1) {
        result += orders6[i].username;
      } else {
        result += orders6[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 7) {
    const orders7 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "카페모카",
        ":hi": "ice"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders7.length; i++) {
      if (i == orders7.length - 1) {
        result += orders7[i].username;
      } else {
        result += orders7[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 8) {
    const orders8 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "아시나요",
        ":hi": "icecream"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders8.length; i++) {
      if (i == orders8.length - 1) {
        result += orders8[i].username;
      } else {
        result += orders8[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 9) {
    const orders9 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "돼지콘",
        ":hi": "icecream"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders9.length; i++) {
      if (i == orders9.length - 1) {
        result += orders9[i].username;
      } else {
        result += orders9[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 10) {
    const orders10 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "브라보",
        ":hi": "icecream"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders10.length; i++) {
      if (i == orders10.length - 1) {
        result += orders10[i].username;
      } else {
        result += orders10[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 11) {
    const orders11 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "녹차마루",
        ":hi": "icecream"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders11.length; i++) {
      if (i == orders11.length - 1) {
        result += orders11[i].username;
      } else {
        result += orders11[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 12) {
    const orders12 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "아이스티",
        ":hi": "etc"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders12.length; i++) {
      if (i == orders12.length - 1) {
        result += orders12[i].username;
      } else {
        result += orders12[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 13) {
    const orders13 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "망고 요거트 스무디",
        ":hi": "etc"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders13.length; i++) {
      if (i == orders13.length - 1) {
        result += orders13[i].username;
      } else {
        result += orders13[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 14) {
    const orders14 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "딸기 요거트 스무디",
        ":hi": "etc"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders14.length; i++) {
      if (i == orders14.length - 1) {
        result += orders14[i].username;
      } else {
        result += orders14[i].username + ", ";
      }
    }

    return result;
  } else if (cmenu == 15) {
    const orders15 = await dynamoDb.query({
      TableName: process.env.ORDER_TABLE,
      KeyConditionExpression: "dummy = :dummy",
      FilterExpression: "menu = :menu and hi = :hi",
      ExpressionAttributeValues: {
        ":dummy": "주문",
        ":menu": "플레인 요거트 스무디",
        ":hi": "etc"
      }
    }).promise().then(r => r.Items);
    console.log(result);

    for (let i = 0; i < orders15.length; i++) {
      if (i == orders15.length - 1) {
        result += orders15[i].username;
      } else {
        result += orders15[i].username + ", ";
      }
    }

    return result;
  }
};

/***/ }),

/***/ "./resolvers/user/registerUser.js":
/*!****************************************!*\
  !*** ./resolvers/user/registerUser.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const uuid = __webpack_require__(/*! uuid */ "uuid");

module.exports = data => {
  const params = {
    TableName: process.env.USER_TABLE,
    Item: {
      username: data.username,
      status: "대기중",
      position: "주문자",
      _id: uuid.v1(),
      createdAt: String(Date.now()),
      dummy: "유저"
    }
  };
  return dynamoDb.put(params).promise().then(result => params.Item);
};

/***/ }),

/***/ "./resolvers/user/updatePosition.js":
/*!******************************************!*\
  !*** ./resolvers/user/updatePosition.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const uuid = __webpack_require__(/*! uuid */ "uuid");

module.exports = ids => {
  for (let i = 0; i < ids.length; i++) {
    const _id = ids[i];
    const dummy = "유저";
    const params = {
      TableName: process.env.USER_TABLE,
      Key: {
        dummy,
        _id
      },
      UpdateExpression: "set #position = :position",
      // 어떤 걸 수정할지 정해줘야합니다.
      ExpressionAttributeNames: {
        '#position': "position"
      },
      ExpressionAttributeValues: {
        // 수정할 것의 값을 정해줘야합니다.
        ":position": "휴가자"
      }
    };
    dynamoDb.update(params).promise().then(result => params.Item);
  }

  return "휴가자 등록이 완료 되었습니다.";
};

/***/ }),

/***/ "./resolvers/user/updateUser.js":
/*!**************************************!*\
  !*** ./resolvers/user/updateUser.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const uuid = __webpack_require__(/*! uuid */ "uuid");

module.exports = async (_id, username) => {
  const dummy = "유저";
  const params = {
    TableName: process.env.USER_TABLE,
    Key: {
      dummy,
      _id
    },
    UpdateExpression: "set username = :username",
    // 어떤 걸 수정할지 정해줘야합니다.
    ExpressionAttributeValues: {
      // 수정할 것의 값을 정해줘야합니다.
      ":username": username
    }
  };
  const result = await dynamoDb.update(params).promise().then(result => params.Item);
  return result;
};

/***/ }),

/***/ "./resolvers/user/user.js":
/*!********************************!*\
  !*** ./resolvers/user/user.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async (word, category) => {
  let result = [];
  if (word == "") return result;
  result = await dynamoDb.scan({
    TableName: process.env.USER_TABLE,
    FilterExpression: "contains(#username, :username)",
    ExpressionAttributeNames: {
      "#username": "username"
    },
    ExpressionAttributeValues: {
      ":username": word
    }
  }).promise().then(r => r.Items);
  console.log(result);
  console.log("user");
  return result;
};

/***/ }),

/***/ "./schema/schema.js":
/*!**************************!*\
  !*** ./schema/schema.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = __webpack_require__(/*! graphql */ "graphql");

const createOrder = __webpack_require__(/*! ../resolvers/order/createOrder */ "./resolvers/order/createOrder.js");

const orders = __webpack_require__(/*! ../resolvers/order/orders */ "./resolvers/order/orders.js");

const orderMine = __webpack_require__(/*! ../resolvers/order/orderMine */ "./resolvers/order/orderMine.js");

const howmuch = __webpack_require__(/*! ../resolvers/order/howmuch */ "./resolvers/order/howmuch.js");

const receipt = __webpack_require__(/*! ../resolvers/order/receipt */ "./resolvers/order/receipt.js");

const removeOrder = __webpack_require__(/*! ../resolvers/order/removeOrder */ "./resolvers/order/removeOrder.js");

const giveupOrder = __webpack_require__(/*! ../resolvers/order/giveupOrder */ "./resolvers/order/giveupOrder.js");

const confirmOrders = __webpack_require__(/*! ../resolvers/order/confirmOrders */ "./resolvers/order/confirmOrders.js");

const createTask = __webpack_require__(/*! ../resolvers/task/createTask */ "./resolvers/task/createTask.js");

const tasks = __webpack_require__(/*! ../resolvers/task/tasks */ "./resolvers/task/tasks.js");

const removeTask = __webpack_require__(/*! ../resolvers/task/removeTask */ "./resolvers/task/removeTask.js");

const updateTask = __webpack_require__(/*! ../resolvers/task/updateTask */ "./resolvers/task/updateTask.js");

const registerUser = __webpack_require__(/*! ../resolvers/user/registerUser */ "./resolvers/user/registerUser.js");

const allUsers = __webpack_require__(/*! ../resolvers/user/allUsers */ "./resolvers/user/allUsers.js");

const user = __webpack_require__(/*! ../resolvers/user/user */ "./resolvers/user/user.js");

const me = __webpack_require__(/*! ../resolvers/user/me */ "./resolvers/user/me.js");

const includedOrdermen = __webpack_require__(/*! ../resolvers/user/includedOrdermen */ "./resolvers/user/includedOrdermen.js");

const includedVacation = __webpack_require__(/*! ../resolvers/user/includedVacation */ "./resolvers/user/includedVacation.js");

const includedNothing = __webpack_require__(/*! ../resolvers/user/includedNothing */ "./resolvers/user/includedNothing.js");

const updatePosition = __webpack_require__(/*! ../resolvers/user/updatePosition */ "./resolvers/user/updatePosition.js");

const updateUser = __webpack_require__(/*! ../resolvers/user/updateUser */ "./resolvers/user/updateUser.js");

const getbackUser = __webpack_require__(/*! ../resolvers/user/getbackUser */ "./resolvers/user/getbackUser.js");

const getbackStatus = __webpack_require__(/*! ../resolvers/user/getbackStatus */ "./resolvers/user/getbackStatus.js");

const deleteUser = __webpack_require__(/*! ../resolvers/user/deleteUser */ "./resolvers/user/deleteUser.js");

const howmany = __webpack_require__(/*! ../resolvers/user/howmany */ "./resolvers/user/howmany.js");

const receiptUser = __webpack_require__(/*! ../resolvers/user/receiptUser */ "./resolvers/user/receiptUser.js");

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    position: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    }
  }
});
const taskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    _id: {
      type: GraphQLString
    },
    creater: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    }
  }
});
const orderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
    _id: {
      type: GraphQLString
    },
    menu: {
      type: GraphQLString
    },
    hi: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    }
  }
});
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      orders: {
        type: new GraphQLList(orderType),
        resolve: (parent, args) => orders()
      },
      orderMine: {
        args: {
          _id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        type: new GraphQLList(orderType),
        resolve: (parent, args) => orderMine(args._id)
      },
      howmuch: {
        type: new GraphQLNonNull(GraphQLInt),
        resolve: (parent, args) => howmuch()
      },
      receipt: {
        type: new GraphQLList(GraphQLString),
        resolve: (parent, args) => receipt()
      },
      tasks: {
        type: new GraphQLList(taskType),
        resolve: (parent, args) => tasks()
      },
      allUsers: {
        type: new GraphQLList(userType),
        resolve: (parent, args) => allUsers()
      },
      user: {
        args: {
          word: {
            type: GraphQLString
          },
          category: {
            type: GraphQLInt
          }
        },
        type: new GraphQLList(userType),
        resolve: (parent, args) => user(args.word, args.category)
      },
      me: {
        args: {
          userid: {
            type: GraphQLString
          }
        },
        type: userType,
        resolve: (parent, args) => me(args.userid)
      },
      includedOrdermen: {
        type: new GraphQLList(userType),
        resolve: (parent, args) => includedOrdermen()
      },
      includedVacation: {
        type: new GraphQLList(userType),
        resolve: (parent, args) => includedVacation()
      },
      includedNothing: {
        type: new GraphQLList(userType),
        resolve: (parent, args) => includedNothing()
      },
      howmany: {
        type: new GraphQLList(GraphQLInt),
        resolve: (parent, args) => howmany()
      },
      receiptUser: {
        args: {
          cmenu: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        type: GraphQLString,
        resolve: (parent, args) => receiptUser(args.cmenu)
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createOrder: {
        args: {
          _id: {
            type: new GraphQLNonNull(GraphQLString)
          },
          menu: {
            type: new GraphQLNonNull(GraphQLString)
          },
          hi: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        type: orderType,
        resolve: (parent, args) => createOrder(args)
      },
      removeOrder: {
        args: {
          userid: {
            type: new GraphQLNonNull(GraphQLString)
          },
          orderid: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        type: orderType,
        resolve: (parent, args) => removeOrder(args.userid, args.orderid)
      },
      giveupOrder: {
        args: {
          userid: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        type: GraphQLString,
        resolve: (parent, args) => giveupOrder(args)
      },
      confirmOrders: {
        type: GraphQLString,
        resolve: (parent, args) => confirmOrders()
      },
      createTask: {
        args: {
          userid: {
            type: new GraphQLNonNull(GraphQLString)
          },
          title: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        type: taskType,
        resolve: (parent, args) => createTask(args)
      },
      updateTask: {
        args: {
          _id: {
            type: new GraphQLNonNull(GraphQLString)
          },
          title: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        type: taskType,
        resolve: (parent, args) => updateTask(args)
      },
      removeTask: {
        args: {
          _id: {
            type: new GraphQLNonNull(GraphQLString)
          },
          userid: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        type: taskType,
        resolve: (parent, args) => removeTask(args)
      },
      registerUser: {
        args: {
          username: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        type: userType,
        resolve: (parent, args) => registerUser(args)
      },
      updatePosition: {
        args: {
          ids: {
            type: new GraphQLList(GraphQLString)
          }
        },
        type: GraphQLString,
        resolve: (parent, args) => updatePosition(args.ids)
      },
      updateUser: {
        args: {
          _id: {
            type: new GraphQLNonNull(GraphQLString)
          },
          username: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        type: userType,
        resolve: (parent, args) => updateUser(args._id, args.username)
      },
      getbackUser: {
        args: {
          ids: {
            type: new GraphQLList(GraphQLString)
          }
        },
        type: GraphQLString,
        resolve: (parent, args) => getbackUser(args.ids)
      },
      getbackStatus: {
        args: {
          _id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        type: GraphQLString,
        resolve: (parent, args) => getbackStatus(args._id)
      },
      deleteUser: {
        args: {
          ids: {
            type: new GraphQLList(GraphQLString)
          }
        },
        type: GraphQLString,
        resolve: (parent, args) => deleteUser(args.ids)
      }
    }
  })
});
module.exports = schema;

/***/ }),

/***/ "../../../node_modules/graphql-playground-html/dist/get-loading-markup.js":
/*!********************************************************************************!*\
  !*** ../../../node_modules/graphql-playground-html/dist/get-loading-markup.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var getLoadingMarkup = function () { return ({
    script: "\n    const loadingWrapper = document.getElementById('loading-wrapper');\n    if (loadingWrapper) {\n      loadingWrapper.classList.add('fadeOut');\n    }\n    ",
    container: "\n<style type=\"text/css\">\n.fadeOut {\n  -webkit-animation: fadeOut 0.5s ease-out forwards;\n  animation: fadeOut 0.5s ease-out forwards;\n}\n\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(-10px);\n    -ms-transform: translateY(-10px);\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(-10px);\n    -ms-transform: translateY(-10px);\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@-webkit-keyframes fadeOut {\n  from {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translateY(-10px);\n    -ms-transform: translateY(-10px);\n    transform: translateY(-10px);\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translateY(-10px);\n    -ms-transform: translateY(-10px);\n    transform: translateY(-10px);\n  }\n}\n\n@-webkit-keyframes appearIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@keyframes appearIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@-webkit-keyframes scaleIn {\n  from {\n    -webkit-transform: scale(0);\n    -ms-transform: scale(0);\n    transform: scale(0);\n  }\n  to {\n    -webkit-transform: scale(1);\n    -ms-transform: scale(1);\n    transform: scale(1);\n  }\n}\n\n@keyframes scaleIn {\n  from {\n    -webkit-transform: scale(0);\n    -ms-transform: scale(0);\n    transform: scale(0);\n  }\n  to {\n    -webkit-transform: scale(1);\n    -ms-transform: scale(1);\n    transform: scale(1);\n  }\n}\n\n@-webkit-keyframes innerDrawIn {\n  0% {\n    stroke-dashoffset: 70;\n  }\n  50% {\n    stroke-dashoffset: 140;\n  }\n  100% {\n    stroke-dashoffset: 210;\n  }\n}\n\n@keyframes innerDrawIn {\n  0% {\n    stroke-dashoffset: 70;\n  }\n  50% {\n    stroke-dashoffset: 140;\n  }\n  100% {\n    stroke-dashoffset: 210;\n  }\n}\n\n@-webkit-keyframes outerDrawIn {\n  0% {\n    stroke-dashoffset: 76;\n  }\n  100% {\n    stroke-dashoffset: 152;\n  }\n}\n\n@keyframes outerDrawIn {\n  0% {\n    stroke-dashoffset: 76;\n  }\n  100% {\n    stroke-dashoffset: 152;\n  }\n}\n\n.hHWjkv {\n  -webkit-transform-origin: 0px 0px;\n  -ms-transform-origin: 0px 0px;\n  transform-origin: 0px 0px;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-animation: scaleIn 0.25s linear forwards 0.2222222222222222s;\n  animation: scaleIn 0.25s linear forwards 0.2222222222222222s;\n}\n\n.gCDOzd {\n  -webkit-transform-origin: 0px 0px;\n  -ms-transform-origin: 0px 0px;\n  transform-origin: 0px 0px;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-animation: scaleIn 0.25s linear forwards 0.4222222222222222s;\n  animation: scaleIn 0.25s linear forwards 0.4222222222222222s;\n}\n\n.hmCcxi {\n  -webkit-transform-origin: 0px 0px;\n  -ms-transform-origin: 0px 0px;\n  transform-origin: 0px 0px;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-animation: scaleIn 0.25s linear forwards 0.6222222222222222s;\n  animation: scaleIn 0.25s linear forwards 0.6222222222222222s;\n}\n\n.eHamQi {\n  -webkit-transform-origin: 0px 0px;\n  -ms-transform-origin: 0px 0px;\n  transform-origin: 0px 0px;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-animation: scaleIn 0.25s linear forwards 0.8222222222222223s;\n  animation: scaleIn 0.25s linear forwards 0.8222222222222223s;\n}\n\n.byhgGu {\n  -webkit-transform-origin: 0px 0px;\n  -ms-transform-origin: 0px 0px;\n  transform-origin: 0px 0px;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-animation: scaleIn 0.25s linear forwards 1.0222222222222221s;\n  animation: scaleIn 0.25s linear forwards 1.0222222222222221s;\n}\n\n.llAKP {\n  -webkit-transform-origin: 0px 0px;\n  -ms-transform-origin: 0px 0px;\n  transform-origin: 0px 0px;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-animation: scaleIn 0.25s linear forwards 1.2222222222222223s;\n  animation: scaleIn 0.25s linear forwards 1.2222222222222223s;\n}\n\n.bglIGM {\n  -webkit-transform-origin: 64px 28px;\n  -ms-transform-origin: 64px 28px;\n  transform-origin: 64px 28px;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-animation: scaleIn 0.25s linear forwards 0.2222222222222222s;\n  animation: scaleIn 0.25s linear forwards 0.2222222222222222s;\n}\n\n.ksxRII {\n  -webkit-transform-origin: 95.98500061035156px 46.510000228881836px;\n  -ms-transform-origin: 95.98500061035156px 46.510000228881836px;\n  transform-origin: 95.98500061035156px 46.510000228881836px;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-animation: scaleIn 0.25s linear forwards 0.4222222222222222s;\n  animation: scaleIn 0.25s linear forwards 0.4222222222222222s;\n}\n\n.cWrBmb {\n  -webkit-transform-origin: 95.97162628173828px 83.4900016784668px;\n  -ms-transform-origin: 95.97162628173828px 83.4900016784668px;\n  transform-origin: 95.97162628173828px 83.4900016784668px;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-animation: scaleIn 0.25s linear forwards 0.6222222222222222s;\n  animation: scaleIn 0.25s linear forwards 0.6222222222222222s;\n}\n\n.Wnusb {\n  -webkit-transform-origin: 64px 101.97999572753906px;\n  -ms-transform-origin: 64px 101.97999572753906px;\n  transform-origin: 64px 101.97999572753906px;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-animation: scaleIn 0.25s linear forwards 0.8222222222222223s;\n  animation: scaleIn 0.25s linear forwards 0.8222222222222223s;\n}\n\n.bfPqf {\n  -webkit-transform-origin: 32.03982162475586px 83.4900016784668px;\n  -ms-transform-origin: 32.03982162475586px 83.4900016784668px;\n  transform-origin: 32.03982162475586px 83.4900016784668px;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-animation: scaleIn 0.25s linear forwards 1.0222222222222221s;\n  animation: scaleIn 0.25s linear forwards 1.0222222222222221s;\n}\n\n.edRCTN {\n  -webkit-transform-origin: 32.033552169799805px 46.510000228881836px;\n  -ms-transform-origin: 32.033552169799805px 46.510000228881836px;\n  transform-origin: 32.033552169799805px 46.510000228881836px;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-animation: scaleIn 0.25s linear forwards 1.2222222222222223s;\n  animation: scaleIn 0.25s linear forwards 1.2222222222222223s;\n}\n\n.iEGVWn {\n  opacity: 0;\n  stroke-dasharray: 76;\n  -webkit-animation: outerDrawIn 0.5s ease-out forwards 0.3333333333333333s, appearIn 0.1s ease-out forwards 0.3333333333333333s;\n  animation: outerDrawIn 0.5s ease-out forwards 0.3333333333333333s, appearIn 0.1s ease-out forwards 0.3333333333333333s;\n  -webkit-animation-iteration-count: 1, 1;\n  animation-iteration-count: 1, 1;\n}\n\n.bsocdx {\n  opacity: 0;\n  stroke-dasharray: 76;\n  -webkit-animation: outerDrawIn 0.5s ease-out forwards 0.5333333333333333s, appearIn 0.1s ease-out forwards 0.5333333333333333s;\n  animation: outerDrawIn 0.5s ease-out forwards 0.5333333333333333s, appearIn 0.1s ease-out forwards 0.5333333333333333s;\n  -webkit-animation-iteration-count: 1, 1;\n  animation-iteration-count: 1, 1;\n}\n\n.jAZXmP {\n  opacity: 0;\n  stroke-dasharray: 76;\n  -webkit-animation: outerDrawIn 0.5s ease-out forwards 0.7333333333333334s, appearIn 0.1s ease-out forwards 0.7333333333333334s;\n  animation: outerDrawIn 0.5s ease-out forwards 0.7333333333333334s, appearIn 0.1s ease-out forwards 0.7333333333333334s;\n  -webkit-animation-iteration-count: 1, 1;\n  animation-iteration-count: 1, 1;\n}\n\n.hSeArx {\n  opacity: 0;\n  stroke-dasharray: 76;\n  -webkit-animation: outerDrawIn 0.5s ease-out forwards 0.9333333333333333s, appearIn 0.1s ease-out forwards 0.9333333333333333s;\n  animation: outerDrawIn 0.5s ease-out forwards 0.9333333333333333s, appearIn 0.1s ease-out forwards 0.9333333333333333s;\n  -webkit-animation-iteration-count: 1, 1;\n  animation-iteration-count: 1, 1;\n}\n\n.bVgqGk {\n  opacity: 0;\n  stroke-dasharray: 76;\n  -webkit-animation: outerDrawIn 0.5s ease-out forwards 1.1333333333333333s, appearIn 0.1s ease-out forwards 1.1333333333333333s;\n  animation: outerDrawIn 0.5s ease-out forwards 1.1333333333333333s, appearIn 0.1s ease-out forwards 1.1333333333333333s;\n  -webkit-animation-iteration-count: 1, 1;\n  animation-iteration-count: 1, 1;\n}\n\n.hEFqBt {\n  opacity: 0;\n  stroke-dasharray: 76;\n  -webkit-animation: outerDrawIn 0.5s ease-out forwards 1.3333333333333333s, appearIn 0.1s ease-out forwards 1.3333333333333333s;\n  animation: outerDrawIn 0.5s ease-out forwards 1.3333333333333333s, appearIn 0.1s ease-out forwards 1.3333333333333333s;\n  -webkit-animation-iteration-count: 1, 1;\n  animation-iteration-count: 1, 1;\n}\n\n.dzEKCM {\n  opacity: 0;\n  stroke-dasharray: 70;\n  -webkit-animation: innerDrawIn 1s ease-in-out forwards 1.3666666666666667s, appearIn 0.1s linear forwards 1.3666666666666667s;\n  animation: innerDrawIn 1s ease-in-out forwards 1.3666666666666667s, appearIn 0.1s linear forwards 1.3666666666666667s;\n  -webkit-animation-iteration-count: infinite, 1;\n  animation-iteration-count: infinite, 1;\n}\n\n.DYnPx {\n  opacity: 0;\n  stroke-dasharray: 70;\n  -webkit-animation: innerDrawIn 1s ease-in-out forwards 1.5333333333333332s, appearIn 0.1s linear forwards 1.5333333333333332s;\n  animation: innerDrawIn 1s ease-in-out forwards 1.5333333333333332s, appearIn 0.1s linear forwards 1.5333333333333332s;\n  -webkit-animation-iteration-count: infinite, 1;\n  animation-iteration-count: infinite, 1;\n}\n\n.hjPEAQ {\n  opacity: 0;\n  stroke-dasharray: 70;\n  -webkit-animation: innerDrawIn 1s ease-in-out forwards 1.7000000000000002s, appearIn 0.1s linear forwards 1.7000000000000002s;\n  animation: innerDrawIn 1s ease-in-out forwards 1.7000000000000002s, appearIn 0.1s linear forwards 1.7000000000000002s;\n  -webkit-animation-iteration-count: infinite, 1;\n  animation-iteration-count: infinite, 1;\n}\n\n#loading-wrapper {\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n\n.logo {\n  width: 75px;\n  height: 75px;\n  margin-bottom: 20px;\n  opacity: 0;\n  -webkit-animation: fadeIn 0.5s ease-out forwards;\n  animation: fadeIn 0.5s ease-out forwards;\n}\n\n.text {\n  font-size: 32px;\n  font-weight: 200;\n  text-align: center;\n  color: rgba(255, 255, 255, 0.6);\n  opacity: 0;\n  -webkit-animation: fadeIn 0.5s ease-out forwards;\n  animation: fadeIn 0.5s ease-out forwards;\n}\n\n.dGfHfc {\n  font-weight: 400;\n}\n</style>\n<div id=\"loading-wrapper\">\n<svg class=\"logo\" viewBox=\"0 0 128 128\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n  <title>GraphQL Playground Logo</title>\n  <defs>\n    <linearGradient id=\"linearGradient-1\" x1=\"4.86%\" x2=\"96.21%\" y1=\"0%\" y2=\"99.66%\">\n      <stop stop-color=\"#E00082\" stop-opacity=\".8\" offset=\"0%\"></stop>\n      <stop stop-color=\"#E00082\" offset=\"100%\"></stop>\n    </linearGradient>\n  </defs>\n  <g>\n    <rect id=\"Gradient\" width=\"127.96\" height=\"127.96\" y=\"1\" fill=\"url(#linearGradient-1)\" rx=\"4\"></rect>\n    <path id=\"Border\" fill=\"#E00082\" fill-rule=\"nonzero\" d=\"M4.7 2.84c-1.58 0-2.86 1.28-2.86 2.85v116.57c0 1.57 1.28 2.84 2.85 2.84h116.57c1.57 0 2.84-1.26 2.84-2.83V5.67c0-1.55-1.26-2.83-2.83-2.83H4.67zM4.7 0h116.58c3.14 0 5.68 2.55 5.68 5.7v116.58c0 3.14-2.54 5.68-5.68 5.68H4.68c-3.13 0-5.68-2.54-5.68-5.68V5.68C-1 2.56 1.55 0 4.7 0z\"></path>\n    <path class=\"bglIGM\" x=\"64\" y=\"28\" fill=\"#fff\" d=\"M64 36c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8\" style=\"transform: translate(100px, 100px);\"></path>\n    <path class=\"ksxRII\" x=\"95.98500061035156\" y=\"46.510000228881836\" fill=\"#fff\" d=\"M89.04 50.52c-2.2-3.84-.9-8.73 2.94-10.96 3.83-2.2 8.72-.9 10.95 2.94 2.2 3.84.9 8.73-2.94 10.96-3.85 2.2-8.76.9-10.97-2.94\"\n      style=\"transform: translate(100px, 100px);\"></path>\n    <path class=\"cWrBmb\" x=\"95.97162628173828\" y=\"83.4900016784668\" fill=\"#fff\" d=\"M102.9 87.5c-2.2 3.84-7.1 5.15-10.94 2.94-3.84-2.2-5.14-7.12-2.94-10.96 2.2-3.84 7.12-5.15 10.95-2.94 3.86 2.23 5.16 7.12 2.94 10.96\"\n      style=\"transform: translate(100px, 100px);\"></path>\n    <path class=\"Wnusb\" x=\"64\" y=\"101.97999572753906\" fill=\"#fff\" d=\"M64 110c-4.43 0-8-3.6-8-8.02 0-4.44 3.57-8.02 8-8.02s8 3.58 8 8.02c0 4.4-3.57 8.02-8 8.02\"\n      style=\"transform: translate(100px, 100px);\"></path>\n    <path class=\"bfPqf\" x=\"32.03982162475586\" y=\"83.4900016784668\" fill=\"#fff\" d=\"M25.1 87.5c-2.2-3.84-.9-8.73 2.93-10.96 3.83-2.2 8.72-.9 10.95 2.94 2.2 3.84.9 8.73-2.94 10.96-3.85 2.2-8.74.9-10.95-2.94\"\n      style=\"transform: translate(100px, 100px);\"></path>\n    <path class=\"edRCTN\" x=\"32.033552169799805\" y=\"46.510000228881836\" fill=\"#fff\" d=\"M38.96 50.52c-2.2 3.84-7.12 5.15-10.95 2.94-3.82-2.2-5.12-7.12-2.92-10.96 2.2-3.84 7.12-5.15 10.95-2.94 3.83 2.23 5.14 7.12 2.94 10.96\"\n      style=\"transform: translate(100px, 100px);\"></path>\n    <path class=\"iEGVWn\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M63.55 27.5l32.9 19-32.9-19z\"></path>\n    <path class=\"bsocdx\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M96 46v38-38z\"></path>\n    <path class=\"jAZXmP\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M96.45 84.5l-32.9 19 32.9-19z\"></path>\n    <path class=\"hSeArx\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M64.45 103.5l-32.9-19 32.9 19z\"></path>\n    <path class=\"bVgqGk\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M32 84V46v38z\"></path>\n    <path class=\"hEFqBt\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M31.55 46.5l32.9-19-32.9 19z\"></path>\n    <path class=\"dzEKCM\" id=\"Triangle-Bottom\" stroke=\"#fff\" stroke-width=\"4\" d=\"M30 84h70\" stroke-linecap=\"round\"></path>\n    <path class=\"DYnPx\" id=\"Triangle-Left\" stroke=\"#fff\" stroke-width=\"4\" d=\"M65 26L30 87\" stroke-linecap=\"round\"></path>\n    <path class=\"hjPEAQ\" id=\"Triangle-Right\" stroke=\"#fff\" stroke-width=\"4\" d=\"M98 87L63 26\" stroke-linecap=\"round\"></path>\n  </g>\n</svg>\n<div class=\"text\">Loading\n  <span class=\"dGfHfc\">GraphQL Playground</span>\n</div>\n</div>\n",
}); };
exports.default = getLoadingMarkup;
//# sourceMappingURL=get-loading-markup.js.map

/***/ }),

/***/ "../../../node_modules/graphql-playground-html/dist/index.js":
/*!*******************************************************************!*\
  !*** ../../../node_modules/graphql-playground-html/dist/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var render_playground_page_1 = __webpack_require__(/*! ./render-playground-page */ "../../../node_modules/graphql-playground-html/dist/render-playground-page.js");
exports.renderPlaygroundPage = render_playground_page_1.renderPlaygroundPage;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../node_modules/graphql-playground-html/dist/render-playground-page.js":
/*!************************************************************************************!*\
  !*** ../../../node_modules/graphql-playground-html/dist/render-playground-page.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var xss_1 = __webpack_require__(/*! xss */ "xss");
var get_loading_markup_1 = __webpack_require__(/*! ./get-loading-markup */ "../../../node_modules/graphql-playground-html/dist/get-loading-markup.js");
var filter = function (val) {
    return xss_1.filterXSS(val, {
        // @ts-ignore
        whiteList: [],
        stripIgnoreTag: true,
        stripIgnoreTagBody: ["script"]
    });
};
var loading = get_loading_markup_1.default();
var CONFIG_ID = 'playground-config';
var getCdnMarkup = function (_a) {
    var version = _a.version, _b = _a.cdnUrl, cdnUrl = _b === void 0 ? '//cdn.jsdelivr.net/npm' : _b, faviconUrl = _a.faviconUrl;
    var buildCDNUrl = function (packageName, suffix) { return filter(cdnUrl + "/" + packageName + (version ? "@" + version : '') + "/" + suffix || ''); };
    return "\n    <link \n      rel=\"stylesheet\" \n      href=\"" + buildCDNUrl('graphql-playground-react', 'build/static/css/index.css') + "\"\n    />\n    " + (typeof faviconUrl === 'string' ? "<link rel=\"shortcut icon\" href=\"" + filter(faviconUrl || '') + "\" />" : '') + "\n    " + (faviconUrl === undefined ? "<link rel=\"shortcut icon\" href=\"" + buildCDNUrl('graphql-playground-react', 'build/favicon.png') + "\" />" : '') + "\n    <script \n      src=\"" + buildCDNUrl('graphql-playground-react', 'build/static/js/middleware.js') + "\"\n    ></script>\n";
};
var renderConfig = function (config) {
    return xss_1.filterXSS("<div id=\"" + CONFIG_ID + "\">" + JSON.stringify(config) + "</div>", {
        whiteList: { div: ['id'] },
    });
};
function renderPlaygroundPage(options) {
    var extendedOptions = __assign(__assign({}, options), { canSaveConfig: false });
    // for compatibility
    if (options.subscriptionsEndpoint) {
        extendedOptions.subscriptionEndpoint = filter(options.subscriptionsEndpoint || '');
    }
    if (options.config) {
        extendedOptions.configString = JSON.stringify(options.config, null, 2);
    }
    if (!extendedOptions.endpoint && !extendedOptions.configString) {
        /* tslint:disable-next-line */
        console.warn("WARNING: You didn't provide an endpoint and don't have a .graphqlconfig. Make sure you have at least one of them.");
    }
    else if (extendedOptions.endpoint) {
        extendedOptions.endpoint = filter(extendedOptions.endpoint || '');
    }
    return "\n  <!DOCTYPE html>\n  <html>\n  <head>\n    <meta charset=utf-8 />\n    <meta name=\"viewport\" content=\"user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui\">\n    <link href=\"https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Source+Code+Pro:400,700\" rel=\"stylesheet\">\n    <title>" + (extendedOptions.title || 'GraphQL Playground') + "</title>\n    " + (extendedOptions.env === 'react' || extendedOptions.env === 'electron'
        ? ''
        : getCdnMarkup(extendedOptions)) + "\n  </head>\n  <body>\n    <style type=\"text/css\">\n      html {\n        font-family: \"Open Sans\", sans-serif;\n        overflow: hidden;\n      }\n  \n      body {\n        margin: 0;\n        background: #172a3a;\n      }\n\n      #" + CONFIG_ID + " {\n        display: none;\n      }\n  \n      .playgroundIn {\n        -webkit-animation: playgroundIn 0.5s ease-out forwards;\n        animation: playgroundIn 0.5s ease-out forwards;\n      }\n  \n      @-webkit-keyframes playgroundIn {\n        from {\n          opacity: 0;\n          -webkit-transform: translateY(10px);\n          -ms-transform: translateY(10px);\n          transform: translateY(10px);\n        }\n        to {\n          opacity: 1;\n          -webkit-transform: translateY(0);\n          -ms-transform: translateY(0);\n          transform: translateY(0);\n        }\n      }\n  \n      @keyframes playgroundIn {\n        from {\n          opacity: 0;\n          -webkit-transform: translateY(10px);\n          -ms-transform: translateY(10px);\n          transform: translateY(10px);\n        }\n        to {\n          opacity: 1;\n          -webkit-transform: translateY(0);\n          -ms-transform: translateY(0);\n          transform: translateY(0);\n        }\n      }\n    </style>\n    " + loading.container + "\n    " + renderConfig(extendedOptions) + "\n    <div id=\"root\" />\n    <script type=\"text/javascript\">\n      window.addEventListener('load', function (event) {\n        " + loading.script + "\n  \n        const root = document.getElementById('root');\n        root.classList.add('playgroundIn');\n        const configText = document.getElementById('" + CONFIG_ID + "').innerText;\n        \n        if(configText && configText.length) {\n          try {\n            GraphQLPlayground.init(root, JSON.parse(configText));\n          }\n          catch(err) {\n            console.error(\"could not find config\")\n          }\n        }\n        else {\n          GraphQLPlayground.init(root);\n        }\n      })\n    </script>\n  </body>\n  </html>\n";
}
exports.renderPlaygroundPage = renderPlaygroundPage;
//# sourceMappingURL=render-playground-page.js.map

/***/ }),

/***/ "../../../node_modules/graphql-playground-middleware-express/dist/index.js":
/*!*********************************************************************************!*\
  !*** ../../../node_modules/graphql-playground-middleware-express/dist/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var graphql_playground_html_1 = __webpack_require__(/*! graphql-playground-html */ "../../../node_modules/graphql-playground-html/dist/index.js");
var express = function voyagerExpress(options) {
    return function (req, res, next) {
        res.setHeader('Content-Type', 'text/html');
        var playground = graphql_playground_html_1.renderPlaygroundPage(options);
        res.write(playground);
        res.end();
    };
};
exports.default = express;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("apollo-server-express");;

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("graphql");;

/***/ }),

/***/ "serverless-http":
/*!**********************************!*\
  !*** external "serverless-http" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("serverless-http");;

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");;

/***/ }),

/***/ "xss":
/*!**********************!*\
  !*** external "xss" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("xss");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./handler/handler.js");
/******/ })()
;
//# sourceMappingURL=handler.js.map