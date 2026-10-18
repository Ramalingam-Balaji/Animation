import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    title: "Phone",
    color: "green",
    lines: ["+91 9440701380", "Mon-Fri 9:00 AM - 6:00 PM IST"],
    href: "tel:+919440701380",
  },
  {
    icon: Mail,
    title: "Email",
    color: "blue",
    lines: ["support@eatprotein.in", "We'll respond within 24 hours"],
    href: "mailto:support@eatprotein.in",
  },
  {
    icon: MapPin,
    title: "Address",
    color: "orange",
    lines: [
      "Pallaki Enclave, 3rd Floor,",
      "Plot no: 44 Municipal Plots, Udayagiri Rd,",
      "Bapuji Nagar, Kavali,",
      "Andhra Pradesh 524201",
    ],
    href: "https://maps.google.com/?q=Pallaki+Enclave+Kavali+Andhra+Pradesh",
  },
  {
    icon: Clock,
    title: "Business Hours",
    color: "purple",
    lines: [
      "Monday - Friday: 9:00 AM - 6:00 PM",
      "Saturday: 10:00 AM - 4:00 PM",
      "Sunday: Closed",
    ],
  },
];

const subjects = [
  "Product Inquiry",
  "Nutrition Advice",
  "Order Support",
  "Franchise Inquiry",
  "Technical Support",
  "Other",
];

const faqs = [
  {
    icon: MessageCircle,
    color: "green",
    question: "What types of protein products do you offer?",
    answer:
      "We offer a wide range of protein-rich foods including nuts, seeds, protein bars, supplements, and healthy snacks carefully selected for quality and nutrition.",
  },
  {
    icon: Headphones,
    color: "blue",
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking number via email. You can also check your order status in the Eat Protein mobile app.",
  },
  {
    icon: MessageCircle,
    color: "orange",
    question: "Do you provide nutrition consultation?",
    answer:
      "Yes! Our qualified nutritionists are available for personalized consultation through our app and via phone appointments.",
  },
  {
    icon: Headphones,
    color: "purple",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for unopened products. If you're not satisfied, contact our support team for assistance with a refund or exchange.",
  },
];

const colorStyles = {
  green: {
    icon: "bg-emerald-50 text-emerald-600",
    line: "bg-emerald-500",
  },
  blue: {
    icon: "bg-blue-50 text-blue-600",
    line: "bg-blue-500",
  },
  orange: {
    icon: "bg-orange-50 text-orange-600",
    line: "bg-orange-500",
  },
  purple: {
    icon: "bg-purple-50 text-purple-600",
    line: "bg-purple-500",
  },
};

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // ---------------------------------------------------------------
  // Scroll reveal — same pattern as Store.jsx
  // Elements with .contact-reveal animate IN when they enter the
  // viewport and animate OUT when they leave, so the entrance
  // replays every time the user scrolls back to a section.
  // ---------------------------------------------------------------
  useEffect(() => {
    const elements = document.querySelectorAll(".contact-reveal");

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailSubject = encodeURIComponent(
      `${formData.subject} - Contact from ${formData.fullName}`
    );

    const emailBody = encodeURIComponent(
      `Full Name: ${formData.fullName}\n` +
        `Phone Number: ${formData.phone || "Not provided"}\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}`
    );

    window.location.href =
      `mailto:support@eatprotein.in?subject=${emailSubject}&body=${emailBody}`;

    setSubmitted(true);
  };

  return (
    <main className="contact-page min-h-screen overflow-hidden bg-white text-slate-800">
      <style>{`
        .contact-reveal {
          opacity: 0;
          transition: opacity 750ms ease, transform 850ms cubic-bezier(.2,.75,.25,1);
          will-change: opacity, transform;
        }
        .contact-from-left   { transform: translateX(-64px); }
        .contact-from-right  { transform: translateX(64px); }
        .contact-from-top    { transform: translateY(-42px); }
        .contact-from-bottom { transform: translateY(48px); }
        .contact-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0,0,0);
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-reveal,
          .contact-reveal.is-visible {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-lime-50 to-white px-5 py-14 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-lime-100/70 blur-3xl" />

        <div className="contact-reveal contact-from-top relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 shadow-sm sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            We're here to help
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Let's talk{" "}
            <span className="text-emerald-600">nutrition.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Have questions about our products or need nutrition advice?
            We'd love to hear from you. Reach out to our friendly team.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-slate-600">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={17} className="text-emerald-600" />
              Friendly support
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={17} className="text-emerald-600" />
              Replies within 24 hours
            </span>
          </div>
        </div>
      </section>

      {/* Contact details and form */}
      <section className="px-5 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          {/* Left column */}
          <div
            className="contact-reveal contact-from-left"
            data-delay="0"
          >
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              Contact information
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Get in touch
            </h2>

            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
              We'd love to hear from you. Send us a message and we'll respond
              as soon as possible.
            </p>

            <div className="mt-8 space-y-7">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;
                const styles = colorStyles[item.color];

                return (
                  <div
                    key={item.title}
                    data-delay={index * 140}
                    className="contact-reveal contact-from-bottom flex gap-4"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles.icon}`}
                    >
                      <Icon size={22} strokeWidth={1.9} />
                    </div>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <h3 className="font-bold text-slate-900">
                        {item.title}
                      </h3>

                      <div className="mt-2 space-y-1">
                        {item.lines.map((line, lineIndex) => (
                          <p
                            key={line}
                            className={`text-sm leading-6 ${
                              lineIndex === 0 && item.href
                                ? "text-slate-700"
                                : "text-slate-500"
                            }`}
                          >
                            {lineIndex === 0 && item.href ? (
                              <a
                                href={item.href}
                                target={
                                  item.href.startsWith("https")
                                    ? "_blank"
                                    : undefined
                                }
                                rel={
                                  item.href.startsWith("https")
                                    ? "noreferrer"
                                    : undefined
                                }
                                className="break-words transition hover:text-emerald-600"
                              >
                                {line}
                              </a>
                            ) : (
                              line
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column: Form */}
          <div
            className="contact-reveal contact-from-right rounded-3xl border border-slate-100 bg-slate-50/90 p-5 shadow-[0_12px_45px_-25px_rgba(15,23,42,0.22)] sm:p-8 lg:p-8"
            data-delay="120"
          >
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                Send an inquiry
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Send us a message
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill in the details below and tell us how we can help.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={20}
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-slate-700"
                >
                  Subject <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer appearance-none pr-11`}
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>

                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-slate-500"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m5 7 5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-slate-700"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={3000}
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClass} min-h-36 resize-y`}
                />
                <p className="mt-1.5 text-right text-xs text-slate-400">
                  {formData.message.length}/3000 characters
                </p>
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/15 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-200 active:translate-y-0"
              >
                <Send
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
                Send Message
              </button>

              {submitted && (
                <p
                  role="status"
                  className="text-sm leading-6 text-emerald-700"
                >
                  Your email application should open with your message
                  prepared. Please send the email to complete your inquiry.
                </p>
              )}

              <p className="text-center text-xs leading-5 text-slate-500">
                Your information will be used to respond to your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-slate-50 px-5 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="contact-reveal contact-from-top mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
              Helpful information
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Quick answers to common questions about our products and services.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              const styles = colorStyles[faq.color];

              return (
                <article
                  key={faq.question}
                  data-delay={index * 150}
                  className="contact-reveal contact-from-bottom group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-lg sm:p-6"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
                    >
                      <Icon size={19} />
                    </div>

                    <div>
                      <h3 className="font-bold leading-6 text-slate-900">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="contact-reveal contact-from-top mt-8 text-center">
            <p className="text-sm text-slate-600">
              Still have questions?{" "}
              <a
                href="mailto:support@eatprotein.in"
                className="font-bold text-emerald-700 transition hover:text-emerald-500"
              >
                Contact our team
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
