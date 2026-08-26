import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Coffee,
  GripVertical,
  HeartHandshake,
  Info,
  Plus,
  RotateCcw,
  Search,
  Send,
  Share2,
  Sparkles,
  X,
} from "lucide-react";

type Level = "Beginner" | "Intermediate" | "Advanced" | "Open";
type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

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
  time: number; // minutes from midnight
  level?: Level;
};

type ScheduledBreak = {
  id: string;
  day: Day;
  start: number; // minutes from midnight
  end: number; // minutes from midnight
  label: string;
};

type DragPayload =
  | { kind: "new"; classId: string; level?: Level }
  | { kind: "move"; classId: string; fromDay: Day; fromTime: number; level?: Level }
  | { kind: "break-new"; length: number }
  | { kind: "break-move"; breakId: string; length: number };

const DAYS: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const LEVELS: (Level | "All")[] = ["All", "Beginner", "Intermediate", "Advanced", "Open"];

const LEVEL_DESCRIPTIONS: Record<Level, string> = {
  Beginner: "New to the style or building foundational vocabulary and comfort with movement.",
  Intermediate: "Comfortable with fundamentals and ready to sharpen technique and complexity.",
  Advanced: "Strong technical control, ready for nuance, speed, and performance-level demands.",
  Open: "All levels welcome — the class adapts to whoever is in the room that day.",
};

const DAY_START = 8 * 60; // 8:00 AM
const DAY_END = 22 * 60; // 10:00 PM
const TIME_STEP = 15; // minutes
const HOUR_HEIGHT = 64; // px per hour on the week grid
const GRID_HEIGHT = ((DAY_END - DAY_START) / 60) * HOUR_HEIGHT;
const HOUR_MARKS = Array.from({ length: (DAY_END - DAY_START) / 60 + 1 }, (_, i) => DAY_START + i * 60);

function formatHourLabel(minutes: number) {
  const hour24 = Math.floor(minutes / 60);
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour} ${period}`;
}

const CURRICULUM: CurriculumClass[] = [
  {
    id: "hip-hop-foundations-101",
    name: "Foundations 101",
    category: "Hip Hop",
    levels: ["Beginner", "Intermediate"],
    duration: 60,
    description:
      "Gain the building blocks of Hip Hop and the tools to explore and train movement independently, including housing, popping, locking, and grooves.",
  },
  {
    id: "hip-hop-foundations-102",
    name: "Foundations 102",
    category: "Hip Hop",
    levels: ["Intermediate", "Advanced"],
    duration: 60,
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
    duration: 60,
    description:
      "Understand basic weight changes, floorwork, and movement qualities with a focus on the body's natural flow.",
  },
  {
    id: "contemporary-foundations-102",
    name: "Foundations 102",
    category: "Contemporary",
    levels: ["Intermediate", "Advanced"],
    duration: 60,
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
    duration: 60,
    description:
      "Explore grounded movement, momentum, and coordination while learning to navigate floorwork in a way that supports your individual body.",
  },
  {
    id: "rhythm-music-iq",
    name: "Rhythm & Music IQ",
    category: "Movement Quality",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: 60,
    description:
      "Explore syncopation, suspension, rhythm, and stillness to develop expressive phrasing and intentional movement connected to the music.",
  },
  {
    id: "textures",
    name: "Textures",
    category: "Movement Quality",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 90,
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
    category: "Art of Taking Class",
    levels: ["Beginner", "Intermediate", "Advanced"],
    duration: 90,
    description:
      "Learn reliable methods for becoming self-sufficient and picking up choreography and its details faster.",
  },
  {
    id: "class-etiquette-mindset",
    name: "Class Etiquette & Mindset",
    category: "Art of Taking Class",
    levels: ["Beginner", "Intermediate", "Advanced", "Open"],
    duration: 60,
    description:
      "Practice class behavior in a low-stakes environment and learn mindsets that help you recenter, refocus, and sustain mental energy.",
  },
  {
    id: "tips-for-being-seen",
    name: "Tips for Being Seen",
    category: "Art of Taking Class",
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
    description: "Bring questions on any topic and take part in a guided open discussion with Take 2 faculty.",
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
  "Art of Taking Class": "bg-emerald-500",
  Mindfulness: "bg-pink-500",
  Seminar: "bg-blue-500",
};

const CONSULTATION_EMAIL = "connect@take2company.com";

function formatTime(minutes: number) {
  const hour24 = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour}:${String(mins).padStart(2, "0")} ${period}`;
}

export function IntensivePackages() {
  const [level, setLevel] = useState<Level | "All">("All");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [schedulingId, setSchedulingId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<Day>("Monday");
  const [selectedTime, setSelectedTime] = useState(DAY_START + 60);
  const [selectedClassLevel, setSelectedClassLevel] = useState<Level | undefined>(undefined);
  const [schedule, setSchedule] = useState<ScheduledClass[]>([]);
  const [breaks, setBreaks] = useState<ScheduledBreak[]>([]);
  const [editingBreakId, setEditingBreakId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showLevelInfo, setShowLevelInfo] = useState(false);
  const [dragOverDay, setDragOverDay] = useState<Day | null>(null);
  const [dragOverTime, setDragOverTime] = useState<number | null>(null);
  const [dragPayload, setDragPayload] = useState<DragPayload | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("take-2-intensive-plan");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.schedule) setSchedule(parsed.schedule);
        if (parsed?.breaks) setBreaks(parsed.breaks);
      }
    } catch {
      // A private browser session may block local storage; the planner still works in memory.
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    try {
      window.localStorage.setItem("take-2-intensive-plan", JSON.stringify({ schedule, breaks }));
    } catch {
      // Keep the current in-memory schedule when storage is unavailable.
    }
  }, [schedule, breaks, hasLoaded]);

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

  const addClass = (classId: string) => {
    const course = CURRICULUM.find((entry) => entry.id === classId);
    if (course && hasOverlap(selectedDay, selectedTime, course.duration)) {
      flashNotice("That time overlaps another class or break — pick a different slot.");
      return;
    }
    setSchedule((current) => [
      ...current,
      { classId, day: selectedDay, time: selectedTime, level: selectedClassLevel },
    ]);
    setSchedulingId(null);
    setSelectedClassLevel(undefined);
    flashNotice("Class added to your intensive.");
  };

  const removeClass = (classId: string, day: Day, time: number) => {
    setSchedule((current) => current.filter((item) => !(item.classId === classId && item.day === day && item.time === time)));
  };

  const DEFAULT_BREAK_LENGTH = 30;

  const flashNotice = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2400);
  };

  const dragKeyOf = (payload: DragPayload | null) => {
    if (!payload) return null;
    if (payload.kind === "new") return payload.classId;
    if (payload.kind === "move") return `${payload.classId}-${payload.fromDay}-${payload.fromTime}`;
    if (payload.kind === "break-new") return "break-source";
    return payload.breakId;
  };
  const draggingKey = dragKeyOf(dragPayload);

  // Combined, time-sorted entries for a day, used to figure out where a dragged
  // item should land and what time it should take on when the order changes.
  const getDayEntries = (day: Day) => {
    const classEntries = schedule
      .filter((item) => item.day === day)
      .map((item) => {
        const course = CURRICULUM.find((c) => c.id === item.classId);
        return { key: `class-${item.classId}-${item.day}-${item.time}`, time: item.time, end: item.time + (course?.duration ?? 0) };
      });
    const breakEntries = breaks
      .filter((item) => item.day === day)
      .map((item) => ({ key: `break-${item.id}`, time: item.start, end: item.end }));
    return [...classEntries, ...breakEntries].sort((a, b) => a.time - b.time);
  };

  const snap = (value: number) => Math.round(value / TIME_STEP) * TIME_STEP;

  // Guards against double-booking: true if [start, start+duration) would
  // overlap any existing class or break on that day.
  const hasOverlap = (day: Day, start: number, duration: number, excludeKey?: string) => {
    const end = start + duration;
    return getDayEntries(day).some((entry) => entry.key !== excludeKey && start < entry.end && end > entry.time);
  };

  const durationOf = (payload: DragPayload) => {
    if (payload.kind === "break-new" || payload.kind === "break-move") return payload.length ?? DEFAULT_BREAK_LENGTH;
    const course = CURRICULUM.find((entry) => entry.id === payload.classId);
    return course?.duration ?? 60;
  };

  const excludeKeyOf = (payload: DragPayload) => {
    if (payload.kind === "move") return `class-${payload.classId}-${payload.fromDay}-${payload.fromTime}`;
    if (payload.kind === "break-move") return `break-${payload.breakId}`;
    return undefined;
  };

  // Google Calendar-style hit test: reads the cursor's continuous position over
  // a day column and turns it directly into a clock time, snapped to the grid —
  // rather than guessing an insertion slot among existing cards. Pointer events
  // (not the HTML5 drag-and-drop API) mean this works the same on every browser
  // and on touch, where native drag-and-drop isn't supported at all.
  const hitTest = (x: number, y: number, duration: number): { day: Day; time: number } | null => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const col = el?.closest("[data-day-col]") as HTMLElement | null;
    if (!col) return null;
    const day = col.dataset.dayCol as Day;
    const rect = col.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (y - rect.top) / rect.height));
    const raw = DAY_START + ratio * (DAY_END - DAY_START);
    const time = Math.min(DAY_END - duration, Math.max(DAY_START, snap(raw)));
    return { day, time };
  };

  const applyDrop = (day: Day, time: number, payload: DragPayload) => {
    const duration = durationOf(payload);
    const excludeKey = excludeKeyOf(payload);
    if (hasOverlap(day, time, duration, excludeKey)) {
      flashNotice("No room there — try a different spot.");
      return;
    }

    if (payload.kind === "break-new" || payload.kind === "break-move") {
      if (payload.kind === "break-move") {
        setBreaks((current) =>
          current.map((item) => (item.id === payload.breakId ? { ...item, day, start: time, end: time + duration } : item)),
        );
        flashNotice("Break moved.");
      } else {
        setBreaks((current) => [
          ...current,
          { id: `break-${Date.now()}`, day, start: time, end: time + duration, label: "Break" },
        ]);
        flashNotice("Break added — click it to adjust the length.");
      }
      return;
    }

    const course = CURRICULUM.find((entry) => entry.id === payload.classId);
    if (!course) return;

    if (payload.kind === "move") {
      setSchedule((current) =>
        current.map((item) =>
          item.classId === payload.classId && item.day === payload.fromDay && item.time === payload.fromTime
            ? { ...item, day, time }
            : item,
        ),
      );
      flashNotice("Class moved.");
    } else {
      setSchedule((current) => [...current, { classId: payload.classId, day, time, level: payload.level ?? course.levels[0] }]);
      flashNotice("Class placed — drag it again anytime to adjust.");
    }
  };

  // Starts a custom pointer-driven drag from anywhere on a card. This replaces
  // the native HTML5 drag-and-drop API (which desktop Safari handles
  // inconsistently and mobile browsers largely ignore), so dragging behaves the
  // same on every browser and works with touch as well as a mouse. A small
  // movement threshold keeps ordinary taps/clicks (expand, edit, remove)
  // working as normal.
  const beginDrag = (event: React.PointerEvent, payload: DragPayload) => {
    if (event.button !== undefined && event.button !== 0) return;
    const startX = event.clientX;
    const startY = event.clientY;
    const duration = durationOf(payload);
    let dragging = false;

    const onMove = (moveEvent: PointerEvent) => {
      if (!dragging) {
        if (Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY) < 6) return;
        dragging = true;
        setDragPayload(payload);
      }
      moveEvent.preventDefault();
      setDragPos({ x: moveEvent.clientX, y: moveEvent.clientY });
      const hit = hitTest(moveEvent.clientX, moveEvent.clientY, duration);
      setDragOverDay(hit?.day ?? null);
      setDragOverTime(hit?.time ?? null);
    };

    const cleanup = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      setDragPayload(null);
      setDragPos(null);
      setDragOverDay(null);
      setDragOverTime(null);
    };

    const onUp = (upEvent: PointerEvent) => {
      if (dragging) {
        const hit = hitTest(upEvent.clientX, upEvent.clientY, duration);
        if (hit) applyDrop(hit.day, hit.time, payload);
      }
      cleanup();
    };

    const onCancel = () => cleanup();

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
  };

  const updateBreak = (id: string, patch: Partial<ScheduledBreak>) => {
    setBreaks((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const removeBreak = (id: string) => {
    setBreaks((current) => current.filter((item) => item.id !== id));
    if (editingBreakId === id) setEditingBreakId(null);
  };

  const buildPlanText = () => {
    const lines = DAYS.flatMap((day) => {
      const dayItems = [
        ...schedule
          .filter((item) => item.day === day)
          .map((item) => {
            const course = CURRICULUM.find((entry) => entry.id === item.classId);
            return {
              time: item.time,
              text: `- ${formatTime(item.time)}: ${course?.name} (${course?.category}, ${course?.duration} min)${item.level ? ` [${item.level}]` : ""}`,
            };
          }),
        ...breaks
          .filter((item) => item.day === day)
          .map((item) => ({
            time: item.start,
            text: `- ${formatTime(item.start)}–${formatTime(item.end)}: ${item.label}`,
          })),
      ].sort((a, b) => a.time - b.time);
      if (!dayItems.length) return [];
      return [day, ...dayItems.map((item) => item.text), ""];
    });

    return [
      "My Take 2 Intensive Plan",
      "",
      ...lines,
      `Total training time: ${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`,
      "",
      "All times, levels, and details are just a starting point — happy to talk through and adjust anything together.",
    ].join("\n");
  };

  const sendForConsultation = () => {
    const text = buildPlanText();
    window.location.href = `mailto:${CONSULTATION_EMAIL}?subject=${encodeURIComponent("Take 2 intensive consultation")}&body=${encodeURIComponent(text)}`;
  };

  const exportPlan = async () => {
    const text = buildPlanText();
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Take 2 Intensive Plan", text });
        return;
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
      }
    }
    window.location.href = `mailto:?subject=${encodeURIComponent("My Take 2 intensive plan")}&body=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-12 sm:px-6 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(220,38,38,0.16),transparent_27%),linear-gradient(135deg,#090909_0%,#000_58%,#130303_100%)]" />
        <div className="absolute -right-24 -top-28 h-96 w-96 rounded-full border border-red-600/10" />
        <div className="absolute -right-8 -top-12 h-64 w-64 rounded-full border border-red-600/10" />
        <div className="relative mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:items-end lg:gap-16"
          >
            <div>
              <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-red-500">
                <Sparkles className="h-3.5 w-3.5" />
                Built around your goals
              </div>
              <h1 className="font-['Bebas_Neue'] text-6xl leading-[0.9] tracking-wide sm:text-7xl md:text-8xl">
                Build Your <span className="text-red-600">Experience</span>
              </h1>
            </div>
            <div className="border-l border-white/10 pl-6 lg:pb-1 lg:pl-8">
              <p className="max-w-xl text-base leading-7 text-white/60">
                Explore the Take 2 curriculum, find classes for your level, and shape a focused week of training that is entirely your own.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50">
                <span className="flex items-center gap-2"><BookOpen className="h-3.5 w-3.5 text-red-500" /> {CURRICULUM.length} modules</span>
                <span className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-red-500" /> Seven-day planner</span>
                <span className="flex items-center gap-2"><HeartHandshake className="h-3.5 w-3.5 text-red-500" /> Consultation ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 md:py-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 grid gap-5 border border-white/10 bg-[#080808] p-4 shadow-[0_16px_60px_rgba(0,0,0,0.28)] md:grid-cols-[minmax(260px,1fr)_200px] md:p-5 xl:grid-cols-[minmax(300px,1fr)_190px_auto] xl:items-end">
            <div className="min-w-0">
              <label htmlFor="curriculum-search" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Search curriculum
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  id="curriculum-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by class, style, or skill..."
                  className="h-11 w-full border border-white/12 bg-black pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-red-600"
                />
              </div>
            </div>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Training focus
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-2 h-11 w-full border border-white/12 bg-black px-3 text-sm normal-case tracking-normal text-white outline-none focus:border-red-600"
              >
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <div className="relative">
              <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Level
                <button
                  type="button"
                  onClick={() => setShowLevelInfo((current) => !current)}
                  aria-label="What do the levels mean?"
                  className="text-white/30 transition hover:text-red-400"
                >
                  <Info className="h-3 w-3" />
                </button>
              </p>
              <div className="flex flex-wrap gap-1.5">
              {LEVELS.map((item) => (
                <button
                  key={item}
                  onClick={() => setLevel(item)}
                  className={`h-11 border px-3 text-[11px] font-semibold uppercase tracking-wider transition ${
                    level === item
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-white/15 bg-black text-white/60 hover:border-white/35 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
              </div>
              <AnimatePresence>
                {showLevelInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 top-full z-20 mt-2 w-72 border border-white/15 bg-[#0a0a0a] p-4 shadow-[0_16px_60px_rgba(0,0,0,0.5)]"
                  >
                    <dl className="space-y-3">
                      {(Object.keys(LEVEL_DESCRIPTIONS) as Level[]).map((lvl) => (
                        <div key={lvl}>
                          <dt className="text-[10px] font-semibold uppercase tracking-wider text-red-400">{lvl}</dt>
                          <dd className="mt-1 text-xs leading-5 text-white/60">{LEVEL_DESCRIPTIONS[lvl]}</dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(560px,1.05fr)] xl:items-start">
            <div>
              <div className="mb-4 flex items-end justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-red-500">Step 1 / Select</p>
                  <h2 className="font-['Bebas_Neue'] text-4xl leading-none tracking-wide">Explore Classes</h2>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-white/35">
                    <GripVertical className="h-3 w-3" /> Drag any class onto a day to schedule it
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-['Oswald'] text-lg text-white/80">{String(filteredClasses.length).padStart(2, "0")}</span>
                  <span className="ml-2 text-[10px] uppercase tracking-wider text-white/30">matches</span>
                </div>
              </div>

              <div className="space-y-2 xl:max-h-[650px] xl:overflow-y-auto xl:pr-2 [scrollbar-color:rgba(255,255,255,0.18)_transparent] [scrollbar-width:thin]">
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
                        className={`border bg-[#090909] transition ${draggingKey === course.id ? "opacity-40" : ""} ${
                          isExpanded || isScheduling ? "border-red-600/50 bg-[#0c0909]" : "border-white/10 hover:border-white/25 hover:bg-white/[0.025]"
                        }`}
                      >
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : course.id)}
                          onPointerDown={(event) => beginDrag(event, { kind: "new", classId: course.id, level: course.levels[0] })}
                          style={{ touchAction: "pan-y" }}
                          className="w-full cursor-grab p-4 text-left active:cursor-grabbing"
                          aria-expanded={isExpanded}
                        >
                          <div className="flex items-start gap-3.5">
                            <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-white/25" />
                            <span className={`mt-0.5 h-9 w-0.5 shrink-0 ${CATEGORY_COLORS[course.category]}`} />
                            <div className="min-w-0 flex-1">
                              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">{course.category}</span>
                                <span className="text-white/20">/</span>
                                <span className="flex items-center gap-1 text-[10px] text-white/40"><Clock3 className="h-3 w-3" /> {course.duration} min</span>
                              </div>
                              <h3 className="font-['Oswald'] text-lg tracking-wide text-white">{course.name}</h3>
                              <div className="mt-2.5 flex flex-wrap gap-1.5">
                                {course.levels.map((item) => (
                                  <span key={item} className={`border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                                    item === "Open" ? "border-red-600/60 bg-red-600/10 text-red-400" : "border-white/10 text-white/45"
                                  }`}>
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <ChevronDown className={`mt-1.5 h-4 w-4 shrink-0 text-white/30 transition-transform ${isExpanded ? "rotate-180 text-red-500" : ""}`} />
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
                              <div className="border-t border-white/10 px-4 py-4 pl-8">
                                <p className="max-w-2xl text-sm leading-6 text-white/60">{course.description}</p>
                                <button
                                  onClick={() => {
                                    setSchedulingId(isScheduling ? null : course.id);
                                    setSelectedClassLevel(course.levels[0]);
                                  }}
                                  className={`mt-4 inline-flex h-9 items-center gap-2 px-3.5 text-[11px] font-semibold uppercase tracking-wider transition ${
                                    isScheduled
                                      ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                      : "bg-red-600 text-white hover:bg-red-700"
                                  }`}
                                >
                                  {isScheduled ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                  {isScheduled ? "Add another time" : "Add to week"}
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence initial={false}>
                          {isScheduling && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-4 border-t border-red-600/20 bg-red-950/10 p-4">
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <label className="text-xs font-semibold uppercase tracking-wider text-white/45">
                                    Day
                                    <select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value as Day)} className="mt-2 h-11 w-full border border-white/15 bg-black px-3 text-sm normal-case tracking-normal text-white outline-none focus:border-red-600">
                                      {DAYS.map((day) => <option key={day}>{day}</option>)}
                                    </select>
                                  </label>
                                  <div className="text-xs font-semibold uppercase tracking-wider text-white/45">
                                    Highlight level
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                      {course.levels.map((lvl) => (
                                        <button
                                          key={lvl}
                                          type="button"
                                          onClick={() => setSelectedClassLevel(lvl)}
                                          className={`h-9 border px-2.5 text-[10px] font-semibold uppercase tracking-wider normal-case transition ${
                                            selectedClassLevel === lvl
                                              ? "border-red-600 bg-red-600 text-white"
                                              : "border-white/15 bg-black text-white/55 hover:border-white/35 hover:text-white"
                                          }`}
                                        >
                                          {lvl}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white/45">
                                    <span>Start time</span>
                                    <span className="font-['Oswald'] text-sm normal-case tracking-normal text-red-400">
                                      {formatTime(selectedTime)} – {formatTime(selectedTime + course.duration)}
                                    </span>
                                  </div>
                                  <input
                                    type="range"
                                    min={DAY_START}
                                    max={DAY_END - course.duration}
                                    step={TIME_STEP}
                                    value={Math.min(selectedTime, DAY_END - course.duration)}
                                    onChange={(event) => setSelectedTime(Number(event.target.value))}
                                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-red-600"
                                  />
                                  <div className="mt-1.5 flex justify-between text-[9px] uppercase tracking-wider text-white/30">
                                    <span>8:00 AM</span>
                                    <span>10:00 PM</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => addClass(course.id)}
                                  className="h-11 w-full bg-white px-5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-red-600 hover:text-white sm:w-auto"
                                >
                                  Place class
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

            <aside className="min-w-0 xl:sticky xl:top-24">
              <div className="mb-4 flex items-end justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-red-500">Step 2 / Your Week</p>
                  <h2 className="font-['Bebas_Neue'] text-4xl leading-none tracking-wide">Your Week</h2>
                </div>
                {(schedule.length > 0 || breaks.length > 0) && (
                  <button onClick={() => { setSchedule([]); setBreaks([]); }} className="flex items-center gap-2 pb-1 text-xs uppercase tracking-wider text-white/40 transition hover:text-red-400">
                    <RotateCcw className="h-3.5 w-3.5" /> Clear
                  </button>
                )}
              </div>

              <div className="mb-3 flex items-center justify-between gap-3 border border-dashed border-amber-500/30 bg-amber-500/[0.04] px-3 py-2.5">
                <div
                  onPointerDown={(event) => beginDrag(event, { kind: "break-new", length: DEFAULT_BREAK_LENGTH })}
                  style={{ touchAction: "none" }}
                  className={`flex cursor-grab touch-none items-center gap-2 border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-400 transition active:cursor-grabbing ${
                    draggingKey === "break-source" ? "opacity-40" : "hover:bg-amber-500/20"
                  }`}
                >
                  <GripVertical className="h-3.5 w-3.5" />
                  <Coffee className="h-3.5 w-3.5" /> Break
                </div>
                <p className="text-[11px] text-white/35">Drag onto a day to add — click a placed break to change its length</p>
              </div>

              <div className="overflow-x-auto border border-white/10 bg-[#070707] shadow-[0_16px_60px_rgba(0,0,0,0.24)]">
                <div className="flex min-w-[900px]">
                  {/* Hour gutter, like the time column on the left of Google Calendar */}
                  <div className="w-12 shrink-0 border-r border-white/10">
                    <div className="h-[52px] border-b border-white/10" />
                    <div className="relative" style={{ height: GRID_HEIGHT }}>
                      {HOUR_MARKS.map((mark) => (
                        <div
                          key={mark}
                          style={{ top: ((mark - DAY_START) / (DAY_END - DAY_START)) * GRID_HEIGHT }}
                          className="absolute right-1.5 -translate-y-1/2 text-[9px] uppercase tracking-wider text-white/30"
                        >
                          {formatHourLabel(mark)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {DAYS.map((day) => {
                    const dayClasses = schedule.filter((item) => item.day === day);
                    const dayBreaks = breaks.filter((item) => item.day === day);
                    const dayEntries = [
                      ...dayClasses.map((item) => ({ kind: "class" as const, time: item.time, item })),
                      ...dayBreaks.map((item) => ({ kind: "break" as const, time: item.start, item })),
                    ].sort((a, b) => a.time - b.time);
                    const previewDuration = dragPayload ? durationOf(dragPayload) : 0;
                    const showPreview = dragOverDay === day && dragOverTime !== null && dragPayload;
                    const previewOverlaps =
                      showPreview && hasOverlap(day, dragOverTime!, previewDuration, excludeKeyOf(dragPayload!));

                    return (
                      <div key={day} className="min-w-[110px] flex-1 border-r border-white/10 last:border-r-0">
                        <div className="h-[52px] border-b border-white/10 bg-white/[0.035] px-2 py-2 text-center">
                          <p className="font-['Oswald'] text-sm uppercase tracking-wider text-white/80">{day.slice(0, 3)}</p>
                          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/30">{dayClasses.length} {dayClasses.length === 1 ? "class" : "classes"}</p>
                        </div>
                        <div
                          data-day-col={day}
                          className={`relative transition ${dragOverDay === day ? "bg-red-600/[0.05]" : ""}`}
                          style={{ height: GRID_HEIGHT }}
                        >
                          {/* Hour gridlines */}
                          {HOUR_MARKS.map((mark) => (
                            <div
                              key={mark}
                              style={{ top: ((mark - DAY_START) / (DAY_END - DAY_START)) * GRID_HEIGHT }}
                              className="pointer-events-none absolute inset-x-0 border-t border-white/[0.05]"
                            />
                          ))}

                          {!dayEntries.length && !showPreview && (
                            <p className="pointer-events-none absolute inset-x-1 top-2 text-center text-[9px] uppercase leading-4 tracking-wider text-white/18">
                              Drop here
                            </p>
                          )}

                          {dayEntries.map((entry) => {
                            const top = ((entry.time - DAY_START) / (DAY_END - DAY_START)) * GRID_HEIGHT;

                            if (entry.kind === "class") {
                              const course = CURRICULUM.find((c) => c.id === entry.item.classId);
                              if (!course) return null;
                              const dragKey = `${entry.item.classId}-${entry.item.day}-${entry.item.time}`;
                              const height = (course.duration / (DAY_END - DAY_START)) * GRID_HEIGHT;
                              return (
                                <motion.div
                                  layout
                                  key={dragKey}
                                  onPointerDown={(event) =>
                                    beginDrag(event, {
                                      kind: "move",
                                      classId: entry.item.classId,
                                      fromDay: entry.item.day,
                                      fromTime: entry.item.time,
                                      level: entry.item.level,
                                    })
                                  }
                                  style={{ touchAction: "none", top, height: Math.max(height, 34) }}
                                  className={`group absolute inset-x-1 z-10 cursor-grab overflow-hidden border border-white/10 bg-[#151013] p-1.5 text-left transition hover:border-red-600/50 active:cursor-grabbing ${
                                    draggingKey === dragKey ? "opacity-40" : ""
                                  }`}
                                >
                                  <span className={`absolute inset-y-0 left-0 w-0.5 ${CATEGORY_COLORS[course.category]}`} />
                                  <p className="truncate pl-1.5 text-[9px] font-semibold uppercase tracking-wider text-red-400">{formatTime(entry.item.time)}</p>
                                  <p className="truncate pl-1.5 font-['Oswald'] text-xs leading-tight text-white">{course.name}</p>
                                  <button
                                    onClick={() => removeClass(entry.item.classId, entry.item.day, entry.item.time)}
                                    aria-label={`Remove ${course.name}`}
                                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center text-white/25 opacity-0 transition hover:text-red-400 group-hover:opacity-100 focus:opacity-100"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </motion.div>
                              );
                            }

                            const isEditing = editingBreakId === entry.item.id;
                            const length = entry.item.end - entry.item.start;
                            const height = (length / (DAY_END - DAY_START)) * GRID_HEIGHT;
                            return (
                              <motion.div
                                layout
                                key={entry.item.id}
                                onPointerDown={
                                  isEditing ? undefined : (event) => beginDrag(event, { kind: "break-move", breakId: entry.item.id, length })
                                }
                                style={{ touchAction: "none", top, height: Math.max(height, 30) }}
                                className={`group absolute inset-x-1 border border-dashed border-amber-500/40 bg-amber-500/[0.08] p-1.5 text-left transition hover:border-amber-500/70 ${
                                  isEditing ? "z-30 overflow-visible" : "z-10 cursor-grab overflow-hidden active:cursor-grabbing"
                                } ${draggingKey === entry.item.id ? "opacity-40" : ""}`}
                              >
                                <button onClick={() => setEditingBreakId(isEditing ? null : entry.item.id)} className="w-full text-left">
                                  <p className="truncate text-[9px] font-semibold uppercase tracking-wider text-amber-400">
                                    <Coffee className="mr-1 inline h-3 w-3" />
                                    {formatTime(entry.item.start)}–{formatTime(entry.item.end)}
                                  </p>
                                  {!isEditing && <p className="truncate font-['Oswald'] text-xs leading-tight text-white/70">{entry.item.label}</p>}
                                </button>
                                <button
                                  onClick={() => removeBreak(entry.item.id)}
                                  aria-label={`Remove ${entry.item.label}`}
                                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center text-white/25 opacity-0 transition hover:text-red-400 group-hover:opacity-100 focus:opacity-100"
                                >
                                  <X className="h-3 w-3" />
                                </button>

                                {isEditing && (
                                  <div className="mt-1.5 w-56 space-y-2 border border-amber-500/30 bg-[#0a0a0a] p-3 shadow-2xl">
                                    <input
                                      value={entry.item.label}
                                      onChange={(event) => updateBreak(entry.item.id, { label: event.target.value })}
                                      placeholder="Break"
                                      className="h-8 w-full border border-white/15 bg-black px-2 text-xs text-white outline-none focus:border-amber-500"
                                    />
                                    <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-white/40">
                                      <span>Length</span>
                                      <span className="text-amber-400">{length} min</span>
                                    </div>
                                    <input
                                      type="range"
                                      min={TIME_STEP}
                                      max={Math.min(240, DAY_END - entry.item.start)}
                                      step={TIME_STEP}
                                      value={length}
                                      onChange={(event) => {
                                        const newLength = Number(event.target.value);
                                        updateBreak(entry.item.id, { end: Math.min(DAY_END, entry.item.start + newLength) });
                                      }}
                                      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-amber-500"
                                    />
                                    <button
                                      onClick={() => setEditingBreakId(null)}
                                      className="h-8 w-full bg-amber-500 text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-amber-400"
                                    >
                                      Done
                                    </button>
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}

                          {/* Live drop preview, like the shaded block Google Calendar shows while dragging */}
                          {showPreview && (
                            <div
                              style={{
                                top: ((dragOverTime! - DAY_START) / (DAY_END - DAY_START)) * GRID_HEIGHT,
                                height: Math.max((previewDuration / (DAY_END - DAY_START)) * GRID_HEIGHT, 24),
                              }}
                              className={`pointer-events-none absolute inset-x-1 z-20 border-2 border-dashed p-1.5 ${
                                previewOverlaps ? "border-red-500 bg-red-500/20" : "border-red-500 bg-red-500/10"
                              }`}
                            >
                              <p className="truncate text-[9px] font-semibold uppercase tracking-wider text-white">
                                {formatTime(dragOverTime!)}
                                {previewOverlaps ? " · No room" : ""}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-x border-b border-white/10 bg-[#0a0a0a] p-4">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/35">Your intensive</p>
                    <p className="mt-1 font-['Oswald'] text-lg text-white">{schedule.length} {schedule.length === 1 ? "class" : "classes"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider text-white/35">Training time</p>
                    <p className="mt-1 font-['Oswald'] text-lg text-red-500">{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</p>
                  </div>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <button
                    onClick={sendForConsultation}
                    disabled={!schedule.length}
                    className="flex h-12 w-full items-center justify-center gap-2.5 bg-red-600 px-4 font-['Oswald'] text-sm uppercase tracking-[0.14em] text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-white/[0.07] disabled:text-white/25"
                  >
                    <HeartHandshake className="h-4.5 w-4.5" />
                    Send for consultation
                    <Send className="h-4 w-4" />
                  </button>
                  <button
                    onClick={exportPlan}
                    disabled={!schedule.length}
                    className="flex h-12 w-full items-center justify-center gap-2.5 border border-white/15 bg-transparent px-4 font-['Oswald'] text-sm uppercase tracking-[0.14em] text-white/80 transition hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:border-white/5 disabled:text-white/20"
                  >
                    <Share2 className="h-4 w-4" />
                    Export schedule
                  </button>
                </div>
                <p className="mt-3 text-center text-xs leading-5 text-white/35">
                  "Send for consultation" goes straight to our Take 2 team. "Export schedule" lets you share your plan with a parent, studio director, or anyone else.
                </p>
                <p className="mt-4 border-t border-white/10 pt-3 text-center text-[11px] italic leading-5 text-white/30">
                  All times, levels, and details here are just a starting point — we'd love to chat and shape them together with you.
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

      {dragPayload && dragPos && (
        <div
          className="pointer-events-none fixed z-50 flex items-center gap-2 border border-red-600/60 bg-black px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-2xl"
          style={{ left: dragPos.x + 14, top: dragPos.y + 14 }}
        >
          {dragPayload.kind === "break-new" || dragPayload.kind === "break-move" ? (
            <>
              <Coffee className="h-3.5 w-3.5 text-amber-400" /> Break
            </>
          ) : (
            <>
              <GripVertical className="h-3.5 w-3.5 text-red-500" />
              {CURRICULUM.find((c) => c.id === dragPayload.classId)?.name ?? "Class"}
            </>
          )}
        </div>
      )}
    </div>
  );
}
