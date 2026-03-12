import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Play, Image as ImageIcon, Video } from "lucide-react";
import { useState } from "react";

export function Media() {
  const [activeTab, setActiveTab] = useState<"all" | "photos" | "videos">("all");

  const mediaItems = [
    {
      type: "video",
      title: "Spring Showcase 2026",
      thumbnail: "https://images.unsplash.com/photo-1758670332384-5b9078f5f62b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHBlcmZvcm1hbmNlJTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzczMzQyODk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Performance",
    },
    {
      type: "photo",
      title: "Advanced Hip-Hop Class",
      thumbnail: "https://images.unsplash.com/photo-1696627645060-2fccaf4b0b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBkYW5jZSUyMGNsYXNzJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzczMzQyNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Class Footage",
    },
    {
      type: "video",
      title: "Choreography Session",
      thumbnail: "https://images.unsplash.com/photo-1767866388178-bfbf5727aefe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHN0dWRpbyUyMGNob3Jlb2dyYXBoeSUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc3MzM0Mjc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Behind the Scenes",
    },
    {
      type: "photo",
      title: "Contemporary Workshop",
      thumbnail: "https://images.unsplash.com/photo-1686172164593-626f19be951c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBkYW5jZSUyMHJlaGVhcnNhbHxlbnwxfHx8fDE3NzMzNDI3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Workshops",
    },
    {
      type: "photo",
      title: "Studio Practice",
      thumbnail: "https://images.unsplash.com/photo-1683974608358-6606fd6d5000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHN0dWRpbyUyMG1pcnJvciUyMHByYWN0aWNlfGVufDF8fHx8MTc3MzM0Mjc4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Class Footage",
    },
    {
      type: "video",
      title: "Breaking Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1588671815815-b0cd3b2a9189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2RhbmNlJTIwcGVyZm9ybWFuY2UlMjB1cmJhbnxlbnwxfHx8fDE3NzMzNDI4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Class Footage",
    },
    {
      type: "photo",
      title: "Group Rehearsal",
      thumbnail: "https://images.unsplash.com/photo-1758670334659-5a58d87fb8d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMGdyb3VwJTIwcmVoZWFyc2FsJTIwc3R1ZGlvfGVufDF8fHx8MTc3MzM0Mjg5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Behind the Scenes",
    },
    {
      type: "photo",
      title: "Ballet Training",
      thumbnail: "https://images.unsplash.com/photo-1758670331604-16eeb6adb98d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxsZXQlMjBkYW5jZXJzJTIwcHJhY3RpY2V8ZW58MXx8fHwxNzczMjY0ODUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Class Footage",
    },
    {
      type: "video",
      title: "Urban Dance Performance",
      thumbnail: "https://images.unsplash.com/photo-1770196476437-ab1f9517f0bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBkYW5jZSUyMHVyYmFuJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzczMzQyNzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Performance",
    },
  ];

  const filteredMedia =
    activeTab === "all"
      ? mediaItems
      : mediaItems.filter((item) => item.type === (activeTab === "photos" ? "photo" : "video"));

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/30 to-black" />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1758670332384-5b9078f5f62b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHBlcmZvcm1hbmNlJTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzczMzQyODk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
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
              <span className="text-white">Media</span>
              <br />
              <span className="text-red-600">Gallery</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-1 w-48 bg-red-600 mx-auto mb-8"
            />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Explore our collection of performances, class footage, and behind-the-scenes moments 
              that showcase the energy and artistry of Take 2 Dance Studio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 px-6 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center gap-6"
          >
            {[
              { id: "all", label: "All Media", icon: ImageIcon },
              { id: "photos", label: "Photos", icon: ImageIcon },
              { id: "videos", label: "Videos", icon: Video },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-8 py-3 font-['Oswald'] text-lg tracking-wider uppercase transition-colors duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredMedia.map((item, index) => (
              <motion.div
                layout
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden bg-white/5">
                  <div className="aspect-[4/3] relative">
                    <ImageWithFallback
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Red accent bar */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      className="absolute top-0 left-0 right-0 h-1 bg-red-600 origin-left"
                    />

                    {/* Play button for videos */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors duration-300"
                        >
                          <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        </motion.div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        {item.type === "video" ? (
                          <Video className="w-4 h-4 text-red-600" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-red-600 text-sm font-['Oswald'] uppercase tracking-wide">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-['Oswald'] text-xl text-white tracking-wide">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-red-950/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Videos" },
              { number: "2K+", label: "Photos" },
              { number: "50+", label: "Performances" },
              { number: "100K+", label: "Views" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="font-['Bebas_Neue'] text-6xl text-red-600 mb-2">
                  {stat.number}
                </div>
                <div className="font-['Oswald'] text-white/70 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Bebas_Neue'] text-6xl md:text-7xl tracking-wider mb-8 text-white">
              Be Part of the Story
            </h2>
            <p className="text-xl text-white/80 mb-12">
              Join our classes and see yourself featured in our next showcase.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-12 py-5 font-['Oswald'] text-xl tracking-wider uppercase hover:bg-red-700 transition-colors duration-300"
            >
              Enroll Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
