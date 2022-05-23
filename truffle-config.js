const HDWalletProvider = require("@truffle/hdwallet-provider");

require("babel-register");
require("babel-polyfill");
require("dotenv").config();
const privateKey = process.env.PRIVATE_KEY || "";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: process.env.PORT || 7545,
      network_id: "*", // Match any network id
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          privateKey,
          `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
        );
      },
      gas: 6721975, //from ganache-cli output
      gasPrice: 20000000000, //From ganache-cli output
      network_id: 3,
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "0.5.0",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
