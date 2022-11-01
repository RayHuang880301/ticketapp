import { Button, Input } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";
import { useSigner } from "wagmi";
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

export default function ConsumeCard() {
  const { data: signer, isError, isLoading } = useSigner();
  const [nftId, setNftId] = useState<string>("0");
  const [id, setId] = useState<string>("");
  const [secret, setSecret] = useState<string>("1234567890");

  const getSecret = () => {};

  const handleQuery = async () => {
    if (signer) {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      const isHolder = await contract.checkHolder(nftId, secret);
      console.log("isHolder", isHolder);
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
      <Input
        placeholder="身分證"
        width="auto"
        onChange={(e) => setId(e.target.value)}
      />
      <br />
      <Button onClick={() => handleQuery()}>消費一次</Button>
    </div>
  );
}
