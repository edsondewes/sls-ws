"use strict";
const AWS = require("aws-sdk");
const redis = require("./dynamo-connection");
const axios = require("axios").default;

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
    const jsonMessage = JSON.parse(message.body);
    const translation = await translate(jsonMessage.msg);

    const replyData = JSON.stringify({
      msg: translation
    });

    for (const item of connections.Items) {
      await apiGatewayClient
        .postToConnection({
          ConnectionId: item.connectionId,
          Data: replyData
        })
        .promise();
    }
  }

  return {
    statusCode: 200
  };
};

async function translate(text) {
  try {
    const response = await axios.get(
      "https://api.mymemory.translated.net/get",
      {
        params: {
          q: text,
          langpair: "pt-BR|en"
        }
      }
    );

    return response.data.matches[0].translation;
  } catch {
    return text;
  }
}
