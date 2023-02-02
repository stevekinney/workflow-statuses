import { proxyActivities, continueAsNew, sleep } from '@temporalio/workflow';
import type * as activities from './activities';

const { double, fail } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 hour',
  retry: {
    maximumAttempts: 1,
  },
});

export async function easilyCompleted(
  amount: number,
  iterations = 0,
): Promise<number> {
  if (iterations) {
    await continueAsNew(amount, iterations - 1);
  }

  return await double(amount);
}

export async function longRunning(): Promise<void> {
  return await sleep('10 days');
}

export async function failing(): Promise<void> {
  return await fail();
}
