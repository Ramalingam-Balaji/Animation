import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Store as StoreIcon,
  Handshake,
  MapPin,
  Phone,
  Mail,
  X,
  Send,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Building2,
  ChartNoAxesCombined,
} from "lucide-react";

const CATEGORIES = [
  "Veg",
  "Non Veg",
  "Restaurants",
  "Eggs",
  "Dairy Foods",
  "Fruits & Vegetables",
  "Bakery & Sweets",
  "Home Foods",
  "Diet",
];

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Grow Your Revenue",
    description:
      "Increase your store's earnings by offering in-demand, premium protein-rich products loved by health-conscious customers.",
    color: "bg-red-100 text-red-700",
  },
  {
    icon: Users,
    title: "Attract the Right Customers",
    description:
      "Reach a targeted audience of health-focused buyers through our trusted brand and app-based discovery.",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: StoreIcon,
    title: "Marketing & Sales Support",
    description:
      "Get promotional materials, in-app promotions, and marketing support to improve your visibility and sales.",
    color: "bg-red-50 text-red-700",
  },
  {
    icon: Handshake,
    title: "Stand Out Locally",
    description:
      "Build your local presence and connect with customers looking for quality food products in your neighborhood.",
    color: "bg-green-100 text-red-800",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Submit Application",
    description:
      "Fill out the store registration form with your business details.",
    color: "bg-red-600",
  },
  {
    number: "02",
    title: "Verification Process",
    description:
      "Our team will verify your store credentials and business license.",
    color: "bg-red-500",
  },
  {
    number: "03",
    title: "Agreement & Setup",
    description:
      "Sign the partnership agreement and receive your starter kit.",
    color: "bg-lime-600",
  },
  {
    number: "04",
    title: "Start Selling",
    description:
      "Begin selling EatProtein products with our ongoing support.",
    color: "bg-emerald-700",
  },
];

const INITIAL_FORM = {
  storeName: "",
  ownerName: "",
  email: "",
  phone: "",
  categories: [],
  address: "",
  city: "",
  state: "",
  pincode: "",
  radius: "3",
  franchiseOwner: "",
  gst: "",
  fssai: "",
};

export default function Store() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");

  // Reveal each section/card as it enters the viewport, and reset it
  // when it leaves so the entry animation replays every time the user
  // scrolls back to it.
  useEffect(() => {
    const elements = document.querySelectorAll(".store-reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const timers = new WeakMap();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;

          if (entry.isIntersecting) {
            const delay = Number(el.dataset.delay || 0);
            const timer = window.setTimeout(
              () => el.classList.add("is-visible"),
              delay
            );
            timers.set(el, timer);
          } else {
            const pending = timers.get(el);
            if (pending) {
              window.clearTimeout(pending);
              timers.delete(el);
            }
            el.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -35px 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the modal is open so the popup animation
  // stays smooth and visible while the page behind it is still scrollable
  // after closing.
  useEffect(() => {
    if (showModal) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [showModal]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const toggleCategory = (category) => {
    setForm((previous) => ({
      ...previous,
      categories: previous.categories.includes(category)
        ? previous.categories.filter((item) => item !== category)
        : [...previous.categories, category],
    }));
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setMessage("Location access is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation(`${coords.latitude}, ${coords.longitude}`);
        setMessage("Location captured successfully.");
      },
      () => {
        setMessage(
          "Location access was denied. Enter your city or address manually."
        );
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.categories.length === 0) {
      setMessage("Please select at least one store category.");
      return;
    }

    // Connect your backend/API here to save the application.
    console.log("Store partnership application:", {
      ...form,
      location,
    });

    setMessage(
      "Your form is ready! Connect your backend to submit and save applications."
    );
  };

  const mapQuery = encodeURIComponent(
    location || form.address || form.city || "India"
  );

  return (
    <main className="store-page min-h-screen overflow-hidden bg-white text-slate-800">
      <style>{`
        .store-reveal { opacity: 0; transition: opacity 750ms ease, transform 850ms cubic-bezier(.2,.75,.25,1); will-change: opacity, transform; }
        .store-from-left { transform: translateX(-64px); }
        .store-from-right { transform: translateX(64px); }
        .store-from-top { transform: translateY(-42px); }
        .store-from-bottom { transform: translateY(48px); }
        .store-reveal.is-visible { opacity: 1; transform: translate3d(0,0,0); }

        /* Popup / modal entrance — visible smoothly even while the page
           behind it is being scrolled. */
        .store-overlay { animation: storeOverlayIn 280ms ease forwards; }
        .store-modal { animation: storeModalIn 420ms cubic-bezier(.2,.75,.25,1) forwards; }
        @keyframes storeOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes storeModalIn {
          from { opacity: 0; transform: translateY(36px) scale(.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .store-reveal, .store-reveal.is-visible { opacity: 1; transform: none; transition: none; }
          .store-overlay, .store-modal { animation: none; }
        }
      `}</style>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff0f2] via-white to-[#f0fff3] px-5 py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-red-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="store-reveal store-from-left" data-delay="0">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-800 shadow-sm">
              <StoreIcon size={15} />
              Become an EatProtein Partner
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-[#173b27] sm:text-5xl lg:text-6xl">
              Grow Your Store.
              <span className="block text-red-600">
                Grow With Us.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Join the EatProtein network and connect your business
              with customers who care about healthy food, quality
              nutrition, and better everyday choices.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  setShowModal(true);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d90429] to-[#ff3151] px-6 py-4 font-bold text-white shadow-lg shadow-red-200 transition hover:-translate-y-1 hover:shadow-xl"
              >
                Apply for Store Partnership
                <ArrowRight size={18} />
              </button>

              <a
                href="#benefits"
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-4 font-bold text-red-800 transition hover:bg-red-50"
              >
                Explore Benefits
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-red-600" />
                Business support
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-red-600" />
                Local discovery
              </span>
            </div>
          </div>

          <div className="store-reveal store-from-right relative mx-auto w-full max-w-lg" data-delay="120">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-red-200 to-green-100 opacity-70 blur-xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-6 shadow-2xl sm:p-9">
              <div className="mb-5 overflow-hidden rounded-2xl bg-[#b90025]">
                <img src="/eatprotein-mascot.jpg" alt="EatProtein mascot wearing a red cap and green shoes" className="h-44 w-full object-cover object-center sm:h-52" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Your next business opportunity
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-[#173b27]">
                    EatProtein Store
                  </h2>
                </div>
                <div className="rounded-2xl bg-green-100 p-3 text-green-700">
                  <Building2 size={30} />
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-gradient-to-br from-red-700 via-green-600 to-emerald-500 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-3 text-green-700">
                    <StoreIcon size={32} />
                  </div>
                  <div>
                    <p className="text-lg font-black">EAT PROTEIN</p>
                    <p className="text-sm text-green-50">Store Partner</p>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/15 p-4">
                    <TrendingUp size={22} />
                    <p className="mt-3 text-sm font-bold">
                      Business Growth
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/15 p-4">
                    <Users size={22} />
                    <p className="mt-3 text-sm font-bold">
                      More Customers
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-red-50 p-4">
                <div className="rounded-full bg-red-100 p-3 text-red-600">
                  <ChartNoAxesCombined size={23} />
                </div>
                <div>
                  <p className="font-bold text-[#173b27]">
                    Your Store, More Visible
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Get discovered by local food customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section id="benefits" className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="store-reveal store-from-top mx-auto max-w-2xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-600">
              Partnership Benefits
            </span>
            <h2 className="mt-3 text-3xl font-black text-[#173b27] sm:text-4xl">
              Why Partner with EatProtein?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              More visibility, better customer connections, and
              support to help your store grow.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  data-delay={index * 180}
                  className="store-reveal store-from-top group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-xl"
                >
                  <div
                    className={`inline-flex rounded-2xl p-4 ${benefit.color}`}
                  >
                    <Icon size={27} />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-[#173b27]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {benefit.description}
                  </p>
                  <div className="mt-5 h-1 w-12 rounded-full bg-gradient-to-r from-red-600 to-green-500 transition-all group-hover:w-20" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP HIGHLIGHTS */}
      <section className="bg-[#fff5f5] px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="store-reveal store-from-top text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-green-700">
              The EatProtein Advantage
            </span>
            <h2 className="mt-3 text-3xl font-black text-[#173b27] sm:text-4xl">
              A Partnership That Moves You Forward
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div data-delay={0} className="store-reveal store-from-top rounded-2xl border border-red-100 bg-white p-7 shadow-sm">
              <div className="text-4xl font-black text-red-600">
                30%
              </div>
              <h3 className="mt-2 font-bold text-[#173b27]">
                Profit Margins
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Explore opportunities to improve profitability on
                EatProtein products. Actual margins depend on product
                and partnership terms.
              </p>
            </div>

            <div data-delay={180} className="store-reveal store-from-top rounded-2xl border border-red-100 bg-white p-7 shadow-sm">
              <div className="text-4xl font-black text-red-600">
                24/7
              </div>
              <h3 className="mt-2 font-bold text-[#173b27]">
                Support Available
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Get assistance with partnership questions and store
                operations according to your support agreement.
              </p>
            </div>

            <div data-delay={360} className="store-reveal store-from-top rounded-2xl border border-red-100 bg-white p-7 shadow-sm">
              <div className="text-4xl font-black text-green-700">
                500+
              </div>
              <h3 className="mt-2 font-bold text-[#173b27]">
                Partner Stores
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Be part of a growing partner network. Replace this
                figure with your current verified store count.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION STEPS */}
      <section className="bg-slate-50 px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="store-reveal store-from-top text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-red-600">
              Simple & Convenient
            </span>
            <h2 className="mt-3 text-3xl font-black text-[#173b27] sm:text-4xl">
              How to Register Your Store
            </h2>
            <p className="mt-4 text-slate-600">
              Four straightforward steps to get started.
            </p>
          </div>

          <div className="relative mt-12 grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-7 hidden h-0.5 bg-gradient-to-r from-green-300 via-red-300 to-green-300 lg:block" />

            {STEPS.map((step, index) => (
              <div
                key={step.number}
                data-delay={index * 200}
                className="store-reveal store-from-left relative z-10 text-center"
              >
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} text-xl font-black text-white shadow-lg`}
                >
                  {step.number}
                </div>
                <h3 className="mt-5 font-extrabold text-[#173b27]">
                  {step.title}
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA — restored with the same reveal animation */}
     <section className="store-reveal store-from-top bg-gradient-to-r from-[#176b38] via-[#159447] to-[#f97316] px-5 py-14 text-white sm:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <ShieldCheck className="mx-auto" size={38} />
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Ready to Partner with Us?
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/90 sm:text-base">
            Join the EatProtein network and bring quality food
            products to more customers.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm">
            <a
              href="tel:+919440701380"
              className="inline-flex items-center gap-2 hover:text-red-100"
            >
              <Phone size={17} />
              +91 9440701380
            </a>
            <a
              href="mailto:support@eatprotein.in"
              className="inline-flex items-center gap-2 hover:text-red-100"
            >
              <Mail size={17} />
              support@eatprotein.in
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={17} />
              Available Nationwide
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setMessage("");
              setShowModal(true);
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-extrabold text-red-800 shadow-lg transition hover:-translate-y-1 hover:bg-red-50"
          >
            Apply for Store Partnership
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* APPLICATION MODAL */}
      {showModal && (
        <div
          className="store-overlay fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="store-modal relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal header */}
            <div className="flex shrink-0 items-center justify-between border-b border-red-100 bg-[#fff3f4] px-5 py-4 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-red-600">
                  Join Our Network
                </p>
                <h2 className="mt-1 text-xl font-black text-[#173b27] sm:text-2xl">
                  Store Partnership Application
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close application"
                className="rounded-xl p-2 text-slate-500 transition hover:bg-white hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable form */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto p-5 sm:p-7"
            >
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                {/* Left column */}
                <div>
                  <h3 className="mb-5 flex items-center gap-2 font-extrabold text-[#173b27]">
                    <StoreIcon size={19} className="text-red-600" />
                    Store Information
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Store Name"
                      name="storeName"
                      value={form.storeName}
                      onChange={updateField}
                      placeholder="Your store name"
                      required
                    />

                    <Field
                      label="Owner Name"
                      name="ownerName"
                      value={form.ownerName}
                      onChange={updateField}
                      placeholder="Your full name"
                      required
                    />

                    <Field
                      label="Email Address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={updateField}
                      placeholder="you@example.com"
                      required
                    />

                    <Field
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={updateField}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>

                  <div className="mt-6">
                    <label className="text-sm font-bold text-slate-700">
                      Store Category *
                    </label>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {CATEGORIES.map((category) => {
                        const selected =
                          form.categories.includes(category);

                        return (
                          <button
                            key={category}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => toggleCategory(category)}
                            className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                              selected
                                ? "border-green-600 bg-red-600 text-white shadow-sm"
                                : "border-slate-200 bg-white text-slate-700 hover:border-red-400 hover:bg-red-50"
                            }`}
                          >
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Store Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={updateField}
                      placeholder="Complete store address"
                      rows={3}
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <Field
                      label="City"
                      name="city"
                      value={form.city}
                      onChange={updateField}
                      placeholder="City"
                      required
                    />

                    <Field
                      label="State"
                      name="state"
                      value={form.state}
                      onChange={updateField}
                      placeholder="State"
                      required
                    />

                    <Field
                      label="Pincode"
                      name="pincode"
                      value={form.pincode}
                      onChange={updateField}
                      placeholder="Pincode"
                      required
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Service Radius (km)"
                      name="radius"
                      type="number"
                      value={form.radius}
                      onChange={updateField}
                      min="1"
                      required
                    />

                    <div>
                      <label
                        htmlFor="franchiseOwner"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        Franchise Owner *
                      </label>
                      <select
                        id="franchiseOwner"
                        name="franchiseOwner"
                        value={form.franchiseOwner}
                        onChange={updateField}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      >
                        <option value="">Select owner</option>
                        <option value="Bhaskar Rao">Bhaskar Rao</option>
                      </select>
                    </div>

                    <Field
                      label="GST Number"
                      name="gst"
                      value={form.gst}
                      onChange={updateField}
                      placeholder="GST number"
                    />

                    <Field
                      label="FSSAI Number"
                      name="fssai"
                      value={form.fssai}
                      onChange={updateField}
                      placeholder="FSSAI license number"
                    />
                  </div>
                </div>

                {/* Right column: location */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="flex items-center gap-2 font-extrabold text-[#173b27]">
                      <MapPin size={19} className="text-red-600" />
                      Your Location
                    </h3>

                    <button
                      type="button"
                      onClick={useMyLocation}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-800 transition hover:bg-red-50"
                    >
                      <Navigation size={15} />
                      Use My Location
                    </button>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter your address or city to preview the area.
                    Location access is optional.
                  </p>

                  <div className="mt-4 h-[260px] overflow-hidden rounded-2xl border border-red-100 bg-[#fff1f2] sm:h-[320px]">
                    <iframe
                      key={mapQuery}
                      title="Store location map"
                      src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
                      className="h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-5">
                    <h4 className="flex items-center gap-2 font-bold text-green-900">
                      <MapPin size={18} />
                      Location Details
                    </h4>

                    <p className="mt-3 break-words text-sm leading-6 text-red-800">
                      {location
                        ? `Coordinates: ${location}`
                        : form.city || form.address
                          ? `${form.address ? `${form.address}, ` : ""}${form.city}${form.state ? `, ${form.state}` : ""}`
                          : "Enter your store address and city to add location details."}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-green-700">
                      {location
                        ? "Location coordinates captured by your browser."
                        : "Map preview is for reference. Location has not been independently verified."}
                    </p>
                  </div>
                </div>
              </div>

              {message && (
                <p
                  role="status"
                  className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
                >
                  {message}
                </p>
              )}

              <div className="mt-7 flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-700 to-red-600 px-7 py-3 font-bold text-white shadow-md transition hover:from-red-800 hover:to-red-700"
                >
                  <Send size={17} />
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-bold text-slate-700"
      >
        {label}
        {required && " *"}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
      />
    </div>
  );
}
