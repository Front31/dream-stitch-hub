import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import rifaLogo from '@/assets/rifa-logo.png';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const logoY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center">

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}>

        <div className="absolute top-20 left-[10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          style={{ y: logoY, scale: logoScale }}
          className="mb-8 md:mb-12">

          <motion.img
            src={rifaLogo}
            alt="RiFa Cards"
            className="h-32 md:h-48 lg:h-56 w-auto mx-auto drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)'
            }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }} />


          










        </motion.div>

        <motion.div
          style={{ opacity: textOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}>

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}>

            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">
              Premium Pokémon TCG Produkte
            </span>
          </motion.div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="block">Deine Sammlung.</span>
            <span className="block">
              <span className="text-gradient-primary">Sealed.</span>{' '}
              <span className="text-gradient-accent">Premium.</span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Entdecke exklusive Booster Displays, Elite Trainer Boxen und Special Collections.
            Jedes Produkt sealed und mit Sorgfalt kuratiert.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/collection">
              <motion.button
                className="btn-hero group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>

                <span className="flex items-center gap-2">
                  Zur Sammlung
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
            </Link>

            <motion.a
              href="#featured"
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>

              Neue Drops entdecken
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}>

          










        </motion.div>
      </div>
    </section>);

};

export default HeroSection;