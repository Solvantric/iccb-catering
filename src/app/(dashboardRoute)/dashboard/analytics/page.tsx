"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatCurrencyBDT } from "@/lib/format";
import { TrendingUp, Users, CalendarCheck, Utensils, Award } from "lucide-react";

const MONTHLY_LEADS = [
  { month: "Sep", inquiries: 45, confirmed: 28, revenue: 3800000 },
  { month: "Oct", inquiries: 58, confirmed: 35, revenue: 5200000 },
  { month: "Nov", inquiries: 82, confirmed: 60, revenue: 9400000 },
  { month: "Dec", inquiries: 110, confirmed: 88, revenue: 14500000 },
  { month: "Jan", inquiries: 95, confirmed: 74, revenue: 12200000 },
  { month: "Feb", inquiries: 78, confirmed: 56, revenue: 8900000 },
];

const CUISINE_SHARE = [
  { name: "Local Mughal (Kacchi & Shahi)", value: 58, color: "#DC0511" },
  { name: "Multi-Cuisine Fusion", value: 24, color: "#141416" },
  { name: "Continental & Live Grills", value: 18, color: "#8E8E93" },
];

const TOP_DISHES = [
  { name: "Shahi Kacchi Biryani", orders: 240 },
  { name: "Mutton Rezala", orders: 195 },
  { name: "Chicken Roast Special", orders: 180 },
  { name: "Zafrani Firni", orders: 165 },
  { name: "Grilled Bhekti Fillet", orders: 95 },
];

export default function AnalyticsDashboardPage() {
  const [timeframe, setTimeframe] = useState("6m");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
            HOSPITALITY & REVENUE ANALYTICS
          </h1>
          <p className="text-sm text-ink-600 mt-1">
            Performance metrics, catering lead conversions, and banquet demand
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-ink-100 rounded-lg text-xs font-semibold text-ink-600">
          <button
            onClick={() => setTimeframe("30d")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              timeframe === "30d" ? "bg-white text-ink-950 shadow-sm" : "hover:text-ink-950"
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setTimeframe("6m")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              timeframe === "6m" ? "bg-white text-ink-950 shadow-sm" : "hover:text-ink-950"
            }`}
          >
            6 Months
          </button>
          <button
            onClick={() => setTimeframe("1y")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              timeframe === "1y" ? "bg-white text-ink-950 shadow-sm" : "hover:text-ink-950"
            }`}
          >
            Year 2026
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-ink-100 shadow-sm">
          <div className="flex items-center justify-between text-ink-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Banquet Volume</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-display text-ink-950">৳ 54,000,000</div>
          <p className="text-xs text-emerald-600 mt-1 font-semibold flex items-center gap-1">
            +18.4% vs previous quarter
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ink-100 shadow-sm">
          <div className="flex items-center justify-between text-ink-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Confirmed Bookings</span>
            <CalendarCheck className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-2xl font-bold font-display text-ink-950">341 Events</div>
          <p className="text-xs text-ink-500 mt-1">Across 4 Bashundhara Halls + Off-site</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ink-100 shadow-sm">
          <div className="flex items-center justify-between text-ink-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Guests Served</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-display text-ink-950">142,500+</div>
          <p className="text-xs text-ink-500 mt-1">Capacity 10,000+ at a single time</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ink-100 shadow-sm">
          <div className="flex items-center justify-between text-ink-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Conversion Rate</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-display text-ink-950">72.8%</div>
          <p className="text-xs text-ink-500 mt-1">From quotation to banquet confirmation</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-ink-950 text-base">Inquiry & Confirmation Trends</h3>
              <p className="text-xs text-ink-500">Monthly inbound banquet requests vs locked bookings</p>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_LEADS}>
                <defs>
                  <linearGradient id="colorInq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC0511" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#DC0511" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#141416" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#141416" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F2" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#71717A" }} />
                <YAxis tick={{ fontSize: 12, fill: "#71717A" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#141416",
                    border: "none",
                    borderRadius: "8px",
                    color: "#FFF",
                    fontSize: "12px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="inquiries"
                  name="Inquiries"
                  stroke="#DC0511"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorInq)"
                />
                <Area
                  type="monotone"
                  dataKey="confirmed"
                  name="Confirmed"
                  stroke="#141416"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorConf)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cuisine Share Pie */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-ink-950 text-base">Cuisine Share</h3>
            <p className="text-xs text-ink-500">Distribution of banquet menu preferences</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CUISINE_SHARE}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CUISINE_SHARE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-ink-100">
            {CUISINE_SHARE.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-ink-700">{item.name}</span>
                </div>
                <span className="font-bold text-ink-950">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Dishes Bar */}
      <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-ink-950 text-base">Top Requested Signature Dishes</h3>
          <p className="text-xs text-ink-500">Most frequently ordered banquet menu centerpieces</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={TOP_DISHES} layout="vertical" margin={{ left: 40, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F0F2" />
              <XAxis type="number" tick={{ fontSize: 12, fill: "#71717A" }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: "#141416" }} width={140} />
              <Tooltip />
              <Bar dataKey="orders" name="Catered Batches" fill="#DC0511" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

