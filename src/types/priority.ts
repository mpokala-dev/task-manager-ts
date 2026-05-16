export const Priority = {
  High: "High",
  Medium: "Medium",
  Low: "Low",
} as const

// This extracts "High" | "Medium" | "Low" as a type automatically
export type Priority = typeof Priority[keyof typeof Priority]