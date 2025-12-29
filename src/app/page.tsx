import { redirect } from "next/navigation";

export default async function Home() {
	redirect("/patients?page=1&limit=8");
}
