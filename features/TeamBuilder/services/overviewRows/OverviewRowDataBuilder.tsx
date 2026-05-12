import { PokeTypeModel } from "../../../TypeSelection/types";
import { TeamMemberModel } from "../../types";
import { OverviewRowData, OverviewRowSeverity, OverviewRowType } from "./types";

export class OverviewRowDataBuilder {
  private data: Partial<OverviewRowData> = { severity: OverviewRowSeverity.Medium };

  setType(type: OverviewRowType) {
    this.data.type = type;
    return this;
  }

  setSeverity(severity: OverviewRowSeverity) {
    this.data.severity = severity;
    return this;
  }

  setHeader(header: string) {
    this.data.header = header;
    return this;
  }

  setSubText(subText: string) {
    this.data.subText = subText;
    return this;
  }

  setHintText(hintText: string) {
    this.data.hintText = hintText;
    return this;
  }

  setProgressBar(total: number, actual: number) {
    this.data.progressBarTotal = total;
    this.data.progressBarActual = actual;
    return this;
  }

  setLeadType(leadType: PokeTypeModel[]) {
    this.data.leadType = leadType;
    return this;
  }

  setTypeList(typeList: PokeTypeModel[]) {
    this.data.typeList = typeList;
    return this;
  }

  setAffectedMembers(members: TeamMemberModel[]) {
    this.data.affectedMembers = members;
    return this;
  }

  setSuggestedTypes(suggestedTypes: PokeTypeModel[], members: TeamMemberModel[]) {
    const existingTypeIds = new Set(members.flatMap((m) => m.types.map((t) => t.id)));

    this.data.suggestedTypes = suggestedTypes.filter((t) => !existingTypeIds.has(t.id));
    return this;
  }

  build(): OverviewRowData {
    // walidacja wymaganych pól
    if (!this.data.header) throw new Error("Missing required fields");
    return this.data as OverviewRowData;
  }
}
