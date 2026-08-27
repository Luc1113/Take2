import { memo, type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";
import { Instagram } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import aydinHeadshot from "../../assets/aydin-headshot.webp";
import trevorHeadshot from "../../assets/trevor-headshot.webp";
import sophieHeadshot from "../../assets/sophie-headshot.webp";
import avaHeadshot from "../../assets/ava-headshot.webp";

type Founder = {
  name: string;
  headshot: string;
  instagram: string;
  bio: ReactNode;
};

type TeamMember = {
  name: string;
  role: string;
  headshot: string;
  instagram?: string;
  bio: ReactNode;
};

const FOUNDERS: Founder[] = [
  {
    name: "Trevor Mazzei",
    headshot: trevorHeadshot,
    instagram: "@trevor_mazzei",
    bio: "Trevor Mazzei is a choreographer and educator dedicated to developing strong dancers with confident, resilient minds. A graduate of the University of Connecticut with a degree in Psychology, he integrates mental wellness into his rehearsal spaces, fostering environments where dancers feel supported, seen, and challenged. Originally from Long Island, New York, Trevor developed a deep appreciation for movement at an early age and expanded his training through conventions and intensives such as Theresa Stone's Instincts. He also pursued independent study at Broadway Dance Center, Peridance, Steps on Broadway, and PMT House of Dance, training under renowned choreographers in Contemporary, Hip Hop, Breaking, Jazz, and Street Jazz. During his time at the University of Connecticut, he served as the D.E.I. Executive Board Member and choreographer for the UConn Dance Company, advocating for inclusive and safe spaces within the company. Trevor's choreography has earned numerous awards and adjudications at both regional and national competitions, including Press Play, where his choreography was recognized through MJs House of Dance. His work has also been showcased at KC Castellano's Project Create, Theresa Stone's ABTrain Convention, and University of Connecticut Dance Company performances. Most recently, he performed at the Choreographers Carnival under the direction of Ali Koinoglou. With five years of teaching experience working with dancers ages 10 to 22, Trevor is committed to cultivating expressive and fulfilled artists who carry confidence beyond the studio.",
  },
  {
    name: "Aydin Rin",
    headshot: aydinHeadshot,
    instagram: "@aydin_rin",
    bio: (
      <>
        Aydin Rin is a professional choreographer and educator based in LI, New
        York, with extensive industry experience. His resume showcases a variety
        of jobs consisting of live work such as backup dancing at the{" "}
        <em>Macy’s Thanksgiving Day Parade</em> for Kim Petras, performing on
        stages such as <em>TV Eyes</em> opening for Tim Capello choreographed by
        Neil Schwartz, Choreographers Carnival for Ali Koinoglou and many more.
        Aydin also has experience working with cameras and television, notably
        including working for News 12, music videos with Izzy Gilden directed by
        Lane Napper, and Frankie Zulferino directed by Theresa Stone. Having
        trained in many styles and graduating from professional industry
        programs such as Broadway Dance Center's <em>Professional Semester</em>,
        Neil Schwartz's <em>Working Hour</em>, and Theresa Stone’s{" "}
        <em>Instincts</em>. Throughout New York, he continues to train with
        renowned choreographers from establishments such as Brickhouse, Steps On
        Broadway, Broadway Dance Center and more. Aydin’s choreography has
        received multiple awards, nominations, and adjudications at competitions
        both at the regional and national levels through Mj’s House of Dance.
        Additionally, his work has also been featured by Theresa Stone’s{" "}
        <em>ABTrain</em> and Neil Schwartz’s <em>Working hour</em>. As a
        teacher, he believes that you have to train the passion and love for the
        art first, and the skills will soon follow. Aydin strives to teach more
        than just moves, but lessons that dancers can carry and hold on to for
        any situation they might face. By fostering resilient students that can
        express their individuality, unique voice, and style, they will be able
        to leave their mark on the broader stage of the dance community.
      </>
    ),
  },
];

const TEAM: TeamMember[] = [
  {
    name: "Sophie Savelli",
    role: "Mentor",
    headshot: sophieHeadshot,
    instagram: "@sophie.savelli",
    bio: "Sophie Savelli is a New York City based dancer, teacher, and choreographer who specializes in contemporary, jazz, street fusion, and rhythm tap. Originally from Cleveland, Sophie trained extensively in all forms of dance at her family's dance studio, and began teaching there and at several other studios in North East Ohio before relocating to NYC to attend the Conservatory at Steps on Broadway. She's been a featured performer and dance captain at Cedar Point, has performed at the 24th and 25th annual Choreographer's Carnival, has appeared in concept videos for multiple choreographers in New York, was seen as a guest artist in Tulsa Ballet's \"Strictly Gershwin\", and recently studied choreography under Doug Varone in his workshop hosted at Juilliard. Sophie is also a member of the Dig Tap Society, a tap dance company that performs internationally.",
  },
  {
    name: "Ava Fischetti",
    role: "Mentor",
    headshot: avaHeadshot,
    instagram: "@avafischetti",
    bio: "Ava Fischetti is a dancer, teacher, and choreographer specializing in hip hop and contemporary. Originally from Long Island, New York, Ava trained competitively in all styles of dance at Broadway Dance Academy and was a member of the Massapequa Chiefettes competitive dance team. She is currently a Pre-PA at the University of Tampa, where she serves as Co-Captain of the Hip Hop dance team, Unified Dance Crew. Ava has choreographed numerous routines for the team, including their 2026 College Classic Nationals routine, which earned 2nd Place in the Division II Hip Hop category. She also performs at university athletic and campus events. Additionally, she served as the hip hop instructor at Lux Dance Collective in Tampa where she trains students of all age groups. Ava is passionate about helping dancers build confidence, gain experience, and develop a genuine love for dance in a positive and encouraging environment.",
  },
];

const IN_VIEW: { once: true; margin: string } = {
  once: true,
  margin: "-100px",
};

const WILL_CHANGE_OPACITY: CSSProperties = { willChange: "opacity" };
const WILL_CHANGE_TRANSFORM: CSSProperties = {
  willChange: "transform, opacity",
};

const HERO_BACKGROUND_STYLE: CSSProperties = {
  backgroundImage:
    "url('https://images.unsplash.com/photo-1690267286998-bae912638f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMGluc3RydWN0b3IlMjB0ZWFjaGluZyUyMG1vdmVtZW50fGVufDF8fHx8MTc3MzM0Mjc4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

type FounderCardProps = {
  founder: Founder;
  index: number;
};

const FounderCard = memo(function FounderCard({
  founder,
  index,
}: FounderCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="[content-visibility:auto] [contain-intrinsic-size:1px_1200px] ff-contain-layout"
    >
      <div className="relative group">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden transform-gpu"
          style={WILL_CHANGE_TRANSFORM}
        >
          <div className="aspect-[3/4] relative">
            <ImageWithFallback
              src={founder.headshot}
              alt={founder.name}
              className="w-full h-full object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />

            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="absolute top-0 right-0 w-2 h-full bg-red-600 origin-top transform-gpu"
              style={WILL_CHANGE_TRANSFORM}
            />

            <a
              href={`https://instagram.com/${founder.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/20 px-3 py-2 text-white/90 text-sm font-['Oswald'] tracking-wide hover:bg-red-600 hover:border-red-600 transition-colors duration-300 ff-disable-backdrop ff-opaque-chip"
            >
              <Instagram className="w-4 h-4" />
              {founder.instagram}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={WILL_CHANGE_TRANSFORM}
        className="mt-6"
      >
        <h2 className="font-['Bebas_Neue'] text-5xl tracking-wider text-white mb-2">
          {founder.name}
        </h2>
        <p className="font-['Oswald'] text-red-600 text-xl tracking-wide uppercase mb-6">
          Founder
        </p>
        <div className="h-0.5 w-24 bg-red-600 mb-6" />

        <p className="text-white/80 text-lg leading-relaxed">{founder.bio}</p>
      </motion.div>
    </motion.article>
  );
});

FounderCard.displayName = "FounderCard";

type TeamMemberCardProps = {
  member: TeamMember;
  index: number;
};

const TeamMemberCard = memo(function TeamMemberCard({
  member,
  index,
}: TeamMemberCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="[content-visibility:auto] [contain-intrinsic-size:1px_700px] ff-contain-layout grid gap-8 md:grid-cols-[320px_1fr] md:items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={WILL_CHANGE_TRANSFORM}
        className="order-2 md:order-2"
      >
        <h3 className="font-['Bebas_Neue'] text-4xl tracking-wider text-white mb-1">
          {member.name}
        </h3>
        <p className="font-['Oswald'] text-red-600 text-sm tracking-wide uppercase mb-4">
          {member.role}
        </p>
        <div className="h-0.5 w-16 bg-red-600 mb-4" />

        <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
      </motion.div>

      <div className="relative group order-1 md:order-1">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden transform-gpu"
          style={WILL_CHANGE_TRANSFORM}
        >
          <div className="aspect-[3/4] relative">
            <ImageWithFallback
              src={member.headshot}
              alt={member.name}
              className="w-full h-full object-cover"
              sizes="(min-width: 768px) 320px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />

            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="absolute top-0 right-0 w-2 h-full bg-red-600 origin-top transform-gpu"
              style={WILL_CHANGE_TRANSFORM}
            />

            {member.instagram && (
              <a
                href={`https://instagram.com/${member.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/20 px-2.5 py-1.5 text-white/90 text-xs font-['Oswald'] tracking-wide hover:bg-red-600 hover:border-red-600 transition-colors duration-300 ff-disable-backdrop ff-opaque-chip"
              >
                <Instagram className="w-3.5 h-3.5" />
                {member.instagram}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
});

TeamMemberCard.displayName = "TeamMemberCard";

export function Staff() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-black" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 transform-gpu"
            style={{ ...HERO_BACKGROUND_STYLE, ...WILL_CHANGE_OPACITY }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl tracking-wider mb-4">
              <span className="text-white">Meet Our</span>{" "}
              <span className="text-red-600">Team</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-1 w-32 bg-red-600 mx-auto mb-4 transform-gpu"
              style={WILL_CHANGE_TRANSFORM}
            />
            <p className="text-base text-white/80 max-w-3xl mx-auto">
              Learn from industry professionals who are passionate about sharing
              their expertise and helping you achieve your dance goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founders Grid */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {FOUNDERS.map((founder, index) => (
              <FounderCard key={founder.name} founder={founder} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      {TEAM.length > 0 && (
        <section className="py-10 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto space-y-16">
            {TEAM.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-red-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-['Oswald'] text-red-600 text-lg tracking-widest uppercase">
              More Team Members Coming Soon
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
