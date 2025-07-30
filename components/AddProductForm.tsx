"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Calendar, MapPin, Package, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddProductForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    quantity: "",
    expiryDate: "",
    location: "",
    image: "",
  })

  const categories = ["Fruits", "Vegetables", "Dairy", "Bakery", "Meat", "Other"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would submit to your API here
    console.log("Product data:", formData)

    setIsSubmitting(false)
    router.push("/")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <FileText className="w-4 h-4" />
              Product Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., Fresh organic apples"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <FileText className="w-4 h-4" />
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your product, condition, and any special notes..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                <Package className="w-4 h-4" />
                Category
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity" className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                <Package className="w-4 h-4" />
                Quantity
              </Label>
              <Input
                id="quantity"
                placeholder="e.g., 5 kg, 10 pieces"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="expiryDate" className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <Calendar className="w-4 h-4" />
              Expiry Date
            </Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="e.g., Downtown, Main Street"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
            />
          </div>

          <div>
            <Label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <Camera className="w-4 h-4" />
              Product Photo
            </Label>
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
              <Camera className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm text-neutral-600 mb-2">Upload a photo of your product</p>
              <Button type="button" variant="outline" size="sm">
                Choose Photo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
        {isSubmitting ? "Adding Product..." : "Add Product"}
      </Button>
    </form>
  )
}
