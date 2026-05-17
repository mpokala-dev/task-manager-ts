import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AddTaskForm } from "../components/AddTaskForm"
import { Priority } from "../types"

// vi.fn() is Vitest's version of jest.fn() — creates a mock function
const mockOnAdd = vi.fn()

beforeEach(() => {
  mockOnAdd.mockClear()
})

describe("AddTaskForm", () => {
  it("renders all form fields", () => {
    render(<AddTaskForm onAdd={mockOnAdd} />)

    expect(screen.getByPlaceholderText("What needs to be done?")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Optional details...")).toBeInTheDocument()
    expect(screen.getByText("Add Task")).toBeInTheDocument()
  })

  it("calls onAdd with correct values when submitted", async () => {
    const user = userEvent.setup()
    render(<AddTaskForm onAdd={mockOnAdd} />)

    await user.type(
      screen.getByPlaceholderText("What needs to be done?"),
      "Buy groceries"
    )
    await user.type(
      screen.getByPlaceholderText("Optional details..."),
      "From Waitrose"
    )
    await user.click(screen.getByText("Add Task"))

    expect(mockOnAdd).toHaveBeenCalledOnce()
    expect(mockOnAdd).toHaveBeenCalledWith(
      "Buy groceries",
      "From Waitrose",
      Priority.Medium,
      undefined
    )
  })

  it("shows error when submitting empty title", async () => {
    const user = userEvent.setup()
    render(<AddTaskForm onAdd={mockOnAdd} />)

    await user.click(screen.getByText("Add Task"))

    expect(screen.getByText("Task title cannot be empty")).toBeInTheDocument()
    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it("clears the form after successful submission", async () => {
    const user = userEvent.setup()
    render(<AddTaskForm onAdd={mockOnAdd} />)

    const titleInput = screen.getByPlaceholderText("What needs to be done?")

    await user.type(titleInput, "Clean the house")
    await user.click(screen.getByText("Add Task"))

    expect(titleInput).toHaveValue("")
  })

  it("trims whitespace from title before submitting", async () => {
    const user = userEvent.setup()
    render(<AddTaskForm onAdd={mockOnAdd} />)

    await user.type(
      screen.getByPlaceholderText("What needs to be done?"),
      "   Spaced title   "
    )
    await user.click(screen.getByText("Add Task"))

    expect(mockOnAdd).toHaveBeenCalledWith(
      "Spaced title",
      "",
      Priority.Medium,
      undefined
    )
  })

  it("does not submit if title is only whitespace", async () => {
    const user = userEvent.setup()
    render(<AddTaskForm onAdd={mockOnAdd} />)

    await user.type(
      screen.getByPlaceholderText("What needs to be done?"),
      "     "
    )
    await user.click(screen.getByText("Add Task"))

    expect(mockOnAdd).not.toHaveBeenCalled()
    expect(screen.getByText("Task title cannot be empty")).toBeInTheDocument()
  })

  it("submits with a due date when provided", async () => {
  const user = userEvent.setup()
  render(<AddTaskForm onAdd={mockOnAdd} />)

  await user.type(
    screen.getByPlaceholderText("What needs to be done?"),
    "Dentist appointment"
  )
  const dateInput = screen.getByLabelText("Due Date")
  await user.type(dateInput, "2026-12-31")
  await user.click(screen.getByText("Add Task"))

  expect(mockOnAdd).toHaveBeenCalledOnce()
})

it("submits without due date when date field is empty", async () => {
  const user = userEvent.setup()
  render(<AddTaskForm onAdd={mockOnAdd} />)

  await user.type(
    screen.getByPlaceholderText("What needs to be done?"),
    "No date task"
  )
  await user.click(screen.getByText("Add Task"))

  expect(mockOnAdd).toHaveBeenCalledWith(
    "No date task",
    "",
    "Medium",
    undefined
  )
})
})