"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MENU_ITEMS } from "@/data/menu";
import { PACKAGES } from "@/data/packages";
import { SERVICES } from "@/data/services";
import { BLOG_POSTS } from "@/data/blog";
import { FAQS } from "@/data/faqs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/format";
import { Search, ArrowRight, Utensils, PackageCheck, Briefcase, BookOpen, HelpCircle } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const dishes = MENU_ITEMS.filter((m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    const packages = PACKAGES.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    const services = SERVICES.filter((s) => s.title.toLowerCase().includes(q) || s.shortDesc.toLowerCase().includes(q));
    const blog = BLOG_POSTS.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));
    const faqs = FAQS.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));

    return { dishes, packages, services, blog, faqs };
  }, [query]);

  const totalCount = results
    ? results.dishes.length +
      results.packages.length +
      results.services.length +
      results.blog.length +
      results.faqs.length
    : 0;

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        <Breadcrumbs items={[{ label: "Site Search" }]} />

        <div className="space-y-3">
          <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
            SEARCH THE ICCB CATERING PORTAL
          </h1>
          <p className="text-xs text-ink-500">
            Search across our culinary dishes, banquet packages, catering services, articles, and FAQs.
          </p>
        </div>

        {/* Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Type your search query (e.g. Kacchi, Corporate, Slaughterhouse, Wedding, Borhani)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 text-sm rounded-2xl border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-soft"
            autoFocus
          />
          <Search className="w-5 h-5 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-8 pt-4">
            <p className="text-xs text-ink-500 font-semibold uppercase tracking-wider">
              Found {totalCount} result{totalCount === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
            </p>

            {/* Dishes */}
            {results.dishes.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-display font-bold text-base uppercase text-brand-600 flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  <span>Menu Dishes ({results.dishes.length})</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.dishes.map((d) => (
                    <Link
                      key={d.id}
                      href={`/menu/${d.slug}`}
                      className="p-4 rounded-xl border border-ink-100 hover:border-brand-300 hover:bg-brand-50/30 transition-all flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-display font-bold text-sm uppercase text-ink-950">{d.name}</h4>
                        <p className="text-[11px] text-ink-500 line-clamp-1">{d.description}</p>
                      </div>
                      <span className="font-display font-bold text-sm text-brand-600 shrink-0 ml-3">
                        {formatCurrency(d.price)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Packages */}
            {results.packages.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-display font-bold text-base uppercase text-brand-600 flex items-center gap-2">
                  <PackageCheck className="w-4 h-4" />
                  <span>Banquet Packages ({results.packages.length})</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.packages.map((p) => (
                    <Link
                      key={p.id}
                      href={`/packages/${p.slug}`}
                      className="p-4 rounded-xl border border-ink-100 hover:border-brand-300 hover:bg-brand-50/30 transition-all flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-display font-bold text-sm uppercase text-ink-950">{p.name}</h4>
                        <p className="text-[11px] text-ink-500 line-clamp-1">{p.tagline}</p>
                      </div>
                      <span className="font-display font-bold text-sm text-brand-600 shrink-0 ml-3">
                        {formatCurrency(p.pricePerHead)}/hd
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {results.services.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-display font-bold text-base uppercase text-brand-600 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Catering Services ({results.services.length})</span>
                </h3>
                <div className="space-y-2">
                  {results.services.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.slug}`}
                      className="block p-4 rounded-xl border border-ink-100 hover:border-brand-300 hover:bg-brand-50/30 transition-all"
                    >
                      <h4 className="font-display font-bold text-sm uppercase text-ink-950">{s.title}</h4>
                      <p className="text-xs text-ink-600 mt-0.5">{s.shortDesc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Blog */}
            {results.blog.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-display font-bold text-base uppercase text-brand-600 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Articles & News ({results.blog.length})</span>
                </h3>
                <div className="space-y-2">
                  {results.blog.map((b) => (
                    <Link
                      key={b.id}
                      href={`/blog/${b.slug}`}
                      className="block p-4 rounded-xl border border-ink-100 hover:border-brand-300 hover:bg-brand-50/30 transition-all"
                    >
                      <h4 className="font-display font-bold text-sm uppercase text-ink-950">{b.title}</h4>
                      <p className="text-xs text-ink-600 mt-0.5">{b.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {results.faqs.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-display font-bold text-base uppercase text-brand-600 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>FAQs ({results.faqs.length})</span>
                </h3>
                <div className="space-y-2">
                  {results.faqs.map((f) => (
                    <div key={f.id} className="p-4 rounded-xl border border-ink-100 bg-ink-50/50">
                      <h4 className="font-display font-bold text-xs uppercase text-ink-950">{f.question}</h4>
                      <p className="text-xs text-ink-600 mt-1">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

