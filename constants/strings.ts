export type TeamOverviewRowTextData = {
  mainText: string;
  subText: string;
  hintText: string;
};

export const OVERVIEW_STRINGS = {
  immunities: {
    header: (count: number) => `Your team has ${count} immunities!`,
    lowSubText: "No immunity coverage on your team.",
    suggestionText: "Adding one more might make your team stronger.",
    highSubText: "Your team has great immunity coverage!",
    hintText:
      "Immunities are one of the most powerful tools in Pokémon battles. When your Pokémon is immune to a move, you can switch it in for free — this is called pivoting. For example, if your opponent uses Earthquake, switching in a Flying-type not only blocks the damage completely, but forces your opponent into a tough spot, giving you a free turn to set up, heal, or attack. A well-timed immunity switch can shift momentum entirely in your favor.",
  },
  criticalWeakness: {
    header: "Critical weakness against: ",
    subText: (count: number) => `${count} members are vulnerable`,
    hintText:
      "Critical weakness means that more than 4 members of your team share a vulnerability to the same type. This is one of the most dangerous situations in competitive battles — a single Pokemon of that type can threaten your entire team, forcing you into difficult switch-in decisions. Consider replacing one or two affected members with Pokemon that resist or are immune to this type, or make sure at least one member can reliably threaten opposing Pokemon of this type before they get a chance to attack.",
  },
  majorWeakness: {
    header: "Major weakness against: ",
    subText: (count: number) => `${count} members are vulnerable`,
    hintText:
      "Major weakness means that 3 members of your team are vulnerable to the same type. While not as critical as a full team weakness, this still gives opposing Pokemon of that type significant opportunities to cause damage. Try to have at least one member that resists or is immune to this type so you always have a safe switch-in option available.",
  },
  multiple4xWeaknesses: {
    header: "Multiple 4x weaknesses against: ",
    subText: (count: number) => `${count} members are 4x vulnerable`,
    hintText:
      "Multiple members share a 4x vulnerability to the same type, meaning they take quadruple damage from it. This is extremely dangerous — a single Pokemon of that type can threaten several members of your team at once. Consider replacing one of the affected members with a Pokemon that resists or is immune to this type.",
  },
  noSafeSwitch: {
    header: "No safe switch against: ",
    subText: "No resistance or immunity in the team",
    hintText:
      "When no member of your team resists or is immune to an attacking type, you have no safe switch against it — any switch-in will take neutral or super-effective damage. This leaves you vulnerable to being swept, as your opponent can freely use that type without fear of a punishing switch-in. Consider adding a Pokémon that resists or is immune to this type to give your team a reliable answer.",
  },
  noSuperEffectiveCoverage: {
    header: "Poor super effective coverage",
    subText: (n: number) => `${n} type${n === 1 ? "" : "s"} left uncovered: `,
    hintText:
      "Super-effective coverage determines how many opposing Pokémon types your team can threaten offensively. When your team cannot hit a type for super-effective damage, any Pokémon of that type can switch in safely and take minimal risk — giving your opponent a free turn to set up, heal, or attack. The more types left uncovered, the more predictable and exploitable your team becomes. Consider adding a Pokémon whose STAB or coverage moves hit the listed types for super-effective damage.",
  },
  severlyResistedTypes: {
    header: "Team severely resisted by: ",
    subText: (resisted: number, total: number) =>
      `Resists ${Math.round((resisted / total) * 100)}% of your team's attacking moves`,
    hintText:
      "When a defending type resists the majority of your team's STAB moves, that type of Pokémon can switch in repeatedly with little risk, wall several team members at once, and force unfavourable trades. This creates a soft check that limits how much offensive pressure your team can apply. Consider adding a team member whose STAB type is not resisted by this type, or a move that hits it for neutral or super-effective damage.",
  },
  overlappingOffensiveTypes: {
    header: "Type overlap: ",
    subText: (n: number) => `${n} member${n === 1 ? "" : "s"} share this type`,
    hintText:
      "Having multiple team members share the same STAB type concentrates your offensive coverage in one area while leaving others unaddressed. Opponents who carry a Pokémon that resists or is immune to this type can effectively wall several of your team members at once, limiting your attacking options. Diversifying your team's STAB types spreads pressure more evenly and makes your team harder to shut down with a single switch-in.",
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
