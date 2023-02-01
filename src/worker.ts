import process from 'node:process';
import { createRequire } from 'module';
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

const require = createRequire(import.meta.url);
const workflowsPath = require.resolve('./workflows');

const worker = await Worker.create({
  workflowsPath,
  activities,
  taskQueue: 'hello-world',
});

await worker.run();

process.on('beforeExit', (code) => {
  worker.shutdown();
  console.log('Process beforeExit event with code: ', code);
});
