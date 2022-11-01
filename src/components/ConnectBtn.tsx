import {
  chain,
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useSwitchNetwork,
} from "wagmi";
import { useEffect, useState } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { connectError } from "../utils";

const STYLES = {
  PROFILE: {
    // position: "absolute" as "absolute",
    // top: "90px",
    // right: "20px",
    padding: "0.5rem 1rem",
    background: "red",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "bold" as "bold",
    cursor: "pointer",
  },
  CONNECT_BTN: {
    display: "flex",
    margin: "2rem auto",
    padding: "0.5rem 2rem",
    background: "green",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    borderRadius: "36px",
    fontSize: "18px",
    fontWeight: "bold" as "bold",
    cursor: "pointer",
  },
};

export default function ConnectBtn() {
  const { address } = useAccount();
  const [profile, setProfile] = useState<string>("");
  const { data: ensName } = useEnsName({ address });
  const {
    data: connectData,
    connect,
    error,
  } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const { switchNetwork } = useSwitchNetwork();
  let connectedChainId = connectData?.chain.id;
  let validChainId = chain.goerli.id;
  useEffect(() => {
    if (address) {
      let str = address.slice(0, 6) + "..." + address.slice(-4);
      setProfile(str);
    }
  }, [address]);

  useEffect(() => {
    if (connectedChainId !== validChainId) {
      switchNetwork?.(validChainId);
    }
  }, [connectData, connectedChainId, switchNetwork, validChainId]);

  return (
    <div>
      {address && (
        <button style={STYLES.PROFILE} onClick={() => disconnect()}>
          {ensName ?? profile}
        </button>
      )}
      {/* <div className={styles.imgBox}>
				<image src={logo} width={394} height={246} alt=''/>
			</div> */}
      {!address && (
        <button style={STYLES.CONNECT_BTN} onClick={() => connect()}>
          Connect
        </button>
      )}
      {error && <div {...connectError()}></div>}
    </div>
  );
}
