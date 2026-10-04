// Shared date helpers for every CV template (Classic, Minimal, ...).

/** Turns an <input type="date"> value ("2024-05-17") into "May 2024". */
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

/** Builds a "Start — End" string, using "Present" for ongoing items, and
 *  gracefully handling missing dates instead of printing a bare "—". */
export const formatRange = (startDate, endDate, isCurrent) => {
  const start = formatDate(startDate);
  const end = isCurrent ? "Present" : formatDate(endDate);
  if (!start && !end) return "";
  if (!start) return end;
  if (!end) return start;
  return `${start} — ${end}`;
}