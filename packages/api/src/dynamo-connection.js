"use strict";
const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DDB_URL || null,
});

const TableName = "connectionsTable";

function add(connectionId) {
  return client
    .put({
      TableName: TableName,
      Item: {
        connectionId,
      },
    })
    .promise();
}

function remove(connectionId) {
  return client
    .delete({
      TableName: TableName,
      Key: {
        connectionId,
      },
    })
    .promise();
}

function list() {
  return client.scan({ TableName: TableName }).promise();
}

module.exports = {
  add,
  list,
  remove,
};
