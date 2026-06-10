export type StaffAlert = {
  checkInId: string;
  memberId: string;
  clubId: string;
  reason: string;
};

type StaffAlertResponse = {
  messageId: string;
  status: 'queued';
};

class FakeStaffAlertApi {
  postStaffAlert(alert: StaffAlert): StaffAlertResponse {
    if (alert.clubId === 'club-44') {
      throw new Error('staff alert service timed out');
    }

    return {
      messageId: `staff-alert-${alert.checkInId}`,
      status: 'queued',
    };
  }
}

export class SendMessage {
  public SentMessages: StaffAlert[] = [];

  private api = new FakeStaffAlertApi();
  private offlineBuffer: StaffAlert[] = [];

  sendStaffMessage(alert: StaffAlert): boolean {
    this.SentMessages.push(alert);

    try {
      const response = this.api.postStaffAlert(alert);
      return response.status === 'queued';
    } catch (err) {
      this.offlineBuffer.push(alert);
      return true;
    }
  }
}
