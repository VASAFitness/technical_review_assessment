import { runCheckInReview } from './checkInStuff';

const result = runCheckInReview();

console.log(
  `Processed ${result.checkinsProcessed} check-ins, sent ${result.alertsSent} staff alerts, skipped ${result.skipped}.`,
);
