import { ethers } from "ethers";

const SWTH_TOKEN_CONTRACT = "0xc0ecb8499d8da2771abcbf4091db7f65158f1468";

const HOLDERS = [
  "0xb5d4f343412dc8efb6ff599d790074d0f1e8d430",
  "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
  "0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392",
];

// List of Public RPC nodes
// https://docs.bscscan.com/misc-tools-and-utilities/public-rpc-nodes
const provider: ethers.JsonRpcProvider = new ethers.JsonRpcProvider(
  "https://bsc-dataseed1.binance.org/"
);

const tokenContract: ethers.Contract = new ethers.Contract(
  SWTH_TOKEN_CONTRACT,
  ["function balanceOf(address owner) view returns (uint256)"],
  provider
);

interface Balance {
  address: string;
  amount: string;
}

async function retrieveHolders(): Promise<void> {
  const balances: Balance[] = await Promise.all(
    HOLDERS.map(async (holder: string): Promise<Balance> => {
      const balance: ethers.BigNumberish = await tokenContract.balanceOf(
        holder
      );
      return {
        address: holder,
        amount: balance.toString(),
      };
    })
  );

  balances.forEach(({ address, amount }: Balance): void => {
    console.log(`${address} ${formatAmount(amount)}`);
  });
}

function formatAmount(amount: string): string {
  const [integer, decimal] = ethers.formatEther(amount).split(".");
  const formattedInteger: string = parseInt(integer).toLocaleString();
  const formattedDecimal: string =
    decimal?.padEnd(8, "0").slice(0, 8) ?? "00000000";
  return `${formattedInteger}.${formattedDecimal}`;
}

retrieveHolders();
