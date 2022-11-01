import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
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

export default function MintCard() {
  const [addr, setAddr] = useState<string>("");
  const [num, setNum] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [secret, setSecret] = useState<string>("1234567890");

  const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "devMint",
    args: [addr, num, secret],
  });

  const getSecret = () => {};

  const handleMint = () => {
    if (writeAsync) writeAsync();
  };
  return (
    <div style={STYLES.CONTAINER}>
      <Input
        placeholder="錢包地址"
        width="auto"
        onChange={(e) => setAddr(e.target.value)}
      />
      <br />
      <Input
        placeholder="數量"
        width="auto"
        onChange={(e) => setNum(e.target.value)}
      />
      <br />
      <Input
        placeholder="身分證"
        width="auto"
        onChange={(e) => setId(e.target.value)}
      />
      <br />
      <Button onClick={() => handleMint()}>發送 NFT</Button>
    </div>
  );
}
