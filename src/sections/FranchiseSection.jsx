import Eyebrow from '../components/Eyebrow.jsx';
import Field, { fieldStyle } from '../components/Field.jsx';

export default function FranchiseSection({ showToast }) {
  function submit(event) {
    event.preventDefault();
    showToast('Thank you for your franchise inquiry! Our team will contact you shortly. 🚀');
    event.currentTarget.reset();
  }

  return <section id="franchise-section" className="scroll-mt-24 bg-[#eff4ff] py-20 sm:py-24">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
      <div className="space-y-6">
        <Eyebrow>Business Opportunity</Eyebrow>
        <h2 className="section-title">Partner With Eat Protein</h2>
        <p className="text-base leading-7 text-[#5c403c]">Are you an entrepreneur passionate about fitness and healthy living? Bring the ultimate high-protein cafe and retail concept to your city. We provide comprehensive operational support, supply chain excellence, and a proven high-growth business model.</p>
        <ul className="space-y-4 text-sm font-medium text-[#121c2a]">
          <li>✓ &nbsp; Proven high-margin retail model</li>
          <li>✓ &nbsp; Complete staff training and marketing toolkit</li>
          <li>✓ &nbsp; Exclusive regional territory rights</li>
        </ul>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-10">
        <h3 className="mb-6 text-xl font-semibold text-[#121c2a]">Franchise Partnership Inquiry</h3>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" placeholder="John Doe" required />
            <Field label="Email Address" placeholder="john@example.com" type="email" required />
          </div>
          <Field label="Target City / Region" placeholder="New York, NY" required />
          <label className="block text-xs font-semibold text-[#121c2a]">Estimated Investment Capital
            <select className={fieldStyle}>
              <option>$100k - $250k</option>
              <option>$250k - $500k</option>
              <option>$500k+</option>
            </select>
          </label>
          <button type="submit" className="mt-2 w-full rounded-xl bg-[#b70011] py-4 font-bold text-white shadow-md transition hover:bg-[#dc2626]">Submit Application</button>
        </form>
      </div>
    </div>
  </section>;
}
