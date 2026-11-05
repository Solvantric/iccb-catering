import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { formatLongDate } from "@/lib/format";
import { generatePageMetadata } from "@/lib/seo";
import { Calendar, Clock, Share2, ArrowLeft, ArrowRight } from "lucide-react";
import { PLACEHOLDER_BLUR } from "@/data/images";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return generatePageMetadata({
    title: `${post.title} | ICCB Catering Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
  });
}

export default function BlogPostDetailPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "ICCB Catering",
      url: "https://iccbcatering.com",
    },
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="bg-ink-950 text-white py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-400 bg-brand-950/80 border border-brand-800 px-3 py-1 rounded-full inline-block">
            {post.category}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-xs text-ink-300 pt-2">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-brand-200">
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white leading-tight">{post.author.name}</p>
                <p className="text-[10px] text-ink-400">{post.author.role}</p>
              </div>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-400" />
              <span>{formatLongDate(post.publishedAt)}</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="relative h-[360px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            placeholder="blur"
            blurDataURL={PLACEHOLDER_BLUR}
            className="object-cover"
          />
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left space-y-6 text-sm text-ink-800 leading-relaxed">
        <div className="p-6 bg-brand-50 border-l-4 border-brand-500 rounded-r-2xl italic text-ink-700 text-sm">
          {post.excerpt}
        </div>

        <div className="prose prose-brand max-w-none space-y-6">
          {post.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className="font-display font-black text-2xl uppercase tracking-wide text-ink-950 pt-4"
                >
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("1. ") || paragraph.startsWith("2. ") || paragraph.startsWith("3. ")) {
              return (
                <div key={idx} className="p-4 bg-ink-50 rounded-xl border border-ink-100 text-xs">
                  {paragraph}
                </div>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* Tags */}
        <div className="pt-8 border-t border-ink-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-ink-400 uppercase tracking-wider mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-ink-100 text-ink-700 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-brand-50/50 py-16 border-t border-brand-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h3 className="font-display font-black text-2xl uppercase text-ink-950 text-center">
            RELATED ARTICLES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-2xl p-6 border border-ink-100 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-brand-600 block mb-1">
                    {rel.category}
                  </span>
                  <Link href={`/blog/${rel.slug}`}>
                    <h4 className="font-display font-bold text-base uppercase text-ink-950 hover:text-brand-600 transition-colors">
                      {rel.title}
                    </h4>
                  </Link>
                  <p className="text-xs text-ink-500 line-clamp-2 mt-2">{rel.excerpt}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-ink-100">
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

