import AsyncStorage from "@react-native-async-storage/async-storage";

import { TeamMemberModel } from "../../features/TeamBuilder/types";

const KEY = "quiztracker.teamMembers.v1";

export async function loadTeamMembers(): Promise<TeamMemberModel[] | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TeamMemberModel[];
  } catch (e) {
    console.warn("Failed to load team members", e);
    return null;
  }
}

export async function saveTeamMembers(
  members: TeamMemberModel[]
): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(members));
  } catch (e) {
    console.warn("Failed to save team members", e);
  }
}

export async function clearTeamMembers(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (e) {
    console.warn("Failed to clear team members", e);
  }
}
