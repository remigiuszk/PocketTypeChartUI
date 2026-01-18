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
