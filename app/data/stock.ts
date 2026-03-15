export type StockVariant = {
  sku: string;
  variant: string;
  qty: number;
  warehouse: string;
  status: "Aman" | "Menipis" | "Habis";
};

export type BrandStock = {
  brand: string;
  total: number;
  variants: StockVariant[];
};

export const stockData: BrandStock[] = [
  {
    brand: "Gwen Cosmetic",
    total: 1240,
    variants: [
      { sku: "GW-LIP-01", variant: "Lip Cream Nude", qty: 320, warehouse: "WH Jakarta", status: "Aman" },
      { sku: "GW-LIP-02", variant: "Lip Cream Rose", qty: 140, warehouse: "WH Jakarta", status: "Menipis" },
      { sku: "GW-FND-01", variant: "Foundation Light", qty: 80, warehouse: "WH Surabaya", status: "Menipis" },
    ],
  },
  {
    brand: "Luma Beauty",
    total: 860,
    variants: [
      { sku: "LM-SKM-01", variant: "Serum Bright", qty: 420, warehouse: "WH Jakarta", status: "Aman" },
      { sku: "LM-MSK-02", variant: "Masker Hydrate", qty: 60, warehouse: "WH Bandung", status: "Menipis" },
      { sku: "LM-SPF-01", variant: "Sunscreen Gel", qty: 0, warehouse: "WH Bandung", status: "Habis" },
    ],
  },
  {
    brand: "Natura Glow",
    total: 510,
    variants: [
      { sku: "NG-CLN-01", variant: "Cleanser Fresh", qty: 210, warehouse: "WH Jakarta", status: "Aman" },
      { sku: "NG-TNR-02", variant: "Toner Balance", qty: 90, warehouse: "WH Surabaya", status: "Menipis" },
      { sku: "NG-MSK-03", variant: "Masker Clay", qty: 30, warehouse: "WH Surabaya", status: "Menipis" },
    ],
  },
];
