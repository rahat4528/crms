"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccountSidebar } from "@/components/account-sidebar"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { User, Lock, Bell, Globe, Trash2 } from "lucide-react"

export default function AccountSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "female",
    language: "en",
    currency: "USD",
    timezone: "America/New_York",
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    orderUpdates: true,
    promotions: true,
    reviews: false,
  })

  const breadcrumbItems = [
    { label: "Account", href: "/account" },
    { label: "Settings", href: "/account/settings" },
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Show success message
  }

  const handleChangePassword = async () => {
    // Handle password change
  }

  const handleDeleteAccount = async () => {
    // Handle account deletion
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Proceed with deletion
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={breadcrumbItems} />

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light tracking-tight">Account Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences and security</p>
            </div>
            <AccountSidebar />
          </div>

          <div className="flex gap-8">
            <AccountSidebar />

            <div className="flex-1 space-y-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>

              {/* Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Password</h4>
                    <p className="text-sm text-muted-foreground mb-4">Last changed 3 months ago</p>
                    <Button variant="outline" onClick={handleChangePassword}>
                      Change Password
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={formData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Communication Preferences</h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="emailNotifications"
                          checked={formData.emailNotifications}
                          onCheckedChange={(checked) => handleInputChange("emailNotifications", checked as boolean)}
                        />
                        <Label htmlFor="emailNotifications">Email notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="smsNotifications"
                          checked={formData.smsNotifications}
                          onCheckedChange={(checked) => handleInputChange("smsNotifications", checked as boolean)}
                        />
                        <Label htmlFor="smsNotifications">SMS notifications</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Email Preferences</h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="orderUpdates"
                          checked={formData.orderUpdates}
                          onCheckedChange={(checked) => handleInputChange("orderUpdates", checked as boolean)}
                        />
                        <Label htmlFor="orderUpdates">Order updates and shipping notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="marketingEmails"
                          checked={formData.marketingEmails}
                          onCheckedChange={(checked) => handleInputChange("marketingEmails", checked as boolean)}
                        />
                        <Label htmlFor="marketingEmails">Marketing emails and promotions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="reviews"
                          checked={formData.reviews}
                          onCheckedChange={(checked) => handleInputChange("reviews", checked as boolean)}
                        />
                        <Label htmlFor="reviews">Review reminders</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <Trash2 className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-medium mb-2">Delete Account</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
