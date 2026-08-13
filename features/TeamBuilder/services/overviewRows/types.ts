import { PokeTypeModel } from "../../../TypeSelection/types";
import { TeamMemberModel } from "../../types";

export type ResistanceDetail = {
  type: PokeTypeModel;
  defendingType: PokeTypeModel;
  multiplier: number;
};

export type MemberResistanceBreakdown = {
  member: TeamMemberModel;
  resistedTypes: ResistanceDetail[];
};

export type OverviewRowData = {
  type: OverviewRowType;
  severity: OverviewRowSeverity;
  header: string;
  subText: string;
  hintText: string;
  progressBarTotal?: number;
  progressBarActual?: number;
  leadType?: PokeTypeModel[];
  typeList?: PokeTypeModel[];
  affectedMembers?: TeamMemberModel[];
  suggestedTypes?: PokeTypeModel[];
  collapsible?: boolean;
  collapsibleLabel?: string;
  memberResistanceBreakdown?: MemberResistanceBreakdown[];
};

export enum OverviewRowType {
  Weakness = "weakness",
  Strength = "strength",
  Suggestion = "suggestion",
}

export enum OverviewRowSeverity {
  High = 3,
  Medium = 2,
  Low = 1,
}
