import { providers } from "ethers";

export const getAllowance = async (
    userAddress: string, 
    spenderAddress: string, 
    tokenAddress: string, 
    provider: providers.Provider
): Promise<string> => {
    // try {
    //   const tokenContract = getERC20Contract(provider, tokenAddress);
    //   const allowance: string = await tokenContract.methods.allowance(userAddress, spenderAddress).call();
    //   return allowance;
    // } catch (e) {
    //   return "0";
    // }
    return "0";
  };
  
export const getBalance = async (
    userAddress: string,
    tokenAddress: string, 
    provider: providers.Provider 
): Promise<string> => {
    // const tokenContract = getERC20Contract(provider, tokenAddress);
    // try {
    //     const balance: string = await tokenContract.methods.balanceOf(userAddress).call();
    //     return balance;
    // } catch (e) {
    //     return "0";
    // }
    return "0";
};
  