import type { CheckIn, MemberRecord, FakeCheckInDb } from './db';

export type RuleDecision = {
  needsStaff: boolean;
  reason: string;
};

type RuleEvaluator = (member: MemberRecord, checkIn: CheckIn, db: FakeCheckInDb) => RuleDecision | null;

const MEMBERSHIP_RULES: RuleEvaluator[] = [
  // Cancelled Membership check
  (member) =>
    member.status === 'cancelled'
      ? {
          needsStaff: true,
          reason: `${member.fullName} has a cancelled membership`,
        }
      : null,

  // Frozen Membership check
  (member) =>
    member.status === 'frozen'
      ? {
          needsStaff: true,
          reason: `${member.fullName} has a frozen membership`,
        }
      : null,

  // Large Overdue Balance check
  (member) =>
    member.status === 'past_due' && member.balanceDueCents > 5000
      ? {
          needsStaff: true,
          reason: `${member.fullName} has a large overdue balance`,
        }
      : null,

  // Trial Membership Usage away from home club check
  (member, checkIn) =>
    member.membershipType === 'trial' && checkIn.clubId !== member.homeClubId
      ? {
          needsStaff: true,
          reason: `${member.fullName} is using a trial membership away from home club`,
        }
      : null,

  // Trial Membership maximum check-in frequency limit
  (member, checkIn, db) => {
    if (member.membershipType === 'trial') {
      const historicalCount = db.getCheckInCountForMember(member.id);
      // Trial members are capped at 5 total promotional check-ins.
      if (historicalCount >= 5) {
        return {
          needsStaff: true,
          reason: `${member.fullName} has reached the trial limit of 5 visits (currently ${historicalCount})`,
        };
      }
    }
    return null;
  },

  // Basic Membership Usage at away club check
  (member) =>
    member.membershipType === 'basic' && member.clubRelationship === 'away_club'
      ? {
          needsStaff: true,
          reason: `${member.fullName} has a basic membership at an away club`,
        }
      : null,

  // Studio Membership Door Check
  (member, checkIn) =>
    member.membershipType === 'studio' && checkIn.doorId === 'side-door'
      ? {
          needsStaff: true,
          reason: `${member.fullName} checked in through an unusual door`,
        }
      : null,

  // Active Membership with Small Balance check
  (member) =>
    member.status === 'active' && member.balanceDueCents > 0
      ? {
          needsStaff: true,
          reason: `${member.fullName} has a small balance to review`,
        }
      : null,
];

export function member_needs_attention(member: MemberRecord, checkIn: CheckIn, db: FakeCheckInDb): RuleDecision {
  for (const evaluateRule of MEMBERSHIP_RULES) {
    const decision = evaluateRule(member, checkIn, db);
    if (decision !== null) {
      return decision;
    }
  }

  return {
    needsStaff: false,
    reason: 'No staff attention needed',
  };
}
