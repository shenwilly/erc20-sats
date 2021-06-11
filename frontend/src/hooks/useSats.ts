import { useContext } from "react";

import { SatsContext } from "../contexts/Sats";

const useSats = () => {
  return { ...useContext(SatsContext) };
};

export default useSats;
