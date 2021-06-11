import { ethers, providers } from "ethers";
import { IERC20 } from "../types";
import IERC20abi from "../contracts/abi/IERC20.json"

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
    const tokenContract = (new ethers.Contract(tokenAddress, IERC20abi, provider)) as IERC20
    try {
        const balance: string = (await tokenContract.balanceOf(userAddress)).toString();
        return balance;
    } catch (e) {
        console.log(e)
        return "0";
    }
};
  