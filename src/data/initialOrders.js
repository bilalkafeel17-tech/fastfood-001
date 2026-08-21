export const INITIAL_ORDERS = [
  {
    id: "ORD-9841",
    customer: {
      id: "cust-1",
      name: "Alex Jordan",
      email: "alex.jordan@gmail.com",
      phone: "+1 (555) 912-3456"
    },
    items: [
      {
        id: "prod-1",
        name: "Smoky BBQ Bacon Beast",
        price: 11.99,
        quantity: 2,
        selectedSize: { name: "Double Patty", priceDelta: 3.50 },
        selectedAddOns: [{ name: "Extra Aged Cheddar", price: 1.50 }],
        itemTotal: 33.98,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80"
      },
      {
        id: "prod-16",
        name: "Monster Volcano Loaded Fries",
        price: 7.99,
        quantity: 1,
        selectedSize: { name: "Regular Tray", priceDelta: 0 },
        selectedAddOns: [],
        itemTotal: 7.99,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700&auto=format&fit=crop&q=80"
      },
      {
        id: "prod-22",
        name: "Signature Salted Caramel Pretzel Shake",
        price: 5.99,
        quantity: 2,
        selectedSize: { name: "Large (24 oz)", priceDelta: 1.80 },
        selectedAddOns: [],
        itemTotal: 15.58,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700&auto=format&fit=crop&q=80"
      }
    ],
    deliveryAddress: {
      house: "742",
      street: "Evergreen Terrace",
      apartment: "Apt 4B",
      city: "Springfield",
      postalCode: "97477",
      instructions: "Ring buzzer 4B, leave on the porch if no answer."
    },
    deliveryMethod: "Express Delivery (15-25 min)",
    paymentMethod: "Credit Card (ending in •••• 4242)",
    paymentStatus: "Paid",
    subtotal: 57.55,
    discount: 11.51, // CRAVE20
    couponCode: "CRAVE20",
    deliveryFee: 0.00,
    tax: 3.68,
    total: 49.72,
    status: "Out for Delivery", // 'Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'
    createdAt: "2026-08-21T15:10:00.000Z",
    estimatedDeliveryTime: "15:35 PM",
    driver: {
      name: "Jake Reynolds",
      phone: "+1 (555) 567-8901",
      vehicle: "Honda Civic (Red, Plate: CRV-882)",
      rating: 4.9
    },
    timeline: [
      { status: "Order Placed", time: "15:10", completed: true },
      { status: "Order Confirmed", time: "15:12", completed: true },
      { status: "Preparing in Kitchen", time: "15:15", completed: true },
      { status: "Out for Delivery", time: "15:26", completed: true },
      { status: "Delivered", time: "Pending", completed: false }
    ]
  },
  {
    id: "ORD-9820",
    customer: {
      id: "cust-2",
      name: "Sarah Jenkins",
      email: "sarah.j@outlook.com",
      phone: "+1 (555) 823-7491"
    },
    items: [
      {
        id: "prod-6",
        name: "Rustic Double Pepperoni Overload",
        price: 15.99,
        quantity: 1,
        selectedSize: { name: "Large (14\")", priceDelta: 4.50 },
        selectedAddOns: [{ name: "Cheesy Stuffed Crust", price: 3.00 }],
        itemTotal: 23.49,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=700&auto=format&fit=crop&q=80"
      },
      {
        id: "prod-18",
        name: "Gooey Mozzarella Sticks (6 Pcs)",
        price: 6.49,
        quantity: 1,
        selectedSize: { name: "6 Pieces", priceDelta: 0 },
        selectedAddOns: [],
        itemTotal: 6.49,
        image: "https://images.unsplash.com/photo-1548340748-6d2b7d7da280?w=700&auto=format&fit=crop&q=80"
      }
    ],
    deliveryAddress: {
      house: "128",
      street: "Maple Ridge Way",
      apartment: "",
      city: "Springfield",
      postalCode: "97477",
      instructions: "Gate code #1234"
    },
    deliveryMethod: "Standard Delivery (30-40 min)",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    subtotal: 29.98,
    discount: 0.00,
    couponCode: null,
    deliveryFee: 3.99,
    tax: 2.40,
    total: 36.37,
    status: "Preparing",
    createdAt: "2026-08-21T15:22:00.000Z",
    estimatedDeliveryTime: "15:55 PM",
    driver: null,
    timeline: [
      { status: "Order Placed", time: "15:22", completed: true },
      { status: "Order Confirmed", time: "15:24", completed: true },
      { status: "Preparing in Kitchen", time: "15:28", completed: true },
      { status: "Out for Delivery", time: "Pending", completed: false },
      { status: "Delivered", time: "Pending", completed: false }
    ]
  },
  {
    id: "ORD-9750",
    customer: {
      id: "cust-1",
      name: "Alex Jordan",
      email: "alex.jordan@gmail.com",
      phone: "+1 (555) 912-3456"
    },
    items: [
      {
        id: "prod-25",
        name: "Ultimate Crave King Meal Box",
        price: 16.99,
        quantity: 1,
        selectedSize: { name: "Solo Feast", priceDelta: 0 },
        selectedAddOns: [{ name: "Upgrade to Loaded Fries", price: 2.50 }],
        itemTotal: 19.49,
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=700&auto=format&fit=crop&q=80"
      }
    ],
    deliveryAddress: {
      house: "742",
      street: "Evergreen Terrace",
      apartment: "Apt 4B",
      city: "Springfield",
      postalCode: "97477",
      instructions: ""
    },
    deliveryMethod: "Standard Delivery",
    paymentMethod: "Apple Pay",
    paymentStatus: "Paid",
    subtotal: 19.49,
    discount: 0.00,
    couponCode: null,
    deliveryFee: 3.99,
    tax: 1.56,
    total: 25.04,
    status: "Delivered",
    createdAt: "2026-08-20T19:40:00.000Z",
    estimatedDeliveryTime: "20:15 PM",
    driver: {
      name: "Jake Reynolds",
      phone: "+1 (555) 567-8901",
      vehicle: "Honda Civic (Red)",
      rating: 4.9
    },
    timeline: [
      { status: "Order Placed", time: "19:40", completed: true },
      { status: "Order Confirmed", time: "19:42", completed: true },
      { status: "Preparing in Kitchen", time: "19:45", completed: true },
      { status: "Out for Delivery", time: "19:58", completed: true },
      { status: "Delivered", time: "20:14", completed: true }
    ]
  }
];
