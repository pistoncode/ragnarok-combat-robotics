"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackground from "@/components/layout/GridBackground";
import FadeIn from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Image,
  FileText,
  Download,
  Youtube,
  Instagram,
  Twitter,
  Mail,
} from "lucide-react";

export default function MediaPage() {
  const brandAssets = [
    {
      name: "Team Logo (PNG)",
      format: "PNG • 2048x2048 • 500KB",
      icon: Image,
      downloadUrl: "#",
    },
    {
      name: "Team Logo (SVG)",
      format: "SVG • Vector • 25KB",
      icon: Image,
      downloadUrl: "#",
    },
    {
      name: "Robot Photos Pack",
      format: "ZIP • 15 Images • 45MB",
      icon: Image,
      downloadUrl: "#",
    },
    {
      name: "Press Release Template",
      format: "PDF • 2 Pages • 150KB",
      icon: FileText,
      downloadUrl: "#",
    },
  ];

  const brandColors = [
    { name: "Primary", hex: "#440C13", rgb: "68, 12, 19" },
    { name: "Accent Hover", hex: "#5C1019", rgb: "92, 16, 25" },
    { name: "Background", hex: "#000000", rgb: "0, 0, 0" },
    { name: "Secondary BG", hex: "#0A0A0A", rgb: "10, 10, 10" },
    { name: "Text Primary", hex: "#FFFFFF", rgb: "255, 255, 255" },
    { name: "Text Secondary", hex: "#A1A1A1", rgb: "161, 161, 161" },
  ];

  const socialStats = [
    {
      platform: "YouTube",
      followers: "5K+ Subscribers",
      icon: Youtube,
      url: "https://youtube.com/@ragnarokcombat",
    },
    {
      platform: "Instagram",
      followers: "3K+ Followers",
      icon: Instagram,
      url: "https://instagram.com/ragnarokcombat",
    },
    {
      platform: "Twitter",
      followers: "2K+ Followers",
      icon: Twitter,
      url: "https://twitter.com/ragnarokcombat",
    },
  ];

  const pressCoverage = [
    {
      publication: "Robot Combat Weekly",
      headline: "Ragnarok's Innovative Weapon Design Takes Championship",
      date: "November 2024",
      url: "#",
    },
    {
      publication: "Engineering Today",
      headline: "Inside the Workshop: Building Competition Combat Robots",
      date: "October 2024",
      url: "#",
    },
    {
      publication: "Tech Makers Magazine",
      headline: "The Future of Combat Robotics: An Interview with Ragnarok",
      date: "September 2024",
      url: "#",
    },
  ];

  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="relative z-10 min-h-screen bg-[var(--bg-primary)]">

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
                Media Kit
              </h1>
              <p className="text-xl md:text-2xl text-[var(--text-secondary)]">
                Press resources, downloadable assets, and brand guidelines
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Brand Assets Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <SectionHeader title="Brand Assets" className="mb-12" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandAssets.map((asset, index) => {
              const Icon = asset.icon;
              return (
                <FadeIn key={asset.name} delay={index * 0.1} direction="up">
                  <Card className="h-full flex flex-col">
                    <div className="flex items-center justify-center w-16 h-16 bg-[var(--accent-primary)] rounded-lg mb-4">
                      <Icon size={32} className="text-[var(--text-primary)]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                      {asset.name}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-4 flex-grow">
                      {asset.format}
                    </p>
                    <a
                      href={asset.downloadUrl}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--accent-primary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
                    >
                      <Download size={18} />
                      Download
                    </a>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand Guidelines Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <SectionHeader title="Brand Guidelines" className="mb-12" />
          </FadeIn>

          {/* Color Palette */}
          <FadeIn direction="up" delay={0.1}>
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">
                Color Palette
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {brandColors.map((color, index) => (
                  <FadeIn key={color.hex} delay={index * 0.05} direction="up">
                    <div className="space-y-3">
                      <div
                        className="w-full h-24 rounded-lg border border-[var(--border)] shadow-lg"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          {color.name}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)] font-mono">
                          {color.hex}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] font-mono">
                          RGB: {color.rgb}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Typography */}
          <FadeIn direction="up" delay={0.2}>
            <Card>
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
                Typography
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[var(--text-secondary)] mb-2">Headlines</p>
                  <p className="text-3xl font-bold text-[var(--text-primary)]">
                    Space Grotesk
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-secondary)] mb-2">Body Text</p>
                  <p className="text-xl text-[var(--text-primary)]">
                    Inter for clean, readable body text and UI elements
                  </p>
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* Logo Usage */}
          <FadeIn direction="up" delay={0.3}>
            <Card className="mt-6">
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
                Logo Usage Guidelines
              </h3>
              <div className="space-y-3 text-[var(--text-secondary)]">
                <p>
                  • Maintain minimum clear space around logo equal to the height
                  of the letter "R"
                </p>
                <p>
                  • Do not alter logo colors except for approved single-color
                  variations
                </p>
                <p>
                  • Minimum size: 120px width for digital, 1 inch for print
                </p>
                <p>• Do not stretch, rotate, or modify the logo proportions</p>
                <p>
                  • Use the SVG format for web and digital applications when
                  possible
                </p>
              </div>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <SectionHeader title="Connect With Us" className="mb-12" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialStats.map((social, index) => {
              const Icon = social.icon;
              return (
                <FadeIn key={social.platform} delay={index * 0.1} direction="up">
                  <Card className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-[var(--accent-primary)] rounded-full mx-auto mb-4">
                      <Icon size={28} className="text-[var(--text-primary)]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                      {social.platform}
                    </h3>
                    <p className="text-lg text-[var(--text-secondary)] mb-4">
                      {social.followers}
                    </p>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--accent-primary)] transition-colors"
                    >
                      Visit Profile
                    </a>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Press Coverage Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <SectionHeader title="In the Press" className="mb-12" />
          </FadeIn>

          <div className="space-y-6">
            {pressCoverage.map((item, index) => (
              <FadeIn key={item.headline} delay={index * 0.1} direction="up">
                <Card>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-grow">
                      <p className="text-sm text-[var(--accent-primary)] font-semibold mb-2">
                        {item.publication}
                      </p>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                        {item.headline}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {item.date}
                      </p>
                    </div>
                    <a
                      href={item.url}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--accent-primary)] transition-colors whitespace-nowrap"
                    >
                      Read Article
                    </a>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn direction="up">
            <Card className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-[var(--accent-primary)] rounded-full mx-auto mb-6">
                <Mail size={36} className="text-[var(--text-primary)]" />
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                Media Inquiries
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-6">
                For press inquiries, interview requests, or additional media
                assets, please contact us:
              </p>
              <a
                href="mailto:media@ragnarok.com"
                className="inline-block text-2xl font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors mb-6"
              >
                media@ragnarok.com
              </a>
              <p className="text-sm text-[var(--text-muted)]">
                We typically respond to media requests within 24-48 hours. Custom
                press kits and high-resolution images available upon request.
              </p>
            </Card>
          </FadeIn>
        </div>
      </section>

      <Footer />
      </main>
    </>
  );
}
