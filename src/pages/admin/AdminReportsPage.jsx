import React, { useState, useEffect } from "react";
import { reportService } from "../../services/reportService";
import { useOrders } from "../../context/OrderContext";
import { RevenueBarChart, CategoryShareProgress } from "../../components/admin/SimpleChart";
import { Download, Printer, Calendar, TrendingUp, DollarSign, ShoppingBag, FileSpreadsheet } from "lucide-react";
import { useToast } from "../../context/ToastContext";

export const AdminReportsPage = () => {
  const { orders } = useOrders();
  const { showSuccess } = useToast();
  const [timeRange, setTimeRange] = useState("week");
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [metrics, setMetrics] = useState({ totalSales: 0, todaySales: 0 });

  useEffect(() => {
    reportService.getSummaryMetrics().then(setMetrics);
    reportService.getSalesChartData().then(setChartData);
    reportService.getCategoryBreakdown().then(setCategoryData);
  }, []);

  const handleExportCSV = () => {
    reportService.exportOrdersToCSV(orders);
    showSuccess("Sales report CSV exported successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)" }}>
            Financial Reports & Analytics 📈
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Export commercial summaries, track gross margins, and analyze product popularity.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={handleExportCSV} className="btn btn-outline" style={{ borderRadius: "var(--radius-full)" }}>
            <Download size={16} /> Export Orders CSV
          </button>
          <button onClick={handlePrint} className="btn btn-dark" style={{ borderRadius: "var(--radius-full)" }}>
            <Printer size={16} /> Print Report
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "1.25rem", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Calendar size={18} color="var(--primary)" />
          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Report Date Interval:</span>
        </div>

        <div style={{ display: "flex", gap: "0.4rem" }}>
          {[
            { id: "today", label: "Today" },
            { id: "week", label: "This Week" },
            { id: "month", label: "This Month" },
            { id: "year", label: "Year to Date" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeRange(tab.id)}
              className={`btn btn-sm ${timeRange === tab.id ? "btn-primary" : "btn-outline"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "2rem", marginBottom: "2.5rem" }} className="reports-charts-grid">
        <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "1.75rem", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--dark)", marginBottom: "0.5rem" }}>
            Revenue Trend Overview ($)
          </h3>
          <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Aggregated revenue across dine-in, takeaway, and thermal doorstep deliveries
          </p>
          <RevenueBarChart data={chartData} />
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "1.75rem", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--dark)", marginBottom: "0.5rem" }}>
            Category Contribution
          </h3>
          <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Percentage breakdown of sales by category
          </p>
          <CategoryShareProgress data={categoryData} />
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .reports-charts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
