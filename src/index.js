const jwt = require('jsonwebtoken');
const axios = require('axios');

const wrap = require('../wrap');

module.exports = async () => {
  let blockHeight = await axios.get('https://rest.bitcoin.com/v1/blockchain/getBlockCount')
    .then(result => {
      return result.data;
    })
    .catch(err => {
      return err;
    });

  let merkleRoot = await axios.get(`https://rest.bitcoin.com/v1/block/details/${blockHeight}`)
    .then(result => {
      return result.data.merkleroot;
    })
    .catch(err => {
      return err;
    });

  return await {
    bkh: blockHeight,
    mkr: merkleRoot,
    ebn: blockHeight + 1
  };
};
