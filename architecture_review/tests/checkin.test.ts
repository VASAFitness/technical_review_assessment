import { describe, expect, test } from 'bun:test';

import { CheckInStuff, runCheckInReview } from '../src/checkInStuff';
import { FakeCheckInDb } from '../src/db';
import { memberService } from '../src/memberService';
import { SendMessage } from '../src/sendMessage';

describe('check-in review assignment', () => {
  test('runs the inherited check-in flow', () => {
    expect(runCheckInReview()).toEqual({
      checkinsProcessed: 4,
      membersFound: 3,
      alertsSent: 2,
      skipped: 1,
    });
  });

  test('uses the seeded concrete services', () => {
    const db = new FakeCheckInDb();
    const members = new memberService(db);
    const sender = new SendMessage();

    const result = CheckInStuff(db, members, sender);

    expect(result.alertsSent).toBe(2);
    expect(sender.SentMessages.map((message) => message.memberId)).toEqual([
      'member-2',
      'member-3',
    ]);
  });
});
