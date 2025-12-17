import Link from "next/link";
import { Instagram, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const navigationLinks = [
    { href: "/team", label: "Team" },
    { href: "/robots", label: "Robots" },
    { href: "/competitions", label: "Competitions" },
    // { href: "/sponsors", label: "Sponsors" },
    // { href: "/media", label: "Media" },
    // { href: "/blog", label: "Blog" },
  ];

  const socialLinks = [
    {
      href: "https://instagram.com/ragnarokcombat",
      label: "Instagram",
      icon: Instagram,
    },
    // {
    //   href: "https://youtube.com/@ragnarokcombat",
    //   label: "YouTube",
    //   icon: Youtube,
    // },
    // {
    //   href: "https://twitter.com/ragnarokcombat",
    //   label: "Twitter/X",
    //   icon: Twitter,
    // },
    // {
    //   href: "https://discord.gg/ragnarokcombat",
    //   label: "Discord",
    //   icon: MessageCircle,
    // },
  ];

  return (
    <footer className="relative z-10 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Section - Takes more space */}
          <div className="md:col-span-5 space-y-6">
            {/* Logo with corner marks */}
            <div className="relative inline-block">
              <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-[var(--accent-primary)]" />
              <div className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-[var(--accent-primary)]" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-[var(--accent-primary)]" />
              <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-[var(--accent-primary)]" />
              <h3 className="text-3xl font-black font-mono tracking-tighter text-white px-4 py-2">
                RAGNAROK
              </h3>
            </div>

            <p className="text-sm font-mono text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Combat robotics team pushing the boundaries of engineering and destruction.
            </p>

            {/* Contact Email */}
            <a
              href="mailto:contact@ragnarok.com"
              className="inline-flex items-center gap-2 text-sm font-mono text-[var(--accent-primary)] hover:text-white transition-colors group"
            >
              <span className="uppercase tracking-wider">contact@ragnarok.com</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[var(--accent-primary)]" />
              <h4 className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                Navigation
              </h4>
            </div>
            <nav className="space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors uppercase tracking-wider group"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-px bg-white/20 group-hover:bg-[var(--accent-primary)] group-hover:w-4 transition-all" />
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media Links */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[var(--accent-primary)]" />
              <h4 className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                Follow Us
              </h4>
            </div>
            <div className="space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)]/10 transition-all">
                      <Icon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
                    </div>
                    <span className="text-sm font-mono text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors uppercase tracking-wider">
                      {social.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              &copy; {new Date().getFullYear()} Ragnarok Combat Robotics
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Actively Competing
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
