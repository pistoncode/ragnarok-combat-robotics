"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackground from "@/components/layout/GridBackground";
import { robots } from "@/lib/data/robots";
import Image from "next/image";
import { Zap, ArrowRight, Filter, X } from "lucide-react";

export default function RobotsPage() {
  const [weightClassFilter, setWeightClassFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const weightClasses = ["All", "Beetleweight", "Hobbyweight", "Featherweight", "Middleweight"];
  const statuses = ["All", "Active", "Retired"];

  const filteredRobots = robots.filter((robot) => {
    const matchesWeightClass = weightClassFilter === "All" || robot.weightClass === weightClassFilter;
    const matchesStatus = statusFilter === "All" || robot.status === statusFilter;
    return matchesWeightClass && matchesStatus;
  });

  const hasActiveFilters = weightClassFilter !== "All" || statusFilter !== "All";

  // Calculate total stats
  const totalWins = robots.reduce((sum, r) => sum + r.wins, 0);
  const totalLosses = robots.reduce((sum, r) => sum + r.losses, 0);
  const winRate = Math.round((totalWins / (totalWins + totalLosses)) * 100);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <GridBackground />
      <Navbar />

      <main className="relative z-10 pt-20 pb-16 bg-[var(--bg-primary)]">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4 animate-fade-in-up">
                <div className="w-12 h-px bg-[var(--accent-primary)]" />
                <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                  Combat Arsenal
                </p>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-mono tracking-tighter animate-fade-in-up animation-delay-100">
                Our
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-mono tracking-tighter text-[var(--accent-primary)] animate-fade-in-up animation-delay-200">
                Robots
              </h1>
            </div>

            {/* Description and Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Description */}
              <div className="relative animate-fade-in-up animation-delay-300">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-primary)]" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-primary)]" />
                <div className="border border-white/10 p-6 bg-black/50 h-full flex items-center">
                  <p className="text-lg font-mono text-[var(--text-secondary)] leading-relaxed">
                    Meet our arsenal of combat robots. Each machine is designed and built
                    to dominate in their weight class.
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 animate-fade-in-up animation-delay-400">
                {[
                  { label: "Robots", value: robots.length },
                  { label: "Total Wins", value: totalWins },
                  { label: "Win Rate", value: `${winRate}%` },
                ].map((stat, index) => (
                  <div key={stat.label} className="relative group">
                    <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
                    <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm p-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                        {stat.label}
                      </div>
                      <div className="text-2xl md:text-3xl font-black font-mono tracking-tighter">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Section */}
            <div className="relative mb-8 animate-fade-in-up animation-delay-500">
              <div className="border border-white/20 bg-black/80 backdrop-blur-sm p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  {/* Filter Controls */}
                  <div className="flex flex-wrap items-center gap-4 flex-1">
                    {/* Weight Class Filter */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider whitespace-nowrap">
                        Weight:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {weightClasses.map((weightClass) => (
                          <button
                            key={weightClass}
                            onClick={() => setWeightClassFilter(weightClass)}
                            className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-all border ${
                              weightClassFilter === weightClass
                                ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-black font-bold"
                                : "border-white/20 text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                            }`}
                          >
                            {weightClass}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider whitespace-nowrap">
                        Status:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {statuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-all border ${
                              statusFilter === status
                                ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-black font-bold"
                                : "border-white/20 text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Results Count & Clear Button */}
                  <div className="flex items-center gap-4 md:border-l md:border-white/10 md:pl-6">
                    <p className="text-xs font-mono text-[var(--text-secondary)] whitespace-nowrap">
                      <span className="text-[var(--accent-primary)] font-bold">
                        {filteredRobots.length}
                      </span>{" "}
                      robot{filteredRobots.length !== 1 ? "s" : ""}
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={() => {
                          setWeightClassFilter("All");
                          setStatusFilter("All");
                        }}
                        className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] hover:text-white transition-colors whitespace-nowrap"
                      >
                        <X className="w-3.5 h-3.5" />
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Robot Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRobots.map((robot, index) => {
                const robotWinRate = Math.round(
                  (robot.wins / (robot.wins + robot.losses)) * 100
                );

                return (
                  <Link
                    key={robot.slug}
                    href={`/robots/${robot.slug}`}
                    className="block group"
                    style={{
                      animationDelay: `${(index % 6) * 100}ms`,
                    }}
                  >
                    <div className="relative animate-fade-in-up">
                      {/* Offset background */}
                      <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />

                      <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                        {/* Robot Image */}
                        <div className="relative aspect-[4/3] bg-[var(--bg-secondary)] overflow-hidden">
                          {robot.imageUrl ? (
                            <Image
                              src={robot.imageUrl}
                              alt={robot.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 border-2 border-[var(--accent-primary)]/50 flex items-center justify-center">
                                <span className="text-[var(--accent-primary)] font-mono text-2xl font-bold">
                                  {robot.name.charAt(0)}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Status Badge */}
                          <div className="absolute top-3 left-3 z-20">
                            <span
                              className={`px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider ${
                                robot.status === "Active"
                                  ? "bg-green-500 text-black"
                                  : "bg-white/20 text-white"
                              }`}
                            >
                              {robot.status}
                            </span>
                          </div>

                          {/* Number badge */}
                          <div className="absolute bottom-3 right-3 z-20 bg-[var(--accent-primary)] px-2 py-1">
                            <span className="text-black font-mono text-xs font-bold">
                              #{String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        {/* Robot Info */}
                        <div className="p-5">
                          {/* Name and Weight Class */}
                          <div className="mb-4">
                            <h3 className="text-xl font-black font-mono tracking-tight text-white group-hover:text-[var(--accent-primary)] transition-colors">
                              {robot.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                                {robot.weightClass}
                              </span>
                              <span className="text-[var(--text-muted)]">•</span>
                              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                                {robot.weight}
                              </span>
                            </div>
                          </div>

                          {/* Stats Row */}
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="border border-white/10 p-2 bg-black/30 text-center">
                              <div className="text-lg font-black font-mono text-white">
                                {robot.wins}
                              </div>
                              <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">
                                Wins
                              </div>
                            </div>
                            <div className="border border-white/10 p-2 bg-black/30 text-center">
                              <div className="text-lg font-black font-mono text-white">
                                {robot.losses}
                              </div>
                              <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">
                                Losses
                              </div>
                            </div>
                            <div className="border border-white/10 p-2 bg-black/30 text-center">
                              <div className="text-lg font-black font-mono text-[var(--accent-primary)]">
                                {robotWinRate}%
                              </div>
                              <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">
                                Win Rate
                              </div>
                            </div>
                          </div>

                          {/* Archetype */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-[var(--accent-primary)]" />
                              <span className="text-sm font-mono text-[var(--text-secondary)]">
                                {robot.archetype}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[var(--accent-primary)] group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* No Results Message */}
            {filteredRobots.length === 0 && (
              <div className="relative mt-8">
                <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5" />
                <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-[var(--accent-primary)]/50 flex items-center justify-center">
                    <X className="w-8 h-8 text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="text-2xl font-black font-mono tracking-tight text-white mb-2">
                    No Robots Found
                  </h3>
                  <p className="text-sm font-mono text-[var(--text-secondary)] mb-6">
                    No robots match your current filters
                  </p>
                  <button
                    onClick={() => {
                      setWeightClassFilter("All");
                      setStatusFilter("All");
                    }}
                    className="px-6 py-3 border-2 border-[var(--accent-primary)] font-mono uppercase tracking-wider bg-[var(--accent-primary)] text-black font-bold hover:bg-transparent hover:text-[var(--accent-primary)] transition-all duration-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
