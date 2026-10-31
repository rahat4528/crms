"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Truck, MapPin, User } from "lucide-react"

interface CheckoutFormProps {
  onSubmit: (data: any) => void
  isLoading?: boolean
}

export function CheckoutForm({ onSubmit, isLoading = false }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    // Contact Information
    email: "",
    phone: "",

    // Shipping Address
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",

    // Billing Address
    sameAsShipping: true,
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingApartment: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    billingCountry: "US",

    // Shipping Method
    shippingMethod: "standard",

    // Payment
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // Options
    saveInfo: false,
    newsletter: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const shippingMethods = [
    { id: "standard", name: "Standard Shipping", price: 15, time: "5-7 business days" },
    { id: "express", name: "Express Shipping", price: 25, time: "2-3 business days" },
    { id: "overnight", name: "Overnight Shipping", price: 45, time: "1 business day" },
  ]

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard },
    { id: "paypal", name: "PayPal", icon: null },
    { id: "apple", name: "Apple Pay", icon: null },
    { id: "google", name: "Google Pay", icon: null },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="apartment">Apartment, suite, etc.</Label>
            <Input
              id="apartment"
              value={formData.apartment}
              onChange={(e) => handleInputChange("apartment", e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  {/* Add more states */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Shipping Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.shippingMethod}
            onValueChange={(value) => handleInputChange("shippingMethod", value)}
          >
            {shippingMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value={method.id} id={method.id} />
                <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-muted-foreground">{method.time}</div>
                    </div>
                    <div className="font-semibold">${method.price}</div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value) => handleInputChange("paymentMethod", value)}
          >
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-2">
                <RadioGroupItem value={method.id} id={method.id} />
                <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer">
                  {method.icon && <method.icon className="h-4 w-4" />}
                  {method.name}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {formData.paymentMethod === "card" && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cardName">Name on Card *</Label>
                <Input
                  id="cardName"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange("cardName", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAsShipping"
              checked={formData.sameAsShipping}
              onCheckedChange={(checked) => handleInputChange("sameAsShipping", checked as boolean)}
            />
            <Label htmlFor="sameAsShipping">Same as shipping address</Label>
          </div>

          {!formData.sameAsShipping && (
            <div className="space-y-4 pt-4 border-t">
              {/* Billing address fields (similar to shipping) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingFirstName">First Name *</Label>
                  <Input
                    id="billingFirstName"
                    value={formData.billingFirstName}
                    onChange={(e) => handleInputChange("billingFirstName", e.target.value)}
                    required={!formData.sameAsShipping}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="billingLastName">Last Name *</Label>
                  <Input
                    id="billingLastName"
                    value={formData.billingLastName}
                    onChange={(e) => handleInputChange("billingLastName", e.target.value)}
                    required={!formData.sameAsShipping}
                    className="mt-1"
                  />
                </div>
              </div>
              {/* Add more billing fields as needed */}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Options */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="saveInfo"
              checked={formData.saveInfo}
              onCheckedChange={(checked) => handleInputChange("saveInfo", checked as boolean)}
            />
            <Label htmlFor="saveInfo">Save my information for faster checkout</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
            />
            <Label htmlFor="newsletter">Subscribe to our newsletter for exclusive offers</Label>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Complete Order"}
      </Button>
    </form>
  )
}
