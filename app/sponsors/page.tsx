"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackground from "@/components/layout/GridBackground";
import FadeIn from "@/components/animations/FadeIn";
import {
  sponsors,
  sponsorTiers,
  sponsorshipImpact,
  type SponsorTier,
  type Sponsor,
} from "@/lib/data/sponsors";
import { ExternalLink, Check, Mail } from "lucide-react";

export default function SponsorsPage() {
  // Group sponsors by tier
  const sponsorsByTier = {
    Platinum: sponsors.filter((s) => s.tier === "Platinum"),
    Gold: sponsors.filter((s) => s.tier === "Gold"),
    Silver: sponsors.filter((s) => s.tier === "Silver"),
  };

  type TierName = 'Platinum' | 'Gold' | 'Silver';

  const getTierColor = (tier: TierName) => {
    switch (tier) {
      case "Platinum":
        return "from-slate-300 to-slate-500";
      case "Gold":
        return "from-yellow-300 to-yellow-600";
      case "Silver":
        return "from-gray-300 to-gray-500";
    }
  };

  const getTierBorderColor = (tier: TierName | string) => {
    switch (tier) {
      case "Platinum":
        return "border-slate-400";
      case "Gold":
        return "border-yellow-500";
      case "Silver":
        return "border-gray-400";
      default:
        return "border-gray-400";
    }
  };

  return (
    <>
      <GridBackground />
      <Navbar />

      <main className="relative z-10 min-h-screen pt-24 pb-16 bg-[var(--bg-primary)]">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
                Our Sponsors
              </h1>
              <p className="text-xl text-[var(--text-secondary)]">
                Thank you to our amazing partners who make our builds possible
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Current Sponsors Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {(["Platinum", "Gold", "Silver"] as TierName[]).map(
            (tier, tierIndex) => (
              <FadeIn key={tier} delay={tierIndex * 0.1}>
                <div className="mb-16">
                  <div className="flex items-center justify-center mb-8">
                    <div
                      className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${getTierColor(
                        tier
                      )} rounded-full`}
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {tier} Sponsors
                      </h2>
                    </div>
                  </div>

                  <div
                    className={`grid gap-6 ${
                      tier === "Platinum"
                        ? "md:grid-cols-2 lg:grid-cols-2"
                        : tier === "Gold"
                        ? "md:grid-cols-2 lg:grid-cols-3"
                        : "md:grid-cols-2 lg:grid-cols-4"
                    }`}
                  >
                    {sponsorsByTier[tier].map((sponsor, index) => (
                      <FadeIn key={sponsor.id} delay={0.1 + index * 0.05}>
                        <div
                          className={`relative group bg-[var(--bg-secondary)] border-2 ${getTierBorderColor(
                            tier
                          )} rounded-lg p-6 hover:shadow-xl transition-all duration-300 ${
                            tier === "Platinum" ? "p-8" : ""
                          }`}
                        >
                          {/* Tier Badge */}
                          <div className="absolute top-3 right-3">
                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${getTierColor(
                                tier
                              )} text-white`}
                            >
                              {tier}
                            </span>
                          </div>

                          {/* Logo Placeholder */}
                          <div
                            className={`flex items-center justify-center bg-[var(--bg-primary)] rounded-lg mb-4 ${
                              tier === "Platinum"
                                ? "h-32"
                                : tier === "Gold"
                                ? "h-24"
                                : "h-20"
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-4xl mb-2">🏢</div>
                              <p
                                className={`font-bold text-[var(--text-primary)] ${
                                  tier === "Platinum"
                                    ? "text-xl"
                                    : tier === "Gold"
                                    ? "text-lg"
                                    : "text-base"
                                }`}
                              >
                                {sponsor.name}
                              </p>
                            </div>
                          </div>

                          {/* Description (for Platinum and Gold) */}
                          {sponsor.description &&
                            (tier === "Platinum" || tier === "Gold") && (
                              <p className="text-sm text-[var(--text-secondary)] mb-4">
                                {sponsor.description}
                              </p>
                            )}

                          {/* Website Link */}
                          {sponsor.website && (
                            <a
                              href={sponsor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors text-sm font-medium group-hover:translate-x-1 transform duration-300"
                            >
                              Visit Website
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )
          )}
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-[var(--accent-primary)]/20 my-16" />
        </div>

        {/* Sponsorship Tiers Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
                Become a Sponsor
              </h2>
              <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                Join our mission to push the boundaries of combat robotics and
                inspire the next generation of engineers
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {sponsorTiers.map((tier, index) => (
              <FadeIn key={tier.name} delay={0.1 + index * 0.1} direction="up">
                <div
                  className={`relative bg-[var(--bg-secondary)] border-2 ${getTierBorderColor(
                    tier.name
                  )} rounded-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
                >
                  {/* Tier Header */}
                  <div className="text-center mb-6">
                    <div
                      className={`inline-block px-6 py-2 bg-gradient-to-r ${tier.color} rounded-full mb-4`}
                    >
                      <h3 className="text-2xl font-bold text-white">
                        {tier.name}
                      </h3>
                    </div>
                    <p className="text-3xl font-bold text-[var(--text-primary)]">
                      {tier.amount}
                    </p>
                  </div>

                  {/* Benefits List */}
                  <ul className="space-y-3 mb-8">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-start gap-3 text-[var(--text-secondary)]"
                      >
                        <Check
                          size={20}
                          className="flex-shrink-0 mt-0.5 text-[var(--accent-primary)]"
                        />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Contact Button */}
                  <a
                    href="mailto:sponsor@ragnarok.com"
                    className="relative block w-full py-3 px-6 border-2 border-[var(--accent-primary)] font-mono uppercase tracking-wider text-[var(--accent-primary)] group overflow-hidden"
                  >
                    {/* Hover background */}
                    <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    {/* Content */}
                    <span className="relative flex items-center justify-center group-hover:text-black transition-colors">
                      Contact Us
                    </span>
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-[var(--accent-primary)]/20 my-16" />
        </div>

        {/* Impact Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
                Where Your Support Goes
              </h2>
              <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                Every dollar helps us build better robots and compete at the
                highest level
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {sponsorshipImpact.map((item, index) => (
              <FadeIn key={item.category} delay={0.1 + index * 0.1}>
                <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--accent-primary)]/20 hover:border-[var(--accent-primary)]/40 transition-all duration-300">
                  {/* Percentage Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`${item.color} text-white text-2xl font-bold px-4 py-2 rounded-lg`}
                    >
                      {item.percentage}%
                    </div>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                    {item.category}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)]">
                    {item.description}
                  </p>

                  {/* Visual Bar */}
                  <div className="mt-4 bg-[var(--bg-primary)] rounded-full h-2 overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-1000`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Impact Text */}
          <FadeIn delay={0.5}>
            <div className="mt-12 bg-[var(--bg-secondary)] border border-[var(--accent-primary)]/20 rounded-xl p-8">
              <p className="text-lg text-[var(--text-secondary)] text-center max-w-3xl mx-auto leading-relaxed">
                Your sponsorship directly enables our team to design,
                fabricate, and compete with cutting-edge combat robots. Beyond
                the arena, you are investing in hands-on engineering education
                and fostering innovation in the next generation of builders and
                makers.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Final CTA Section - Refined Brutalist */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FadeIn>
            <div className="text-center">
              <div className="border-2 border-[var(--accent-primary)] bg-black p-10 md:p-16 inline-block max-w-2xl">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold font-mono uppercase tracking-wide text-white mb-4">
                  Ready to Partner?
                </h2>

                {/* Accent Divider */}
                <div className="w-24 h-1 bg-[var(--accent-primary)] mx-auto mb-6" />

                {/* Description */}
                <p className="text-base md:text-lg font-mono text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto mb-8">
                  Let us build something incredible together. Get in touch to discuss sponsorship opportunities.
                </p>

                {/* Email - Primary Focal Point */}
                <div className="mb-6">
                  <a
                    href="mailto:sponsor@ragnarok.com"
                    className="text-xl md:text-2xl font-mono font-bold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors underline underline-offset-4 decoration-2"
                  >
                    sponsor@ragnarok.com
                  </a>
                </div>

                {/* Button - Secondary Action */}
                <a
                  href="mailto:sponsor@ragnarok.com"
                  className="relative inline-block px-6 py-3 border-2 border-white/30 font-mono uppercase tracking-wider text-white group overflow-hidden"
                >
                  {/* Hover background */}
                  <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {/* Content */}
                  <span className="relative flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                    <Mail size={20} />
                    Send Email
                  </span>
                </a>
              </div>
            </div>
          </FadeIn>
        </section>

        <Footer />
      </main>
    </>
  );
}
