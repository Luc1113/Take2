import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Instagram, Youtube, Mail } from "lucide-react";
import trevorHeadshot from "figma:asset/69f64a3c799f1fabeacf6ddabcb8ae01b6b49fd6.png";
import aydinAction from "figma:asset/88d68ba2f13ce1e35b7a91b38cd7ef3ebbd3c932.png";

export function Staff() {
  const staffMembers = [
    {
      name: "Trevor Mazzei",
      role: "Co-Founder, Choreographer & Educator",
      headshot: trevorHeadshot,
      actionShot: trevorHeadshot,
      bio: "Trevor Mazzei is a choreographer and educator dedicated to developing strong dancers with confident, resilient minds. A graduate of the University of Connecticut with a degree in Psychology, he integrates mental wellness into his rehearsal spaces, fostering environments where dancers feel supported, seen, and challenged. Originally from Long Island, New York, Trevor developed a deep appreciation for movement at an early age and expanded his training through conventions and intensives such as Theresa Stone's Instincts. He also pursued independent study at Broadway Dance Center, Peridance, Steps on Broadway, and PMT House of Dance, training under renowned choreographers in Contemporary, Hip Hop, Breaking, Jazz, and Street Jazz. During his time at the University of Connecticut, he served as the D.E.I. Executive Board Member and choreographer for the UConn Dance Company, advocating for inclusive and safe spaces within the company. Trevor's choreography has earned numerous awards and adjudications at both regional and national competitions, including Press Play, where his choreography was recognized through MJs House of Dance. His work has also been showcased at KC Castellano's Project Create, Theresa Stone's ABTrain Convention, and University of Connecticut Dance Company performances. Most recently, he performed at the Choreographers Carnival under the direction of Ali Koinoglou. With five years of teaching experience working with dancers ages 10 to 22, Trevor is committed to cultivating expressive and fulfilled artists who carry confidence beyond the studio.",
      specialties: ["Contemporary", "Hip Hop", "Breaking", "Jazz", "Street Jazz"],
    },
    {
      name: "Aydin Eichenholz",
      role: "Co-Founder",
      headshot: aydinAction,
      actionShot: aydinAction,
      bio: "Aydin Eichenholz is a co-founder of Take 2 Dance Studio, bringing passion, creativity, and dedication to building a space where dancers can thrive. More details coming soon.",
      specialties: ["Breaking", "Hip Hop", "Urban Styles"],
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-black" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1690267286998-bae912638f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMGluc3RydWN0b3IlMjB0ZWFjaGluZyUyMG1vdmVtZW50fGVufDF8fHx8MTc3MzM0Mjc4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-['Bebas_Neue'] text-8xl md:text-9xl tracking-wider mb-6">
              <span className="text-white">Meet Our</span>
              <br />
              <span className="text-red-600">Team</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-1 w-48 bg-red-600 mx-auto mb-8"
            />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Learn from industry professionals who are passionate about sharing their expertise 
              and helping you achieve your dance goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-24">
            {staffMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative group ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden"
                  >
                    <div className="aspect-[3/4] relative">
                      <ImageWithFallback
                        src={member.actionShot}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                      
                      {/* Red accent overlay */}
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                        className="absolute top-0 right-0 w-2 h-full bg-red-600 origin-top"
                      />
                    </div>

                    {/* Social Icons */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute bottom-6 left-6 flex gap-4"
                    >
                      <a
                        href="#"
                        className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                      >
                        <Instagram className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                      >
                        <Youtube className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                      >
                        <Mail className="w-5 h-5 text-white" />
                      </a>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <h2 className="font-['Bebas_Neue'] text-5xl tracking-wider text-white mb-2">
                      {member.name}
                    </h2>
                    <p className="font-['Oswald'] text-red-600 text-xl tracking-wide uppercase mb-6">
                      {member.role}
                    </p>
                    <div className="h-0.5 w-24 bg-red-600 mb-6" />
                    
                    <p className="text-white/80 text-lg leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    <div>
                      <p className="font-['Oswald'] text-white/60 text-sm uppercase tracking-wider mb-3">
                        Specialties
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="px-4 py-2 bg-white/5 border border-white/10 text-white/90 text-sm font-['Oswald'] tracking-wide uppercase"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-red-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Bebas_Neue'] text-6xl md:text-7xl tracking-wider mb-8 text-white">
              Join Our Classes
            </h2>
            <p className="text-xl text-white/80 mb-12">
              Experience firsthand the passion and expertise our instructors bring to every session.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-12 py-5 font-['Oswald'] text-xl tracking-wider uppercase hover:bg-red-700 transition-colors duration-300"
            >
              View Schedule
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}