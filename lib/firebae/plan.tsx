/** @format */

import { addDoc, collection } from "firebase/firestore";
import { ContentItem, Plan } from "../../interface";
import { API_URL, TOKEN } from "../api/config";
import { auth, db, storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export async function createPlan(dta: any) {
	try {
		const plan = dta["0"];
		const ref = collection(db, "plans");
		const planData = {
			title: plan.title,
			thumbnail: plan.image,
			category: plan.category,
			description: plan.description,
			price: plan.price,
			content: plan.content,
			reviewed: false,
			authorId: auth.currentUser?.uid,
			author: auth.currentUser?.displayName,
			autorPhoto: auth?.currentUser?.photoURL,
			comments: [],
			completions: [],
			files: [],
			students: [],
		};
		const publishedPlan = await addDoc(ref, planData);
		return publishedPlan;
	} catch (error: any) {
		console.log("failed", error);
		throw new Error("failed to create post", error);
	}
}
export const uploadimage = async (
	imageLink: string,
	setImageLink: any,
	setProgress: any,
	setError: any,
	setUploadImage: any,
	planId: string
) => {
	const apkimagesref = ref(storage, "thumbnails/" + planId);
	const apkimage = await fetch(imageLink);
	const blob = await apkimage.blob();
	const metadata = { contentType: "any" };
	const imageresult = uploadBytesResumable(apkimagesref, blob, metadata);

	imageresult.on(
		"state_changed",
		(snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			setProgress("uploading image" + progress + "%");
			switch (snapshot.state) {
				case "paused":
					setError("paused");
					break;
				case "running":
					break;
				default:
					break;
			}
		},
		(error) => {
			console.log(error.code);
			setError(error.code);
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
				.then((downloadurl) => {
					console.log("downloadurl", downloadurl);
					setImageLink(downloadurl);
					setUploadImage(false);
				})
				.catch((error) => {
					return error;
				});
		}
	);
};

async function createPlanChapter(id: string, content: ContentItem) {
	try {
		const res = await fetch(`${API_URL}/plan/addContent/${id}`, {
			headers: { Authorization: `Bearer ${TOKEN}` },
			method: "POST",
			body: JSON.stringify(content),
		});
		if (res.status == 401) {
			throw new Error("authorization failed you are not authenticated");
		}

		return res.body;
	} catch (error) {
		throw new Error("failed to create post");
	}
}
async function updatePlanChapter(id: string, content: ContentItem) {
	try {
		const res = await fetch(`${API_URL}/plan/updateContent/${id}`, {
			headers: { Authorization: `Bearer ${TOKEN}` },
			method: "POST",
			body: JSON.stringify(content),
		});
		return res.body;
	} catch (error) {
		throw new Error("failed to create post");
	}
}
async function deletePlanChapter(id: any) {
	try {
		const res = await fetch(`${API_URL}/plan/addContent/${id}`, {
			headers: { Authorization: `Bearer ${TOKEN}` },
			method: "DELETE",
		});
		return res.body;
	} catch (error) {
		throw new Error("failed to create post");
	}
}

export async function fetchPlans() {
	try {
		const res = await fetch(`${URL}/plan/allplans`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		});
		if (res.status == 401) {
			throw new Error("authorization failed you are not authenticated");
		}
		const data = await res.json();
		return data;
	} catch (error) {
		throw new Error("error fetching data");
	}
}
export async function getPlan(id: string) {
	try {
		const res = await fetch(`${URL}/find/${id}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		});
		if (res.status == 401) {
			throw new Error("authorization failed you are not authenticated");
		}
		const data = await res.json();
		return data;
	} catch (error) {
		throw new Error("error fetching data");
	}
}
async function updatePlan(id: string) {}
async function deletePlan(id: string) {}
