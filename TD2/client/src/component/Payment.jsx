import { useState } from "react";
import Web3 from "web3";
import PaymentContractABI from "../../../build/contracts/PaymentContract.json"; // Assurez-vous que le chemin est correct

function PaymentContractInteraction() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0);

  const initializeContract = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setAccounts(accounts);

        const contractAddress = "ADRESSE_DU_CONTRAT"; // Remplacez par l'adresse réelle
        const contract = new web3Instance.eth.Contract(
          PaymentContractABI.abi,
          contractAddress
        );
        setContract(contract);

        const balance = await contract.methods.balance().call();
        setBalance(balance);
      } catch (error) {
        console.error("Erreur lors de la connexion à MetaMask : ", error);
      }
    } else {
      console.error("MetaMask non détecté dans le navigateur.");
    }
  };

  const payToContract = async () => {
    if (web3 && contract && accounts.length > 0) {
      const amount = web3.utils.toWei("0.1", "ether"); // Montant en wei (0.1 ETH)
      await contract.methods.pay().send({ from: accounts[0], value: amount });
      const newBalance = await contract.methods.balance().call();
      setBalance(newBalance);
    }
  };

  const withdrawFromContract = async () => {
    if (web3 && contract && accounts.length > 0) {
      await contract.methods.withdraw(balance).send({ from: accounts[0] });
      const newBalance = await contract.methods.balance().call();
      setBalance(newBalance);
    }
  };

  return (
    <div>
      <h1>Interaction avec le Contrat de Paiement</h1>
      {accounts.length > 0 ? (
        <div>
          <p>Connecté avec ladresse : {accounts[0]}</p>
          <p>
            Balance du contrat :{" "}
            {web3.utils.fromWei(balance.toString(), "ether")} ETH
          </p>
          <button onClick={payToContract}>Payer au contrat</button>
          <button onClick={withdrawFromContract}>Retirer du contrat</button>
        </div>
      ) : (
        <div>
          <p>
            Veuillez vous connecter à MetaMask pour interagir avec le contrat.
          </p>
          <button onClick={initializeContract}>Initialiser la connexion</button>
        </div>
      )}
    </div>
  );
}

export default PaymentContractInteraction;
