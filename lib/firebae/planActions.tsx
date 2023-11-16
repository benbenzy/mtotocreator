/** @format */

import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuthSession } from "../../context/AuthContext";
import React, { PropsWithChildren } from "react";
import * as ImagePicker from "expo-image-picker";

interface planActionsProps {
	createPlan: any;
	uploadImage: any;
}

export const PlanContext = React.createContext<planActionsProps | any>({});

const PlansProvider = ({ children }: PropsWithChildren) => {
	const { user } = useAuthSession();
	//const { selectedPlan, planId } = useSelectedItem();
	async function createPlan(plan: any) {
		try {
			//const plan = dta;
			const ref = collection(db, "plans");
			const planData = {
				title: plan.title,
				thumbnail: "",
				category: plan.category,
				description: plan.description,
				price: plan.price,
				content: plan.content,
				reviewed: false,
				authorId: user?.id,
				author: user?.username,
				autorPhoto: user?.profilePicture,
				status: "draft",
				comments: [],
				completions: [],
				files: [],
				students: [],
			};
			const publishedPlan = await addDoc(ref, planData);
			return publishedPlan.id;
		} catch (error: any) {
			console.log("failed", error);
			throw new Error("failed to create post", error);
		}
	}

	const uploadImage = async (
		{image,
		planId}:any
	) => {
		console.log("planID",planId)
		if (planId) {
			const apkimagesref = ref(storage, "images/" + planId);
			const apkimage = await fetch(image);
			const blob = await apkimage.blob();
			const metadata = {
				contentType: "any",
			};

			const imageresult = uploadBytesResumable(apkimagesref, blob, metadata);
			console.log("image result",imageresult)

			imageresult.on(
				"state_changed",
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("progress",progress);
					switch (snapshot.state) {
						case "paused":
							break;
						case "running":
							break;
						default:
							break;
					}
				},
				(error) => {
					console.log("error here", error.code);
					//setError(error.code);
					switch (error.code) {
						case "storage/unauthorized":
							console.log("User doesn't have permission to access the object");
							break;
						case "storage/canceled":
							// User canceled the upload
							break;

						// ...

						case "storage/unknown":
							// Unknown error occurred, inspect error.serverResponse
							break;
					}
				},
				() => {
					getDownloadURL(imageresult.snapshot.ref)
						.then(async (downloadurl) => {
							console.log(downloadurl);
							try {
								const planRef = doc(db, "plans", planId);
								await updateDoc(planRef, { thumbnail: downloadurl }).then(()=>{;
								console.log("updated")
								return "success"
								})
							} catch (error) {
								console.error("updating doc error", error);
								try {
									await deleteObject(apkimagesref).then(() => {
										console.warn("image deleted");
									});
								} catch (error) {
									console.error("could not delete file path", error);
								}
							}
						})
						.catch((error) => {
							console.error("could not fetch image link", error);
						});
				}
			);
		}
	};
	const selectImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.canceled) {
				return result.assets[0].uri;
			}
		} catch (error) {
			return error;
		}
	};

	return (
		<PlanContext.Provider value={{ createPlan, uploadImage, selectImage }}>
			{children}
		</PlanContext.Provider>
	);
};
export default PlansProvider;
export const usePlanActions = () => React.useContext(PlanContext);
