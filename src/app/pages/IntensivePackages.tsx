import { motion } from "motion/react";
import { Check, Clock, Users, Calendar, Trophy, Star } from "lucide-react";

export function IntensivePackages() {
  const packages = [
    {
      name: "Foundation",
      duration: "4 Weeks",
      price: "$299",
      description: "Perfect for beginners looking to build strong dance fundamentals",
      features: [
        "8 group classes per week",
        "Access to all beginner workshops",
        "1-on-1 technique assessment",
        "Digital learning resources",
        "Community access",
      ],
      highlight: false,
    },
    {
      name: "Professional",
      duration: "8 Weeks",
      price: "$549",
      description: "Intensive training for serious dancers ready to level up",
      features: [
        "12 group classes per week",
        "All workshops included",
        "2 private coaching sessions",
        "Video feedback & analysis",
        "Performance opportunity",
        "Nutrition & fitness guidance",
        "Alumni network access",
      ],
      highlight: true,
    },
    {
      name: "Elite",
      duration: "12 Weeks",
      price: "$899",
      description: "Comprehensive program for aspiring professional dancers",
      features: [
        "Unlimited group classes",
        "All masterclasses & workshops",
        "4 private coaching sessions",
        "Personalized training plan",
        "Choreography development",
        "Performance opportunities",
        "Professional headshots",
        "Industry connections",
        "Lifetime community access",
      ],
      highlight: false,
    },
  ];

  const intensiveFeatures = [
    {
      icon: Users,
      title: "Small Class Sizes",
      description: "Maximum 15 students per class for personalized attention",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Morning, afternoon, and evening sessions available",
    },
    {
      icon: Trophy,
      title: "Performance Ready",
      description: "Showcase opportunities at the end of each intensive",
    },
    {
      icon: Star,
      title: "Expert Mentorship",
      description: "Direct access to our professional teaching staff",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-black to-black" />
          <motion.div
            animate={{
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1767866388178-bfbf5727aefe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHN0dWRpbyUyMGNob3Jlb2dyYXBoeSUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc3MzM0Mjc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          
          {/* Diagonal red bars */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-1/4 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent rotate-12 transform scale-150"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-['Bebas_Neue'] text-8xl md:text-9xl tracking-wider mb-6">
              <span className="text-white">Intensive</span>
              <br />
              <span className="text-red-600">Packages</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-1 w-48 bg-red-600 mx-auto mb-8"
            />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Accelerate your dance journey with our structured intensive programs designed 
              to transform your skills and confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-gradient-to-b from-black to-red-950/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {intensiveFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-red-600/10 border border-red-600/30 flex items-center justify-center mx-auto mb-4"
                >
                  <feature.icon className="w-8 h-8 text-red-600" />
                </motion.div>
                <h3 className="font-['Oswald'] text-xl text-white mb-2 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Bebas_Neue'] text-6xl tracking-wider mb-4">
              <span className="text-white">Choose Your</span>{" "}
              <span className="text-red-600">Journey</span>
            </h2>
            <div className="h-1 w-32 bg-red-600 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className={`relative ${
                  pkg.highlight ? "md:-mt-8 md:mb-0" : ""
                }`}
              >
                {/* Highlight badge */}
                {pkg.highlight && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-2 font-['Oswald'] text-sm tracking-wider uppercase z-10"
                  >
                    Most Popular
                  </motion.div>
                )}

                <div
                  className={`h-full bg-white/5 backdrop-blur-sm border transition-all duration-300 ${
                    pkg.highlight
                      ? "border-red-600 shadow-lg shadow-red-600/20"
                      : "border-white/10 hover:border-red-600/50"
                  }`}
                >
                  {/* Header */}
                  <div className="p-8 border-b border-white/10">
                    <h3 className="font-['Bebas_Neue'] text-4xl text-white tracking-wider mb-2">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-2 text-red-600 mb-4">
                      <Calendar className="w-5 h-5" />
                      <span className="font-['Oswald'] tracking-wide">
                        {pkg.duration}
                      </span>
                    </div>
                    <div className="mb-4">
                      <span className="font-['Bebas_Neue'] text-6xl text-white">
                        {pkg.price}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm">{pkg.description}</p>
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <ul className="space-y-4">
                      {pkg.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.3 + featureIndex * 0.05,
                            duration: 0.4,
                          }}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-white/80">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="p-8 pt-0">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 font-['Oswald'] text-lg tracking-wider uppercase transition-all duration-300 ${
                        pkg.highlight
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-white/5 text-white border border-white/20 hover:bg-red-600 hover:border-red-600"
                      }`}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-red-950/10 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Bebas_Neue'] text-6xl tracking-wider mb-4">
              <span className="text-white">Success</span>{" "}
              <span className="text-red-600">Stories</span>
            </h2>
            <div className="h-1 w-32 bg-red-600 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "The Professional intensive completely transformed my approach to dance. The personalized feedback and performance opportunities gave me the confidence to pursue dance professionally.",
                author: "Alex Rivera",
                program: "Professional Intensive - Winter 2026",
              },
              {
                quote:
                  "I came in as a complete beginner and the Foundation program gave me everything I needed to start my dance journey. The instructors are incredibly supportive and skilled.",
                author: "Sarah Chen",
                program: "Foundation Intensive - Fall 2025",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-red-600/30 transition-colors duration-300"
              >
                <div className="mb-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-red-600"
                        fill="#dc2626"
                      />
                    ))}
                  </div>
                  <p className="text-white/90 text-lg italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div>
                  <p className="font-['Oswald'] text-white text-lg tracking-wide">
                    {testimonial.author}
                  </p>
                  <p className="text-red-600 text-sm font-['Oswald'] tracking-wide uppercase">
                    {testimonial.program}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Bebas_Neue'] text-6xl tracking-wider mb-4 text-white">
              Questions?
            </h2>
            <div className="h-1 w-32 bg-red-600 mx-auto" />
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "What if I miss a class?",
                answer:
                  "We understand life happens! Intensive participants can make up missed classes within the program period. Just coordinate with your instructor.",
              },
              {
                question: "Do I need prior dance experience?",
                answer:
                  "The Foundation intensive is designed for beginners. Professional and Elite intensives require an assessment or prior dance experience.",
              },
              {
                question: "Can I upgrade my package?",
                answer:
                  "Absolutely! You can upgrade to a higher tier at any time during your intensive and we'll credit your initial payment.",
              },
              {
                question: "What should I bring to class?",
                answer:
                  "Comfortable athletic wear, dance shoes (or clean sneakers), water bottle, and a positive attitude! We provide towels and storage lockers.",
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:border-red-600/30 transition-colors duration-300"
              >
                <h3 className="font-['Oswald'] text-xl text-white mb-3 tracking-wide">
                  {faq.question}
                </h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-t from-red-950/20 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-red-600 rounded-full blur-[150px]"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Bebas_Neue'] text-7xl tracking-wider mb-8 text-white">
              Start Your Intensive
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Limited spots available. Reserve your place in our next intensive program today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-16 py-6 font-['Oswald'] text-2xl tracking-wider uppercase hover:bg-red-700 transition-colors duration-300 border-2 border-red-600 hover:border-red-500"
            >
              Register Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
