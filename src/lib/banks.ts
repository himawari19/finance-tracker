export const banks = {
  // Bank Tradisional Indonesia
  bca: { id: "bca", name: "Bank Central Asia", type: "traditional" },
  mandiri: { id: "mandiri", name: "Bank Mandiri", type: "traditional" },
  bni: { id: "bni", name: "Bank Negara Indonesia", type: "traditional" },
  bri: { id: "bri", name: "Bank Rakyat Indonesia", type: "traditional" },
  cimb: { id: "cimb", name: "CIMB Niaga", type: "traditional" },
  
  // Bank Digital Indonesia
  jenius: { id: "jenius", name: "Jenius", type: "digital" },
  jago: { id: "jago", name: "Bank Jago", type: "digital" },
  neo: { id: "neo", name: "Neo Bank", type: "digital" },
  ovo: { id: "ovo", name: "OVO", type: "digital" },
  dana: { id: "dana", name: "DANA", type: "digital" },
  gopay: { id: "gopay", name: "GoPay", type: "digital" },
};

export type BankType = "traditional" | "digital";
