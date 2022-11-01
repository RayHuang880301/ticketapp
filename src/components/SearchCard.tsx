import { Button, Input } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { useState } from "react";
import { useContract, useContractRead, useProvider, useSigner } from "wagmi";
import CONTRACT_ABI from "../assets/abi.json";
const CONTRACT_ADDRESS = "0x2C4dd3453A011BB6be912c561DC521F2D390b911";

const STYLES = {
  CONTAINER: {
    margin: "2rem",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "left",
    alienItems: "center",
    height: "50%",
  },
};

export default function SearchCard() {
  const { data: signer } = useSigner();
  const [nftId, setNftId] = useState<string>("0");
  const [ticketAmt, setTicketAmt] = useState<string>("0");

  const handleQuery = async () => {
    if (signer) {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      contract.checkTicketAmt(nftId).then((res: any) => {
        setTicketAmt(res.toString());
      });
      console.log("ticketAmt", ticketAmt);
    }
  };
  return (
    <div style={STYLES.CONTAINER}>
      <Input
        placeholder="NFT 編號"
        width="auto"
        onChange={(e) => setNftId(e.target.value)}
      />
      <br />
      <Button onClick={() => handleQuery()}>查詢</Button>
    </div>
  );
}
