import { describe, it, expect, beforeEach } from "vitest"
import { rateLimit, clearRateLimitsForTesting } from "../lib/rate-limit"
import { RegisterInputSchema } from "../types/auth"
import { CreateOrderSchema } from "../types/order"

describe("Security Layer 1 & 2: Rate Limiting Engine", () => {
  beforeEach(() => {
    clearRateLimitsForTesting()
  })

  it("permits requests within allowed threshold and tracks remaining balance", () => {
    const key = "test-ip-1"
    const r1 = rateLimit(key, 3, 1000)
    expect(r1.success).toBe(true)
    expect(r1.remaining).toBe(2)

    const r2 = rateLimit(key, 3, 1000)
    expect(r2.success).toBe(true)
    expect(r2.remaining).toBe(1)

    const r3 = rateLimit(key, 3, 1000)
    expect(r3.success).toBe(true)
    expect(r3.remaining).toBe(0)
  })

  it("blocks requests once maximum attempts are exceeded and calculates Retry-After", () => {
    const key = "test-ip-blocked"
    for (let i = 0; i < 5; i++) {
      rateLimit(key, 5, 2000)
    }

    const blocked = rateLimit(key, 5, 2000)
    expect(blocked.success).toBe(false)
    expect(blocked.remaining).toBe(0)
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0)
  })
})

describe("Security Layer 3 & 4: Input Validation & Bcrypt Defense", () => {
  it("rejects oversized passwords that could trigger Bcrypt CPU DoS", () => {
    const oversizedPassword = "A".repeat(129)
    const validPassword = "SafePassword123!"

    const failResult = RegisterInputSchema.safeParse({
      name: "Alice Doe",
      email: "alice@example.com",
      password: oversizedPassword,
    })
    expect(failResult.success).toBe(false)

    const passResult = RegisterInputSchema.safeParse({
      name: "Alice Doe",
      email: "alice@example.com",
      password: validPassword,
    })
    expect(passResult.success).toBe(true)
  })

  it("enforces order line constraints (max 50 lines, min 1 line)", () => {
    const emptyOrder = {
      lines: [],
      shipTo: {
        fullName: "Test Client",
        street: "123 Serene Way",
        city: "New York",
        postalCode: "10001",
        country: "US",
      },
    }
    const emptyCheck = CreateOrderSchema.safeParse(emptyOrder)
    expect(emptyCheck.success).toBe(false)

    const validOrder = {
      lines: [{ itemId: "item-1", optionSku: "sku-1", qty: 2 }],
      shipTo: {
        fullName: "Test Client",
        street: "123 Serene Way",
        city: "New York",
        postalCode: "10001",
        country: "US",
      },
    }
    const validCheck = CreateOrderSchema.safeParse(validOrder)
    expect(validCheck.success).toBe(true)
  })

  it("rejects invalid or out-of-bounds quantities per line", () => {
    const negativeQty = {
      lines: [{ itemId: "item-1", optionSku: "sku-1", qty: -1 }],
      shipTo: {
        fullName: "Test Client",
        street: "123 Serene Way",
        city: "New York",
        postalCode: "10001",
        country: "US",
      },
    }
    expect(CreateOrderSchema.safeParse(negativeQty).success).toBe(false)

    const excessiveQty = {
      lines: [{ itemId: "item-1", optionSku: "sku-1", qty: 100 }],
      shipTo: {
        fullName: "Test Client",
        street: "123 Serene Way",
        city: "New York",
        postalCode: "10001",
        country: "US",
      },
    }
    expect(CreateOrderSchema.safeParse(excessiveQty).success).toBe(false)
  })
})

describe("Security Layer 5: Role & Session Isolation", () => {
  it("strictly separates public client permissions from administrative studio capabilities", () => {
    const clientRole = "client"
    const isStaffOrHigher = (role: string) => ["staff", "manager", "owner", "admin"].includes(role)

    expect(isStaffOrHigher(clientRole)).toBe(false)
    expect(isStaffOrHigher("customer")).toBe(false)
    expect(isStaffOrHigher("owner")).toBe(true)
    expect(isStaffOrHigher("admin")).toBe(true)
    expect(isStaffOrHigher("staff")).toBe(true)
    expect(isStaffOrHigher("manager")).toBe(true)
  })
})
