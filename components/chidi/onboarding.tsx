"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Store, MessageCircle, BarChart3 } from "lucide-react"

interface OnboardingProps {
  onComplete: (userData: any) => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    category: "",
  })

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      onComplete(userData)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }))
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Welcome to CHIDI</CardTitle>
            <p className="text-muted-foreground">Your AI business assistant for WhatsApp & Instagram sales</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <Store className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Manage Inventory</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <MessageCircle className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">AI Customer Chat</p>
              </div>
            </div>
            <Button onClick={handleNext} className="w-full">
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Tell us about your business</CardTitle>
            <p className="text-muted-foreground">Help us personalize your experience</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="e.g., Bella's Fashion Store"
                value={userData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerName">Your Name</Label>
              <Input
                id="ownerName"
                placeholder="e.g., Bella Okafor"
                value={userData.ownerName}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">WhatsApp Number</Label>
              <Input
                id="phone"
                placeholder="e.g., +234 801 234 5678"
                value={userData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <Button onClick={handleNext} className="w-full" disabled={!userData.businessName || !userData.ownerName}>
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === 3) {
    const categories = [
      "Fashion & Clothing",
      "Electronics",
      "Beauty & Cosmetics",
      "Food & Beverages",
      "Home & Living",
      "Other",
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>What do you sell?</CardTitle>
            <p className="text-muted-foreground">This helps CHIDI understand your products better</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={userData.category === category ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => handleInputChange("category", category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <Button onClick={handleNext} className="w-full" disabled={!userData.category}>
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <CardTitle>You're all set!</CardTitle>
          <p className="text-muted-foreground">
            Welcome to CHIDI, {userData.ownerName}! Let's start growing {userData.businessName}.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium">What's next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Add your first products</li>
              <li>• Connect your WhatsApp</li>
              <li>• Start chatting with customers</li>
            </ul>
          </div>
          <Button onClick={handleNext} className="w-full">
            Enter CHIDI
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
