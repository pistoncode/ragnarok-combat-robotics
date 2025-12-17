"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackground from "@/components/layout/GridBackground";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Youtube, Instagram, Twitter, MessageCircle, Mail, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your message! We'll get back to you soon.\n\nOr email us directly at contact@ragnarok.com`);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialPlatforms = [
    {
      name: "YouTube",
      icon: Youtube,
      action: "Subscribe",
      href: "#",
      color: "hover:text-red-500",
    },
    {
      name: "Instagram",
      icon: Instagram,
      action: "Follow",
      href: "#",
      color: "hover:text-pink-500",
    },
    {
      name: "Twitter/X",
      icon: Twitter,
      action: "Follow",
      href: "#",
      color: "hover:text-blue-400",
    },
    {
      name: "Discord",
      icon: MessageCircle,
      action: "Join",
      href: "#",
      color: "hover:text-indigo-500",
    },
  ];

  const sponsorshipBenefits = [
    "Logo placement on our robots and team apparel",
    "Social media shoutouts and featured content",
    "Behind-the-scenes access and exclusive updates",
    "Recognition at competitions and events",
  ];

  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="relative z-10 min-h-screen bg-[var(--bg-primary)]">

      <div className="pt-24 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Interested in sponsorship, collaboration, or just want to chat robots?
            </p>
          </div>

          {/* Sponsorship Inquiry Section */}
          <div className="mb-16">
            <Card className="border-2 border-[var(--accent-primary)] shadow-[0_0_40px_var(--accent-glow)] relative overflow-hidden">
              {/* Accent glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/10 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                  Sponsorship Opportunities
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                  Partner with one of the most exciting combat robotics teams. Your support helps us
                  build better robots and compete at the highest level. Join us in pushing the boundaries
                  of engineering and innovation.
                </p>

                {/* Benefits List */}
                <div className="grid md:grid-cols-2 gap-3 mb-8">
                  {sponsorshipBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="text-[var(--accent-primary)] flex-shrink-0 mt-1" size={20} />
                      <span className="text-[var(--text-secondary)]">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href="mailto:sponsor@ragnarok.com?subject=Sponsorship%20Inquiry"
                  className="relative inline-block px-8 py-4 border-2 border-[var(--accent-primary)] font-mono uppercase tracking-wider text-[var(--accent-primary)] group overflow-hidden"
                >
                  {/* Hover background */}
                  <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {/* Content */}
                  <span className="relative flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                    <Mail className="w-5 h-5" />
                    Discuss Sponsorship
                  </span>
                </a>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* General Contact Section */}
            <Card>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                General Inquiries
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="text-[var(--accent-primary)] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="text-[var(--text-secondary)] mb-2">Email us at:</p>
                    <a
                      href="mailto:contact@ragnarok.com"
                      className="text-lg font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
                    >
                      contact@ragnarok.com
                    </a>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]">
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Response Time:</strong> We typically
                    respond within 48 hours
                  </p>
                </div>
              </div>
            </Card>

            {/* Social Media Section */}
            <Card>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                Follow Our Journey
              </h2>
              <p className="text-[var(--text-secondary)] mb-6">
                Stay updated with our latest battles, behind-the-scenes content, and team updates.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {socialPlatforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <a
                      key={platform.name}
                      href={platform.href}
                      className={`flex flex-col items-center justify-center p-6 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:-translate-y-1 ${platform.color}`}
                    >
                      <Icon size={32} className="mb-3" />
                      <span className="font-semibold text-[var(--text-primary)] mb-1">
                        {platform.name}
                      </span>
                      <span className="text-sm text-[var(--text-secondary)]">
                        {platform.action}
                      </span>
                    </a>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Contact Form Section */}
          <Card className="max-w-4xl mx-auto">
            <SectionHeader
              title="Send Us a Message"
              subtitle="Fill out the form below and we'll get back to you as soon as possible"
              align="center"
              className="mb-8"
            />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="sponsorship">Sponsorship</option>
                  <option value="media">Media Inquiry</option>
                  <option value="general">General Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all resize-vertical"
                  placeholder="Tell us about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="relative inline-block px-12 py-3 border-2 border-[var(--accent-primary)] font-mono uppercase tracking-wider text-[var(--accent-primary)] group overflow-hidden"
                >
                  {/* Hover background */}
                  <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {/* Content */}
                  <span className="relative group-hover:text-black transition-colors">
                    Send Message
                  </span>
                </button>
                <p className="mt-4 text-sm text-[var(--text-secondary)]">
                  Or email us directly at{" "}
                  <a
                    href="mailto:contact@ragnarok.com"
                    className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
                  >
                    contact@ragnarok.com
                  </a>
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>

      <Footer />
      </main>
    </>
  );
}
