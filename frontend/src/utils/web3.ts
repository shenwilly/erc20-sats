import { ethers, providers } from "ethers";
import { IERC20 } from "../types";
import IERC20abi from "../contracts/abi/IERC20.json"

export const getERC20 = (
    tokenAddress: string, 
    provider: providers.Provider
): IERC20 => {
    return (new ethers.Contract(tokenAddress, IERC20abi, provider)) as IERC20;
};

export const getAllowance = async (
    userAddress: string, 
    spenderAddress: string, 
    tokenAddress: string, 
    provider: providers.Provider
): Promise<string> => {
    const tokenContract = getERC20(tokenAddress, provider);
    try {
        const allowance: string = (await tokenContract.allowance(userAddress, spenderAddress)).toString();
        return allowance;
    } catch (e) {
        console.log(e)
        return "0";
    }
};
  
export const getBalance = async (
    userAddress: string,
    tokenAddress: string, 
    provider: providers.Provider 
): Promise<string> => {
    const tokenContract = getERC20(tokenAddress, provider);
    try {
        const balance: string = (await tokenContract.balanceOf(userAddress)).toString();
        return balance;
    } catch (e) {
        console.log(e)
        return "0";
    }
};
  