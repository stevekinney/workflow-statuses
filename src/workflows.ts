import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { complete, sleep, fail } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 hour',
  retry: {
    maximumAttempts: 1,
  },
});

export async function easilyCompleted(name: string): Promise<string> {
  return await complete(name);
}

export async function longRunning(): Promise<void> {
  return await sleep();
}

export async function failing(): Promise<void> {
  return await fail();
}
