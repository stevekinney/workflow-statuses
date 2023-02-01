import { Context } from '@temporalio/activity';

export default async function (ms = '10 days'): Promise<void> {
  await Context.current().sleep(ms);
}
