export interface Invoice {
  invoice: string;
  paymentStatus: string;
  totalAmount: string;
  paymentMethod: string;
  id: number;
  uid: string;
  brand: string;
  equipment: string;
}

export const invoices: Invoice[] = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    id: 9441,
    uid: "89347548-368d-42e5-a4d0-8a5c1c2271b1",
    brand: "Samsung",
    equipment: "Sump pump",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
    id: 2092,
    uid: "859b58d5-a75e-4955-a8bd-a592ce527280",
    brand: "Siemens",
    equipment: "Kimchi refrigerator",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
    id: 564,
    uid: "e5894837-10a3-44d9-853c-2c38b927d579",
    brand: "Siemens",
    equipment: "Hair dryer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
    id: 4398,
    uid: "3b062324-f9b1-48a0-8433-fe6c8bac74b6",
    brand: "Whirlpool",
    equipment: "Radiator (heating)",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
    id: 473,
    uid: "c897887a-1fe8-449f-91b7-47de24d9b32d",
    brand: "KitchenAid",
    equipment: "Futon dryer",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
    id: 415,
    uid: "88e1b7b1-cbd2-47e4-b8c2-a71e07a0600a",
    brand: "Siemens",
    equipment: "Can opener",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
    id: 7992,
    uid: "454abca7-719d-4aa1-abb7-477c9df28e45",
    brand: "Blue Star",
    equipment: "Micathermic heater",
  },
] as const;
