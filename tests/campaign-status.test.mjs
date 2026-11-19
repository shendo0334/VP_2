import assert from "node:assert/strict";
import test from "node:test";
import { campaignStatus } from "../src/lib/campaign-status.ts";

const window = { startDate: "2026-11-19", endDate: "2026-11-20" };

test("unapproved and invalid campaigns cannot become current", () => {
  const now = new Date("2026-11-19T10:00:00Z");
  assert.equal(campaignStatus({ ...window, status: "Live", approved: false }, now), "Unconfirmed");
  assert.equal(campaignStatus({ ...window, status: "Live", approved: true, endDate: "2026-11-31" }, now), "Unconfirmed");
  assert.equal(campaignStatus({ ...window, status: "Ended", approved: false }, now), "Ended");
});

test("approved windows open and close on showroom calendar days", () => {
  const campaign = { ...window, status: "Upcoming", approved: true };
  assert.equal(campaignStatus(campaign, new Date("2026-11-18T18:29:59Z")), "Upcoming");
  assert.equal(campaignStatus(campaign, new Date("2026-11-18T18:30:00Z")), "Live");
  assert.equal(campaignStatus(campaign, new Date("2026-11-20T18:29:59Z")), "Live");
  assert.equal(campaignStatus(campaign, new Date("2026-11-20T18:30:00Z")), "Ended");
});
