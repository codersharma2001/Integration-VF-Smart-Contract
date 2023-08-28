import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; // Import Web3
import VFContractABI from './VFContractABI.json';
const contractAddress = '0xb4d66Cb1665A1249ED3cdF4546fFa3205a3Fd795';

const Contribute = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const web3Instance = new Web3(window.ethereum);
          const accounts = await web3Instance.eth.getAccounts();
          const vfContract = new web3Instance.eth.Contract(VFContractABI, contractAddress);
          setWeb3(web3Instance);
          setContract(vfContract);
          setAccount(accounts[0]);
        } catch (error) {
          console.error('Error initializing Web3:', error);
        }
      }
    };
    init();
  }, []);

  const handleGetSeed = async () => {
    try {
      await contract.methods.getSeed().send({ from: account });
      alert('Seed NFT minted!');
    } catch (error) {
      console.error('Error getting seed:', error);
    }
  };

  const handleGiveWater = async () => {
    try {
      await contract.methods.giveWater().send({ from: account });
      alert('Water given!');
    } catch (error) {
      console.error('Error giving water:', error);
    }
  };

  const handleApplyManure = async () => {
    try {
      await contract.methods.applyManure().send({ from: account });
      alert('Manure applied!');
    } catch (error) {
      console.error('Error applying manure:', error);
    }
  };

  if (!web3) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button onClick={handleGetSeed}>Get Seed</button>
      <button onClick={handleGiveWater}>Give Water</button>
      <button onClick={handleApplyManure}>Apply Manure</button>
    </>
  );
};

export default Contribute;
