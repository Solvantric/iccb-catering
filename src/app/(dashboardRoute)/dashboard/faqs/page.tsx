"use client";

import React, { useEffect, useState } from "react";
import { faqService } from "@/services/contentServices";
import { FAQ } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { SampleBadge } from "@/components/ui/Badge";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { Plus, Search, Trash2, HelpCircle, Edit2 } from "lucide-react";
import { toast } from "sonner";

export default function FAQManagementPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [isAdding, setIsAdding] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<FAQ | null>(null);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "General" as FAQ["category"],
  });

  const loadFaqs = async () => {
    try {
      setLoading(true);
      const data = await faqService.list();
      setFaqs(data);
    } catch {
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "All" || f.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question || !form.answer) {
      toast.error("Please fill both question and answer");
      return;
    }

    try {
      const created = await faqService.create(form);
      setFaqs([...faqs, created]);
      setForm({ question: "", answer: "", category: "General" });
      setIsAdding(false);
      toast.success("FAQ created");
    } catch {
      toast.error("Failed to create FAQ");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await faqService.delete(deleteTarget.id);
      setFaqs((prev) => prev.filter((f) => f.id !== deleteTarget.id));
      toast.success("FAQ deleted");
    } catch {
      toast.error("Failed to delete FAQ");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 font-semibold border border-brand-100">
              {faqs.length} Questions
            </span>
          </div>
          <p className="text-sm text-ink-600 mt-1">
            Questions displayed on the public FAQ page and homepage accordion
          </p>
        </div>

        <Button
          onClick={() => setIsAdding(!isAdding)}
          size="sm"
          className="gap-1.5 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <Plus className="w-4 h-4" />
          {isAdding ? "Cancel" : "Add Question"}
        </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-brand-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-ink-950">New FAQ Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-ink-700 mb-1">Question *</label>
              <Input
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                placeholder="e.g. Can ICCB cater outside its 4 Bashundhara convention halls?"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Category</label>
              <Select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as FAQ["category"] })}
                options={[
                  { value: "General", label: "General" },
                  { value: "Booking & Payment", label: "Booking & Payment" },
                  { value: "Menu & Tasting", label: "Menu & Tasting" },
                  { value: "Logistics", label: "Logistics" },
                  { value: "Venues", label: "Venues" },
                ]}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Answer *</label>
            <Textarea
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              rows={4}
              placeholder="Provide a detailed, helpful answer..."
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white">
              Save FAQ
            </Button>
          </div>
        </form>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-ink-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <Input
            placeholder="Search questions or answers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCat === cat
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-ink-50 text-ink-600 hover:bg-ink-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="p-12 text-center text-ink-400">Loading FAQs...</div>
      ) : filteredFaqs.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-ink-200 p-12 text-center">
          <HelpCircle className="w-12 h-12 text-ink-300 mx-auto mb-3" />
          <h3 className="font-semibold text-ink-950">No questions found</h3>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-ink-100 shadow-sm divide-y divide-ink-100">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="p-5 flex items-start justify-between gap-4 hover:bg-ink-50/50 transition-colors">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-ink-100 text-ink-600">
                    {faq.category}
                  </span>
                  {faq.isSample && <SampleBadge />}
                </div>
                <h3 className="font-bold text-ink-950 text-base">{faq.question}</h3>
                <p className="text-xs text-ink-600 leading-relaxed">{faq.answer}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setDeleteTarget(faq)}
                  className="p-1.5 text-ink-400 hover:text-red-600 rounded-lg transition-colors"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Question"
        message={`Are you sure you want to delete "${deleteTarget?.question}"?`}
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
