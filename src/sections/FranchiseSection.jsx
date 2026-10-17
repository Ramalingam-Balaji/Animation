import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Eyebrow from '../components/Eyebrow.jsx';
import Field, { fieldStyle } from '../components/Field.jsx';

const easeOutCubic = [0.25, 0.1, 0.25, 1];

// Parent orchestrates staggered children
const containerVariants = (stagger = 0.15) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
  exit: { transition: { staggerChildren: stagger, staggerDirection: -1 } },
});

// LEFT BLOCK (info): enter from LEFT, exit to RIGHT
const leftItemVariants = {
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

// RIGHT BLOCK (form): enter from RIGHT, exit to LEFT
const rightItemVariants = {
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

export default function FranchiseSection({ showToast }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.3,
    margin: '-60px 0px -60px 0px',
  });

  function submit(event) {
    event.preventDefault();
    showToast('Thank you for your franchise inquiry! Our team will contact you shortly. 🚀');
    event.currentTarget.reset();
  }

  return (
    <section
      id="franchise-section"
      ref={ref}
      className="scroll-mt-24 bg-[#eff4ff] py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* LEFT — info: enter from LEFT, exit to RIGHT */}
        <motion.div
          className="space-y-6"
          variants={containerVariants(0.12)}
          initial="hidden"
          animate={inView ? 'visible' : 'exit'}
        >
          <motion.div variants={leftItemVariants}>
            <Eyebrow>Business Opportunity</Eyebrow>
          </motion.div>
          <motion.h2 className="section-title" variants={leftItemVariants}>
            Partner With Eat Protein
          </motion.h2>
          <motion.p
            className="text-base leading-7 text-[#5c403c]"
            variants={leftItemVariants}
          >
            Are you an entrepreneur passionate about fitness and healthy living?
            Bring the ultimate high-protein cafe and retail concept to your city.
            We provide comprehensive operational support, supply chain excellence,
            and a proven high-growth business model.
          </motion.p>
          <motion.ul
            className="space-y-4 text-sm font-medium text-[#121c2a]"
            variants={leftItemVariants}
          >
            <li>✓ &nbsp; Proven high-margin retail model</li>
            <li>✓ &nbsp; Complete staff training and marketing toolkit</li>
            <li>✓ &nbsp; Exclusive regional territory rights</li>
          </motion.ul>
        </motion.div>

        {/* RIGHT — form card: enter from RIGHT, exit to LEFT */}
        <motion.div
          className="rounded-3xl bg-white p-6 shadow-xl sm:p-10"
          variants={rightItemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'exit'}
        >
          <h3 className="mb-6 text-xl font-semibold text-[#121c2a]">
            Franchise Partnership Inquiry
          </h3>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" placeholder="John Doe" required />
              <Field label="Email Address" placeholder="john@example.com" type="email" required />
            </div>
            <Field label="Target City / Region" placeholder="New York, NY" required />
            <label className="block text-xs font-semibold text-[#121c2a]">
              Estimated Investment Capital
              <select className={fieldStyle}>
                <option>$100k - $250k</option>
                <option>$250k - $500k</option>
                <option>$500k+</option>
              </select>
            </label>
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#b70011] py-4 font-bold text-white shadow-md transition hover:bg-[#dc2626]"
            >
              Submit Application
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}