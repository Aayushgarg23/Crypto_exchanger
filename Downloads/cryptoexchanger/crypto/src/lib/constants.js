export const TOKENS = [
  { symbol: 'MATIC', name: 'Polygon', address: '0x0000000000000000000000000000000000001010', decimals: 18, color: 'bg-purple-500' },
  { symbol: 'USDC', name: 'USD Coin', address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', decimals: 6, color: 'bg-blue-500' },
  { symbol: 'WETH', name: 'Wrapped Ether', address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', decimals: 18, color: 'bg-slate-500' },
  { symbol: 'USDT', name: 'Tether USD', address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', decimals: 6, color: 'bg-emerald-500' },
  { symbol: 'DAI', name: 'Dai Stablecoin', address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', decimals: 18, color: 'bg-yellow-500' },
  { symbol: 'WBTC', name: 'Wrapped BTC', address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', decimals: 8, color: 'bg-orange-500' },
];

export const INITIAL_PRICES = {
  MATIC: 0.85,
  USDC: 1.00,
  WETH: 2850.50,
  USDT: 1.00,
  DAI: 1.00,
  WBTC: 52000.00,
};

export const MOCK_WALLET_ASSETS = [
  { symbol: 'MATIC', balance: '1450.50' },
  { symbol: 'USDC', balance: '5420.00' },
  { symbol: 'WETH', balance: '0.45' },
];