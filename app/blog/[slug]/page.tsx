"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackground from "@/components/layout/GridBackground";
import FadeIn from "@/components/animations/FadeIn";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getBlogPost, blogPosts } from "@/lib/data/blog";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-[var(--bg-primary)]">
        <GridBackground />
        <Navbar />
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Post Not Found
            </h1>
            <p className="text-[var(--text-secondary)] mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get related posts (exclude current post)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <GridBackground />
      <Navbar />

      {/* Back Link */}
      <section className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn direction="up">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Article Header */}
      <article className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <FadeIn direction="up">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {post.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-sm font-semibold rounded-full">
                  <Tag className="w-3.5 h-3.5" />
                  {post.category}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)] text-sm">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              {post.readTime && (
                <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)] text-sm">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-[var(--text-secondary)] mb-12 leading-relaxed">
              {post.excerpt}
            </p>
          </FadeIn>

          {/* Featured Image */}
          <FadeIn direction="up" delay={0.1}>
            <div className="aspect-video w-full rounded-xl overflow-hidden mb-12 border border-[var(--border)]">
              <ImagePlaceholder
                label={post.title}
                className="w-full h-full border-0 rounded-none"
                iconSize={80}
              />
            </div>
          </FadeIn>

          {/* Article Content */}
          <FadeIn direction="up" delay={0.2}>
            <div className="prose prose-invert prose-lg max-w-none">
              {post.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[var(--text-secondary)] leading-relaxed mb-6 text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>

          {/* Share Section */}
          <FadeIn direction="up" delay={0.3}>
            <div className="mt-16 pt-8 border-t border-[var(--border)]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                    Enjoyed this article?
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    Share it with your fellow robot builders!
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://ragnarokcombat.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors"
                  >
                    Share on X
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]">
          <div className="max-w-4xl mx-auto">
            <FadeIn direction="up">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8">
                More Articles
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <FadeIn key={relatedPost.slug} direction="up" delay={index * 0.1}>
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <article className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg overflow-hidden hover:border-[var(--accent-primary)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_var(--accent-glow)]">
                      <div className="aspect-video w-full overflow-hidden">
                        <ImagePlaceholder
                          label={relatedPost.title}
                          className="w-full h-full border-0 rounded-none"
                          iconSize={48}
                        />
                      </div>
                      <div className="p-5">
                        {relatedPost.category && (
                          <span className="text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
                            {relatedPost.category}
                          </span>
                        )}
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mt-2 line-clamp-2 hover:text-[var(--accent-primary)] transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] mt-2">
                          {formatDate(relatedPost.date)}
                        </p>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
