import { motion } from "motion/react";
import { Link } from "react-router";

export function Home() {
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
Where Dance Meets the Mind. A Personalized Intensive Designed to Move You Forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-8"
          >
            <Link
              to="/intensive-packages"
              className="inline-block h-12 border border-red-600 bg-red-600 px-8 pt-3 font-['Oswald'] text-sm uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-red-700"
            >
              Build Your Experience
            </Link>
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
            <div className="mb-8">
              <h3 className="mb-3 font-['Oswald'] text-xl uppercase tracking-[0.1em] text-white">
                Who We Are
              </h3>
              <p className="max-w-4xl text-base leading-8 text-white/75 md:text-lg">
                A New York based dance training program built by professional
                dancers and choreographers who believe training should extend
                beyond the studio. Through our in-house intensive format, we
                bring high level training and artistry directly to your
                dancers. Rather than following a one size fits all curriculum,
                our intensives are designed to be customizable to the needs of
                each studio and dancer.
              </p>
            </div>

            <div className="mb-8 border-t border-white/10 pt-8">
              <h3 className="mb-3 font-['Oswald'] text-xl uppercase tracking-[0.1em] text-white">
                Why We&apos;re Different
              </h3>
              <p className="max-w-4xl text-base leading-8 text-white/75 md:text-lg">
                Dance training is more than the physical act of learning
                movement. The way a dancer thinks, processes challenges,
                handles pressure, and responds to failure directly impacts how
                they perform and grow. Take 2 places mental health and the
                psychology of dance at the center of our training philosophy.
                We challenge dancers to step outside of their comfort zones and
                give them the tools to navigate that discomfort in a healthy
                manner. Led by active industry professionals, Take 2 combines
                real world experience with intentional education to equip the
                next generation. Our goal isn&apos;t to simply create better
                dancers. It&apos;s to help develop resilient and adaptable
                artists who can carry what they learn into every area of their
                lives.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="mb-3 font-['Oswald'] text-xl uppercase tracking-[0.1em] text-white">
                What We Offer
              </h3>
              <p className="mb-4 max-w-4xl text-base leading-8 text-white/75 md:text-lg">
                We bring the intensive to you.
              </p>
              <p className="max-w-4xl text-base leading-8 text-white/75 md:text-lg">
                Take 2 travels directly to your studio or chosen location with
                a team of professionally vetted dancers, choreographers, and
                educators who are actively training and working within the
                dance industry. We provide the infrastructure needed to create
                an immersive training experience, including professional media
                and lighting equipment to enhance and capture every moment.
                From a one day workshop to a fully customized multi-day
                experience, you choose what your dancers need. You build the
                intensive. We bring it to life.
              </p>
            </div>
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
            <div className="flex flex-col gap-2 font-['Oswald'] text-sm uppercase tracking-[0.1em] text-white/80 sm:items-end">
              <a
                href="mailto:connect@take2company.com"
                className="transition-colors duration-300 hover:text-red-500"
              >
                connect@take2company.com
              </a>
              <p>(631)-702-5234&nbsp; |&nbsp; (516)-273-2685</p>
              <a
                href="https://instagram.com/take2company"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-300 hover:text-red-500"
              >
                @take2company
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
