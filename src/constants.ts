import { Token } from "@prex0/prex-client"
import { Address } from "viem"

const MODE = import.meta.env.MODE

// Chain ID
export const CHAIN_ID = MODE === 'dev' ? 421614 : 42161

// Advanced

export const MAX_FEE_PER_GAS = '0.23'
export const MAX_PRIORITY_FEE_PER_GAS = '0.11'


export const DEMO_TOKEN: Token = {
  name: 'USDC',
  address: '0xAa0ebd8c37f4E00425cC82b2E19fee54a097e769',
  symbol: 'USDC',
  decimals: 18,
  precision: 2,
  image:
    'https://app.predy.finance/icons/usdc.svg',
  chainId: CHAIN_ID,
};

export const USDC_TOKEN: Token = MODE === 'dev' ? DEMO_TOKEN : {
  name: 'USDCoin',
  address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  symbol: 'USDC',
  decimals: 6,
  precision: 2,
  image:
  'https://app.predy.finance/icons/usdc.svg',
  chainId: CHAIN_ID,
};

export const WETH_TOKEN: Token = {
  name: 'Wrapped Ether',
  address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  symbol: 'WETH',
  decimals: 18,
  precision: 12,
  image:
  'https://app.predy.finance/icons/eth.svg',
  chainId: CHAIN_ID
};

export const WSTETH_TOKEN_ARBITRUM = {
  name: 'Wrapped Lido Staked Ether',
  address: '0x5979D7b546E38E414F7E9822514be443A4800529' as Address,
  symbol: 'wstETH',
  decimals: 18,
  precision: 12,
  image: 'https://coin-images.coingecko.com/coins/images/18834/large/wstETH.png',
  chainId: CHAIN_ID
};

export const USDT_TOKEN_ARBITRUM = {
  name: 'USDT',
  address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9' as Address,
  symbol: 'USDT',
  decimals: 6,
  precision: 2,
  image: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/assets/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9/logo.png',
  chainId: CHAIN_ID
};

export const DEFAULT_TOKEN_LIST = [WETH_TOKEN, USDC_TOKEN, WSTETH_TOKEN_ARBITRUM]