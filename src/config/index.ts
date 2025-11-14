import dotenv from 'dotenv';

dotenv.config();

export const config = {
  server: {
    port: parseInt(process.env.PORT || '3004', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  solana: {
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
    privateKey: process.env.SOLANA_PRIVATE_KEY || '',
    publicKey: process.env.SOLANA_PUBLIC_KEY || '',
  },
  bundler: {
    enabled: process.env.BUNDLER_ENABLED === 'true',
    maxBundleSize: parseInt(process.env.MAX_BUNDLE_SIZE || '10', 10),
    bundleTimeoutMs: parseInt(process.env.BUNDLE_TIMEOUT_MS || '5000', 10),
    priorityFee: parseFloat(process.env.PRIORITY_FEE || '0.0001'),
    maxRetries: parseInt(process.env.MAX_RETRIES || '3', 10),
    transactionTimeout: parseInt(process.env.TRANSACTION_TIMEOUT || '30000', 10),
    atomicExecution: process.env.ATOMIC_EXECUTION === 'true',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/bundler.log',
  },
};

