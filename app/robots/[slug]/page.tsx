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
                className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors inline-flex items-center gap-2"
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
              <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] rounded-xl overflow-hidden border border-[var(--accent-primary)]/20">
                {robot.imageUrl ? (
                  <Image
                    src={robot.imageUrl}
                    alt={robot.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-9xl text-[var(--accent-primary)]/20 font-bold">
                      {robot.name.charAt(0)}
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Robot Info */}
            <FadeIn direction="right">
              <div className="space-y-6">
                {/* Title and Badges */}
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4">
                    {robot.name}
                  </h1>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="px-4 py-2 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 rounded-full text-sm font-semibold text-[var(--accent-primary)]">
                      {robot.weightClass}
                    </span>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        robot.status === "Active"
                          ? "bg-green-500/20 border border-green-500/30 text-green-400"
                          : "bg-gray-500/20 border border-gray-500/30 text-gray-400"
                      }`}
                    >
                      {robot.status}
                    </span>
                  </div>
                </div>

                {/* Win/Loss Record */}
                <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--accent-primary)]/20">
                  <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3 uppercase tracking-wider">
                    Competition Record
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-[var(--text-primary)]">
                      {robot.wins}
                    </span>
                    <span className="text-xl text-[var(--text-secondary)]">-</span>
                    <span className="text-4xl font-bold text-[var(--text-primary)]">
                      {robot.losses}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    Win Rate:{" "}
                    <span className="text-[var(--accent-primary)] font-semibold">
                      {((robot.wins / (robot.wins + robot.losses)) * 100).toFixed(1)}%
                    </span>
                  </p>
                </div>

                {/* Archetype */}
                <div className="flex items-center gap-3 p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--accent-primary)]/20">
                  <svg
                    className="w-6 h-6 text-[var(--accent-secondary)]"
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
                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                      Archetype
                    </p>
                    <p className="text-lg font-semibold text-[var(--text-primary)]">
                      {robot.archetype}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                    {robot.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Technical Specifications Section */}
          <FadeIn delay={0.2}>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8 border-b border-[var(--accent-primary)]/20 pb-4">
                Technical Specifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Specs Table */}
                <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--accent-primary)]/20">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                    Specifications
                  </h3>
                  <dl className="space-y-3">
                    {/* Weight from top-level field */}
                    <div className="flex justify-between py-2 border-b border-[var(--accent-primary)]/10">
                      <dt className="text-[var(--text-secondary)] font-medium">Weight</dt>
                      <dd className="text-[var(--text-primary)] font-semibold">
                        {robot.weight}
                      </dd>
                    </div>
                    {/* Dynamic specs from array */}
                    {robot.specs.map((spec, index) => (
                      <div
                        key={index}
                        className={`flex justify-between py-2 ${
                          index < robot.specs.length - 1
                            ? "border-b border-[var(--accent-primary)]/10"
                            : ""
                        }`}
                      >
                        <dt className="text-[var(--text-secondary)] font-medium">
                          {spec.label}
                        </dt>
                        <dd className="text-[var(--text-primary)] font-semibold">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Materials Used */}
                <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--accent-primary)]/20">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                    Materials Used
                  </h3>
                  <ul className="space-y-2">
                    {robot.materials.map((material, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-[var(--text-secondary)]"
                      >
                        <svg
                          className="w-5 h-5 text-[var(--accent-primary)] mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Design Evolution Section */}
          <FadeIn delay={0.3}>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8 border-b border-[var(--accent-primary)]/20 pb-4">
                Design Evolution
              </h2>

              {/* Placeholder Gallery Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="aspect-square bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] rounded-xl border border-[var(--accent-primary)]/20 flex items-center justify-center"
                  >
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
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg text-[var(--text-secondary)] italic">
                  CAD renders and build photos coming soon
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Competition History Section */}
          {robotCompetitions.length > 0 && (
            <FadeIn delay={0.4}>
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8 border-b border-[var(--accent-primary)]/20 pb-4">
                  Competition History
                </h2>

                <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--accent-primary)]/20 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[var(--accent-primary)]/20">
                          <th className="text-left py-4 px-6 text-[var(--text-secondary)] font-semibold uppercase tracking-wider text-sm">
                            Competition
                          </th>
                          <th className="text-left py-4 px-6 text-[var(--text-secondary)] font-semibold uppercase tracking-wider text-sm">
                            Date
                          </th>
                          <th className="text-left py-4 px-6 text-[var(--text-secondary)] font-semibold uppercase tracking-wider text-sm">
                            Location
                          </th>
                          <th className="text-left py-4 px-6 text-[var(--text-secondary)] font-semibold uppercase tracking-wider text-sm">
                            Placement
                          </th>
                          <th className="text-left py-4 px-6 text-[var(--text-secondary)] font-semibold uppercase tracking-wider text-sm">
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
                              className="border-b border-[var(--accent-primary)]/10 last:border-b-0 hover:bg-[var(--bg-tertiary)] transition-colors"
                            >
                              <td className="py-4 px-6">
                                <Link
                                  href={`/competitions/${comp.slug}`}
                                  className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors"
                                >
                                  {comp.name}
                                </Link>
                              </td>
                              <td className="py-4 px-6 text-[var(--text-secondary)]">
                                {comp.date}
                              </td>
                              <td className="py-4 px-6 text-[var(--text-secondary)]">
                                {comp.location}
                              </td>
                              <td className="py-4 px-6">
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                    result.placement.includes("1st")
                                      ? "bg-yellow-500/20 border border-yellow-500/30 text-yellow-400"
                                      : result.placement.includes("2nd")
                                      ? "bg-gray-400/20 border border-gray-400/30 text-gray-300"
                                      : result.placement.includes("3rd")
                                      ? "bg-orange-500/20 border border-orange-500/30 text-orange-400"
                                      : "bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 text-[var(--accent-primary)]"
                                  }`}
                                >
                                  {result.placement}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-[var(--text-primary)] font-semibold">
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
            </FadeIn>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
