# Workflow Statuses Demo

This project demonstrates different Temporal workflow statuses including Completed, Running, Failed, Canceled, Terminated, ContinuedAsNew, and TimedOut.

## Setup Options

### Option 1: Using Local Temporal Server (Recommended for Development)

1. Install the Temporal CLI if you haven't already:
   ```bash
   brew install temporal
   ```

2. Start the local Temporal server:
   ```bash
   temporal server start-dev
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

4. In one terminal, start the worker:
   ```bash
   npm run start:worker
   # or
   pnpm run start:worker
   ```

5. In another terminal, start the client to create workflows:
   ```bash
   npm run start:workflow
   # or
   pnpm run start:workflow
   ```

### Option 2: Using Temporal Cloud

1. Create a `.env` file with your Temporal Cloud credentials:
   ```
   TEMPORAL_API_KEY=your_api_key_here
   TEMPORAL_NAMESPACE=your_namespace_here
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. In one terminal, start the worker:
   ```bash
   npm run start:worker
   # or
   pnpm run start:worker
   ```

4. In another terminal, start the client to create workflows:
   ```bash
   npm run start:workflow
   # or
   pnpm run start:workflow
   ```

## Viewing Workflows

When using a local Temporal server, you can view the workflow executions in the Temporal Web UI at [http://localhost:8233](http://localhost:8233).

When using Temporal Cloud, you can view your workflows in the Temporal Cloud UI at [https://cloud.temporal.io](https://cloud.temporal.io).

## What this Demo Shows

This demo creates multiple workflow executions with different statuses:

- **Completed**: Workflows that complete successfully
- **Running**: Long-running workflows (10 days)
- **Failed**: Workflows that throw an error
- **Canceled**: Workflows that are explicitly canceled
- **Terminated**: Workflows that are terminated
- **ContinuedAsNew**: Workflows that continue as new
- **TimedOut**: Workflows that timeout due to execution timeout

Each workflow type demonstrates a different status in the Temporal UI.
