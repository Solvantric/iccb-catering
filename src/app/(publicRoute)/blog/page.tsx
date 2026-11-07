import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { formatLongDate } from "@/lib/format";
import { generatePageMetadata } from "@/lib/seo";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { PLACEHOLDER_BLUR } from "@/data/images";

export const metadata: Metadata = generatePageMetadata({
  title: "Catering & Banquet Insights Blog | ICCB Catering",
  description:
    "Expert catering guides, wedding menu planning tips, Mughal culinary history, and food safety standards from ICCB Catering Dhaka.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white py-16 sm:py-20 relative text-center border-b border-ink-100 dark:border-white/10 transition-colors">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Blog" }]} />
          </div>
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-semibold block">
            ~ Culinary Insights & Guides ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-ink-950 dark:text-white">
            THE ICCB BANQUET JOURNAL
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Read about the heritage of Dhakai Kacchi, corporate catering best practices, and the laboratory food hygiene science powering South Asia&apos;s largest venue.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-ink-100 shadow-soft flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all group text-left"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={PLACEHOLDER_BLUR}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-brand-500 text-white shadow-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Article Header & Excerpt */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[11px] text-ink-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-500" />
                      {formatLongDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-display font-bold text-lg uppercase text-ink-950 group-hover:text-brand-600 transition-colors leading-snug">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-ink-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Read More */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-ink-100 mt-2">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-brand-200">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs font-semibold text-ink-800">{post.author.name}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

