export type TeamOverviewRowTextData = {
  mainText: string;
  subText: string;
  hintText: string;
};

export const TEAM_OVERVIEW_WEAKNESSES_TEXTS: TeamOverviewRowTextData[] = [
  {
    mainText: "Your team has 0 Immunities",
    subText: "Consider adding one to your team.",
    hintText: `Having an immunity can play a key role in a Pokemon battle. They can save a massive amount of tempo by\n -`,
  },
];

export const TEAM_OVERVIEW_STRENGHTS_TEXTS: TeamOverviewRowTextData[] = [
  {
    mainText: "Your team has {numberOfImmunities} Immunities",
    subText: "Your <type1> pokemon is immune to <type2>",
    hintText: `Having an immunity can play a key role in a Pokemon battle. They can save a massive amount of tempo by\n -`,
  },
];

export const HINT_HEADER_DEFAULT: string = "Why is this important?";

export const ALERT_CANT_CREATE_MEMBER_TITLE: string = "Cannot create a team member";
export const ALERT_CEANT_CREATE_MEMBER_CONTENT: string =
  "Cannot create a team member with no types, please select at least one type and try again.";

export const ALERT_CANT_ANALYZE_TITLE: string = "Cannot procceed to team analysis";
export const ALERT_CANT_ANALYZE_CONTENT: string =
  "Cannot procceed to team analysis, there are not enough team members selected. Please select typing of at least two team members to procceed.";
