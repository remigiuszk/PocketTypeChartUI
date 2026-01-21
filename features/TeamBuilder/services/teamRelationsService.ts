import { DamageRelationFullModel } from "../../DamageRelations/types";
import { TeamMemberModel } from "../types";

export const teamRelationsService = () => {
  let damageRelations: DamageRelationFullModel[] = [];
  let teamMembers: TeamMemberModel[] = [];

  const calculateTeamRelations = (
    relations: DamageRelationFullModel[],
    members: TeamMemberModel[],
  ) => {
    damageRelations = relations;
    teamMembers = members;
    return {
      ok: true,
      relationsCount: damageRelations.length,
      teamCount: teamMembers.length,
    };
  };

  const getState = () => ({
    damageRelations,
    teamMembers,
  });

  return {
    calculateTeamRelations,
    getState, // możesz potem usunąć
  };
};
