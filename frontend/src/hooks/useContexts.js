import { useContext } from "react";
import GlobalContext from "../context/globalContext";
import ModalContext  from "../context/modalContext";

export const useGlobalContext = () => {
	return useContext(GlobalContext);
};

export const useModalContext = () => {
  return useContext(ModalContext);
};