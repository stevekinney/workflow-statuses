import { Connection, Client } from '@temporalio/client';
import { easilyCompleted, longRunning, failing } from './workflows';
import { nanoid } from 'nanoid';

const connection = await Connection.connect();

const sleep = async <T = unknown>(value: T, ms = 500): Promise<T> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return value;
};

const taskQueue = 'workflow-statuses';

const client = new Client({
  connection,
});

await client.workflow.start(easilyCompleted, {
  args: [2],
  taskQueue,
  workflowId: `Completed-${nanoid()}`,
});

await client.workflow.start(longRunning, {
  args: [],
  taskQueue,
  workflowId: `Running-${nanoid()}`,
});

await client.workflow.start(failing, {
  args: [],
  taskQueue,
  workflowId: `Failed-${nanoid()}`,
});

await client.workflow
  .start(longRunning, {
    args: [],
    taskQueue,
    workflowId: `Canceled-${nanoid()}`,
  })
  .then(sleep)
  .then((workflow) => workflow.cancel());

await client.workflow
  .start(longRunning, {
    args: [],
    taskQueue,
    workflowId: `Terminated-${nanoid()}`,
  })
  .then(sleep)
  .then((workflow) => workflow.terminate());

await client.workflow.start(easilyCompleted, {
  args: [2, 1],
  taskQueue,
  workflowId: `ContinuedAsNew-${nanoid()}`,
});

try {
  await client.workflow.execute(longRunning, {
    args: [],
    taskQueue,
    workflowId: `TimedOut-${nanoid()}`,
    workflowExecutionTimeout: '1s',
  });
} catch (error) {}
