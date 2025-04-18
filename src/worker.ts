import process from 'node:process';
import { createRequire } from 'module';
import { Worker, NativeConnection } from '@temporalio/worker';
import * as activities from './activities/index.js';
import 'dotenv/config';

const require = createRequire(import.meta.url);
const workflowsPath = require.resolve('./workflows');

const connection = await NativeConnection.connect({
  address: 'us-east-1.aws.api.temporal.io:7233',
  apiKey: process.env.TEMPORAL_API_KEY,
});

// Use the appropriate namespace based on connection type
const worker = await Worker.create({
  connection,
  namespace:
    process.env.TEMPORAL_API_KEY && process.env.TEMPORAL_NAMESPACE
      ? process.env.TEMPORAL_NAMESPACE
      : 'default',
  workflowsPath,
  activities,
  taskQueue: 'workflow-statuses',
});

await worker.run();

process.on('beforeExit', (code) => {
  console.log(`Shutting down with code ${code}…`);
  worker.shutdown();
});
