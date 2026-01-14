import { View } from "react-native"
import { CardWithHeader } from "../../../../shared/ui/CardWithHeader";
import { useState } from "react";
import { TeamMemberModel } from "../../types";
import { TeamMember } from "./TeamMember";


export const TeamList = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMemberModel[]>([{id: "dupa", selectedTypes:[{"id": 1, "name": "normal", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/1.png"}, {"id": 6, "name": "rock", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/6.png"}]}]);
    const editMember = () => {};

    return <CardWithHeader title="Your team" subtitle="Select your team members' types">
        {teamMembers.map(
                          (member: TeamMemberModel) => (
                            <TeamMember
                              member={member}
                              editMember={editMember}
                              key={member.id}
                            />
                          )
                        )}
    </CardWithHeader>
};


