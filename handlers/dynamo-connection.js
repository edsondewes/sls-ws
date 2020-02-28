const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: process.env.DDB_URL,
  accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
  secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
});

const TableName = "connectionsTable";

function add(connectionId) {
  return client.put({
    TableName: TableName,
    Item: {
      connectionId
    }
  }).promise();
}

function remove(connectionId) {
  return client.delete({
    TableName: TableName,
    Key: {
      connectionId
    }
  }).promise();
}

function list() {
  return client.scan({ TableName: TableName }).promise();
}

module.exports = {
  add,
  list,
  remove,
};