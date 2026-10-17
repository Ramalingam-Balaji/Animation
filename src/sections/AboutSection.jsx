import Eyebrow from '../components/Eyebrow.jsx';
import Feature from '../components/Feature.jsx';

export default function AboutSection() {
  return <section id="about-section" className="scroll-mt-24 bg-[#eff4ff] py-20 sm:py-24">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
      <div className="grid grid-cols-2 gap-4">
        <img className="h-64 w-full rounded-2xl object-cover shadow-lg sm:h-72" alt="Athletes enjoying high protein nutrition" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh-vhmJcMAk-34orSoVtC1RcyBd6hyWamI7X3VpWbja8uwGrGGpoqgJrWaZm4QvSMKHvXorrUmtF3MYFwjg12r-MMEC3gV2spvSe02_yfrCsMEhMZXkJfL579iCrg_09GW8URROXoO0zm14Mx4WiUnSZcx5ayJSyC7MqUUFNy6gFu6LiP48AAeYpawc35k-Kj8np8a4R_Mjb0S_k-D2b_nhiyT7UnJN45BT2kTyt9vrOCyniVqxki-VQ" />
        <img className="mt-8 h-64 w-full rounded-2xl object-cover shadow-lg sm:h-72" alt="Chef plating a high protein culinary dish" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfmreIVILtKTwPPtSJmoj689u8sF30pDFbtpfjWQv3cPNJc-IB9h-d0Ezy0ccwiBOg-yxZAmalVu0_gjHZvfea5hrFCs725z4qf1BTpYTFxWyBcSG8BEk-lk0GMo_sOgdTpSjXfTa0AT_lW9wo0qwvP8x1WpWi8bDPccsqJcp9JD-u9lNhNDzUAj1dHnfN8kMKq3buag6laeplLZbBu_bfPXkhSoIY3ewbVwtmMur5TPNW2dtjmjf60A" />
      </div>
      <div className="space-y-6">
        <Eyebrow>Our Mission</Eyebrow>
        <h2 className="section-title">Fueled by Purpose. Built for Results.</h2>
        <p className="text-base leading-7 text-[#5c403c]">At Eat Protein, we believe that eating healthy shouldn’t feel like a chore. Our mission is to bridge the gap between peak physical performance and incredible culinary flavor. Every meal, shake, and snack is engineered by professional chefs and sports dietitians to ensure your body gets the exact building blocks it needs to thrive.</p>
        <div className="grid grid-cols-2 gap-5 pt-3">
          <Feature icon="restaurant" title="Chef Crafted">Gourmet flavors with zero artificial additives.</Feature>
          <Feature icon="eco" title="Clean Sourcing">Sustainably raised proteins and organic greens.</Feature>
        </div>
      </div>
    </div>
  </section>;
}
