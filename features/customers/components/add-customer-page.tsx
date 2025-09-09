"use client"

import { useState } from "react"
import { Button } from "@/features/shared/ui/button"
import { Input } from "@/features/shared/ui/input"
import { Textarea } from "@/features/shared/ui/textarea"
import { ArrowLeft, Plus, User, Phone, Mail, MapPin, Check } from "lucide-react"

interface AddCustomerPageProps {
  onBack: () => void
  onAddCustomer: (customer: any) => void
}

export function AddCustomerPage({ onBack, onAddCustomer }: AddCustomerPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    notes: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      name: formData.name ? "" : "Customer name is required",
      phone: formData.phone ? "" : "Phone number is required",
    }
    
    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const newCustomer = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email || undefined,
      location: formData.location || "Nigeria",
      totalOrders: 0,
      totalSpent: "₦0",
      lastOrder: "Never",
      status: "active" as const,
      notes: formData.notes || "",
      joinDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    }
    
    onAddCustomer(newCustomer)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h1 className="text-lg font-semibold">Add Customer</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="px-4 py-4 max-w-md mx-auto pb-20">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Customer Name
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter customer name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +234 801 234 5678"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email (Optional)
            </label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location (Optional)
            </label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Lagos, Nigeria"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes (Optional)</label>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional information about this customer"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-1" />
            Add Customer
          </Button>
        </form>
      </main>
    </div>
  )
}
