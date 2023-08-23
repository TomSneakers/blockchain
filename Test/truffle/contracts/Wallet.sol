// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Portefeuille {
    struct PortefeuilleStruct {
        uint solde;
        uint numPaiements;
    }

    mapping(address => PortefeuilleStruct) Portefeuilles;

    function getSoldeTotal() public view returns (uint) {
        return address(this).balance;
    }

    function getSolde() public view returns (uint) {
        return Portefeuilles[msg.sender].solde;
    }

    function retirerToutLArgent(address payable _vers) public {
        uint _montant = Portefeuilles[msg.sender].solde;
        Portefeuilles[msg.sender].solde = 0;
        _vers.transfer(_montant);
    }

    receive() external payable {
        Portefeuilles[msg.sender].solde += msg.value;
        Portefeuilles[msg.sender].numPaiements += 1;
    }
}
