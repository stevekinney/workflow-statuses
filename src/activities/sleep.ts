import { sleep } from '@temporalio/workflow';

export default async function (ms = '1 month'): Promise<void> {
  await sleep(ms);
}
