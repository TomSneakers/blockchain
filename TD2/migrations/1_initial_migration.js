const SimpleStorage = artifacts.require("SimpleStorage");
const Tickets = artifacts.require("Tickets");
const PaymentContract = artifacts.require("PaymentContract");


module.exports = function (deployer) {
    deployer.deploy(SimpleStorage);
    deployer.deploy(Tickets);
    deployer.deploy(PaymentContract);


}

