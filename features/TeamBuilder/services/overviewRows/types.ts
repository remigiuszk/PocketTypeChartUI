import { PokeTypeModel } from "../../../TypeSelection/types";
import { TeamMemberModel } from "../../types";

export type OverviewRowData = {
  type: OverviewRowType;
  severity: OverviewRowSeverity;
  header: string;
  subText: string;
  hintText: string;
  progressBarTotal?: number;
  progressBarActual?: number;
  leadType?: PokeTypeModel;
  typeList?: PokeTypeModel[];
  affectedMembers?: TeamMemberModel[];
  suggestedTypes?: PokeTypeModel[];
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
