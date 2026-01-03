"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TransactionForm from "@/components/TransactionForm";
import AssetForm from "@/components/AssetForm";
import { Transaction, Asset } from "@/lib/db";
import { banks } from "@/lib/banks";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [activeTab, setActiveTab] = useState<"transactions" | "assets" | "reports">("transactions");
  const [reportType, setReportType] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily");
  const [reportDate, setReportDate] = useState(new Date().toISOString().split("T")[0]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check");
        if (!res.ok) {
          router.push("/");
        }
      } catch (error) {
        router.push("/");
      }
    };
    checkAuth();
  }, [router]);

  const loadData = async () => {
    try {
      const [transRes, assetsRes] = await Promise.all([
        fetch("/api/transactions"),
        fetch("/api/assets"),
      ]);

      if (transRes.ok) {
        const data = await transRes.json();
        setTransactions(data.sort((a: Transaction, b: Transaction) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ));
      }

      if (assetsRes.ok) {
        const data = await assetsRes.json();
        setAssets(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    document.cookie = "auth_token=; max-age=0";
    router.push("/");
  };

  const handleDeleteAsset = async (assetId: string) => {
    if (confirm("Hapus aset ini?")) {
      try {
        await fetch("/api/assets", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assetId }),
        });
        loadData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const totalAssets = assets.reduce((sum, a) => sum + a.amount, 0);
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">FinanceFlow</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-lg border border-red-500/50 transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total Aset</p>
                <p className="text-3xl font-bold text-blue-100 mt-2">Rp {totalAssets.toLocaleString("id-ID")}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm font-medium">Total Pemasukan</p>
                <p className="text-3xl font-bold text-green-100 mt-2">Rp {totalIncome.toLocaleString("id-ID")}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-200 text-sm font-medium">Total Pengeluaran</p>
                <p className="text-3xl font-bold text-red-100 mt-2">Rp {totalExpense.toLocaleString("id-ID")}</p>
              </div>
              <div className="w-12 h-12 bg-red-500/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-lg border border-white/10 w-fit">
          {[
            { id: "transactions", label: "Transaksi", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
            { id: "assets", label: "Aset", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            { id: "reports", label: "Laporan", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "transactions" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <TransactionForm onSuccess={loadData} />
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-white">Riwayat Transaksi</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition ${viewMode === "list" ? "bg-purple-500/30 text-purple-300" : "text-white/50 hover:text-white"}`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition ${viewMode === "grid" ? "bg-purple-500/30 text-purple-300" : "text-white/50 hover:text-white"}`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V3zM11 3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V3zM19 3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V3zM3 11a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM11 11a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM19 11a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM3 19a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM11 19a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM19 19a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className={viewMode === "list" ? "divide-y divide-white/10 max-h-96 overflow-y-auto" : "grid grid-cols-2 gap-3 p-4 max-h-96 overflow-y-auto"}>
                  {transactions.length === 0 ? (
                    <p className="p-4 text-white/50">Belum ada transaksi</p>
                  ) : viewMode === "list" ? (
                    transactions.map((t) => (
                      <div key={t.id} className="p-4 hover:bg-white/5 transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-white">{t.category}</p>
                            <p className="text-sm text-white/60">{t.description}</p>
                            <p className="text-xs text-white/40">
                              {banks[t.bank as keyof typeof banks]?.name} • {format(new Date(t.date), "dd MMM yyyy", { locale: id })}
                            </p>
                          </div>
                          <p className={`font-semibold ${t.type === "income" ? "text-green-400" : "text-red-400"}`}>
                            {t.type === "income" ? "+" : "-"} Rp {t.amount.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    transactions.map((t) => (
                      <div key={t.id} className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition">
                        <div className="flex items-start justify-between mb-2">
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${t.type === "income" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                            {t.type === "income" ? "Pemasukan" : "Pengeluaran"}
                          </span>
                          <p className={`font-semibold text-sm ${t.type === "income" ? "text-green-400" : "text-red-400"}`}>
                            {t.type === "income" ? "+" : "-"} Rp {t.amount.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <p className="font-medium text-white text-sm">{t.category}</p>
                        <p className="text-xs text-white/50 mt-1">{banks[t.bank as keyof typeof banks]?.name}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "assets" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <AssetForm onSuccess={loadData} />
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h2 className="text-lg font-semibold text-white">Daftar Aset</h2>
                </div>
                <div className={viewMode === "list" ? "divide-y divide-white/10" : "grid grid-cols-2 gap-3 p-4"}>
                  {assets.length === 0 ? (
                    <p className="p-4 text-white/50">Belum ada aset</p>
                  ) : viewMode === "list" ? (
                    assets.map((a) => (
                      <div key={a.id} className="p-4 hover:bg-white/5 transition flex justify-between items-center">
                        <div>
                          <p className="font-medium text-white">{a.name}</p>
                          <p className="text-sm text-white/60">{banks[a.bank as keyof typeof banks]?.name}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-semibold text-white">Rp {a.amount.toLocaleString("id-ID")}</p>
                          <button
                            onClick={() => handleDeleteAsset(a.id)}
                            className="text-red-400 hover:text-red-300 text-sm transition"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    assets.map((a) => (
                      <div key={a.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition">
                        <div className="flex justify-between items-start mb-3">
                          <p className="font-medium text-white">{a.name}</p>
                          <button
                            onClick={() => handleDeleteAsset(a.id)}
                            className="text-red-400 hover:text-red-300 transition"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-white/60 mb-2">{banks[a.bank as keyof typeof banks]?.name}</p>
                        <p className="font-semibold text-white">Rp {a.amount.toLocaleString("id-ID")}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Laporan Keuangan</h2>
            <div className="flex gap-4 mb-6">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="daily" className="bg-slate-900">Harian</option>
                <option value="weekly" className="bg-slate-900">Mingguan</option>
                <option value="monthly" className="bg-slate-900">Bulanan</option>
                <option value="yearly" className="bg-slate-900">Tahunan</option>
              </select>
              <input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6">
                <p className="text-green-200 text-sm font-medium">Pemasukan</p>
                <p className="text-3xl font-bold text-green-100 mt-2">
                  Rp {transactions
                    .filter((t) => t.type === "income")
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString("id-ID")}
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-xl p-6">
                <p className="text-red-200 text-sm font-medium">Pengeluaran</p>
                <p className="text-3xl font-bold text-red-100 mt-2">
                  Rp {transactions
                    .filter((t) => t.type === "expense")
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString("id-ID")}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
                <p className="text-blue-200 text-sm font-medium">Saldo</p>
                <p className="text-3xl font-bold text-blue-100 mt-2">
                  Rp {(transactions
                    .filter((t) => t.type === "income")
                    .reduce((sum, t) => sum + t.amount, 0) -
                    transactions
                      .filter((t) => t.type === "expense")
                      .reduce((sum, t) => sum + t.amount, 0))
                    .toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
