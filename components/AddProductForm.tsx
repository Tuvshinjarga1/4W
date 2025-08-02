"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, Calendar, MapPin, Package, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LocationPicker from "./LocationPicker";
import { addProduct } from "@/lib/data";

const IMGBB_API_KEY = "4f1b1fc0a342c602dc2ebb0f9a4da6f6";

export default function AddProductForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    quantity: "",
    expiryDate: "",
    location: "",
    coordinates: null as { lat: number; lng: number } | null,
    image: "",
  });

  const categories = [
    "Жимс",
    "Ногоо",
    "Сүүн бүтээгдэхүүн",
    "Талх",
    "Мах",
    "Бусад",
  ];

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Зөвхөн зураг файл сонгоно уу!");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Зургийн хэмжээ 5MB-аас бага байх ёстой!");
        return;
      }

      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Зураг хадгалахад алдаа гарлаа");
    }

    const data = await response.json();
    return data.data.url;
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = "";

      // Upload image if selected
      if (selectedImage) {
        imageUrl = await uploadImageToImgBB(selectedImage);
      }

      // Prepare product data for Firebase
      const productData = {
        ...formData,
        image: imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Log coordinates for debugging
      console.log("Form data:", formData);
      console.log("Coordinates being saved:", formData.coordinates);
      console.log("Product data to be saved:", productData);

      // Add product to Firebase
      await addProduct(productData);

      console.log("Product added successfully:", productData);

      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Бүтээгдэхүүн нэмэхэд алдаа:", error);
      alert("Бүтээгдэхүүн нэмэхэд алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (
    location: string,
    coordinates?: { lat: number; lng: number }
  ) => {
    console.log("AddProductForm - Location changed:", {
      location,
      coordinates,
    });
    setFormData((prev) => ({
      ...prev,
      location,
      coordinates: coordinates || null,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="title"
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2"
            >
              <FileText className="w-4 h-4" />
              Бүтээгдэхүүний нэр
            </Label>
            <Input
              id="title"
              placeholder="жишээ нь: Шинэ органик алим"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div>
            <Label
              htmlFor="description"
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2"
            >
              <FileText className="w-4 h-4" />
              Тайлбар
            </Label>
            <Textarea
              id="description"
              placeholder="Бүтээгдэхүүнийхээ тухай, байдал болон онцлог шинж чанарыг тайлбарлана уу..."
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
                Ангилал
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ангилал сонгох" />
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
              <Label
                htmlFor="quantity"
                className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2"
              >
                <Package className="w-4 h-4" />
                Тоо хэмжээ
              </Label>
              <Input
                id="quantity"
                placeholder="жишээ нь: 5 кг, 10 ширхэг"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="expiryDate"
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2"
            >
              <Calendar className="w-4 h-4" />
              Дуусах огноо
            </Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              required
            />
          </div>

          <LocationPicker
            value={formData.location}
            onChange={handleLocationChange}
          />

          {/* Координат мэдээлэл харуулах */}
          {formData.coordinates && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <span>📍</span>
                <span>Координат хадгалагдана:</span>
              </div>
              <div className="text-xs text-green-600 mt-1">
                {formData.coordinates.lat.toFixed(6)},{" "}
                {formData.coordinates.lng.toFixed(6)}
              </div>
            </div>
          )}

          <div>
            <Label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <Camera className="w-4 h-4" />
              Бүтээгдэхүүний зураг
            </Label>

            {!selectedImage ? (
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                <Camera className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <p className="text-sm text-neutral-600 mb-2">
                  Бүтээгдэхүүнийхээ зураг оруулна уу (сонгох боломжтой)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Зураг сонгох
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeSelectedImage}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-xs text-neutral-600 text-center">
                  💡 Зураг нь "Бүтээгдэхүүн нэмэх" товч дээр дарахад
                  хадгалагдана
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Бүтээгдэхүүн нэмж байна..." : "Бүтээгдэхүүн нэмэх"}
      </Button>
    </form>
  );
}
