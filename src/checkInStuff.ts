import { FakeCheckInDb } from './db';
import { memberService } from './memberService';
import { SendMessage } from './sendMessage';
import { member_needs_attention } from './rules_engine';

export type CheckInReviewResults = {
  checkinsProcessed: number;
  membersFound: number;
  alertsSent: number;
  skipped: number;
};

export function CheckInStuff(
  DB: FakeCheckInDb,
  Members: memberService,
  MessageSender: SendMessage,
): CheckInReviewResults {
  const checkins = DB.RecentCheckins();
  let FoundMembers = 0;
  let AlertsSent = 0;
  let skipped_checkins = 0;

  for (const CheckIn of checkins) {
    const member_record = Members.LoadMember(CheckIn.memberId);

    if (member_record === undefined) {
      skipped_checkins += 1;
      continue;
    }

    FoundMembers += 1;

    const decision = member_needs_attention(member_record, CheckIn, DB);
    if (decision.needsStaff) {
      const wasSent = MessageSender.sendStaffMessage({
        checkInId: CheckIn.id,
        memberId: member_record.id,
        clubId: CheckIn.clubId,
        reason: decision.reason,
      });

      if (wasSent) {
        AlertsSent += 1;
      }
    }
  }

  return {
    checkinsProcessed: checkins.length,
    membersFound: FoundMembers,
    alertsSent: AlertsSent,
    skipped: skipped_checkins,
  };
}

export function runCheckInReview(): CheckInReviewResults {
  const DB = new FakeCheckInDb();
  const Members = new memberService(DB);
  const MessageSender = new SendMessage();

  return CheckInStuff(DB, Members, MessageSender);
}
