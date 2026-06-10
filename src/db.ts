export type CheckIn = {
  id: string;
  memberId: string;
  clubId: string;
  doorId: string;
  scannedAt: Date;
};

export type MemberStatus = 'active' | 'past_due' | 'frozen' | 'cancelled';

export type MembershipType = 'basic' | 'plus' | 'studio' | 'trial';

export type ClubRelationship = 'home_club' | 'nearby_club' | 'away_club';

export type MemberRecord = {
  id: string;
  fullName: string;
  status: MemberStatus;
  membershipType: MembershipType;
  balanceDueCents: number;
  homeClubId: string;
  clubRelationship: ClubRelationship;
};

export class FakeCheckInDb {
  RecentCheckins(): CheckIn[] {
    return [
      {
        id: 'checkin-1',
        memberId: 'member-1',
        clubId: 'club-12',
        doorId: 'front-desk',
        scannedAt: new Date('2026-06-08T12:00:00.000Z'),
      },
      {
        id: 'checkin-2',
        memberId: 'member-2',
        clubId: 'club-12',
        doorId: 'front-desk',
        scannedAt: new Date('2026-06-08T12:03:00.000Z'),
      },
      {
        id: 'checkin-3',
        memberId: 'member-3',
        clubId: 'club-44',
        doorId: 'side-door',
        scannedAt: new Date('2026-06-08T12:07:00.000Z'),
      },
      {
        id: 'checkin-4',
        memberId: 'missing-member',
        clubId: 'club-12',
        doorId: 'front-desk',
        scannedAt: new Date('2026-06-08T12:10:00.000Z'),
      },
    ];
  }

  getMemberById(memberId: string): MemberRecord | undefined {
    const members: MemberRecord[] = [
      {
        id: 'member-1',
        fullName: 'Jordan Lee',
        status: 'active',
        membershipType: 'plus',
        balanceDueCents: 0,
        homeClubId: 'club-12',
        clubRelationship: 'home_club',
      },
      {
        id: 'member-2',
        fullName: 'Avery Morgan',
        status: 'past_due',
        membershipType: 'basic',
        balanceDueCents: 8100,
        homeClubId: 'club-12',
        clubRelationship: 'home_club',
      },
      {
        id: 'member-3',
        fullName: 'Sam Patel',
        status: 'active',
        membershipType: 'trial',
        balanceDueCents: 0,
        homeClubId: 'club-12',
        clubRelationship: 'away_club',
      },
    ];

    return members.find((member) => member.id === memberId);
  }

  getCheckInHistory(): CheckIn[] {
    return [
      {
        id: 'h-1',
        memberId: 'member-1',
        clubId: 'club-12',
        doorId: 'front-desk',
        scannedAt: new Date('2026-06-01T08:00:00.000Z'),
      },
      {
        id: 'h-2',
        memberId: 'member-1',
        clubId: 'club-12',
        doorId: 'front-desk',
        scannedAt: new Date('2026-06-02T08:00:00.000Z'),
      },
      {
        id: 'h-3',
        memberId: 'member-3',
        clubId: 'club-12',
        doorId: 'front-desk',
        scannedAt: new Date('2026-06-03T09:00:00.000Z'),
      },
      {
        id: 'h-4',
        memberId: 'member-3',
        clubId: 'club-12',
        doorId: 'front-desk',
        scannedAt: new Date('2026-06-04T09:00:00.000Z'),
      },
    ];
  }

  getCheckInCountForMember(memberId: string): number {
    const history = this.getCheckInHistory();
    let count = 0;
    for (let i = 0; i < history.length; i++) {
      if (history[i].memberId === memberId) {
        count += 1;
      }
    }
    return count;
  }
}
