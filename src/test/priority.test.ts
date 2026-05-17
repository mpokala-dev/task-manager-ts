import { describe, it, expect } from "vitest"
import { Priority } from "../types"

describe("Priority", () => {
  it("has the correct values", () => {
    expect(Priority.High).toBe("High")
    expect(Priority.Medium).toBe("Medium")
    expect(Priority.Low).toBe("Low")
  })

  it("has exactly three priority levels", () => {
    const keys = Object.keys(Priority)
    expect(keys).toHaveLength(3)
  })

  it("all values are strings", () => {
    Object.values(Priority).forEach((value) => {
      expect(typeof value).toBe("string")
    })
  })
})