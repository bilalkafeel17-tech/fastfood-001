import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import { useProducts } from "../../context/ProductContext";
import { reportService } from "../../services/reportService";
import { StatCard } from "../../components/admin/StatCard";
import { RevenueBarChart, CategoryShareProgress } from "../../components/admin/SimpleChart";
import { Badge } from "../../components/common/Badge";
import { InvoiceModal } from "../../components/admin/InvoiceModal";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Users,
  UtensilsCrossed,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileText
} from "lucide-react";

export const AdminDashboardPage = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { products } = useProducts();

  const [metrics, setMetrics] = useState({
    totalSales: 0,
    todaySales: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalCustomers: 48,
    totalProducts: 26
  });

  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  useEffect(() => {
    reportService.getSummaryMetrics().then((m) => setMetrics(m));
    reportService.getSalesChartData().then((c) => setChartData(c));
    reportService.getCategoryBreakdown().then((cd) => setCategoryData(cd));
  }, [orders, products]);

  const topSelling = products.filter((p) => p.isBestseller).slice(0, 4);
  const lowStock = products.filter((p) => p.stockCount && p.stockCount <= 30);

  return (
    <div>
      {/* Top Welcome Title */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)" }}>
          Executive Dashboard 📊
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2px" }}>
          Real-time metrics, live order statuses, sales revenue trends, and inventory health.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2.5rem"
        }}
      >
        <StatCard
          title="Total Gross Revenue"
          value={`$${metrics.totalSales > 0 ? metrics.totalSales.toFixed(2) : "18,450.00"}`}
          icon={DollarSign}
          trend="+14.2%"
          trendType="up"
          color="var(--primary)"
          bgColor="var(--primary-light)"
        />
        <StatCard
          title="Today's Sales"
          value={`$${metrics.todaySales ? metrics.todaySales.toFixed(2) : "1,890.00"}`}
          icon={TrendingUp}
          trend="+8.5%"
          trendType="up"
          color="var(--success)"
          bgColor="var(--success-light)"
        />
        <StatCard
          title="Total Orders Placed"
          value={orders.length}
          icon={ShoppingBag}
          trend="+18 orders"
          trendType="up"
          color="var(--secondary)"
          bgColor="var(--secondary-light)"
        />
        <StatCard
          title="Pending / Preparing"
          value={metrics.pendingOrders || orders.filter((o) => o.status === "Pending" || o.status === "Preparing").length}
          icon={Clock}
          color="#D97706"
          bgColor="#FEF3C7"
        />
      </div>

      {/* Charts Section: Weekly Revenue & Category Breakdown */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 0.7fr",
          gap: "1.75rem",
          marginBottom: "2.5rem"
        }}
        className="dashboard-charts-grid"
      >
        {/* Weekly Revenue SVG Chart */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
            padding: "1.75rem",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--dark)" }}>
                Weekly Sales Revenue ($)
              </h3>
              <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>Daily sales performance across all channels</p>
            </div>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)", background: "var(--primary-light)", padding: "4px 10px", borderRadius: "var(--radius-full)" }}>
              Current Week
            </span>
          </div>

          <RevenueBarChart data={chartData} />
        </div>

        {/* Category Share Breakdown */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
            padding: "1.75rem",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--dark)", marginBottom: "4px" }}>
            Sales by Category
          </h3>
          <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Revenue share per food group
          </p>

          <CategoryShareProgress data={categoryData} />
        </div>
      </div>

      {/* Recent Orders Live Table */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-light)",
          padding: "1.75rem",
          boxShadow: "var(--shadow-sm)",
          marginBottom: "2.5rem"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--dark)" }}>
              Recent Orders Feed
            </h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>Manage active live kitchen orders and update status</p>
          </div>
          <Link to="/admin/orders" className="btn btn-outline btn-sm" style={{ borderRadius: "var(--radius-full)" }}>
            View All Orders <ArrowRight size={14} />
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items Ordered</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Change Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map((ord) => (
                <tr key={ord.id}>
                  <td><strong>{ord.id}</strong></td>
                  <td>
                    <div><strong>{ord.customer?.name || "Alex Jordan"}</strong></div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{ord.customer?.phone || "+1 555-912-3456"}</div>
                  </td>
                  <td style={{ fontSize: "0.825rem" }}>
                    {ord.items?.map((i) => `${i.quantity}x ${i.name}`).join(", ") || "Feast"}
                  </td>
                  <td><strong style={{ color: "var(--primary)" }}>${Number(ord.total).toFixed(2)}</strong></td>
                  <td>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: ord.paymentStatus === "Paid" ? "var(--success)" : "var(--warning)" }}>
                      {ord.paymentStatus || "Paid"}
                    </span>
                  </td>
                  <td><Badge type="status" text={ord.status} /></td>
                  <td>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                      style={{
                        padding: "0.35rem 0.6rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-light)",
                        background: "#FFFFFF",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedInvoiceOrder(ord)}
                      className="btn btn-ghost btn-sm"
                      style={{ color: "var(--primary)", padding: "4px 8px" }}
                      title="View & Print Invoice"
                    >
                      <FileText size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Grid: Top Selling Products & Low Stock Alerts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.75rem" }} className="dashboard-bottom-grid">
        {/* Top Selling Dishes */}
        <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "1.75rem", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.25rem" }}>
            Top Selling Menu Items ⭐
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {topSelling.map((prod) => (
              <div key={prod.id} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img src={prod.image} alt={prod.name} style={{ width: "48px", height: "48px", borderRadius: "var(--radius-sm)", objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--dark)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    {prod.name}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    {prod.reviewCount} orders • ⭐ {prod.rating}
                  </div>
                </div>
                <strong style={{ color: "var(--primary)", fontSize: "0.95rem" }}>
                  ${Number(prod.price).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "1.75rem", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <AlertTriangle size={20} color="var(--warning)" />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--dark)", margin: 0 }}>
              Low Stock Warnings ({lowStock.length})
            </h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {lowStock.map((prod) => (
              <div key={prod.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem", borderRadius: "var(--radius-md)", background: "#FFFBEB", border: "1px solid #FDE68A" }}>
                <div>
                  <strong style={{ fontSize: "0.9rem", color: "#92400E" }}>{prod.name}</strong>
                  <div style={{ fontSize: "0.78rem", color: "#B45309" }}>Only {prod.stockCount} portions remaining</div>
                </div>
                <Link to={`/admin/products/edit/${prod.id}`} className="btn btn-outline btn-sm" style={{ background: "#FFFFFF", fontSize: "0.75rem" }}>
                  Restock
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invoice Modal Preview */}
      <InvoiceModal
        order={selectedInvoiceOrder}
        isOpen={Boolean(selectedInvoiceOrder)}
        onClose={() => setSelectedInvoiceOrder(null)}
      />

      <style>{`
        @media (max-width: 960px) {
          .dashboard-charts-grid { grid-template-columns: 1fr !important; }
          .dashboard-bottom-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
