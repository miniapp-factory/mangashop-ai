import Link from "next/link";
import { title, description } from "@/lib/metadata";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-center p-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <Link
        href="/quiz"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Start Quiz
      </Link>
    </main>
  );
}
