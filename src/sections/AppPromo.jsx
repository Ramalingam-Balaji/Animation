import StoreButton from '../components/StoreButton.jsx';
import Eyebrow from '../components/Eyebrow.jsx';

export default function AppPromo({ showToast }) {
  return <section id="app-promo" className="bg-white py-20 sm:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="rounded-3xl bg-gradient-to-br from-[#dc2626] to-[#b70011] p-6 text-white shadow-2xl sm:p-10 lg:p-16">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <Eyebrow color="lime">Eat Protein App</Eyebrow>
            <h2 className="section-title text-white">Take Your Nutrition Everywhere You Go</h2>
            <p className="max-w-xl text-base leading-7 text-white/90">Download the Eat Protein mobile app to track your daily macros, earn loyalty rewards with every purchase, unlock exclusive discounts, and order ahead for lightning-fast pickup.</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <StoreButton icon="phone_iphone" label="Download on the" name="App Store" onClick={() => showToast('Eat Protein iOS App opening in App Store...')} />
              <StoreButton icon="shop" label="Get it on" name="Google Play" onClick={() => showToast('Eat Protein Android App opening in Google Play...')} />
            </div>
          </div>
          <div className="flex justify-center lg:col-span-5">
            <div className="h-[500px] w-72 rounded-[40px] border-4 border-white/20 bg-white p-4 shadow-2xl">
              <div className="flex h-full flex-col justify-between overflow-hidden rounded-[32px] bg-[#eff4ff] p-6">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#121c2a]">Eat Protein</span>
                    <span className="material-symbols-outlined text-[#b70011]">notifications</span>
                  </div>
                  <div className="mb-4 rounded-2xl bg-[#b70011]/10 p-4">
                    <p className="text-xs text-[#5c403c]">Today’s Protein Goal</p>
                    <p className="text-xl font-bold text-[#b70011]">145g / 160g</p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e6eeff]"><div className="h-full w-[90%] rounded-full bg-[#b70011]" /></div>
                  </div>
                  <p className="mb-2 text-sm font-semibold text-[#121c2a]">Quick Order</p>
                  <div className="mb-2 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#b70011]/10 font-bold text-[#b70011]">🥤</div>
                    <div><p className="text-sm font-medium text-[#121c2a]">Turbo Chocolate</p><p className="text-xs text-[#5c403c]">52g protein</p></div>
                  </div>
                </div>
                <button onClick={() => showToast('Loyalty Rewards: 450 Points Available!')} className="rounded-xl bg-[#b70011] py-3 text-sm font-bold text-white transition hover:bg-[#dc2626]">View Rewards (450 pts)</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
