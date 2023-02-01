import { Connection, Client } from '@temporalio/client';
import { easilyCompleted, longRunning, failing } from './workflows';
import { nanoid } from 'nanoid';

const connection = await Connection.connect();

const client = new Client({
  connection,
});

await client.workflow.start(easilyCompleted, {
  args: ['Temporal'],
  taskQueue: 'workflow-statuses',
  workflowId: 'Completed-' + nanoid(),
});

await client.workflow.start(longRunning, {
  args: [],
  taskQueue: 'workflow-statuses',
  workflowId: 'Running-' + nanoid(),
});

await client.workflow.start(failing, {
  args: [],
  taskQueue: 'workflow-statuses',
  workflowId: 'Failed-' + nanoid(),
});

const workflow = await client.workflow.start(longRunning, {
  args: [],
  taskQueue: 'workflow-statuses',
  workflowId: 'Canceled-' + nanoid(),
});
// give time for Activity to start
await new Promise((resolve) => setTimeout(resolve, 500));
await workflow.cancel();
