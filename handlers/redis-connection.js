const redis = require("redis");
const client = redis.createClient();

const SetName = "cl";

function add(connectionId) {
  client.sadd(SetName, connectionId);
}

function remove(connectionId) {
  client.srem(SetName, connectionId);
}

function list() {
  return new Promise((resolve, reject) => {
    client.smembers(SetName, (err, reply) => {
      if (err)
        reject(err);
      else
        resolve(reply);
    }
    );
  });
}

module.exports = {
  add,
  list,
  remove,
};