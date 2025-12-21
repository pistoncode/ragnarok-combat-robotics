import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackground from "@/components/layout/GridBackground";
import FadeIn from "@/components/animations/FadeIn";
import { robots, getRobotBySlug } from "@/lib/data/robots";
import { competitions } from "@/lib/data/competitions";

interface RobotDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return robots.map((robot) => ({
    slug: robot.slug,
  }));
}

export default async function RobotDetailPage({ params }: RobotDetailPageProps) {
  const { slug } = await params;
  const robot = getRobotBySlug(slug);

  if (!robot) {
    notFound();
  }

  // Get competitions this robot participated in
  const robotCompetitions = competitions.filter((comp) =>
    comp.results.some((result) => result.robotSlug === robot.slug)
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <GridBackground />
      <Navbar />

      <main className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <FadeIn>
            <div className="mb-8">
              <Link
                href="/robots"
                className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Robots
              </Link>
            </div>
          </FadeIn>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Robot Image */}
            <FadeIn direction="left">
              <div className="relative">
                {/* Offset background */}
                <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5" />
                <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm h-96 lg:h-[500px] overflow-hidden">
                  {robot.imageUrl ? (
                    <Image
                      src={robot.imageUrl}
                      alt={robot.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 border-2 border-[var(--accent-primary)]/50 flex items-center justify-center">
                        <span className="text-[var(--accent-primary)] font-mono text-6xl font-black">
                          {robot.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* Robot Info */}
            <FadeIn direction="right">
              <div className="space-y-6">
                {/* Title and Badges */}
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mono tracking-tighter text-[var(--text-primary)] mb-4">
                    {robot.name}
                  </h1>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="px-3 py-1.5 border border-[var(--accent-primary)] bg-[var(--accent-primary)] text-black text-xs font-mono font-bold uppercase tracking-wider">
                      {robot.weightClass}
                    </span>
                    <span
                      className={`px-3 py-1.5 border text-xs font-mono font-bold uppercase tracking-wider ${
                        robot.status === "Active"
                          ? "border-green-500 bg-green-500 text-black"
                          : "border-white/20 bg-white/20 text-white"
                      }`}
                    >
                      {robot.status}
                    </span>
                  </div>
                </div>

                {/* Win/Loss Record */}
                <div className="relative">
                  <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5" />
                  <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm p-6">
                    <h3 className="text-xs font-mono text-[var(--text-muted)] mb-3 uppercase tracking-wider">
                      Competition Record
                    </h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-black font-mono text-[var(--text-primary)]">
                        {robot.wins}
                      </span>
                      <span className="text-xl text-[var(--text-secondary)] font-mono">-</span>
                      <span className="text-4xl font-black font-mono text-[var(--text-primary)]">
                        {robot.losses}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                      Win Rate:{" "}
                      <span className="text-[var(--accent-primary)] font-bold">
                        {((robot.wins / (robot.wins + robot.losses)) * 100).toFixed(1)}%
                      </span>
                    </p>
                  </div>
                </div>

                {/* Archetype */}
                <div className="relative">
                  <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5" />
                  <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm p-4 flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-[var(--accent-primary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <div>
                      <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                        Archetype
                      </p>
                      <p className="text-lg font-black font-mono text-[var(--text-primary)]">
                        {robot.archetype}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-primary)]" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-primary)]" />
                  <div className="border border-white/10 p-6 bg-black/50">
                    <p className="text-base font-mono text-[var(--text-secondary)] leading-relaxed">
                      {robot.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Technical Specifications Section */}
          <FadeIn delay={0.2}>
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-[var(--accent-primary)]" />
                <h2 className="text-3xl md:text-4xl font-black font-mono tracking-tighter text-[var(--text-primary)]">
                  Technical Specifications
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Specs Table */}
                <div className="relative">
                  <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5" />
                  <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm p-6">
                    <h3 className="text-lg font-black font-mono text-[var(--text-primary)] mb-4 uppercase tracking-wider">
                      Specifications
                    </h3>
                    <dl className="space-y-3">
                      {/* Weight from top-level field */}
                      <div className="flex justify-between py-2 border-b border-white/10">
                        <dt className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">Weight</dt>
                        <dd className="text-base font-black font-mono text-[var(--text-primary)]">
                          {robot.weight}
                        </dd>
                      </div>
                      {/* Dynamic specs from array */}
                      {robot.specs.map((spec, index) => (
                        <div
                          key={index}
                          className={`flex justify-between py-2 ${
                            index < robot.specs.length - 1
                              ? "border-b border-white/10"
                              : ""
                          }`}
                        >
                          <dt className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                            {spec.label}
                          </dt>
                          <dd className="text-base font-black font-mono text-[var(--text-primary)]">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                {/* Materials Used */}
                <div className="relative">
                  <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5" />
                  <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm p-6">
                    <h3 className="text-lg font-black font-mono text-[var(--text-primary)] mb-4 uppercase tracking-wider">
                      Materials Used
                    </h3>
                    <ul className="space-y-2">
                      {robot.materials.map((material, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-[var(--text-secondary)] font-mono text-sm"
                        >
                          <span className="text-[var(--accent-primary)] mt-0.5">■</span>
                          <span>{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Design Evolution Section */}
          <FadeIn delay={0.3}>
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-[var(--accent-primary)]" />
                <h2 className="text-3xl md:text-4xl font-black font-mono tracking-tighter text-[var(--text-primary)]">
                  Design Evolution
                </h2>
              </div>

              {/* Placeholder Gallery Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="relative group">
                    <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
                    <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm aspect-square flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-[var(--accent-primary)]/20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5" />
                  <div className="relative border border-white/10 bg-black/50 px-6 py-3">
                    <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                      CAD renders and build photos coming soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Competition History Section */}
          {robotCompetitions.length > 0 && (
            <FadeIn delay={0.4}>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-[var(--accent-primary)]" />
                  <h2 className="text-3xl md:text-4xl font-black font-mono tracking-tighter text-[var(--text-primary)]">
                    Competition History
                  </h2>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5" />
                  <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left py-4 px-6 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                              Competition
                            </th>
                            <th className="text-left py-4 px-6 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                              Date
                            </th>
                            <th className="text-left py-4 px-6 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                              Location
                            </th>
                            <th className="text-left py-4 px-6 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                              Placement
                            </th>
                            <th className="text-left py-4 px-6 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                              Record
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {robotCompetitions.map((comp) => {
                            const result = comp.results.find(
                              (r) => r.robotSlug === robot.slug
                            );
                            if (!result) return null;

                            return (
                              <tr
                                key={comp.slug}
                                className="border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors"
                              >
                                <td className="py-4 px-6">
                                  <Link
                                    href={`/competitions/${comp.slug}`}
                                    className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-mono font-bold transition-colors"
                                  >
                                    {comp.name}
                                  </Link>
                                </td>
                                <td className="py-4 px-6 text-sm font-mono text-[var(--text-secondary)]">
                                  {comp.date}
                                </td>
                                <td className="py-4 px-6 text-sm font-mono text-[var(--text-secondary)]">
                                  {comp.location}
                                </td>
                                <td className="py-4 px-6">
                                  <span
                                    className={`inline-block px-3 py-1 border text-xs font-mono font-bold uppercase tracking-wider ${
                                      result.placement.includes("1st")
                                        ? "border-yellow-500 bg-yellow-500 text-black"
                                        : result.placement.includes("2nd")
                                        ? "border-gray-400 bg-gray-400 text-black"
                                        : result.placement.includes("3rd")
                                        ? "border-orange-500 bg-orange-500 text-black"
                                        : "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-black"
                                    }`}
                                  >
                                    {result.placement}
                                  </span>
                                </td>
                                <td className="py-4 px-6 text-[var(--text-primary)] font-black font-mono">
                                  {result.wins}-{result.losses}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
