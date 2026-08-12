import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  HeartHandshake,
  Plus,
  RotateCcw,
  Search,
  Send,
  Sparkles,
  X,
} from "lucide-react";

type Level = "Beginner" | "Intermediate" | "Advanced" | "Open";
type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

type CurriculumClass = {
  id: string;
  name: string;
  category: string;
  levels: Level[];
  duration: number;
  description: string;
};

type ScheduledClass = {
  classId: string;
  day: Day;
  time: string;
};

const DAYS: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIMES = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];
const LEVELS: (Level | "All")[] = ["All", "Beginner", "Intermediate", "Advanced", "Open"];

const CURRICULUM: CurriculumClass[] = [
  {
    id: "hip-hop-foundations-101",
    name: "Foundations 101",
    category: "Hip Hop",
    levels: ["Beginner", "Intermediate"],
    duration: 90,
    description:
      "Gain the building blocks of Hip Hop and the tools to explore and train movement independently, including housing, popping, locking, and grooves.",
  },
  {
    id: "hip-hop-foundations-102",
    name: "Foundations 102",
    category: "Hip Hop",
    levels: ["Intermediate", "Advanced"],
    duration: 90,
    description:
      "Refine and expand your knowledge while sharpening technique and exploring more complex movement and grooves across housing, popping, and locking.",
  },
  {
    id: "hip-hop-combo",
    name: "Combo Class",
    category: "Hip Hop",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: 90,
    description:
      "A choreography class designed to practice existing abilities, explore new ones, and test skills in a professional class environment.",
  },
  {
    id: "art-of-freestyle",
    name: "The Art of Freestyle",
    category: "Hip Hop",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 90,
    description:
      "Build comfort with the flow and structure of freestyle in a battle or cypher while making movement personal, interesting, and technically sound.",
  },
  {
    id: "contemporary-foundations-101",
    name: "Foundations 101",
    category: "Contemporary",
    levels: ["Beginner", "Intermediate"],
    duration: 90,
    description:
      "Understand basic weight changes, floorwork, and movement qualities with a focus on the body's natural flow.",
  },
  {
    id: "contemporary-foundations-102",
    name: "Foundations 102",
    category: "Contemporary",
    levels: ["Intermediate", "Advanced"],
    duration: 90,
    description:
      "Refine technical precision, deepen movement textures, and expand artistic range through faster movement phrases.",
  },
  {
    id: "contemporary-combo",
    name: "Combo Class",
    category: "Contemporary",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: 90,
    description:
      "A choreography class designed to practice abilities, discover new approaches, and work in a professional class environment.",
  },
  {
    id: "improv-individuality-intuition",
    name: "Improv, Individuality, Intuition",
    category: "Contemporary",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 90,
    description:
      "Strengthen improvisational skills, trust your instincts, and discover an authentic personal voice through prompts, creative risks, and artistry.",
  },
  {
    id: "floorwork",
    name: "Floorwork",
    category: "Contemporary",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 90,
    description:
      "Explore grounded movement, momentum, and coordination while learning to navigate floorwork in a way that supports your individual body.",
  },
  {
    id: "rhythm-music-iq",
    name: "Rhythm & Music IQ",
    category: "Movement Quality",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: 75,
    description:
      "Explore syncopation, suspension, rhythm, and stillness to develop expressive phrasing and intentional movement connected to the music.",
  },
  {
    id: "textures",
    name: "Textures",
    category: "Movement Quality",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 75,
    description:
      "Experiment with sharp, soft, pull, push, sink, float, and fluid qualities to understand how purposeful choices change movement visually.",
  },
  {
    id: "ensemble-camera-work",
    name: "Ensemble Camera Work",
    category: "Camera Work",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 90,
    description:
      "Train performance and mindset for the camera, adapting movement to your role within a group for the benefit of the final film.",
  },
  {
    id: "call-out-camera-work",
    name: "Call Out Camera Work",
    category: "Camera Work",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: 90,
    description:
      "Prepare to be called out in class or on a project by making visually compelling individual choices in improv, choreography, and performance.",
  },
  {
    id: "commercial-camera-work",
    name: "Commercial Camera Work",
    category: "Camera Work",
    levels: ["Intermediate", "Advanced"],
    duration: 90,
    description:
      "Experience the pace of a commercial dance film job while strengthening decision making, on-the-fly direction, and a healthy working mindset.",
  },
  {
    id: "choreography-retention",
    name: "Choreography Retention",
    category: "Taking Class",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: 75,
    description:
      "Learn reliable methods for becoming self-sufficient and picking up choreography and its details faster.",
  },
  {
    id: "class-etiquette-mindset",
    name: "Class Etiquette & Mindset",
    category: "Taking Class",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 60,
    description:
      "Practice class behavior in a low-stakes environment and learn mindsets that help you recenter, refocus, and sustain mental energy.",
  },
  {
    id: "tips-for-being-seen",
    name: "Tips for Being Seen",
    category: "Taking Class",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: 60,
    description:
      "Break down how to stand out in class, conventions, and auditions through stronger dance choices and thoughtful class interactions.",
  },
  {
    id: "resilience-confidence",
    name: "Resilience & Confidence",
    category: "Mindfulness",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 60,
    description:
      "Use conscious, present-focused approaches to adapt to new ideas, build a healthier relationship with the mirror, and trust your skills.",
  },
  {
    id: "emotional-dynamics",
    name: "Emotional Dynamics",
    category: "Mindfulness",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 60,
    description:
      "Translate emotions and human gestures into physical choices while exploring how energy and facial expression shape performance.",
  },
  {
    id: "general-qa",
    name: "General Q&A",
    category: "Seminar",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 45,
    description: "Bring questions on any topic and take part in a guided open discussion with Take Two faculty.",
  },
  {
    id: "resume-headshot",
    name: "Resume & Headshot Building",
    category: "Seminar",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 45,
    description:
      "Learn how to structure and present professional materials, adapt them for an audition or job, and receive quick personal feedback.",
  },
  {
    id: "social-media-marketing",
    name: "Social Media & Marketing",
    category: "Seminar",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 45,
    description: "Build a professional social presence and learn how to market yourself or your child safely and effectively.",
  },
  {
    id: "job-market-industry",
    name: "Job Market & Industry",
    category: "Seminar",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 45,
    description:
      "Discuss today's dance job market, the range of career opportunities, breaking into the industry, and sustaining a professional career.",
  },
  {
    id: "keeping-passion-alive",
    name: "Keeping the Fun & Passion Alive",
    category: "Seminar",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 45,
    description: "Share stories and practical mindsets for keeping dance joyful, meaningful, and sustainable over time.",
  },
  {
    id: "overcoming-adversity",
    name: "Overcoming Adversity & Roadblocks",
    category: "Seminar",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 45,
    description: "Talk through real concerns and leave with useful tools for navigating current challenges in dance.",
  },
  {
    id: "goal-setting",
    name: "Goal Setting & Achieving",
    category: "Seminar",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 45,
    description: "Explore different goal-setting methods and learn how to turn early progress into continued success.",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Hip Hop": "bg-red-600",
  Contemporary: "bg-violet-500",
  "Movement Quality": "bg-amber-500",
  "Camera Work": "bg-cyan-500",
  "Taking Class": "bg-emerald-500",
  Mindfulness: "bg-pink-500",
  Seminar: "bg-blue-500",
};

function timeValue(time: string) {
  const [clock, period] = time.split(" ");
  const [rawHour, minutes] = clock.split(":").map(Number);
  const hour = (rawHour % 12) + (period === "PM" ? 12 : 0);
  return hour * 60 + minutes;
}

export function IntensivePackages() {
  const [level, setLevel] = useState<Level | "All">("All");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [schedulingId, setSchedulingId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<Day>("Monday");
  const [selectedTime, setSelectedTime] = useState(TIMES[0]);
  const [schedule, setSchedule] = useState<ScheduledClass[]>([]);
  const [notice, setNotice] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("take-two-intensive-plan");
      if (saved) setSchedule(JSON.parse(saved));
    } catch {
      // A private browser session may block local storage; the planner still works in memory.
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    try {
      window.localStorage.setItem("take-two-intensive-plan", JSON.stringify(schedule));
    } catch {
      // Keep the current in-memory schedule when storage is unavailable.
    }
  }, [schedule, hasLoaded]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(CURRICULUM.map((item) => item.category)))],
    [],
  );

  const filteredClasses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return CURRICULUM.filter((item) => {
      const matchesLevel = level === "All" || item.levels.includes(level);
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery);
      return matchesLevel && matchesCategory && matchesQuery;
    });
  }, [category, level, query]);

  const totalMinutes = schedule.reduce((total, item) => {
    return total + (CURRICULUM.find((course) => course.id === item.classId)?.duration ?? 0);
  }, 0);

  const slotIsTaken = schedule.some(
    (item) => item.day === selectedDay && item.time === selectedTime,
  );

  const addClass = (classId: string) => {
    if (slotIsTaken) return;
    setSchedule((current) => [...current, { classId, day: selectedDay, time: selectedTime }]);
    setSchedulingId(null);
    setNotice("Class added to your intensive.");
    window.setTimeout(() => setNotice(""), 2400);
  };

  const removeClass = (classId: string) => {
    setSchedule((current) => current.filter((item) => item.classId !== classId));
  };

  const buildPlanText = () => {
    const lines = DAYS.flatMap((day) => {
      const dayClasses = schedule
        .filter((item) => item.day === day)
        .sort((a, b) => timeValue(a.time) - timeValue(b.time));
      if (!dayClasses.length) return [];
      return [
        day,
        ...dayClasses.map((item) => {
          const course = CURRICULUM.find((entry) => entry.id === item.classId);
          return `- ${item.time}: ${course?.name} (${course?.category}, ${course?.duration} min)`;
        }),
        "",
      ];
    });

    return [
      "My Take Two Intensive Plan",
      "",
      ...lines,
      `Total training time: ${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`,
      "",
      "I'd like to discuss this custom intensive and next steps.",
    ].join("\n");
  };

  const sharePlan = async () => {
    const text = buildPlanText();
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Take Two Intensive Plan", text });
        return;
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
      }
    }
    window.location.href = `mailto:?subject=${encodeURIComponent("Take Two intensive consultation")}&body=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-6 pb-16 pt-20 md:pb-20 md:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(220,38,38,0.22),transparent_30%),linear-gradient(135deg,#090909_0%,#000_55%,#180303_100%)]" />
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full border border-red-600/20" />
        <div className="absolute -right-8 top-24 h-56 w-56 rounded-full border border-red-600/20" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-red-500">
              <Sparkles className="h-4 w-4" />
              Built around your goals
            </div>
            <h1 className="font-['Bebas_Neue'] text-7xl leading-[0.86] tracking-wide sm:text-8xl md:text-9xl">
              Build Your <span className="text-red-600">Intensive</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">
              Explore the Take Two curriculum, find classes for your level, and shape a focused week of training that is entirely your own.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/60">
              <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-red-500" /> {CURRICULUM.length} curriculum modules</span>
              <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-red-500" /> Five-day planner</span>
              <span className="flex items-center gap-2"><HeartHandshake className="h-4 w-4 text-red-500" /> Personal consultation</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 md:py-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 grid gap-5 border border-white/10 bg-white/[0.035] p-5 lg:grid-cols-[1fr_auto] lg:items-end lg:p-6">
            <div className="min-w-0">
              <label htmlFor="curriculum-search" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                Find a class
              </label>
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35" />
                <input
                  id="curriculum-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by class, style, or skill..."
                  className="h-12 w-full border border-white/15 bg-black pl-12 pr-4 text-sm text-white outline-none transition focus:border-red-600"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((item) => (
                <button
                  key={item}
                  onClick={() => setLevel(item)}
                  className={`h-10 border px-4 text-xs font-semibold uppercase tracking-wider transition ${
                    level === item
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-white/15 bg-black text-white/60 hover:border-white/35 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(560px,0.95fr)] xl:items-start">
            <div>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-red-500">Step 1</p>
                  <h2 className="font-['Bebas_Neue'] text-5xl tracking-wide">Explore Classes</h2>
                </div>
                <label className="flex items-center gap-2 text-sm text-white/55">
                  <span className="sr-only">Filter by training category</span>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="h-10 border border-white/15 bg-[#0b0b0b] px-3 text-sm text-white outline-none focus:border-red-600"
                  >
                    {categories.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
              </div>

              <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-wider text-white/40">
                <span>{filteredClasses.length} classes</span>
                <span>Tap a card to preview</span>
              </div>

              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {filteredClasses.map((course) => {
                    const isExpanded = expandedId === course.id;
                    const isScheduling = schedulingId === course.id;
                    const isScheduled = schedule.some((item) => item.classId === course.id);
                    return (
                      <motion.article
                        layout
                        key={course.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className={`border bg-[#090909] transition ${
                          isExpanded || isScheduling ? "border-red-600/60" : "border-white/10 hover:border-white/25"
                        }`}
                      >
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : course.id)}
                          className="w-full p-5 text-left"
                          aria-expanded={isExpanded}
                        >
                          <div className="flex items-start gap-4">
                            <span className={`mt-1 h-10 w-1 shrink-0 ${CATEGORY_COLORS[course.category]}`} />
                            <div className="min-w-0 flex-1">
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{course.category}</span>
                                <span className="text-white/20">/</span>
                                <span className="flex items-center gap-1 text-[11px] text-white/45"><Clock3 className="h-3 w-3" /> {course.duration} min</span>
                              </div>
                              <h3 className="font-['Oswald'] text-xl tracking-wide text-white">{course.name}</h3>
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {course.levels.map((item) => (
                                  <span key={item} className={`border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                                    item === "Open" ? "border-red-600/60 bg-red-600/10 text-red-400" : "border-white/10 text-white/45"
                                  }`}>
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <ChevronDown className={`mt-2 h-5 w-5 shrink-0 text-white/35 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-white/10 px-5 py-5 pl-10">
                                <p className="text-sm leading-6 text-white/65">{course.description}</p>
                                <button
                                  onClick={() => {
                                    if (isScheduled) return;
                                    setSchedulingId(isScheduling ? null : course.id);
                                  }}
                                  disabled={isScheduled}
                                  className={`mt-5 inline-flex h-10 items-center gap-2 px-4 text-xs font-semibold uppercase tracking-wider transition ${
                                    isScheduled
                                      ? "cursor-default bg-emerald-500/10 text-emerald-400"
                                      : "bg-red-600 text-white hover:bg-red-700"
                                  }`}
                                >
                                  {isScheduled ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                  {isScheduled ? "In your week" : "Add to week"}
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence initial={false}>
                          {isScheduling && !isScheduled && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="grid gap-3 border-t border-red-600/25 bg-red-950/15 p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                                <label className="text-xs font-semibold uppercase tracking-wider text-white/45">
                                  Day
                                  <select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value as Day)} className="mt-2 h-11 w-full border border-white/15 bg-black px-3 text-sm normal-case tracking-normal text-white outline-none focus:border-red-600">
                                    {DAYS.map((day) => <option key={day}>{day}</option>)}
                                  </select>
                                </label>
                                <label className="text-xs font-semibold uppercase tracking-wider text-white/45">
                                  Start time
                                  <select value={selectedTime} onChange={(event) => setSelectedTime(event.target.value)} className="mt-2 h-11 w-full border border-white/15 bg-black px-3 text-sm normal-case tracking-normal text-white outline-none focus:border-red-600">
                                    {TIMES.map((time) => <option key={time}>{time}</option>)}
                                  </select>
                                </label>
                                <button
                                  onClick={() => addClass(course.id)}
                                  disabled={slotIsTaken}
                                  className="h-11 bg-white px-5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
                                >
                                  {slotIsTaken ? "Time taken" : "Place class"}
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
                {!filteredClasses.length && (
                  <div className="border border-dashed border-white/15 px-6 py-14 text-center text-white/45">
                    No classes match those filters. Try a different level or search.
                  </div>
                )}
              </div>
            </div>

            <aside className="min-w-0 xl:sticky xl:top-28">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-red-500">Step 2</p>
                  <h2 className="font-['Bebas_Neue'] text-5xl tracking-wide">Your Week</h2>
                </div>
                {schedule.length > 0 && (
                  <button onClick={() => setSchedule([])} className="flex items-center gap-2 pb-1 text-xs uppercase tracking-wider text-white/40 transition hover:text-red-400">
                    <RotateCcw className="h-3.5 w-3.5" /> Clear
                  </button>
                )}
              </div>

              <div className="overflow-x-auto border border-white/10 bg-[#070707]">
                <div className="grid min-w-[680px] grid-cols-5 divide-x divide-white/10">
                  {DAYS.map((day) => {
                    const dayClasses = schedule
                      .filter((item) => item.day === day)
                      .sort((a, b) => timeValue(a.time) - timeValue(b.time));
                    return (
                      <div key={day} className="min-h-[420px]">
                        <div className="border-b border-white/10 bg-white/[0.04] px-3 py-4 text-center">
                          <p className="font-['Oswald'] text-sm uppercase tracking-wider text-white/80">{day.slice(0, 3)}</p>
                          <p className="mt-1 text-[10px] uppercase tracking-wider text-white/30">{dayClasses.length} {dayClasses.length === 1 ? "class" : "classes"}</p>
                        </div>
                        <div className="space-y-2 p-2.5">
                          {dayClasses.map((item) => {
                            const course = CURRICULUM.find((entry) => entry.id === item.classId);
                            if (!course) return null;
                            return (
                              <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={item.classId}
                                className="group relative border border-white/10 bg-white/[0.055] p-3 transition hover:border-red-600/40"
                              >
                                <span className={`mb-2 block h-0.5 w-7 ${CATEGORY_COLORS[course.category]}`} />
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400">{item.time}</p>
                                <p className="mt-1 font-['Oswald'] text-sm leading-snug text-white">{course.name}</p>
                                <p className="mt-2 text-[9px] uppercase tracking-wider text-white/35">{course.category} · {course.duration}m</p>
                                <button onClick={() => removeClass(item.classId)} aria-label={`Remove ${course.name}`} className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center text-white/25 opacity-0 transition hover:text-red-400 group-hover:opacity-100 focus:opacity-100">
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </motion.div>
                            );
                          })}
                          {!dayClasses.length && (
                            <div className="flex h-32 items-center justify-center border border-dashed border-white/10 text-center text-[10px] uppercase leading-5 tracking-wider text-white/20">
                              Open<br />for training
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-x border-b border-white/10 bg-white/[0.035] p-5">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/35">Your intensive</p>
                    <p className="mt-1 font-['Oswald'] text-xl text-white">{schedule.length} {schedule.length === 1 ? "class" : "classes"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider text-white/35">Training time</p>
                    <p className="mt-1 font-['Oswald'] text-xl text-red-500">{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</p>
                  </div>
                </div>
                <button
                  onClick={sharePlan}
                  disabled={!schedule.length}
                  className="flex h-14 w-full items-center justify-center gap-3 bg-red-600 px-6 font-['Oswald'] text-sm uppercase tracking-[0.16em] text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
                >
                  <HeartHandshake className="h-5 w-5" />
                  Send for consultation
                  <Send className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-xs leading-5 text-white/35">
                  Forward your plan to a parent, studio director, or Take Two advisor.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {notice && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-black shadow-2xl">
            <Check className="h-4 w-4 text-emerald-600" /> {notice}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
