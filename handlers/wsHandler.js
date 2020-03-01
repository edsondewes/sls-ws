"use strict";
const AWS = require("aws-sdk");
const redis = require("./dynamo-connection");

const apiGatewayClient = new AWS.ApiGatewayManagementApi({
  apiVersion: "2018-11-29",
  endpoint: process.env.API_URL
});

const sqsClient = new AWS.SQS({ apiVersion: "2012-11-05" });

module.exports.connection = async event => {
  const { connectionId, eventType } = event.requestContext;
  if (eventType === "CONNECT") {
    await redis.add(connectionId);
  } else {
    await redis.remove(connectionId);
  }

  return {
    statusCode: 200
  };
};

module.exports.message = async event => {
  await sqsClient
    .sendMessage({
      MessageBody: event.body,
      QueueUrl: process.env.QUEUE_URL
    })
    .promise();

  return {
    statusCode: 200
  };
};

module.exports.reply = async event => {
  const connections = await redis.list();

  for (const message of event.Records) {
    for (const item of connections.Items) {
      await apiGatewayClient
        .postToConnection({
          ConnectionId: item.connectionId,
          Data: message.body
        })
        .promise();
    }
  }

  return {
    statusCode: 200
  };
};
