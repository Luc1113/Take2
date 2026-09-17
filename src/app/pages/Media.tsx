import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

type Photo = { kind: "photo"; title: string; thumb: string; full: string; wide?: boolean };
type Film = { kind: "video"; title: string; thumb: string; src: string; duration: string };
type Item = Photo | Film;
type Filter = "all" | "photos" | "videos";

const thumbs = import.meta.glob("../../assets/media/*-thumb.webp", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const fulls = import.meta.glob("../../assets/media/*-full.webp", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const photo = (number: number, title: string, wide = false): Photo => ({
  kind: "photo", title, wide,
  thumb: thumbs[`../../assets/media/sns-2026-${number}-thumb.webp`],
  full: fulls[`../../assets/media/sns-2026-${number}-full.webp`],
});
const film = (slug: string, title: string, duration: string): Film => ({
  kind: "video", title, duration,
  thumb: `/media/${slug}.webp`, src: `/media/${slug}.mp4`,
});

const items: Item[] = [
  photo(34, "The Workshop in Motion", true),
  film("workshop-recap", "Workshop 8/30 Recap", "0:59"),
  photo(8, "Dancers in the Studio"),
  photo(19, "Finding the Movement"),
  film("aydin-trevor-class", "Aydin & Trevor — Class Montage", "1:05"),
  photo(20, "In Sync"),
  photo(94, "The Full Company"),
  photo(52, "Across the Floor"),
  photo(54, "A Moment in Class"),
  film("aydin-trevor-choreography", "Aydin & Trevor — Hand of God", "0:44"),
  photo(59, "On the Beat"),
  photo(65, "Solo Movement"),
  photo(73, "Center Stage"),
  film("sophie-class", "Sophie — Class Montage", "1:13"),
  photo(80, "Strength in Motion"),
  photo(85, "Studio Energy"),
  photo(99, "Learning Together"),
  film("sophie-choreography", "Sophie — Fabulous", "1:00"),
  photo(107, "Mirrored Movement", true),
  photo(116, "A Day with Take 2"),
];
const photos = items.filter((item): item is Photo => item.kind === "photo");

export function Media() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Item | null>(null);
  const visible = items.filter((item) => filter === "all" || item.kind === (filter === "photos" ? "photo" : "video"));

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (selected.kind !== "photo") return;
      const index = photos.indexOf(selected);
      if (event.key === "ArrowRight") setSelected(photos[(index + 1) % photos.length]);
      if (event.key === "ArrowLeft") setSelected(photos[(index - 1 + photos.length) % photos.length]);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [selected]);

  const stepPhoto = (direction: -1 | 1) => {
    if (selected?.kind !== "photo") return;
    setSelected(photos[(photos.indexOf(selected) + direction + photos.length) % photos.length]);
  };

  return <div className="min-h-screen bg-black text-white">
    <header className="relative overflow-hidden border-b border-white/10 px-5 py-16 sm:px-6 md:py-24">
      <img src={photo(34, "").full} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/35" />
      <div className="relative mx-auto max-w-7xl">
        <p className="mb-3 font-['Oswald'] text-xs uppercase tracking-[0.28em] text-red-500">Take 2 / In the Studio</p>
        <h1 className="font-['Bebas_Neue'] text-7xl leading-[0.9] tracking-wide sm:text-8xl md:text-9xl">The <span className="text-red-600">Media</span> Gallery</h1>
        <div className="my-6 h-0.5 w-24 bg-red-600" />
        <p className="max-w-xl text-base leading-7 text-white/75 md:text-lg">A closer look at the movement, the people, and the moments that make Take 2.</p>
      </div>
    </header>

    <section className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-white/15 pb-5">
        <div><p className="font-['Oswald'] text-xs uppercase tracking-[0.25em] text-red-500">Workshop 2026</p><h2 className="mt-1 font-['Bebas_Neue'] text-4xl tracking-wide md:text-5xl">Inside the Experience</h2></div>
        <div className="flex gap-1" role="group" aria-label="Filter media">
          {([["all", "All", 20], ["photos", "Photos", 15], ["videos", "Videos", 5]] as const).map(([id, label, count]) =>
            <button key={id} type="button" onClick={() => setFilter(id)} aria-pressed={filter === id} className={`px-3 py-2 font-['Oswald'] text-sm uppercase tracking-wider transition-colors sm:px-4 ${filter === id ? "bg-red-600 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}>{label} <span className="ml-1 text-xs opacity-70">{count}</span></button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
        {visible.map((item, index) => <button key={item.kind === "photo" ? item.full : item.src} type="button" onClick={() => setSelected(item)} aria-label={`${item.kind === "video" ? "Play video" : "View photo"}: ${item.title}`} className={`group relative overflow-hidden bg-zinc-900 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 ${filter !== "videos" && item.kind === "photo" && item.wide ? "col-span-2" : ""}`}>
          <div className={`relative ${filter !== "videos" && item.kind === "photo" && item.wide ? "aspect-[3/2] sm:aspect-[2/1]" : "aspect-[4/5] sm:aspect-[4/3]"}`}>
            <img src={item.thumb} alt={item.title} loading={index < 3 ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            {item.kind === "video" && <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-red-600/95 shadow-lg transition-transform group-hover:scale-110 sm:h-16 sm:w-16"><Play className="ml-1 h-6 w-6 fill-white" /></span>}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-5"><div><p className="mb-1 font-['Oswald'] text-[10px] uppercase tracking-[0.18em] text-red-400 sm:text-xs">{item.kind === "video" ? "Film" : "Photo"}</p><h3 className="font-['Oswald'] text-sm leading-tight sm:text-lg">{item.title}</h3></div>{item.kind === "video" && <span className="font-['Oswald'] text-xs text-white/70">{item.duration}</span>}</div>
          </div>
        </button>)}
      </div>
    </section>

    <section className="border-t border-white/10 bg-zinc-950 px-5 py-16 text-center sm:px-6">
      <h2 className="font-['Bebas_Neue'] text-5xl tracking-wide md:text-6xl">Make Your <span className="text-red-600">Next Move.</span></h2>
      <p className="mx-auto mt-3 max-w-lg text-white/65">Bring the Take 2 experience to your dancers.</p>
      <Link to="/build-schedule" className="mt-7 inline-block bg-red-600 px-8 py-3 font-['Oswald'] text-sm uppercase tracking-[0.15em] transition-colors hover:bg-red-700">Build Your Experience</Link>
    </section>

    {selected && <div role="dialog" aria-modal="true" aria-label={selected.title} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 sm:p-8" onClick={() => setSelected(null)}>
      <button type="button" aria-label="Close gallery" onClick={() => setSelected(null)} className="absolute right-4 top-4 z-10 rounded-full bg-black/70 p-2 text-white hover:bg-red-600"><X className="h-6 w-6" /></button>
      {selected.kind === "photo" ? <>
        <button type="button" aria-label="Previous photo" onClick={(event) => { event.stopPropagation(); stepPhoto(-1); }} className="absolute left-3 top-1/2 z-10 rounded-full bg-black/70 p-2 text-white hover:bg-red-600 sm:left-6"><ChevronLeft className="h-6 w-6" /></button>
        <img src={selected.full} alt={selected.title} onClick={(event) => event.stopPropagation()} className="max-h-[85vh] max-w-full object-contain" />
        <button type="button" aria-label="Next photo" onClick={(event) => { event.stopPropagation(); stepPhoto(1); }} className="absolute right-3 top-1/2 z-10 rounded-full bg-black/70 p-2 text-white hover:bg-red-600 sm:right-6"><ChevronRight className="h-6 w-6" /></button>
      </> : <video key={selected.src} controls autoPlay playsInline preload="metadata" poster={selected.thumb} onClick={(event) => event.stopPropagation()} className="max-h-[85vh] w-full max-w-5xl bg-black"><source src={selected.src} type="video/mp4" />Your browser does not support video playback.</video>}
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-['Oswald'] text-xs uppercase tracking-wider text-white/70 sm:bottom-5">{selected.title}</p>
    </div>}
  </div>;
}
