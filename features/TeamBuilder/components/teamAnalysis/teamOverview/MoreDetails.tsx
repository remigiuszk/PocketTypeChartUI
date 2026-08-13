import { AntDesign } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

import {
  BG_BUTTON,
  BG_CARD,
  BORDER_DEFAULT,
  MORE_DETAILS_HINT_IMMUNE,
  MORE_DETAILS_HINT_NO_EFF,
  MORE_DETAILS_HINT_NVE,
  MORE_DETAILS_HINT_RESIST,
  MORE_DETAILS_HINT_SE,
  MORE_DETAILS_HINT_VULN,
  MORE_DETAILS_IMMUNITIES,
  MORE_DETAILS_NO_EFF,
  MORE_DETAILS_NOT_VERY_EFF,
  MORE_DETAILS_RESISTANCES,
  MORE_DETAILS_SUPER_EFF,
  MORE_DETAILS_VULN,
  PADDING,
  TEXT_100,
  TEXT_STRENGTHS,
  TEXT_WEAKNESSES_CRITICAL,
  TEXT_WEAKNESSES_WEAK,
} from "../../../../../constants";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";
import { PokeTypeModel } from "../../../../TypeSelection/types";
import {
  DefensiveMemberRelation,
  OffensiveRelation,
  TeamRelationsResult,
} from "../../../services/teamRelationsService/types";
import { TeamMemberModel } from "../../../types";
import { StatRowConfig } from "./details/StatRow";
import { StatSection } from "./details/StatSection";
import {
  MemberBreakdownItem,
  ResistanceBreakdownSection,
} from "./overviewRow/ResistanceBreakdownSection";

type Props = {
  style?: ViewStyle | ViewStyle[];
  teamRelations: TeamRelationsResult;
  currentTeam: TeamMemberModel[];
  allTypes: PokeTypeModel[];
};

function buildDefensiveBreakdown(
  relations: DefensiveMemberRelation[],
  members: TeamMemberModel[],
  allTypes: PokeTypeModel[],
): MemberBreakdownItem[] {
  return relations
    .flatMap((rel) => {
      const member = members.find((m) => m.id === rel.memberId);
      const attackingType = allTypes.find((t) => t.id === rel.attackingTypeId);
      if (!member || !attackingType) return [];
      return [
        {
          id: `${member.id}-${rel.attackingTypeId}`,
          name: member.name,
          types: member.types,
          iconId: member.iconId,
          iconColor: member.iconColor,
          resistedTypeIds: member.types.map((t) => t.id),
          multiplier: rel.multiplier,
          defendingTypes: [attackingType],
        },
      ];
    })
    .sort((a, b) => b.multiplier - a.multiplier || a.name.localeCompare(b.name));
}

function buildOffensiveBreakdown(
  relations: OffensiveRelation[],
  members: TeamMemberModel[],
  allTypes: PokeTypeModel[],
): MemberBreakdownItem[] {
  return relations.flatMap((rel) => {
    const member = members.find((m) => m.id === rel.memberId);
    const defendingType = allTypes.find((t) => t.id === rel.defendingTypeId);
    if (!member || !defendingType) return [];
    return [
      {
        id: `${member.id}-${rel.attackingTypeId}-${rel.defendingTypeId}`,
        name: member.name,
        types: member.types,
        iconId: member.iconId,
        iconColor: member.iconColor,
        resistedTypeIds: [rel.attackingTypeId],
        multiplier: rel.multiplier,
        defendingTypes: [defendingType],
      },
    ];
  });
}

export const MoreDetails = ({ style, teamRelations, currentTeam, allTypes }: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  const { defensiveRelations, offensiveRelations } = teamRelations;

  const breakdowns = useMemo(
    () => ({
      vuln: buildDefensiveBreakdown(defensiveRelations.vulnerabilities, currentTeam, allTypes),
      resist: buildDefensiveBreakdown(defensiveRelations.resistances, currentTeam, allTypes),
      immune: buildDefensiveBreakdown(defensiveRelations.immunities, currentTeam, allTypes),
      se: buildOffensiveBreakdown(offensiveRelations.superEffective, currentTeam, allTypes),
      nve: buildOffensiveBreakdown(offensiveRelations.notVeryEffective, currentTeam, allTypes),
      noEff: buildOffensiveBreakdown(offensiveRelations.noEffect, currentTeam, allTypes),
    }),
    [defensiveRelations, offensiveRelations, currentTeam, allTypes],
  );

  const defenceRows: StatRowConfig[] = [
    {
      label: MORE_DETAILS_VULN,
      value: breakdowns.vuln.length,
      badgeColor: TEXT_WEAKNESSES_WEAK,
      hintTitle: MORE_DETAILS_VULN,
      hintText: MORE_DETAILS_HINT_VULN,
      breakdown: {
        label: "All vulnerable match-ups",
        content: <ResistanceBreakdownSection items={breakdowns.vuln} />,
      },
    },
    {
      label: MORE_DETAILS_RESISTANCES,
      value: breakdowns.resist.length,
      badgeColor: TEXT_STRENGTHS,
      hintTitle: MORE_DETAILS_RESISTANCES,
      hintText: MORE_DETAILS_HINT_RESIST,
      breakdown: {
        label: "All resistant match-ups",
        content: <ResistanceBreakdownSection items={breakdowns.resist} />,
      },
    },
    {
      label: MORE_DETAILS_IMMUNITIES,
      value: breakdowns.immune.length,
      badgeColor: TEXT_STRENGTHS,
      hintTitle: MORE_DETAILS_IMMUNITIES,
      hintText: MORE_DETAILS_HINT_IMMUNE,
      breakdown: {
        label: "All immune match-ups",
        content: <ResistanceBreakdownSection items={breakdowns.immune} />,
      },
    },
  ];

  const offenceRows: StatRowConfig[] = [
    {
      label: MORE_DETAILS_SUPER_EFF,
      value: breakdowns.se.length,
      badgeColor: TEXT_STRENGTHS,
      hintTitle: MORE_DETAILS_SUPER_EFF,
      hintText: MORE_DETAILS_HINT_SE,
      breakdown: {
        label: "All super-effective match-ups",
        content: <ResistanceBreakdownSection items={breakdowns.se} />,
      },
    },
    {
      label: MORE_DETAILS_NOT_VERY_EFF,
      value: breakdowns.nve.length,
      badgeColor: TEXT_WEAKNESSES_WEAK,
      hintTitle: MORE_DETAILS_NOT_VERY_EFF,
      hintText: MORE_DETAILS_HINT_NVE,
      breakdown: {
        label: "All resisted match-ups",
        content: <ResistanceBreakdownSection items={breakdowns.nve} />,
      },
    },
    {
      label: MORE_DETAILS_NO_EFF,
      value: breakdowns.noEff.length,
      badgeColor: TEXT_WEAKNESSES_CRITICAL,
      hintTitle: MORE_DETAILS_NO_EFF,
      hintText: MORE_DETAILS_HINT_NO_EFF,
      breakdown: {
        label: "All no-effect match-ups",
        content: <ResistanceBreakdownSection items={breakdowns.noEff} />,
      },
    },
  ];

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={() => setShowDetails(!showDetails)} style={styles.toggle}>
        <AntDesign name={showDetails ? "up" : "down"} size={16} color={TEXT_100} />
        <Subtitle style={styles.toggleLabel}>Team stats</Subtitle>
      </Pressable>

      {showDetails && (
        <View style={styles.card}>
          <StatSection label="Defence" rows={defenceRows} isFirst />
          <StatSection label="Offence" rows={offenceRows} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10,
    backgroundColor: BG_BUTTON,
    borderWidth: 1,
    borderColor: BORDER_DEFAULT,
    padding: PADDING,
    borderRadius: 10,
  },
  toggleLabel: {
    color: TEXT_100,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.9,
  },
  card: {
    borderWidth: 1,
    borderColor: BORDER_DEFAULT,
    borderRadius: 10,
    backgroundColor: BG_CARD,
    overflow: "hidden",
  },
});
