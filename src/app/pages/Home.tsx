import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Play, Users, Award, Calendar } from "lucide-react";

export function Home() {
  const features = [
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from the best in the industry",
    },
    {
      icon: Award,
      title: "Award-Winning",
      description: "Recognition for excellence in dance education",
    },
    {
      icon: Calendar,
      title: "Flexible Schedules",
      description: "Classes that fit your lifestyle",
    },
  ];

  const videos = [
    {
      title: "Choreography Montage",
      thumbnail: "https://images.unsplash.com/photo-1767866388178-bfbf5727aefe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHN0dWRpbyUyMGNob3Jlb2dyYXBoeSUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc3MzM0Mjc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Teaching: Drills & Technique",
      thumbnail: "https://images.unsplash.com/photo-1696627645060-2fccaf4b0b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBkYW5jZSUyMGNsYXNzJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzczMzQyNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
          >
            <h1 className="font-['Bebas_Neue'] text-8xl md:text-9xl tracking-wider mb-4">
              <span className="text-white">TAKE</span>
              <span className="text-red-600"> 2</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="h-1 w-64 bg-red-600 mx-auto mb-8"
            />
            <p className="font-['Oswald'] text-2xl text-white/90 tracking-widest uppercase">
              Dance Studio
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 text-xl text-white/70 max-w-2xl mx-auto"
          >
            Where passion meets precision. Elevate your dance journey with world-class instruction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-12"
          >
            <button className="bg-red-600 text-white px-12 py-4 font-['Oswald'] text-lg tracking-wider uppercase hover:bg-red-700 transition-all duration-300 hover:scale-105 active:scale-95">
              Start Your Journey
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
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
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
            <h2 className="font-['Bebas_Neue'] text-7xl tracking-wider mb-6">
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
              At Take 2 Dance Studio, we believe that dance is more than movement—it's a language of expression, 
              a celebration of culture, and a path to personal growth. Founded with a passion for excellence, 
              our studio has become a home for dancers of all levels to explore, create, and push their boundaries.
            </p>
            <p className="text-white/90 text-lg leading-relaxed">
              Our mission is to provide world-class dance education in a supportive, inclusive environment. 
              With expert instructors, cutting-edge facilities, and a commitment to artistic innovation, 
              we empower every student to discover their unique voice through the art of dance.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 group hover:border-red-600/50 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-['Oswald'] text-2xl text-white mb-2 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
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
            <h2 className="font-['Bebas_Neue'] text-7xl tracking-wider mb-6">
              <span className="text-white">See Us</span>{" "}
              <span className="text-red-600">In Action</span>
            </h2>
            <div className="h-1 w-32 bg-red-600 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer relative overflow-hidden"
              >
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors duration-300"
                    >
                      <Play className="w-10 h-10 text-white ml-1" fill="white" />
                    </motion.div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="font-['Oswald'] text-2xl text-white tracking-wide">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="font-['Bebas_Neue'] text-6xl md:text-7xl tracking-wider mb-8 text-white">
              Ready to Move?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Join our community of passionate dancers and experience the Take 2 difference.
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
