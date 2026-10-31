import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, Globe, Mail, Shield, Truck, Users } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings & Configuration</h1>
        <p className="text-muted-foreground">Manage your store settings and configuration</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Store Information
              </CardTitle>
              <CardDescription>Basic information about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input id="store-name" defaultValue="Elegant Fashion" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-url">Store URL</Label>
                  <Input id="store-url" defaultValue="https://elegantfashion.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-description">Store Description</Label>
                <Textarea
                  id="store-description"
                  defaultValue="Premium fashion and accessories for the modern lifestyle"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="hello@elegantfashion.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea id="address" defaultValue="123 Fashion Avenue, New York, NY 10001" rows={2} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>Configure regional preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                      <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="cst">Central Time (CST)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
              <CardDescription>Configure accepted payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Credit Cards</Label>
                    <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, American Express</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>PayPal</Label>
                    <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Apple Pay</Label>
                    <p className="text-sm text-muted-foreground">Accept Apple Pay payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Google Pay</Label>
                    <p className="text-sm text-muted-foreground">Accept Google Pay payments</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Configuration</CardTitle>
              <CardDescription>Configure your payment processing settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stripe-key">Stripe Publishable Key</Label>
                <Input id="stripe-key" placeholder="pk_live_..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                <Input id="stripe-secret" type="password" placeholder="sk_live_..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paypal-client">PayPal Client ID</Label>
                <Input id="paypal-client" placeholder="Your PayPal Client ID" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Methods
              </CardTitle>
              <CardDescription>Configure shipping options and rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Standard Shipping</Label>
                    <p className="text-sm text-muted-foreground">5-7 business days - $9.99</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Express Shipping</Label>
                    <p className="text-sm text-muted-foreground">2-3 business days - $19.99</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Overnight Shipping</Label>
                    <p className="text-sm text-muted-foreground">Next business day - $39.99</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Free Shipping</Label>
                    <p className="text-sm text-muted-foreground">Orders over $100 - Free</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Zones</CardTitle>
              <CardDescription>Configure shipping zones and rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domestic-rate">Domestic Shipping Rate</Label>
                <Input id="domestic-rate" defaultValue="9.99" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="international-rate">International Shipping Rate</Label>
                <Input id="international-rate" defaultValue="29.99" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="free-shipping-threshold">Free Shipping Threshold</Label>
                <Input id="free-shipping-threshold" defaultValue="100" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>Configure email settings and templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input id="smtp-host" defaultValue="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" defaultValue="587" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input id="smtp-username" defaultValue="noreply@elegantfashion.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input id="smtp-password" type="password" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Order Confirmation Emails</Label>
                    <p className="text-sm text-muted-foreground">Send confirmation emails for new orders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Shipping Notification Emails</Label>
                    <p className="text-sm text-muted-foreground">Send emails when orders are shipped</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Send promotional and marketing emails</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SSL Certificate</Label>
                    <p className="text-sm text-muted-foreground">Force HTTPS connections</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Attempt Limiting</Label>
                    <p className="text-sm text-muted-foreground">Block accounts after failed attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                <Input id="max-login-attempts" defaultValue="5" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Roles & Permissions
              </CardTitle>
              <CardDescription>Manage admin user roles and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Super Admin</h4>
                    <span className="text-sm text-muted-foreground">Full Access</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Complete access to all features and settings</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <span className="text-green-600">✓ Dashboard</span>
                    <span className="text-green-600">✓ Products</span>
                    <span className="text-green-600">✓ Orders</span>
                    <span className="text-green-600">✓ Customers</span>
                    <span className="text-green-600">✓ Marketing</span>
                    <span className="text-green-600">✓ Content</span>
                    <span className="text-green-600">✓ Reports</span>
                    <span className="text-green-600">✓ Settings</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Store Manager</h4>
                    <span className="text-sm text-muted-foreground">Limited Access</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Access to products, orders, and customer management
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <span className="text-green-600">✓ Dashboard</span>
                    <span className="text-green-600">✓ Products</span>
                    <span className="text-green-600">✓ Orders</span>
                    <span className="text-green-600">✓ Customers</span>
                    <span className="text-red-600">✗ Marketing</span>
                    <span className="text-red-600">✗ Content</span>
                    <span className="text-green-600">✓ Reports</span>
                    <span className="text-red-600">✗ Settings</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Content Editor</h4>
                    <span className="text-sm text-muted-foreground">Content Only</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Access to content management and basic product editing
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <span className="text-green-600">✓ Dashboard</span>
                    <span className="text-yellow-600">~ Products</span>
                    <span className="text-red-600">✗ Orders</span>
                    <span className="text-red-600">✗ Customers</span>
                    <span className="text-red-600">✗ Marketing</span>
                    <span className="text-green-600">✓ Content</span>
                    <span className="text-red-600">✗ Reports</span>
                    <span className="text-red-600">✗ Settings</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
