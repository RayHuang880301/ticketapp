import { Toast } from "@chakra-ui/react";

export const connectError = () => {
  return Toast({
    title: "Error",
    description: "Connect Error",
    position: "top",
    status: "error",
    duration: 9000,
    isClosable: true,
  });
};
