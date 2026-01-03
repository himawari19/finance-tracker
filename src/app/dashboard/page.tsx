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
  const router = useRouter();

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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pencatat Keuangan</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Aset</p>
            <p className="text-2xl font-bold text-blue-600">Rp {totalAssets.toLocaleString("id-ID")}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Pemasukan</p>
            <p className="text-2xl font-bold text-green-600">Rp {totalIncome.toLocaleString("id-ID")}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Pengeluaran</p>
            <p className="text-2xl font-bold text-red-600">Rp {totalExpense.toLocaleString("id-ID")}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "transactions"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Transaksi
          </button>
          <button
            onClick={() => setActiveTab("assets")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "assets"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Aset
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "reports"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Laporan
          </button>
        </div>

        {activeTab === "transactions" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <TransactionForm onSuccess={loadData} />
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Riwayat Transaksi</h2>
                </div>
                <div className="divide-y max-h-96 overflow-y-auto">
                  {transactions.length === 0 ? (
                    <p className="p-4 text-gray-500">Belum ada transaksi</p>
                  ) : (
                    transactions.map((t) => (
                      <div key={t.id} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{t.category}</p>
                            <p className="text-sm text-gray-600">{t.description}</p>
                            <p className="text-xs text-gray-500">
                              {banks[t.bank as keyof typeof banks]?.name} • {format(new Date(t.date), "dd MMM yyyy", { locale: id })}
                            </p>
                          </div>
                          <p className={`font-semibold ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                            {t.type === "income" ? "+" : "-"} Rp {t.amount.toLocaleString("id-ID")}
                          </p>
                        </div>
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
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Daftar Aset</h2>
                </div>
                <div className="divide-y">
                  {assets.length === 0 ? (
                    <p className="p-4 text-gray-500">Belum ada aset</p>
                  ) : (
                    assets.map((a) => (
                      <div key={a.id} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{a.name}</p>
                          <p className="text-sm text-gray-600">{banks[a.bank as keyof typeof banks]?.name}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-semibold">Rp {a.amount.toLocaleString("id-ID")}</p>
                          <button
                            onClick={() => handleDeleteAsset(a.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Laporan Keuangan</h2>
            <div className="flex gap-4 mb-6">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="daily">Harian</option>
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
                <option value="yearly">Tahunan</option>
              </select>
              <input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Pemasukan</p>
                <p className="text-2xl font-bold text-green-600">
                  Rp {transactions
                    .filter((t) => t.type === "income")
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString("id-ID")}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Pengeluaran</p>
                <p className="text-2xl font-bold text-red-600">
                  Rp {transactions
                    .filter((t) => t.type === "expense")
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString("id-ID")}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Saldo</p>
                <p className="text-2xl font-bold text-blue-600">
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
