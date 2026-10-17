import { useState } from 'react';
import Eyebrow from '../components/Eyebrow.jsx';
import Field, { fieldStyle } from '../components/Field.jsx';

export default function BMISection({ showToast }) {
  const [result, setResult] = useState(null);

  function calculate(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const height = Number(data.get('height')) / 100;
    const weight = Number(data.get('weight'));
    const age = Number(data.get('age'));
    const activity = Number(data.get('activity'));

    if (!height || !weight || !age || height <= 0 || weight <= 0) {
      showToast('Please enter valid height, weight, and age.');
      return;
    }

    const bmi = (weight / height ** 2).toFixed(1);
    const protein = Math.round(weight * 2 * activity);
    setResult({ bmi, protein });
    showToast(`BMI: ${bmi} | Recommended Goal: ${protein}g protein/day 🎯`);
  }

  return <section id="bmi-section" className="bg-white py-20 sm:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="rounded-3xl bg-[#dee9fc] p-6 shadow-2xl shadow-[#b70011]/5 sm:p-10 lg:p-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <Eyebrow color="green">Interactive Tool</Eyebrow>
            <h2 className="section-title">Calculate Your BMI &amp; Protein Target</h2>
            <p className="text-base leading-7 text-[#5c403c]">Enter your measurements below to instantly calculate your Body Mass Index (BMI) and receive customized daily macronutrient recommendations tailored by our certified sports nutritionists.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#5c403c]">
              <span>✓ &nbsp; Instant Results</span>
              <span>✓ &nbsp; Personalized Plan</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
            <form onSubmit={calculate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Height (cm)" name="height" placeholder="175" type="number" min="1" required />
                <Field label="Weight (kg)" name="weight" placeholder="75" type="number" min="1" required />
              </div>
              <Field label="Age" name="age" placeholder="28" type="number" min="1" required />
              <label className="block text-xs font-semibold text-[#121c2a]">Activity Level
                <select name="activity" className={fieldStyle} defaultValue="1.55">
                  <option value="1.2">Sedentary (little or no exercise)</option>
                  <option value="1.375">Lightly active (light exercise 1-3 days/week)</option>
                  <option value="1.55">Moderately active (moderate exercise 3-5 days/week)</option>
                  <option value="1.725">Very active (hard exercise 6-7 days/week)</option>
                </select>
              </label>
              <button type="submit" className="mt-2 w-full rounded-xl bg-[#006e2d] py-4 font-bold text-white shadow-md transition hover:bg-[#005320]">Calculate &amp; Get Recommendations</button>
            </form>
            {result && <div className="mt-6 rounded-xl bg-[#eff4ff] p-6" aria-live="polite">
              <h3 className="text-lg font-semibold text-[#121c2a]">Your Personal Metrics</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div><p className="text-xs text-[#5c403c]">BMI Score</p><p className="text-xl font-bold text-[#b70011]">{result.bmi}</p></div>
                <div><p className="text-xs text-[#5c403c]">Daily Protein Goal</p><p className="text-xl font-bold text-[#006e2d]">{result.protein}g / day</p></div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  </section>;
}
