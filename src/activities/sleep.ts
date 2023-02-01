import { sleep } from '@temporalio/workflow';

export default async function (ms = Number.MAX_SAFE_INTEGER): Promise<void> {
  await sleep(ms);
}
