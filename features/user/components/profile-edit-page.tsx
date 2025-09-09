"use client"

import { useState } from "react"
import { Button } from "@/features/shared/ui/button"
import { Input } from "@/features/shared/ui/input"
import { Label } from "@/features/shared/ui/label"
import { Textarea } from "@/features/shared/ui/textarea"
import { ArrowLeft, Save, User, Building, MapPin, Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/features/shared/ui/avatar"

interface ProfileEditPageProps {
  userProfile: any
  onBack: () => void
  onUpdateProfile: (profile: any) => void
}

export function ProfileEditPage({ userProfile, onBack, onUpdateProfile }: ProfileEditPageProps) {
  const [formData, setFormData] = useState({
    ownerName: userProfile?.ownerName || "",
    email: userProfile?.email || "",
    phone: userProfile?.phone || "",
    businessName: userProfile?.businessName || "",
    businessCategory: userProfile?.businessCategory || "",
    businessDescription: userProfile?.businessDescription || "",
    address: userProfile?.address || "",
    city: userProfile?.city || "",
    state: userProfile?.state || "",
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onUpdateProfile(formData)
    setIsSaving(false)
    onBack()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold">Edit Profile</h1>
          </div>
          <Button onClick={handleSave} disabled={isSaving} size="sm">
            <Save className="w-3 h-3 mr-1" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <Avatar className="w-24 h-24">
              {userProfile?.image ? (
                <AvatarImage src={userProfile.image} alt={userProfile.ownerName} />
              ) : null}
              <AvatarFallback className="text-xl">
                {userProfile?.ownerName
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase() || "BO"}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0 bg-transparent"
            >
              <Camera className="w-3 h-3" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Tap to change profile picture</p>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-medium">Personal Information</h2>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerName">Full Name</Label>
            <Input
              id="ownerName"
              value={formData.ownerName}
              onChange={(e) => handleInputChange("ownerName", e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Business Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Building className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-medium">Business Information</h2>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => handleInputChange("businessName", e.target.value)}
              placeholder="Enter your business name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessCategory">Business Category</Label>
            <Input
              id="businessCategory"
              value={formData.businessCategory}
              onChange={(e) => handleInputChange("businessCategory", e.target.value)}
              placeholder="e.g., Fashion, Beauty, Food"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessDescription">Business Description</Label>
            <Textarea
              id="businessDescription"
              value={formData.businessDescription}
              onChange={(e) => handleInputChange("businessDescription", e.target.value)}
              placeholder="Describe your business"
              rows={3}
            />
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-medium">Address Information</h2>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter your address"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                placeholder="State"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
