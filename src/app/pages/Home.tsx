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
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-red-950/30" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1683974608358-6606fd6d5000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHN0dWRpbyUyMG1pcnJvciUyMHByYWN0aWNlfGVufDF8fHx8MTc3MzM0Mjc4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Animated Red Bars */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent origin-right"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-8"
          >
            <h1 className="font-['Bebas_Neue'] text-8xl md:text-9xl leading-none tracking-wider">
              <span className="text-white">TAKE</span>
              <span className="text-red-600"> 2</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="h-1 w-64 bg-red-600 mx-auto"
            />
            <p className="font-['Oswald'] text-2xl leading-none text-white/90 tracking-widest uppercase">
              The Company
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 text-xl leading-relaxed text-white/70 max-w-2xl mx-auto"
          >
Break the mold. Elevate your dance journey with technique and artistr
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-12"
          >
            <button className="bg-red-600 text-white px-12 py-4 font-['Oswald'] text-lg tracking-wider uppercase hover:bg-red-700 transition-all duration-300 hover:scale-105 active:scale-95">
              Build Your Journey
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 2, duration: 0.6 },
            y: { delay: 2.5, duration: 1.5, repeat: Infinity },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-red-600 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 -right-20 w-96 h-96 bg-red-600 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 -left-20 w-96 h-96 bg-red-600 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Bebas_Neue'] text-7xl leading-none tracking-wider mb-6">
              <span className="text-white">About</span>{" "}
              <span className="text-red-600">Us</span>
            </h2>
            <div className="h-1 w-32 bg-red-600 mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-12"
          >
            <p className="text-white/90 text-lg leading-relaxed mb-6">
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
            <p className="text-white/90 text-lg leading-relaxed">
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
      <section className="py-24 px-6 bg-gradient-to-b from-black to-red-950/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Bebas_Neue'] text-7xl leading-none tracking-wider mb-6">
              <span className="text-white">See Us</span>{" "}
              <span className="text-red-600">In Action</span>
            </h2>
            <div className="h-1 w-32 bg-red-600 mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {videos.map((video) => (
              <div
                key={video.title}
                className="group cursor-pointer relative overflow-hidden"
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
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                    <h3 className="font-['Oswald'] text-2xl text-white tracking-wide">
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
      <section className="py-24 px-6 bg-black relative overflow-hidden">
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
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[100px]"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Bebas_Neue'] text-6xl md:text-7xl leading-none tracking-wider mb-8 text-white">
              Contact Us
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Join our community of passionate dancers and experience the Take 2
              difference.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-12 py-5 font-['Oswald'] text-xl tracking-wider uppercase hover:bg-red-700 transition-colors duration-300 border-2 border-red-600 hover:border-red-500"
            >
              Book Your First Class
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
