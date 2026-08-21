import { orderService } from "./orderService";
import { productService } from "./productService";

export const reportService = {
  getSummaryMetrics: async () => {
    const orders = await orderService.getAll();
    const products = await productService.getAll();

    const totalSales = orders.reduce((sum, o) => o.status !== "Cancelled" ? sum + (o.total || 0) : sum, 0);
    const todaySales = orders
      .filter((o) => o.createdAt.startsWith(new Date().toISOString().split("T")[0]) && o.status !== "Cancelled")
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Preparing" || o.status === "Confirmed").length;
    const completedOrders = orders.filter((o) => o.status === "Delivered").length;
    const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;

    return {
      totalSales,
      todaySales: todaySales || 214.80,
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      totalCustomers: 48,
      totalProducts: products.length
    };
  },

  getSalesChartData: async () => {
    return [
      { day: "Mon", sales: 1240, orders: 48 },
      { day: "Tue", sales: 1890, orders: 72 },
      { day: "Wed", sales: 1560, orders: 60 },
      { day: "Thu", sales: 2310, orders: 94 },
      { day: "Fri", sales: 3450, orders: 138 },
      { day: "Sat", sales: 4120, orders: 165 },
      { day: "Sun", sales: 3890, orders: 152 }
    ];
  },

  getCategoryBreakdown: async () => {
    return [
      { category: "Burgers", percentage: 38, revenue: 6420, color: "#E63946" },
      { category: "Pizza", percentage: 24, revenue: 4050, color: "#FFB703" },
      { category: "Fried Chicken", percentage: 18, revenue: 3040, color: "#FB8500" },
      { category: "Combos", percentage: 12, revenue: 2030, color: "#2A9D8F" },
      { category: "Drinks & Desserts", percentage: 8, revenue: 1350, color: "#8338EC" }
    ];
  },

  exportOrdersToCSV: (orders) => {
    const headers = ["Order ID", "Customer Name", "Email", "Phone", "Status", "Payment", "Total ($)", "Date"];
    const rows = orders.map((o) => [
      o.id,
      `"${o.customer?.name || 'Guest'}"`,
      o.customer?.email || '',
      o.customer?.phone || '',
      o.status,
      o.paymentStatus,
      o.total ? o.total.toFixed(2) : '0.00',
      o.createdAt ? new Date(o.createdAt).toLocaleDateString() : ''
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CraveBite_Orders_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
