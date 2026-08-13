import { motion } from "motion/react";

export function Home() {
  const videos = [
    {
      title: "Say My Name - Choreography Visual",
      videoSrc: "/assets/Say My Name Visual.mov",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[620px] items-center overflow-hidden border-b border-white/10 md:min-h-[650px]">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.82)_48%,rgba(0,0,0,0.42)_100%),linear-gradient(180deg,transparent_65%,#000_100%)]" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1683974608358-6606fd6d5000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHN0dWRpbyUyMG1pcnJvciUyMHByYWN0aWNlfGVufDF8fHx8MTc3MzM0Mjc4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: "cover",
              backgroundPosition: "center 42%",
            }}
          />

        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-w-3xl flex-col items-start"
          >
            <p className="mb-4 font-['Oswald'] text-xs uppercase tracking-[0.32em] text-red-500">
              The Company
            </p>
            <h1 className="font-['Bebas_Neue'] text-8xl leading-[0.82] tracking-wider sm:text-9xl md:text-[9.5rem]">
              <span className="text-white">TAKE</span>
              <span className="text-red-600"> 2</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-6 h-0.5 w-24 origin-left bg-red-600"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-7 max-w-xl text-lg leading-7 text-white/65"
          >
Break the mold. Elevate your dance journey with technique and artistr
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-8"
          >
            <button className="h-12 border border-red-600 bg-red-600 px-8 font-['Oswald'] text-sm uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-red-700">
              Build Your Journey
            </button>
          </motion.div>
        </div>

      </section>

      {/* About Section */}
      <section className="relative overflow-hidden bg-black px-5 py-16 sm:px-6 md:py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-red-600 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:pt-2"
          >
            <h2 className="font-['Bebas_Neue'] text-6xl leading-none tracking-wider md:text-7xl">
              <span className="text-white">About</span>{" "}
              <span className="text-red-600">Us</span>
            </h2>
            <div className="mt-5 h-0.5 w-16 bg-red-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:pl-12"
          >
            <p className="mb-7 max-w-4xl text-base leading-8 text-white/75 md:text-lg">
              Take 2 The Company is a New York based training program of
              dedicated educators and professional dancers committed to
              developing versatile dancers through an in-house intensive based
              format. We are committed to developing well rounded performers and
              artists through high level training that challenges both technical
              precision and creative expression. At Take 2, we believe in
              pushing dancers beyond their comfort zones while fostering
              confidence and individuality to ultimately create an environment
              where talent is refined into excellence. Through mentorship and a
              passion for innovation, Take 2 The Company equips dancers with the
              skills, resilience, and artistic voice needed to thrive in and out
              of class.
            </p>
            <p className="max-w-4xl border-t border-white/10 pt-7 text-base leading-8 text-white/60 md:text-lg">
              Beyond our intensives, we also want to produce compelling visuals,
              participate in performance opportunities, and expand the reach of
              our choreography beyond the studio walls. Through concept videos,
              live showcases, collaborative projects, and stage work, we
              encourage dancers to translate their training into meaningful
              artistic experiences. Our mission is not only to educate within
              the classroom, but also to share our movement and creative voice
              with audiences in every space, bridging the gap between training
              and performances.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Promotional Material Section */}
      <section className="border-y border-white/10 bg-[#070707] px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <h2 className="font-['Bebas_Neue'] text-6xl leading-[0.9] tracking-wider md:text-7xl">
              <span className="text-white">See Us</span>{" "}
              <span className="text-red-600">In Action</span>
            </h2>
            <div className="mt-5 h-0.5 w-16 bg-red-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            {videos.map((video) => (
              <div
                key={video.title}
                className="group relative overflow-hidden border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
              >
                <div className="aspect-video relative bg-black">
                  <video
                    controls
                    className="w-full h-full object-cover"
                    poster=""
                  >
                    <source src={video.videoSrc} type="video/quicktime" />
                    <source src={video.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Title Overlay */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 pt-16">
                    <h3 className="font-['Oswald'] text-lg tracking-wide text-white md:text-xl">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-black px-5 py-14 sm:px-6 md:py-16">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -right-1/4 -top-full h-[700px] w-[700px] rounded-full bg-red-600/[0.08] blur-[120px]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-7 border-y border-white/10 py-9 sm:flex-row sm:items-center sm:justify-between md:py-10"
          >
            <h2 className="font-['Bebas_Neue'] text-5xl leading-none tracking-wider text-white md:text-6xl">
              Contact <span className="text-red-600">Us</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-12 border border-red-600 bg-red-600 px-8 font-['Oswald'] text-sm uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-red-700"
            >
              Book Your First Class
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
