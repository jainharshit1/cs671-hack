import TopMovie from "@/components/home/top-movie";
import FilmSection from "@/components/home/films-section";

export default function HomePage() {
  return (
    <main className="relative z-0 h-full min-h-screen w-full overflow-x-clip bg-zinc-950 pb-48">
      <TopMovie />
      <FilmSection />
      <FilmSection />
      <FilmSection />
    </main>
  );
}
