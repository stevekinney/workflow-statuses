import { Context } from '@temporalio/activity';

export default async function (ms = '1 month'): Promise<void> {
  await Context.current().sleep(ms);
}
