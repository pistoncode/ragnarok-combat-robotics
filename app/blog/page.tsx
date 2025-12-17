import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackground from "@/components/layout/GridBackground";
import FadeIn from "@/components/animations/FadeIn";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { blogPosts } from "@/lib/data/blog";

export default function BlogPage() {
  // Format date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="relative z-10 min-h-screen bg-[var(--bg-primary)]">

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] mb-6">
              News & Updates
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl">
              Build logs, competition reports, and team updates
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <FadeIn key={post.slug} delay={index * 0.1} direction="up">
                <Link href={`/blog/${post.slug}`}>
                  <article className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg overflow-hidden hover:border-[var(--accent-primary)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_var(--accent-glow)] h-full flex flex-col">
                    {/* Featured Image */}
                    <div className="aspect-video w-full overflow-hidden">
                      {post.imageUrl ? (
                        <div className="w-full h-full bg-[var(--bg-secondary)] flex items-center justify-center">
                          <ImagePlaceholder
                            label={post.title}
                            className="w-full h-full border-0 rounded-none"
                            iconSize={64}
                          />
                        </div>
                      ) : (
                        <ImagePlaceholder
                          label="Blog Post Image"
                          className="w-full h-full border-0 rounded-none"
                          iconSize={64}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Category & Read Time */}
                      <div className="flex items-center gap-3 mb-3">
                        {post.category && (
                          <span className="text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
                            {post.category}
                          </span>
                        )}
                        {post.readTime && (
                          <>
                            <span className="text-[var(--text-muted)]">•</span>
                            <span className="text-xs text-[var(--text-muted)]">
                              {post.readTime} min read
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3 line-clamp-2 hover:text-[var(--accent-primary)] transition-colors">
                        {post.title}
                      </h2>

                      {/* Date */}
                      <p className="text-sm text-[var(--text-muted)] mb-4">
                        {formatDate(post.date)}
                      </p>

                      {/* Excerpt */}
                      <p className="text-[var(--text-secondary)] mb-6 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>

                      {/* Read More Link */}
                      <div className="mt-auto">
                        <span className="inline-flex items-center text-[var(--accent-primary)] font-semibold hover:text-[var(--accent-hover)] transition-colors group">
                          Read More
                          <svg
                            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      </main>
    </>
  );
}
