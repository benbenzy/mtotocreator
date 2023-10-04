/** @format */

import React, { PropsWithChildren } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const SelectedItemContext = React.createContext<any>([]);
const SelectedItemProvider = ({ children }: PropsWithChildren) => {
	const [itemId, setItemId] = React.useState<any>("");
	console.log("contetItem", itemId);
	const [selectedItem, setSelectedItem] = React.useState<any>();
	const unsub = () => {
		if (itemId != "") {
			onSnapshot(doc(db, "plans", `${itemId}`), (snapshot) => {
				if (snapshot.exists()) {
					setSelectedItem(snapshot.data());
				}
			});
		}
	};
	React.useEffect(() => {
		unsub();
	}, [itemId]);
	return (
		<SelectedItemContext.Provider value={{ setItemId, selectedItem, itemId }}>
			{children}
		</SelectedItemContext.Provider>
	);
};

export default SelectedItemProvider;
export const useSelectedItem = () => React.useContext(SelectedItemContext);
