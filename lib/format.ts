export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(value: string) {
  if (!value) return "Not specified";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function isOfferActive(partner: { startDate: string; endDate: string }) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const start = partner.startDate
    ? new Date(`${partner.startDate}T00:00:00`).getTime()
    : Number.NEGATIVE_INFINITY;
  const end = partner.endDate
    ? new Date(`${partner.endDate}T23:59:59`).getTime()
    : Number.POSITIVE_INFINITY;
  return today >= start && today <= end;
}
