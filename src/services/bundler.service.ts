import { Connection, Keypair, Transaction } from '@solana/web3.js';
import { config } from '../config';
import { logger } from '../utils/logger';
import { TransactionBundle, BotStatus } from '../types';
import bs58 from 'bs58';

export class BundlerBot {
  private connection: Connection;
  private wallet: Keypair;
  private isRunning: boolean = false;
  private totalBundles: number = 0;
  private successfulBundles: number = 0;
  private failedBundles: number = 0;
  private startTime: number = 0;
  private bundleHistory: TransactionBundle[] = [];

  constructor() {
    this.connection = new Connection(config.solana.rpcUrl, 'confirmed');
    
    if (!config.solana.privateKey) {
      throw new Error('SOLANA_PRIVATE_KEY is not set');
    }
    
    this.wallet = Keypair.fromSecretKey(bs58.decode(config.solana.privateKey));
    logger.info(`Bundler bot initialized with wallet: ${this.wallet.publicKey.toString()}`);
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      logger.warn('Bundler bot is already running');
      return;
    }

    this.isRunning = true;
    this.startTime = Date.now();
    logger.info('📦 Bundler bot started');
  }

  stop(): void {
    this.isRunning = false;
    logger.info('⏹️ Bundler bot stopped');
  }

  getStatus(): BotStatus {
    return {
      isRunning: this.isRunning,
      totalBundles: this.totalBundles,
      successfulBundles: this.successfulBundles,
      failedBundles: this.failedBundles,
      startTime: this.startTime,
    };
  }

  getBundleHistory(): TransactionBundle[] {
    return this.bundleHistory;
  }

  async createBundle(transactions: string[]): Promise<TransactionBundle> {
    logger.info(`Creating bundle with ${transactions.length} transactions`);

    const bundle: TransactionBundle = {
      id: Date.now().toString(),
      transactions,
      status: 'pending',
      createdAt: Date.now(),
    };

    try {
      // TODO: Implement bundle creation logic
      // 1. Combine transactions into atomic bundle
      // 2. Sign bundle
      // 3. Send to network
      // 4. Monitor confirmation

      bundle.txHash = 'sample_tx_hash_here';
      bundle.status = 'confirmed';
      bundle.confirmedAt = Date.now();

      this.totalBundles++;
      this.successfulBundles++;
      this.bundleHistory.push(bundle);

      logger.info(`Bundle created successfully: ${bundle.id}`);
      return bundle;
    } catch (error: any) {
      bundle.status = 'failed';
      this.failedBundles++;
      logger.error(`Failed to create bundle:`, error);
      throw error;
    }
  }
}

