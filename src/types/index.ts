export interface TransactionBundle {
  id: string;
  transactions: string[];
  txHash?: string;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: number;
  confirmedAt?: number;
}

export interface BotStatus {
  isRunning: boolean;
  totalBundles: number;
  successfulBundles: number;
  failedBundles: number;
  startTime: number;
}

