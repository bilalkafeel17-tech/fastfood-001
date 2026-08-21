export const INITIAL_CUSTOMERS = [
  {
    id: "cust-1",
    name: "Alex Jordan",
    email: "alex.jordan@gmail.com",
    phone: "+1 (555) 912-3456",
    ordersCount: 14,
    totalSpent: 382.45,
    registrationDate: "2024-02-14",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    addresses: [
      {
        id: "addr-1",
        label: "Home",
        street: "742 Evergreen Terrace",
        apartment: "Apt 4B",
        city: "Springfield",
        postalCode: "97477",
        phone: "+1 (555) 912-3456",
        isDefault: true
      },
      {
        id: "addr-2",
        label: "Work Office",
        street: "500 Tech Blvd",
        apartment: "Floor 8, Suite 810",
        city: "Springfield",
        postalCode: "97478",
        phone: "+1 (555) 912-3456",
        isDefault: false
      }
    ]
  },
  {
    id: "cust-2",
    name: "Sarah Jenkins",
    email: "sarah.j@outlook.com",
    phone: "+1 (555) 823-7491",
    ordersCount: 8,
    totalSpent: 194.20,
    registrationDate: "2024-05-18",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    addresses: [
      {
        id: "addr-3",
        label: "Home",
        street: "128 Maple Ridge Way",
        apartment: "",
        city: "Springfield",
        postalCode: "97477",
        phone: "+1 (555) 823-7491",
        isDefault: true
      }
    ]
  },
  {
    id: "cust-3",
    name: "Michael Chang",
    email: "m.chang@techcorp.io",
    phone: "+1 (555) 632-1188",
    ordersCount: 22,
    totalSpent: 648.90,
    registrationDate: "2024-01-10",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    addresses: [
      {
        id: "addr-4",
        label: "Loft",
        street: "19 West Broadway",
        apartment: "Penthouse 3",
        city: "Springfield",
        postalCode: "97475",
        phone: "+1 (555) 632-1188",
        isDefault: true
      }
    ]
  }
];
