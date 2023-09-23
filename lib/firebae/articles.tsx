/** @format */

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export async function publish(article: any) {
	const ref = doc(db, "Plans");
	const plan = await setDoc(ref, article);
	return plan;
}
