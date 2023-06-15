import { View, Text } from "react-native";
import* as React from "react";
import { ContainerView, ThemeText, ThemeView } from "../Themed";
import { SIZES } from "../../constants";
import { COLORS, FONTS } from "../../constants/theme";

type params={
    title:string;
    data:string;
    dataDescription:string;
}
const AnalyticsCard = ({ title, data, dataDescription }:params) => {
	return (
		<ContainerView
			style={{
				width: SIZES.width / 2 - 40,
				backgroundColor: COLORS.gray2,
				height: 70,
				borderRadius: SIZES.radius,
				margin: 5,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={{ textTransform:"uppercase",...FONTS.body5}}>{title}</Text>
			<Text style={{fontWeight:"800"}}>{data}</Text>
			<Text style={{...FONTS.body5,textTransform:"lowercase"}}>{dataDescription}</Text>
		</ContainerView>
	);
};

export default AnalyticsCard;
