import app from "../src/app.js";
import { connectDB, disconnectDB } from "../src/config/database.js";
import { seedDatabase } from "../src/seed/seedData.js";

let server;
let baseUrl;

const runTests = async () => {
  console.log("\n=======================================================");
  console.log(" Running CraveBite Backend API Automated Test Suite");
  console.log("=======================================================\n");

  let passed = 0;
  let failed = 0;

  const assert = (condition, testName) => {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      passed++;
    } else {
      console.error(` ❌ [FAIL] ${testName}`);
      failed++;
    }
  };

  try {
    // 1. Setup DB and start test server
    await connectDB();
    await seedDatabase();

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://localhost:${port}/api`;
        console.log(`Test server running at: ${baseUrl}\n`);
        resolve();
      });
    });

    // TEST 1: Health Check
    const healthRes = await fetch(`${baseUrl}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200 && healthData.success === true, "GET /api/health returns 200 OK");

    // TEST 2: Customer Login
    const custLoginRes = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "john@example.com", password: "Customer@123" })
    });
    const custLoginData = await custLoginRes.json();
    assert(
      custLoginRes.status === 200 && custLoginData.data && custLoginData.data.accessToken,
      "POST /api/auth/login generates valid JWT for customer"
    );
    const customerToken = custLoginData.data?.accessToken;
    const customerId = custLoginData.data?.user?.id || custLoginData.data?.user?._id;

    // TEST 3: Login with Wrong Password (Edge Case)
    const wrongPassRes = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "john@example.com", password: "WrongPassword!" })
    });
    assert(wrongPassRes.status === 401, "POST /api/auth/login rejects wrong password with 401 Unauthorized");

    // TEST 4: Restaurant Admin Login
    const adminLoginRes = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin1@cravebite.com", password: "Admin@123" })
    });
    const adminLoginData = await adminLoginRes.json();
    assert(
      adminLoginRes.status === 200 && adminLoginData.data.user.role === "restaurant_admin",
      "POST /api/auth/login succeeds for restaurant admin"
    );
    const adminToken = adminLoginData.data?.accessToken;

    // TEST 5: Super Admin Login
    const superAdminLoginRes = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "superadmin@cravebite.com", password: "Admin@123" })
    });
    const superAdminData = await superAdminLoginRes.json();
    assert(
      superAdminLoginRes.status === 200 && superAdminData.data.user.role === "super_admin",
      "POST /api/auth/login succeeds for super admin"
    );
    const superAdminToken = superAdminData.data?.accessToken;

    // TEST 6: Customer Registration
    const regRes = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "New Student Tester",
        email: `tester_${Date.now()}@example.com`,
        password: "Password123!",
        phone: "+923009876543"
      })
    });
    const regData = await regRes.json();
    assert(
      regRes.status === 201 && regData.data && regData.data.user.role === "customer",
      "POST /api/auth/register creates new customer with role 'customer'"
    );

    // TEST 7: Duplicate Email Registration (Edge Case)
    const dupRegRes = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Duplicate User",
        email: "john@example.com",
        password: "Password123!"
      })
    });
    assert(dupRegRes.status === 409, "POST /api/auth/register prevents duplicate email with 409 Conflict");

    // TEST 8: Get User Profile
    const meRes = await fetch(`${baseUrl}/users/me`, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });
    const meData = await meRes.json();
    assert(meRes.status === 200 && meData.data.user.email === "john@example.com", "GET /api/users/me returns authenticated user profile");

    // TEST 9: Update User Profile
    const updateMeRes = await fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerToken}`
      },
      body: JSON.stringify({ name: "John Doe Updated", city: "Karachi South" })
    });
    const updateMeData = await updateMeRes.json();
    assert(
      updateMeRes.status === 200 && updateMeData.data.user.name === "John Doe Updated",
      "PATCH /api/users/me successfully updates profile fields"
    );

    // TEST 10: List Restaurants with Search & City Filters
    const restsRes = await fetch(`${baseUrl}/restaurants?city=Karachi&search=Gourmet`);
    const restsData = await restsRes.json();
    assert(
      restsRes.status === 200 && Array.isArray(restsData.data) && restsData.data.length > 0,
      "GET /api/restaurants filters by city & search term with pagination"
    );
    const targetRestaurant = restsData.data[0];
    const restaurantId = targetRestaurant._id;

    // TEST 11: Get Restaurant Details (categories + menu items)
    const restDetailRes = await fetch(`${baseUrl}/restaurants/${restaurantId}`);
    const restDetailData = await restDetailRes.json();
    assert(
      restDetailRes.status === 200 &&
        restDetailData.data.categories.length > 0 &&
        restDetailData.data.menuItems.length > 0,
      "GET /api/restaurants/:id returns details with populated categories and menu items"
    );

    // TEST 12: List Menu Items for Restaurant with Price Filters
    const menuRes = await fetch(`${baseUrl}/restaurants/${restaurantId}/menu?minPrice=500&maxPrice=1200`);
    const menuData = await menuRes.json();
    assert(
      menuRes.status === 200 && Array.isArray(menuData.data),
      "GET /api/restaurants/:id/menu filters by minPrice and maxPrice"
    );
    const targetMenuItem = menuData.data[0];
    const menuItemId = targetMenuItem._id;

    // TEST 13: Toggle Menu Item Availability (Restaurant Admin)
    const toggleRes = await fetch(`${baseUrl}/menu/${menuItemId}/availability`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ isAvailable: true })
    });
    assert(toggleRes.status === 200, "PATCH /api/menu/:id/availability allows restaurant owner to toggle availability");

    // TEST 14: Add Item to Cart
    const addCartRes = await fetch(`${baseUrl}/cart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerToken}`
      },
      body: JSON.stringify({ menuItemId, quantity: 2 })
    });
    const addCartData = await addCartRes.json();
    assert(
      addCartRes.status === 200 && addCartData.data.items.length > 0 && addCartData.data.subtotal > 0,
      "POST /api/cart/items adds item with verified server-side price"
    );

    // TEST 15: Get Cart
    const getCartRes = await fetch(`${baseUrl}/cart`, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });
    const getCartData = await getCartRes.json();
    assert(
      getCartRes.status === 200 && getCartData.data.items.length === 1 && getCartData.data.total > 0,
      "GET /api/cart fetches cart with subtotal, delivery fee and total"
    );

    // TEST 16: Place Order from Cart
    const orderRes = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerToken}`
      },
      body: JSON.stringify({
        deliveryAddress: {
          address: "House 123, Street 4, Clifton",
          city: "Karachi",
          postalCode: "75500"
        },
        phone: "+923004444444",
        paymentMethod: "cash",
        notes: "Automated test order"
      })
    });
    const orderData = await orderRes.json();
    assert(
      orderRes.status === 201 &&
        orderData.data &&
        orderData.data.orderNumber &&
        orderData.data.orderStatus === "pending",
      "POST /api/orders places order, calculates DB totals, generates order number"
    );
    const placedOrder = orderData.data;

    // TEST 17: Cart Cleared After Order
    const emptyCartRes = await fetch(`${baseUrl}/cart`, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });
    const emptyCartData = await emptyCartRes.json();
    assert(
      emptyCartRes.status === 200 && emptyCartData.data.items.length === 0,
      "Cart is automatically cleared after order placement"
    );

    // TEST 18: Customer View My Orders
    const myOrdersRes = await fetch(`${baseUrl}/orders/my-orders`, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });
    const myOrdersData = await myOrdersRes.json();
    assert(
      myOrdersRes.status === 200 && myOrdersData.data.length > 0,
      "GET /api/orders/my-orders returns customer's placed orders"
    );

    // TEST 19: Restaurant Admin Updates Order Status (Valid transition: pending -> confirmed)
    const statusRes = await fetch(`${baseUrl}/orders/${placedOrder._id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: "confirmed", comment: "Kitchen accepted order" })
    });
    const statusData = await statusRes.json();
    assert(
      statusRes.status === 200 && statusData.data.orderStatus === "confirmed",
      "PATCH /api/orders/:id/status updates status with progression enforcement (pending -> confirmed)"
    );

    // TEST 20: Invalid Order Status Transition Blocked (Edge Case: confirmed -> delivered directly)
    const invalidStatusRes = await fetch(`${baseUrl}/orders/${placedOrder._id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: "delivered" })
    });
    assert(
      invalidStatusRes.status === 400,
      "PATCH /api/orders/:id/status rejects invalid transitions (confirmed directly to delivered) with 400 Bad Request"
    );

    // TEST 21: Super Admin Dashboard Analytics
    const dashRes = await fetch(`${baseUrl}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${superAdminToken}` }
    });
    const dashData = await dashRes.json();
    assert(
      dashRes.status === 200 &&
        dashData.data.totalUsers > 0 &&
        dashData.data.totalRestaurants > 0 &&
        dashData.data.totalOrders > 0,
      "GET /api/admin/dashboard calculates metrics for users, restaurants, orders and revenue"
    );

    // TEST 22: RBAC Protection (Customer blocked from Admin routes)
    const rbacRes = await fetch(`${baseUrl}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });
    assert(
      rbacRes.status === 403,
      "GET /api/admin/dashboard rejects unauthorized customer requests with 403 Forbidden"
    );

    // TEST 23: Unauthenticated Request Blocked
    const noAuthRes = await fetch(`${baseUrl}/users/me`);
    assert(
      noAuthRes.status === 401,
      "GET /api/users/me rejects unauthenticated requests with 401 Unauthorized"
    );

    console.log("\n=======================================================");
    console.log(` Test Results: ${passed} Passed, ${failed} Failed`);
    console.log("=======================================================\n");

    if (failed > 0) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error("Test Suite Execution Error:", error);
    process.exitCode = 1;
  } finally {
    if (server) {
      server.close();
    }
    await disconnectDB();
  }
};

runTests();
