import { ApplicationFailure } from '@temporalio/client';

export default async function () {
  throw ApplicationFailure.nonRetryable('Fictitious error!');
}
