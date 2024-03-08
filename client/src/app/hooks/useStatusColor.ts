export function statusColor(suggestion: {
  status: string;
}): import("tailwind-merge").ClassNameValue {
  return suggestion?.status?.toLowerCase() === "pending"
    ? "bg-orange-100 text-orange-500"
    : suggestion?.status?.toLowerCase() === "approved"
    ? "bg-green-100 text-green-500"
    : "bg-red-100 text-red-500";
}
