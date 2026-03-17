export type TeamOverviewRowTextData = {
  mainText: string;
  subText: string;
  hintText: string;
};

export const OVERVIEW_STRINGS = {
  immunities: {
    header: (count: number) => `Your team has ${count} immunities!`,
    lowSubText: "Consider adding one to your team.",
    suggestionText: "Adding one more might make your team stronger.",
    highSubText: "Your team has great immunity coverage!",
    hintText:
      "Immunities are one of the most powerful tools in Pokémon battles. When your Pokémon is immune to a move, you can switch it in for free — this is called pivoting. For example, if your opponent uses Earthquake, switching in a Flying-type not only blocks the damage completely, but forces your opponent into a tough spot, giving you a free turn to set up, heal, or attack. A well-timed immunity switch can shift momentum entirely in your favor.",
  },
};

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
