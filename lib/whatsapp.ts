export type CartItem = {
  name: string;
  quantity: number;
  price: number;
};

export type WhatsAppResult =
  | { url: string; error: null }
  | { url: null; error: string };

export function buildWhatsAppUrl(params: {
  items: CartItem[];
  customerName: string;
  note?: string;
  cafeName: string;
  whatsappNumber: string;
  currencySymbol: string;
}): WhatsAppResult {
  const { items, customerName, note, cafeName, whatsappNumber, currencySymbol } =
    params;

  if (items.length === 0) {
    return { url: null, error: "Your cart is empty." };
  }

  const trimmedName = customerName.trim();
  if (!trimmedName) {
    return { url: null, error: "Please enter your name." };
  }

  const normalizedNumber = whatsappNumber.replace(/\D/g, "");
  if (normalizedNumber.length < 10 || normalizedNumber.length > 15) {
    return { url: null, error: "WhatsApp number is not configured." };
  }

  const itemLines = items
    .map(
      (item) =>
        `${item.quantity}x ${item.name} — ${currencySymbol}${item.quantity * item.price}`
    )
    .join("\n");

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  let message = `Hi ${cafeName}, I'd like to place an order:\n\n${itemLines}\n\nTotal: ${currencySymbol}${total}\n\nName: ${trimmedName}`;

  const trimmedNote = note?.trim().slice(0, 200);
  if (trimmedNote) {
    message += `\nNote: ${trimmedNote}`;
  }

  const url = `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
  return { url, error: null };
}
