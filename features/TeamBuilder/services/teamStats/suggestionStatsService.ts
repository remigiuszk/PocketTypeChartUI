import { TeamMemberModel } from "../../types";
import { MissingRole, SuggestionStats, TeamRole } from "./types";

// Defensively bulky types — a team with none of these often lacks a member
// that can reliably take a hit and switch in safely.
const BULKY_TYPE_IDS = [1, 6, 9, 11]; // Normal, Rock, Steel, Water

// Types that commonly carry reliable status / crowd-control moves:
// Grass (powder moves) and Electric (Nuzzle, Thunder Wave).
const CROWD_CONTROL_TYPE_IDS = [12, 13]; // Grass, Electric

const ROLE_TYPE_IDS: Record<TeamRole, number[]> = {
  [TeamRole.BulkyType]: BULKY_TYPE_IDS,
  [TeamRole.CrowdControl]: CROWD_CONTROL_TYPE_IDS,
};

export const suggestionStatsService = (members: TeamMemberModel[]) => {
  function calculate(): SuggestionStats {
    const presentTypeIds = new Set(members.flatMap((m) => m.types.map((t) => t.id)));

    const missingRoles: MissingRole[] = (Object.keys(ROLE_TYPE_IDS) as TeamRole[])
      .filter((role) => !ROLE_TYPE_IDS[role].some((id) => presentTypeIds.has(id)))
      .map((role) => ({ role, suggestedTypeIds: ROLE_TYPE_IDS[role] }));

    return { missingRoles };
  }

  return {
    calculate,
  };
};
