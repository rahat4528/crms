"use client"

import { toast as sonnerToast } from "sonner"

export interface NotifyOptions {
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export function useNotify() {
  return {
    notify: (title: string, opts?: NotifyOptions) => {
      return sonnerToast(title, opts)
    },
    success: (title: string, opts?: NotifyOptions) => {
      return sonnerToast.success(title, opts)
    },
    error: (title: string, opts?: NotifyOptions) => {
      return sonnerToast.error(title, opts)
    },
    info: (title: string, opts?: NotifyOptions) => {
      return sonnerToast.info(title, opts)
    },
    warning: (title: string, opts?: NotifyOptions) => {
      return sonnerToast.warning(title, opts)
    },
  }
}

export const notify = {
  success: (title: string, opts?: NotifyOptions) => sonnerToast.success(title, opts),
  error: (title: string, opts?: NotifyOptions) => sonnerToast.error(title, opts),
  info: (title: string, opts?: NotifyOptions) => sonnerToast.info(title, opts),
  warning: (title: string, opts?: NotifyOptions) => sonnerToast.warning(title, opts),
}

