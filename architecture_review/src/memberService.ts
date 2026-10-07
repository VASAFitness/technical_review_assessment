import type { MemberRecord } from './db';
import { FakeCheckInDb } from './db';

export class memberService {
  constructor(private db: FakeCheckInDb) {}

  LoadMember(memberId: string): MemberRecord | undefined {
    return this.db.getMemberById(memberId);
  }
}
