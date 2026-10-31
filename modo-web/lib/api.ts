import { NextResponse } from "next/server"

export interface PageInfo {
  page: number
  pageCount: number
  total: number
  pageSize: number
  hasNext: boolean
  hasPrev: boolean
}

export type ApiSuccessEnvelope<T = unknown> = {
  ok: true
  items?: T[]
  item?: T
  pageInfo?: PageInfo
  appliedFilters?: Record<string, unknown>
  message?: string
} & Record<string, unknown>

export interface ApiErrorEnvelope {
  ok: false
  error: {
    code: string
    message: string
    details?: unknown
  }
}

export function okResponse<T extends Record<string, unknown>>(data: T, status = 200) {
  return NextResponse.json({ ok: true, ...data }, { status })
}

export function failResponse(message: string, code = "BAD_REQUEST", status = 400, details?: unknown) {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code,
        message,
        ...(details ? { details } : {}),
      },
    },
    { status }
  )
}

export function parsePaginationParams(searchParams: URLSearchParams, defaultPageSize = 12) {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1)
  const pageSize = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("pageSize") || String(defaultPageSize), 10) || defaultPageSize)
  )
  const skip = (page - 1) * pageSize
  return { page, pageSize, skip }
}

export function buildPageInfo(total: number, page: number, pageSize: number): PageInfo {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  return {
    page,
    pageCount,
    total,
    pageSize,
    hasNext: page < pageCount,
    hasPrev: page > 1,
  }
}
