import { ContentItem, Plan } from "../../interface";
import { API_URL, TOKEN } from "./config";

async function createPlan(plan: Plan) {
	try {
		const res = await fetch(`${API_URL}"/plan/create"`, {
			headers: { Authorization: `Bearer ${TOKEN}` },
			method: "POST",
			body: JSON.stringify(plan),
		});
		if (res.status == 401) {
			throw new Error("authorization failed you lack an author badge");
		}
		if (res.status == 500) {
			throw new Error("failed to create plan internal server error try again");
		}
		return res.body;
	} catch (error) {
		throw new Error("failed to create post");
	}
}
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

