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
    mainText: "Your team has {0} Immunities",
    subText: "Your <type1> pokemon is immune to <type2>",
    hintText: `Having an immunity can play a key role in a Pokemon battle. They can save a massive amount of tempo by\n -`,
  },
  {
    mainText: "Your team has {0} resistances",
    subText: "Your {0} pokemon is resistant to {1}",
    hintText: `Having an immunity can play a key role in a Pokemon battle. They can save a massive amount of tempo by\n -`,
  },
];

export const TEAM_OVERVIEW_SUGGESTIONS_TEXTS: TeamOverviewRowTextData[] = [
  {
    mainText: "Your team has {0} Immunities",
    subText: "Your <type1> pokemon is immune to <type2>",
    hintText: `Having an immunity can play a key role in a Pokemon battle. They can save a massive amount of tempo by\n -`,
  },
  {
    mainText: "Your team has {0} resistances",
    subText: "Your {0} pokemon is resistant to {1}",
    hintText: `Having an immunity can play a key role in a Pokemon battle. They can save a massive amount of tempo by\n -`,
  },
];

export const HINT_HEADER_DEFAULT: string = "Why is this important?";

export const ALERT_CANT_CREATE_MEMBER_TITLE: string = "Cannot create a team member";
export const ALERT_CANT_CREATE_NO_TYPES: string =
  "Cannot create a team member with no types, please select at least one type and try again.";
export const ALERT_CANT_CREATE_NO_NAME: string =
  "Cannot create a team member with no name, please input a name and try again.";
export const ALERT_CANT_CREATE_NAME_EXISTS: string =
  "Specified team member name already exists in your team. Select a different name and try again.";

export const ALERT_CANT_ANALYZE_TITLE: string = "Cannot procceed to team analysis";
export const ALERT_CANT_ANALYZE_CONTENT: string =
  "Cannot procceed to team analysis, there are not enough team members selected. Please select typing of at least two team members to procceed.";

export const MORE_DETAILS_VULN: string = "No. of vulnerabilities";
export const MORE_DETAILS_RESISTANCES: string = "No. of resistances";
export const MORE_DETAILS_IMMUNITIES: string = "No. of immunities";
export const MORE_DETAILS_WORST_MATCHUP: string = "Worst matchup";

export const MORE_DETAILS_SUPER_EFF: string = "Super-effective to:";
export const MORE_DETAILS_NOT_VERY_EFF: string = "Not very effective to:";
export const MORE_DETAILS_NO_EFF: string = "No effect on: ";
export const MORE_DETAILS_NO_COVERAGE: string = "No coverage to:";
