import { StyleSheet, View } from "react-native";
import { TwoTypesHeader } from "../../../../shared/ui/TwoTypesHeader";
import { BG_100, BORDER_100, TEXT_100 } from "../../../../constants";
import DefaultButton from "../../../../shared/ui/DefaultButton";
import { TeamMemberModel } from "../../types";
import { Subtitle } from "../../../../shared/typohraphy/Subtitle";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = {
  editMember: () => void;
  member: TeamMemberModel;
};

export const TeamMember = ({ editMember, member }: Props) => {
  return (
    <View style={styles.container}>
      <TwoTypesHeader
        imageHeight={25}
        message=""
        sprites={member.selectedTypes.map((x) => x.sprite)}
        style={{width:"80%"}}
      ></TwoTypesHeader>
      <DefaultButton
        style={{
          flexDirection: "row",
          height: 28,
          width:"10%",
          backgroundColor: "transparent",
          gap: 6,
        }}
        click={editMember}
      >
        <Subtitle style={{ color: TEXT_100 }}>Edit</Subtitle>
        <FontAwesome6 name="edit" size={20} color={TEXT_100} />
      </DefaultButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 6,
    borderBottomColor: BORDER_100,
    borderBottomWidth: 1,
  },
});
