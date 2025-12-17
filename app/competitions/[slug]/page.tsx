import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Building2, Trophy, Award, Video } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackground from "@/components/layout/GridBackground";
import FadeIn from "@/components/animations/FadeIn";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getCompetitionBySlug, getAllCompetitionSlugs } from "@/lib/data/competitions";

interface CompetitionDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllCompetitionSlugs().map((slug) => ({
    slug,
  }));
}

export default async function CompetitionDetailPage({ params }: CompetitionDetailPageProps) {
  const { slug } = await params;
  const competition = getCompetitionBySlug(slug);

  if (!competition) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const totalWins = competition.results.reduce((sum, result) => sum + result.wins, 0);
  const totalLosses = competition.results.reduce((sum, result) => sum + result.losses, 0);
  const totalMatches = totalWins + totalLosses;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <GridBackground />
      <Navbar />

      <main className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <FadeIn>
            <div className="mb-8">
              <Link
                href="/competitions"
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
                Back to Competitions
              </Link>
            </div>
          </FadeIn>

          {/* Event Header */}
          <FadeIn>
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {competition.name}
              </h1>

              <div className="flex flex-wrap gap-6 text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>{formatDate(competition.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>{competition.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={20} />
                  <span>{competition.organizer}</span>
                </div>
              </div>

              <p className="text-lg text-[var(--text-secondary)] mt-6 max-w-4xl">
                {competition.description}
              </p>
            </div>
          </FadeIn>

          {/* Competition Overview Stats */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <Card>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">
                    {competition.robotsEntered.length}
                  </div>
                  <div className="text-sm uppercase tracking-wider text-[var(--text-secondary)]">
                    Robots Entered
                  </div>
                </div>
              </Card>
              <Card>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">
                    {totalMatches}
                  </div>
                  <div className="text-sm uppercase tracking-wider text-[var(--text-secondary)]">
                    Total Matches
                  </div>
                </div>
              </Card>
              <Card>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">
                    {totalWins}-{totalLosses}
                  </div>
                  <div className="text-sm uppercase tracking-wider text-[var(--text-secondary)]">
                    Team Record
                  </div>
                </div>
              </Card>
            </div>
          </FadeIn>

          {/* Results Summary */}
          <FadeIn delay={0.2}>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
                <Trophy className="text-[var(--accent-primary)]" />
                Results Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {competition.results.map((result, index) => (
                  <Card key={index}>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-2xl font-bold capitalize">
                          {result.robotSlug}
                        </h3>
                        <Award className="text-[var(--accent-secondary)]" size={24} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--text-secondary)]">Placement</span>
                          <Badge
                            variant={
                              result.placement.includes('1st')
                                ? 'weightClass'
                                : 'default'
                            }
                          >
                            {result.placement}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-[var(--text-secondary)]">Record</span>
                          <span className="font-bold">
                            {result.wins}W - {result.losses}L
                          </span>
                        </div>

                        {result.wins + result.losses > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-[var(--text-secondary)]">Win Rate</span>
                            <span className="text-[var(--accent-primary)] font-semibold">
                              {Math.round((result.wins / (result.wins + result.losses)) * 100)}%
                            </span>
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/robots/${result.robotSlug}`}
                        className="block w-full px-4 py-2 text-center bg-[var(--bg-tertiary)] hover:bg-[var(--accent-primary)] text-[var(--text-primary)] rounded-lg transition-colors font-medium"
                      >
                        View Robot Details
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Bracket Visualization */}
          <FadeIn delay={0.3}>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Tournament Bracket
              </h2>

              <Card className="text-center py-16">
                <div className="max-w-2xl mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center">
                    <Trophy size={48} className="text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Bracket Visualization Coming Soon
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-6">
                    We're working on an interactive bracket visualization to show the full tournament progression.
                  </p>
                  <div className="inline-block px-4 py-2 bg-[var(--bg-tertiary)] rounded-lg text-sm">
                    <span className="text-[var(--text-secondary)]">Tournament Format: </span>
                    <span className="font-semibold">Single/Double Elimination</span>
                  </div>
                </div>
              </Card>
            </div>
          </FadeIn>

          {/* Match Videos */}
          {competition.videoIds && competition.videoIds.length > 0 && (
            <FadeIn delay={0.4}>
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
                  <Video className="text-[var(--accent-primary)]" />
                  Match Highlights
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {competition.videoIds.map((videoId, index) => (
                    <div key={index}>
                      <VideoEmbed
                        videoId={videoId}
                        title={`${competition.name} - Match ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Event Gallery */}
          <FadeIn delay={0.5}>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Event Gallery
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="aspect-square">
                    <ImagePlaceholder
                      label={`Photo ${item}`}
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg text-[var(--text-secondary)] italic">
                  Event photos and behind-the-scenes content coming soon
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Lessons Learned */}
          <FadeIn delay={0.6}>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Engineering Insights
              </h2>

              <Card className="prose prose-invert max-w-none">
                <div className="space-y-4">
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    Each competition is a learning experience that drives our engineering forward.
                    Key insights from {competition.name}:
                  </p>

                  <ul className="space-y-3 list-none">
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--accent-primary)] mt-1">•</span>
                      <span className="text-[var(--text-secondary)]">
                        Weapon reliability and power management were critical factors in match outcomes
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--accent-primary)] mt-1">•</span>
                      <span className="text-[var(--text-secondary)]">
                        Armor configuration held up well against various attack types
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--accent-primary)] mt-1">•</span>
                      <span className="text-[var(--text-secondary)]">
                        Team coordination and pit crew efficiency improved significantly
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--accent-primary)] mt-1">•</span>
                      <span className="text-[var(--text-secondary)]">
                        Identified areas for improvement in drive system responsiveness
                      </span>
                    </li>
                  </ul>

                  <div className="mt-6 p-4 bg-[var(--bg-tertiary)] rounded-lg border-l-4 border-[var(--accent-primary)]">
                    <p className="text-[var(--text-secondary)] italic">
                      "Competition is where theory meets reality. Every match teaches us something new about design, strategy, and the limits of our machines."
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </FadeIn>

          {/* Call to Action */}
          <FadeIn delay={0.7}>
            <div className="text-center">
              <Card className="max-w-2xl mx-auto bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10">
                <h2 className="text-3xl font-bold mb-4">
                  Follow Our Journey
                </h2>
                <p className="text-[var(--text-secondary)] mb-6">
                  Stay updated on our latest competitions and robot development.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/robots"
                    className="relative inline-block px-8 py-3 border-2 border-[var(--accent-primary)] font-mono uppercase tracking-wider text-[var(--accent-primary)] group overflow-hidden"
                  >
                    {/* Hover background */}
                    <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    {/* Content */}
                    <span className="relative flex items-center justify-center group-hover:text-black transition-colors">
                      View Our Robots
                    </span>
                  </Link>
                  <Link
                    href="/media"
                    className="relative inline-block px-8 py-3 border-2 border-white/30 font-mono uppercase tracking-wider text-white group overflow-hidden"
                  >
                    {/* Hover background */}
                    <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    {/* Content */}
                    <span className="relative flex items-center justify-center group-hover:text-black transition-colors">
                      Watch More Videos
                    </span>
                  </Link>
                </div>
              </Card>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
