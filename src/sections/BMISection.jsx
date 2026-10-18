import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Heart,
  Leaf,
  UserRound,
} from "lucide-react";

import {
  LuUserRound,
  LuBaby,
} from "react-icons/lu";

import { GiWeightLiftingUp } from "react-icons/gi";
import { MdPregnantWoman } from "react-icons/md";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import {
  FaChild,
  FaFemale,
} from "react-icons/fa";

import Eyebrow from "../components/Eyebrow.jsx";

const PROFILES = [
  "Adult",
  "Kid",
  "Pregnant Woman",
  "Feeding Mother",
  "Bodybuilder",
];

const PROFILE_ICONS = {
  Adult: LuUserRound,
  Kid: LuBaby,
  "Pregnant Woman": MdPregnantWoman,
  "Feeding Mother": FaPersonBreastfeeding,
  Bodybuilder: GiWeightLiftingUp,
};

const PROFILE_PROTEIN_FACTORS = {
  Adult: 0.8,
  Kid: 2,
  "Pregnant Woman": 1.5,
  "Feeding Mother": 1.5,
  Bodybuilder: 1.7,
};

// Gender icons — Boy uses FaChild, Girl uses FaFemale (react-icons/fa)
const GENDER_ICONS = {
  Boy: FaChild,
  Girl: FaFemale,
};

// Age ranges per profile
// Kids: 1 to 19, all others: 20 to 100
const getAgeRange = (selectedProfile) => {
  if (selectedProfile === "Kid") {
    return { min: 1, max: 19, defaultAge: 10 };
  }
  return { min: 20, max: 100, defaultAge: 25 };
};

const BENEFITS = [
  { Icon: UserRound, title: "Understand", subtitle: "Your Body" },
  { Icon: Leaf, title: "Know Protein", subtitle: "Requirement" },
  { Icon: BarChart3, title: "Get Your BMI", subtitle: "" },
  { Icon: Heart, title: "Make Better", subtitle: "Food Choices" },
];

const initialResult = {
  bmi: "--",
  protein: "--",
  status: "",
  calculated: false,
};

export default function BMISection({ showToast }) {
  const [profile, setProfile] = useState("Adult");
  const [age, setAge] = useState(25);
  const [heightUnit, setHeightUnit] = useState("cm");
  const [height, setHeight] = useState(170);
  const [weightUnit, setWeightUnit] = useState("kg");
  const [weight, setWeight] = useState(70);
  const [gender, setGender] = useState("Boy");
  const [result, setResult] = useState(initialResult);

  const notify = (message) => {
    if (typeof showToast === "function") {
      showToast(message);
    } else {
      window.alert(message);
    }
  };

  const invalidateResult = () => {
    setResult(initialResult);
  };

  const handleProfileChange = (nextProfile) => {
    setProfile(nextProfile);

    // Reset age to a valid value inside the new profile's age range
    const { defaultAge } = getAgeRange(nextProfile);
    setAge(defaultAge);

    invalidateResult();
  };

  const getHeightCm = () => {
    const value = Number(height);
    return heightUnit === "cm" ? value : value * 30.48;
  };

  const getWeightKg = () => {
    const value = Number(weight);
    return weightUnit === "kg" ? value : value * 0.45359237;
  };

  const validateForm = () => {
    const ageValue = Number(age);
    const heightValue = Number(height);
    const weightValue = Number(weight);

    const { min: ageMin, max: ageMax } = getAgeRange(profile);

    if (
      !Number.isFinite(ageValue) ||
      ageValue < ageMin ||
      ageValue > ageMax
    ) {
      notify(
        `For the ${profile} profile, age must be between ${ageMin} and ${ageMax} years.`
      );
      return false;
    }

    if (!Number.isFinite(heightValue) || heightValue <= 0) {
      notify("Please enter a valid height.");
      return false;
    }

    if (
      heightUnit === "cm" &&
      (heightValue < 50 || heightValue > 249)
    ) {
      notify("Height must be between 50 and 249 cm.");
      return false;
    }

    if (
      heightUnit === "ft" &&
      (heightValue < 2 || heightValue > 11.9)
    ) {
      notify("Height must be between 2 and 11.9 ft.");
      return false;
    }

    if (!Number.isFinite(weightValue) || weightValue <= 0) {
      notify("Please enter a valid weight.");
      return false;
    }

    if (
      weightUnit === "kg" &&
      (weightValue < 10 || weightValue > 209)
    ) {
      notify("Weight must be between 10 and 209 kg.");
      return false;
    }

    if (
      weightUnit === "lb" &&
      (weightValue < 20 || weightValue > 419)
    ) {
      notify("Weight must be between 20 and 419 lb.");
      return false;
    }

    return true;
  };

  const handleCalculate = () => {
    if (!validateForm()) return;

    const heightCm = getHeightCm();
    const weightKg = getWeightKg();

    if (
      !Number.isFinite(heightCm) ||
      !Number.isFinite(weightKg) ||
      heightCm <= 0 ||
      weightKg <= 0
    ) {
      notify("Please enter valid height and weight.");
      return;
    }

    // BMI = weight in kg / (height in metres)^2
    const heightM = heightCm / 100;
    const bmi = weightKg / heightM ** 2;

    let status = "";

    if (bmi < 18.5) {
      status = "Underweight";
    } else if (bmi < 25) {
      status = "Normal";
    } else if (bmi < 30) {
      status = "Overweight";
    } else {
      status = "High";
    }

    // Daily protein = weight in kg × profile protein factor
    const profileFactor = PROFILE_PROTEIN_FACTORS[profile] ?? 1;
    const protein = Math.max(1, Math.round(weightKg * profileFactor));

    setResult({
      bmi: bmi.toFixed(1),
      protein,
      status,
      calculated: true,
    });

    notify(
      `BMI: ${bmi.toFixed(1)} | Recommended Goal: ${protein}g protein/day 🎯`
    );
  };

  const handleHeightUnitChange = (nextUnit) => {
    if (nextUnit === heightUnit) return;

    const currentHeight = Number(height);

    if (Number.isFinite(currentHeight) && currentHeight > 0) {
      if (nextUnit === "ft") {
        setHeight(Number((currentHeight / 30.48).toFixed(1)));
      } else {
        setHeight(Math.round(currentHeight * 30.48));
      }
    }

    setHeightUnit(nextUnit);
    invalidateResult();
  };

  const handleWeightUnitChange = (nextUnit) => {
    if (nextUnit === weightUnit) return;

    const currentWeight = Number(weight);

    if (Number.isFinite(currentWeight) && currentWeight > 0) {
      if (nextUnit === "lb") {
        setWeight(Math.round(currentWeight / 0.45359237));
      } else {
        setWeight(Math.round(currentWeight * 0.45359237));
      }
    }

    setWeightUnit(nextUnit);
    invalidateResult();
  };

  const unitButtonClass = (selected) =>
    `flex-1 rounded-md py-1.5 text-xs font-bold transition ${
      selected
        ? "bg-white text-[#006e2d] shadow-sm"
        : "text-slate-500 hover:text-[#006e2d]"
    }`;

  // Build the age dropdown options dynamically based on the selected profile
  const { min: ageMin, max: ageMax } = getAgeRange(profile);
  const ageOptions = Array.from(
    { length: ageMax - ageMin + 1 },
    (_, index) => ageMin + index
  );

  return (
    <section
      id="bmi-section"
      className="scroll-mt-20 bg-white px-3 py-8 sm:px-5 sm:py-12 lg:py-16"
    >
      <div className="mx-auto w-full max-w-7xl rounded-2xl bg-gradient-to-r from-[#f0faea] to-[#edf9e9] p-4 shadow-lg shadow-green-900/5 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[45%_50%] lg:gap-7">
          {/* LEFT CONTENT */}
          <div className="min-w-0">
            <Eyebrow color="green">
              Personalized Nutrition Insights
            </Eyebrow>

            <h2 className="mt-4 text-[27px] font-black leading-[1.08] tracking-tight text-[#123b25] sm:text-[31px]">
              Know Your Protein Need
              <br />
              &amp; BMI in Seconds
            </h2>

            <p className="mt-3 max-w-[430px] text-[15px] leading-6 text-slate-600 sm:text-sm">
              Get personalized results based on your age, lifestyle
              and goals. One simple calculator for everyone.
            </p>

            <div className="mt-5 grid grid-cols-4 gap-1 sm:mt-6 sm:gap-2">
              {BENEFITS.map(({ Icon, title, subtitle }) => (
                <div key={title} className="min-w-0 text-center">
                  <div className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-white text-[#006e2d] shadow-sm sm:h-11 sm:w-11">
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                      className="sm:h-[21px] sm:w-[21px]"
                    />
                  </div>

                  <p className="mt-2 text-[10px] font-bold leading-3 text-slate-700 sm:text-xs">
                    {title}
                  </p>

                  {subtitle && (
                    <p className="text-[9px] font-bold leading-3 text-slate-600 sm:text-xs">
                      {subtitle}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CALCULATOR CARD */}
          <div className="mx-auto w-full max-w-[500px] min-w-0 rounded-2xl bg-white p-3 shadow-lg sm:p-4">
            {/* PROFILE TABS */}
            <div className="flex items-start justify-center gap-1.5 pb-3 sm:gap-3">
              {PROFILES.map((item) => {
                const Icon = PROFILE_ICONS[item];
                const selected = profile === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleProfileChange(item)}
                    aria-label={item}
                    aria-pressed={selected}
                    className="group flex min-w-0 flex-1 flex-col items-center gap-1.5"
                  >
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl border transition-all duration-200 sm:h-12 sm:w-12 ${
                        selected
                          ? "border-[#006e2d] bg-[#006e2d] text-white shadow-md"
                          : "border-slate-200 bg-white text-[#006e2d] hover:border-[#006e2d] hover:bg-green-50"
                      }`}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </span>

                    <span
                      className={`max-w-full text-center text-[9px] font-semibold leading-tight sm:text-[11px] ${
                        selected ? "text-[#123b25]" : "text-slate-600"
                      }`}
                    >
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* KID GENDER */}
            {profile === "Kid" && (
              <div className="mt-2">
                <p className="mb-2 text-sm font-bold text-slate-800">
                  Select Gender
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {["Boy", "Girl"].map((item) => {
                    const selected = gender === item;
                    const Icon = GENDER_ICONS[item];

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setGender(item);
                          invalidateResult();
                        }}
                        aria-pressed={selected}
                        className={`flex items-center justify-center gap-2 rounded-xl border p-3 transition ${
                          selected
                            ? "border-[#006e2d] bg-green-50 text-[#006e2d]"
                            : "border-slate-200 text-slate-600 hover:border-green-300"
                        }`}
                      >
                        <Icon size={19} strokeWidth={1.8} />
                        <span className="text-sm font-bold">{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AGE — dynamically limited based on selected profile */}
            <div className="mt-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
              <label className="block text-xs font-medium text-slate-500">
                 Age (YRS){/* — {ageMin} to {ageMax} */}

                <select
                  value={age}
                  onChange={(event) => {
                    setAge(Number(event.target.value));
                    invalidateResult();
                  }}
                  className="mt-1.5 h-10 w-full rounded-lg border-0 bg-slate-100 px-3 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-green-400"
                >
                  {ageOptions.map((value) => (
                    <option key={value} value={value}>
                      {value} years
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* HEIGHT, WEIGHT, BMI AND PROTEIN */}
            <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {/* HEIGHT */}
              <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm">
                <label className="text-xs font-semibold text-slate-600">
                  Height
                </label>

                <input
                  type="number"
                  min={heightUnit === "cm" ? 50 : 2}
                  max={heightUnit === "cm" ? 249 : 11.9}
                  step={heightUnit === "cm" ? 1 : 0.1}
                  value={height}
                  onChange={(event) => {
                    setHeight(event.target.value);
                    invalidateResult();
                  }}
                  aria-label={`Height in ${heightUnit}`}
                  className="mt-2 h-10 w-full min-w-0 rounded-lg bg-slate-100 px-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-400"
                />

                <div className="mt-2 flex items-center rounded-lg bg-slate-100 p-0.5">
                  <button
                    type="button"
                    onClick={() => handleHeightUnitChange("cm")}
                    className={unitButtonClass(heightUnit === "cm")}
                  >
                    CM
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHeightUnitChange("ft")}
                    className={unitButtonClass(heightUnit === "ft")}
                  >
                    FT
                  </button>
                </div>
              </div>

              {/* WEIGHT */}
              <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm">
                <label className="text-xs font-semibold text-slate-600">
                  Weight
                </label>

                <input
                  type="number"
                  min={weightUnit === "kg" ? 10 : 20}
                  max={weightUnit === "kg" ? 209 : 419}
                  step="1"
                  value={weight}
                  onChange={(event) => {
                    setWeight(event.target.value);
                    invalidateResult();
                  }}
                  aria-label={`Weight in ${weightUnit}`}
                  className="mt-2 h-10 w-full min-w-0 rounded-lg bg-slate-100 px-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-400"
                />

                <div className="mt-2 flex items-center rounded-lg bg-slate-100 p-0.5">
                  <button
                    type="button"
                    onClick={() => handleWeightUnitChange("kg")}
                    className={unitButtonClass(weightUnit === "kg")}
                  >
                    KG
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWeightUnitChange("lb")}
                    className={unitButtonClass(weightUnit === "lb")}
                  >
                    LB
                  </button>
                </div>
              </div>

              {/* BMI RESULT */}
              <div className="flex min-h-[130px] min-w-0 flex-col items-center justify-center rounded-xl border border-slate-100 bg-white p-2 text-center shadow-sm">
                <BarChart3 size={20} className="text-blue-500" />

                <p className="mt-2 text-xs font-semibold text-slate-600">
                  Your BMI
                </p>

                <p className="mt-2 text-2xl font-black text-blue-600">
                  {result.bmi}
                </p>

                <span
                  className={`mt-1 rounded-full px-2 py-1 text-[9px] font-bold ${
                    result.calculated
                      ? "bg-blue-50 text-blue-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {result.calculated ? result.status : "--"}
                </span>
              </div>

              {/* DAILY PROTEIN RESULT */}
              <div className="flex min-h-[130px] min-w-0 flex-col items-center justify-center rounded-xl border border-slate-100 bg-white p-2 text-center shadow-sm">
                <Heart size={20} className="text-[#006e2d]" />

                <p className="mt-2 text-xs font-semibold text-slate-600">
                  Daily Protein
                </p>

                <p className="mt-2 text-2xl font-black text-[#006e2d]">
                  {result.calculated ? `${result.protein}g` : "--"}
                </p>

                <p className="mt-1 text-[9px] leading-3 text-slate-400">
                  Recommended daily need
                </p>
              </div>
            </div>

            {/* CALCULATE BUTTON */}
            <button
              type="button"
              onClick={handleCalculate}
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#006e2d] text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#005320] hover:shadow-md active:scale-[0.99]"
            >
              Calculate
              <ArrowRight size={17} />
            </button>

            <p className="mt-2 text-center text-[10px] leading-4 text-slate-400">
              Results are estimates. Consult a qualified healthcare
              professional for personalized medical or nutrition advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
