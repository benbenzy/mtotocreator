import { Dimensions } from "react-native";
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");

export const COLORS = {
	primary: "#FF6C44", //orange
	transparentPrimray: "rgba(227, 120, 75, 0.4)",
	lightGray: "#3B3B3B",
	lightGray3: "#f0f0f0",
	primary1: "#37A372", // Green
	secondary: "#2C2C2C", // Gray

	pink: "#D993B4",
	lightPink: "#F3DEE8",
	orange: "#FFA133",
	lightOrange: "#FFA133",
	lightOrange2: "#FDDED4",
	lightOrange3: "#FFD9AD",
	green: "#27AE60",
	red: "#FF1717",
	blue: "#0064C0",
	darkBlue: "#111A2C",
	darkGray: "#525C67",
	darkGray2: "#757D85",
	gray: "#898B9A",
	gray2: "#BBBDC1",
	gray3: "#CFD0D7",
	lightGray1: "#DDDDDD",
	lightGray2: "#F5F5F8",
	white2: "#FBFBFB",
	white: "#FFFFFF",
	black: "#000000",
	purple: "#595683",
	yellow: "#F1CD7C",
	lightYellow: "#FFD88A",
	lightPurple: '#7B789F',
	transparent: "transparent",
	transparentBlack1: "rgba(0, 0, 0, 0.1)",
	transparentBlack7: "rgba(0, 0, 0, 0.7)",
};
export const darkTheme = {
	name: "dark",
	backgroundColor: COLORS.secondary,
	textColor: COLORS.white,
	tabBackgroundColor: COLORS.lightGray1,
	cardBackgroundColor: COLORS.gray3,
	bottomTabBarBackgroundColor: COLORS.gray3,
	headerColor: COLORS.yellow,
};

export const lightTheme = {
	name: "light",
	backgroundColor: COLORS.lightGray3,
	textColor: COLORS.black,
	tabBackgroundColor: COLORS.yellow,
	cardBackgroundColor: COLORS.lightYellow,
	bottomTabBarBackgroundColor: COLORS.lightYellow,
	headerColor: COLORS.red,
};
export const SIZES = {
	// global sizes
	base: 8,
	font: 14,
	radius: 12,
	padding: 24,

	// font sizes
	largeTitle: 40,
	h1: 30,
	h2: 22,
	h3: 16,
	h4: 14,
	h5: 12,
	body1: 30,
	body2: 22,
	body3: 16,
	body4: 14,
	body5: 12,
	// app dimensions
	width,
	height,
};

export const FONTS = {
	largeTitle: { fontFamily: "PoppinsBlack", fontSize: SIZES.largeTitle },
	h1: {
		fontFamily: "serif",
		fontSize: SIZES.h1,
		lineHeight: 36,
		fontWeight: "bold",
	},
	h2: {
		fontFamily: "serif",
		fontSize: SIZES.h2,
		lineHeight: 30,
		fontWeight: "bold",
	},
	h3: {
		fontFamily: "serif",
		fontSize: SIZES.h3,
		lineHeight: 22,
		fontWeight: "bold",
	},
	h4: {
		fontFamily: "serif",
		fontSize: SIZES.h4,
		lineHeight: 22,
		fontWeight: "bold",
	},
	h5: { fontFamily: "serif", fontSize: SIZES.h5, lineHeight: 22 },
	body1: {
		fontFamily: "serif",
		fontSize: SIZES.body1,
		lineHeight: 36,
	},
	body2: {
		fontFamily: "serif",
		fontSize: SIZES.body2,
		lineHeight: 30,
	},
	body3: {
		fontFamily: "serif",
		fontSize: SIZES.body3,
		lineHeight: 22,
	},
	body4: {
		fontFamily: "serif",
		fontSize: SIZES.body4,
		lineHeight: 22,
	},
	body5: {
		fontFamily: "serif",
		fontSize: SIZES.body5,
		lineHeight: 22,
	},
};
export const selectedTheme = darkTheme

const appTheme = { COLORS, SIZES, FONTS,lightTheme,darkTheme };

export default appTheme;

