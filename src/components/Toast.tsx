import { useEffect } from "react"

export interface ToastMessage {
  id: string
  message: string
  type: "success" | "delete" | "update"
}

interface Props {
  toasts: ToastMessage[]
  onRemove: (id: string) => void
}

const toastStyles: Record<ToastMessage["type"], string> = {
  success: "bg-green-500",
  delete: "bg-red-500",
  update: "bg-blue-500",
}

const ToastItem = ({
  toast,
  onRemove,
}: {
  toast: ToastMessage
  onRemove: (id: string) => void
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3000)
    return () => clearTimeout(timer)
  }, [toast.id, onRemove])

  return (
    <div className={`${toastStyles[toast.type]} text-white text-sm px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-64`}>
      {toast.type === "success" && <span>✅</span>}
      {toast.type === "delete" && <span>🗑️</span>}
      {toast.type === "update" && <span>✏️</span>}
      <span>{toast.message}</span>
    </div>
  )
}

export const Toast = ({ toasts, onRemove }: Props) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}