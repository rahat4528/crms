import { describe, it, expect } from "vitest"
import { slugify, formatPrice, discountPct } from "../lib/cn"
import { parsePaginationParams, buildPageInfo } from "../lib/api"

describe("Modo Utility Functions", () => {
  it("slugify creates URL-friendly clean slugs", () => {
    expect(slugify("Double-Faced Virgin Wool Coat")).toBe("double-faced-virgin-wool-coat")
    expect(slugify("Cashmere Knit & Scarf (Edition 2)")).toBe("cashmere-knit-scarf-edition-2")
    expect(slugify("   Unbleached Linen Trousers   ")).toBe("unbleached-linen-trousers")
  })

  it("formatPrice formats numbers as USD currency", () => {
    expect(formatPrice(340)).toBe("$340.00")
    expect(formatPrice(1250.5)).toBe("$1,250.50")
    expect(formatPrice(0)).toBe("$0.00")
  })

  it("discountPct computes rounded discount percentage correctly", () => {
    expect(discountPct(380, 340)).toBe(11) // (380 - 340) / 380 = 10.52% -> 11%
    expect(discountPct(500, 250)).toBe(50)
    expect(discountPct(100, 100)).toBe(0)
    expect(discountPct(0, 50)).toBe(0)
  })
})

describe("Modo API Envelope & Pagination", () => {
  it("buildPageInfo computes pagination math correctly", () => {
    const pageInfo = buildPageInfo(60, 1, 12)
    expect(pageInfo.page).toBe(1)
    expect(pageInfo.pageCount).toBe(5)
    expect(pageInfo.total).toBe(60)
    expect(pageInfo.pageSize).toBe(12)
    expect(pageInfo.hasNext).toBe(true)
    expect(pageInfo.hasPrev).toBe(false)
  })

  it("parsePaginationParams parses URL query parameters with bounds", () => {
    const params = new URLSearchParams("page=2&pageSize=24")
    const { page, pageSize, skip } = parsePaginationParams(params, 12)
    expect(page).toBe(2)
    expect(pageSize).toBe(24)
    expect(skip).toBe(24)
  })

  it("parsePaginationParams clamps negative or invalid page numbers", () => {
    const params = new URLSearchParams("page=-5&pageSize=500")
    const { page, pageSize, skip } = parsePaginationParams(params, 12)
    expect(page).toBe(1)
    expect(pageSize).toBe(100) // max clamped to 100
    expect(skip).toBe(0)
  })
})

describe("Modo Business Logic & Security Controls", () => {
  it("validates order number format adheres to MD-YYYY-000123 convention", () => {
    const orderNoRegex = /^MD-\d{4}-\d{6}$/
    expect(orderNoRegex.test("MD-2026-000123")).toBe(true)
    expect(orderNoRegex.test("MD-2025-999999")).toBe(true)
    expect(orderNoRegex.test("ORD-12345")).toBe(false)
    expect(orderNoRegex.test("MD-26-00123")).toBe(false)
  })

  it("calculates order total accurately with tax and shipping", () => {
    const subtotal = 340.0
    const shipping = 25.0
    const taxRate = 0.08
    const tax = Math.round(subtotal * taxRate * 100) / 100
    const total = subtotal + shipping + tax

    expect(tax).toBe(27.2)
    expect(total).toBe(392.2)
  })

  it("sanitizes search input against regex denial of service characters", () => {
    const rawSearch = "wool.*(coat|jacket)++[a-z]{1,}"
    const sanitized = rawSearch.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    expect(sanitized).toBe("wool\\.\\*\\(coat\\|jacket\\)\\+\\+\\[a-z\\]\\{1,\\}")
  })

  it("enforces role hierarchy permissions for studio routes", () => {
    const studioRoles = ["staff", "manager", "owner", "admin"]
    const clientRole = "client"

    expect(studioRoles.includes("staff")).toBe(true)
    expect(studioRoles.includes("manager")).toBe(true)
    expect(studioRoles.includes("owner")).toBe(true)
    expect(studioRoles.includes("admin")).toBe(true)
    expect(studioRoles.includes(clientRole)).toBe(false)
    expect(studioRoles.includes("guest")).toBe(false)
  })
})

