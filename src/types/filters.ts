import type { Priority } from "./priority"
import type { Status } from "./task"

export interface Filters {
  status: Status | "all"
  priority: Priority | "all"
}