import TopMovie from "@/components/home/top-movie";
import FilmSection from "@/components/home/films-section";
import Footer from "@/components/root/footer";

export default function HomePage() {
  return (
    <main className="relative z-0 h-full min-h-screen w-full overflow-x-clip bg-zinc-950">
      <TopMovie />
      <FilmSection />
      <FilmSection />
      <FilmSection />

      <Footer />
    </main>
  );
}
