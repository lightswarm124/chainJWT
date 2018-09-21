"use strict";

const jwt = require('jsonwebtoken');

const axios = require('axios');

const wrap = require('../wrap');

module.exports = async function () {
  let blockHeight = await axios.get('https://rest.bitcoin.com/v1/blockchain/getBlockCount').then(function (result) {
    return result.data;
  }).catch(function (err) {
    return err;
  });
  let merkleRoot = await axios.get(`https://rest.bitcoin.com/v1/block/details/${blockHeight}`).then(function (result) {
    return result.data.merkleroot;
  }).catch(function (err) {
    return err;
  });
  return await {
    bkh: blockHeight,
    mkr: merkleRoot,
    ebn: blockHeight + 1
  };
};
//# sourceMappingURL=index.js.map