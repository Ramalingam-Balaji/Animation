import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Eyebrow from '../components/Eyebrow.jsx';
import Feature from '../components/Feature.jsx';

const easeOutCubic = [0.25, 0.1, 0.25, 1];

// Parent orchestrates staggered children
const containerVariants = (stagger = 0.15) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
  // Reverse stagger on exit so the first item leaves first
  exit: { transition: { staggerChildren: stagger, staggerDirection: -1 } },
});

// IMAGE BLOCK: enter from LEFT, exit to RIGHT (opposite)
const imageItemVariants = {
  hidden: { x: -120, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: easeOutCubic },
  },
  exit: {
    x: 120,
    opacity: 0,
    transition: { duration: 0.6, ease: easeOutCubic },
  },
};

// TEXT BLOCK: enter from RIGHT, exit to LEFT (opposite)
const textItemVariants = {
  hidden: { x: 120, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: easeOutCubic },
  },
  exit: {
    x: -120,
    opacity: 0,
    transition: { duration: 0.6, ease: easeOutCubic },
  },
};

export default function AboutSection() {
  const ref = useRef(null);
  // Trigger when ~30% of the section is visible; toggles back when it leaves
  const inView = useInView(ref, {
    amount: 0.3,
    margin: '-60px 0px -60px 0px',
  });

  return (
    <section
      id="about-section"
      ref={ref}
      className="scroll-mt-24 bg-[#eff4ff] py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* IMAGES — enter from LEFT, exit to RIGHT */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          variants={containerVariants(0.15)}
          initial="hidden"
          animate={inView ? 'visible' : 'exit'}
        >
          <motion.img
            className="h-64 w-full rounded-2xl object-cover shadow-lg sm:h-72"
            alt="Athletes enjoying high protein nutrition"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh-vhmJcMAk-34orSoVtC1RcyBd6hyWamI7X3VpWbja8uwGrGGpoqgJrWaZm4QvSMKHvXorrUmtF3MYFwjg12r-MMEC3gV2spvSe02_yfrCsMEhMZXkJfL579iCrg_09GW8URROXoO0zm14Mx4WiUnSZcx5ayJSyC7MqUUFNy6gFu6LiP48AAeYpawc35k-Kj8np8a4R_Mjb0S_k-D2b_nhiyT7UnJN45BT2kTyt9vrOCyniVqxki-VQ"
            variants={imageItemVariants}
          />
          <motion.img
            className="mt-8 h-64 w-full rounded-2xl object-cover shadow-lg sm:h-72"
            alt="Chef plating a high protein culinary dish"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfmreIVILtKTwPPtSJmoj689u8sF30pDFbtpfjWQv3cPNJc-IB9h-d0Ezy0ccwiBOg-yxZAmalVu0_gjHZvfea5hrFCs725z4qf1BTpYTFxWyBcSG8BEk-lk0GMo_sOgdTpSjXfTa0AT_lW9wo0qwvP8x1WpWi8bDPccsqJcp9JD-u9lNhNDzUAj1dHnfN8kMKq3buag6laeplLZbBu_bfPXkhSoIY3ewbVwtmMur5TPNW2dtjmjf60A"
            variants={imageItemVariants}
          />
        </motion.div>

        {/* TEXT — enter from RIGHT, exit to LEFT */}
        <motion.div
          className="space-y-6"
          variants={containerVariants(0.12)}
          initial="hidden"
          animate={inView ? 'visible' : 'exit'}
        >
          <motion.div variants={textItemVariants}>
            <Eyebrow>Our Mission</Eyebrow>
          </motion.div>
          <motion.h2 className="section-title" variants={textItemVariants}>
            Fueled by Purpose. Built for Results.
          </motion.h2>
          <motion.p
            className="text-base leading-7 text-[#5c403c]"
            variants={textItemVariants}
          >
            At Eat Protein, we believe that eating healthy shouldn't feel like a
            chore. Our mission is to bridge the gap between peak physical
            performance and incredible culinary flavor. Every meal, shake, and
            snack is engineered by professional chefs and sports dietitians to
            ensure your body gets the exact building blocks it needs to thrive.
          </motion.p>
          <motion.div
            className="grid grid-cols-2 gap-5 pt-3"
            variants={textItemVariants}
          >
            <Feature icon="restaurant" title="Chef Crafted">
              Gourmet flavors with zero artificial additives.
            </Feature>
            <Feature icon="eco" title="Clean Sourcing">
              Sustainably raised proteins and organic greens.
            </Feature>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}