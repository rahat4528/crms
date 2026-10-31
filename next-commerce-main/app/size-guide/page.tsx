import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Size Guide - Elegant Fashion",
  description: "Find your perfect fit with our comprehensive size guide.",
}

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6 text-balance">Size Guide</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Find your perfect fit with our detailed measurements and sizing recommendations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="women" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="women">Women's</TabsTrigger>
              <TabsTrigger value="men">Men's</TabsTrigger>
              <TabsTrigger value="accessories">Accessories</TabsTrigger>
            </TabsList>

            <TabsContent value="women" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Women's Clothing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Size</th>
                          <th className="text-left py-3 px-4 font-semibold">US</th>
                          <th className="text-left py-3 px-4 font-semibold">UK</th>
                          <th className="text-left py-3 px-4 font-semibold">EU</th>
                          <th className="text-left py-3 px-4 font-semibold">Bust (in)</th>
                          <th className="text-left py-3 px-4 font-semibold">Waist (in)</th>
                          <th className="text-left py-3 px-4 font-semibold">Hips (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4">XS</td>
                          <td className="py-3 px-4">0-2</td>
                          <td className="py-3 px-4">4-6</td>
                          <td className="py-3 px-4">32-34</td>
                          <td className="py-3 px-4">32-33</td>
                          <td className="py-3 px-4">24-25</td>
                          <td className="py-3 px-4">34-35</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4">S</td>
                          <td className="py-3 px-4">4-6</td>
                          <td className="py-3 px-4">8-10</td>
                          <td className="py-3 px-4">36-38</td>
                          <td className="py-3 px-4">34-35</td>
                          <td className="py-3 px-4">26-27</td>
                          <td className="py-3 px-4">36-37</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4">M</td>
                          <td className="py-3 px-4">8-10</td>
                          <td className="py-3 px-4">12-14</td>
                          <td className="py-3 px-4">40-42</td>
                          <td className="py-3 px-4">36-37</td>
                          <td className="py-3 px-4">28-29</td>
                          <td className="py-3 px-4">38-39</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4">L</td>
                          <td className="py-3 px-4">12-14</td>
                          <td className="py-3 px-4">16-18</td>
                          <td className="py-3 px-4">44-46</td>
                          <td className="py-3 px-4">38-40</td>
                          <td className="py-3 px-4">30-32</td>
                          <td className="py-3 px-4">40-42</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">XL</td>
                          <td className="py-3 px-4">16-18</td>
                          <td className="py-3 px-4">20-22</td>
                          <td className="py-3 px-4">48-50</td>
                          <td className="py-3 px-4">42-44</td>
                          <td className="py-3 px-4">34-36</td>
                          <td className="py-3 px-4">44-46</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="men" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Men's Clothing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Size</th>
                          <th className="text-left py-3 px-4 font-semibold">US</th>
                          <th className="text-left py-3 px-4 font-semibold">UK</th>
                          <th className="text-left py-3 px-4 font-semibold">EU</th>
                          <th className="text-left py-3 px-4 font-semibold">Chest (in)</th>
                          <th className="text-left py-3 px-4 font-semibold">Waist (in)</th>
                          <th className="text-left py-3 px-4 font-semibold">Neck (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4">S</td>
                          <td className="py-3 px-4">34-36</td>
                          <td className="py-3 px-4">34-36</td>
                          <td className="py-3 px-4">44-46</td>
                          <td className="py-3 px-4">34-36</td>
                          <td className="py-3 px-4">28-30</td>
                          <td className="py-3 px-4">14-14.5</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4">M</td>
                          <td className="py-3 px-4">38-40</td>
                          <td className="py-3 px-4">38-40</td>
                          <td className="py-3 px-4">48-50</td>
                          <td className="py-3 px-4">38-40</td>
                          <td className="py-3 px-4">32-34</td>
                          <td className="py-3 px-4">15-15.5</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4">L</td>
                          <td className="py-3 px-4">42-44</td>
                          <td className="py-3 px-4">42-44</td>
                          <td className="py-3 px-4">52-54</td>
                          <td className="py-3 px-4">42-44</td>
                          <td className="py-3 px-4">36-38</td>
                          <td className="py-3 px-4">16-16.5</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4">XL</td>
                          <td className="py-3 px-4">46-48</td>
                          <td className="py-3 px-4">46-48</td>
                          <td className="py-3 px-4">56-58</td>
                          <td className="py-3 px-4">46-48</td>
                          <td className="py-3 px-4">40-42</td>
                          <td className="py-3 px-4">17-17.5</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">XXL</td>
                          <td className="py-3 px-4">50-52</td>
                          <td className="py-3 px-4">50-52</td>
                          <td className="py-3 px-4">60-62</td>
                          <td className="py-3 px-4">50-52</td>
                          <td className="py-3 px-4">44-46</td>
                          <td className="py-3 px-4">18-18.5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accessories" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Shoes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3 font-semibold">US Women</th>
                            <th className="text-left py-2 px-3 font-semibold">US Men</th>
                            <th className="text-left py-2 px-3 font-semibold">EU</th>
                            <th className="text-left py-2 px-3 font-semibold">UK</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50">
                            <td className="py-2 px-3">6</td>
                            <td className="py-2 px-3">4</td>
                            <td className="py-2 px-3">36</td>
                            <td className="py-2 px-3">3.5</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2 px-3">7</td>
                            <td className="py-2 px-3">5</td>
                            <td className="py-2 px-3">37</td>
                            <td className="py-2 px-3">4.5</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2 px-3">8</td>
                            <td className="py-2 px-3">6</td>
                            <td className="py-2 px-3">38</td>
                            <td className="py-2 px-3">5.5</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2 px-3">9</td>
                            <td className="py-2 px-3">7</td>
                            <td className="py-2 px-3">39</td>
                            <td className="py-2 px-3">6.5</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3">10</td>
                            <td className="py-2 px-3">8</td>
                            <td className="py-2 px-3">40</td>
                            <td className="py-2 px-3">7.5</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Accessories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Belts</h4>
                      <p className="text-sm text-muted-foreground">
                        Measure your waist where you typically wear a belt. Add 2 inches to your waist measurement for
                        the correct belt size.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Rings</h4>
                      <p className="text-sm text-muted-foreground">
                        Measure the circumference of your finger at the widest point. Use our ring sizer tool for
                        accurate measurements.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Scarves</h4>
                      <p className="text-sm text-muted-foreground">
                        Our scarves are designed as one-size-fits-all with versatile styling options for different
                        looks.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Measurement Guide */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">How to Measure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">For Women</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-foreground">Bust:</strong>
                      <span className="text-muted-foreground ml-2">
                        Measure around the fullest part of your bust, keeping the tape parallel to the floor.
                      </span>
                    </div>
                    <div>
                      <strong className="text-foreground">Waist:</strong>
                      <span className="text-muted-foreground ml-2">
                        Measure around your natural waistline, the narrowest part of your torso.
                      </span>
                    </div>
                    <div>
                      <strong className="text-foreground">Hips:</strong>
                      <span className="text-muted-foreground ml-2">
                        Measure around the fullest part of your hips, about 8 inches below your waist.
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">For Men</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-foreground">Chest:</strong>
                      <span className="text-muted-foreground ml-2">
                        Measure around the fullest part of your chest, under your arms.
                      </span>
                    </div>
                    <div>
                      <strong className="text-foreground">Waist:</strong>
                      <span className="text-muted-foreground ml-2">
                        Measure around your natural waistline where you typically wear your pants.
                      </span>
                    </div>
                    <div>
                      <strong className="text-foreground">Neck:</strong>
                      <span className="text-muted-foreground ml-2">
                        Measure around the base of your neck where a shirt collar would sit.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
