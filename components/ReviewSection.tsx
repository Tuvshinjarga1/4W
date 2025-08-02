"use client";

import { useState, useEffect } from "react";
import { Star, Send, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  helpful: number;
  notHelpful: number;
}

interface ReviewSectionProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Mock data for now - replace with actual Firebase calls
  useEffect(() => {
    // Simulate loading reviews
    const mockReviews: Review[] = [
      {
        id: "1",
        productId,
        userId: "user1",
        userName: "Бат",
        rating: 5,
        comment: "Маш сайн бүтээгдэхүүн!",
        createdAt: new Date("2025-01-15"),
        helpful: 3,
        notHelpful: 0,
      },
      {
        id: "2",
        productId,
        userId: "user2",
        userName: "Сүхээ",
        rating: 4,
        comment: "чанар сайн.",
        createdAt: new Date("2025-01-14"),
        helpful: 1,
        notHelpful: 1,
      },
    ];
    setReviews(mockReviews);
  }, [productId]);

  const handleSubmitReview = async () => {
    if (!currentUser) {
      alert("Санал сэтгэгдэл үлдээхийн тулд нэвтэрнэ үү!");
      return;
    }

    if (!newReview.trim()) {
      alert("Санал сэтгэгдэл бичнэ үү!");
      return;
    }

    if (rating === 0) {
      alert("Үнэлгээ өгнө үү!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual Firebase
      const newReviewData: Review = {
        id: Date.now().toString(),
        productId,
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email || "Хэрэглэгч",
        rating,
        comment: newReview,
        createdAt: new Date(),
        helpful: 0,
        notHelpful: 0,
      };

      setReviews((prev) => [newReviewData, ...prev]);
      setNewReview("");
      setRating(0);
      setShowReviewForm(false);

      // Here you would call Firebase to save the review
      // await addReview(newReviewData);
    } catch (error) {
      console.error("Санал сэтгэгдэл үлдээхэд алдаа:", error);
      alert("Санал сэтгэгдэл үлдээхэд алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-neutral-800">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= averageRating
                    ? "text-yellow-400 fill-current"
                    : "text-neutral-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-neutral-600">
            {reviews.length} санал сэтгэгдэл
          </div>
        </div>
        <div className="flex-1">
          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-green-600 hover:bg-green-700"
          >
            Санал сэтгэгдэл үлдээх
          </Button>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="p-4 border border-neutral-200 rounded-lg">
          <h3 className="font-medium text-neutral-800 mb-3">
            Санал сэтгэгдэл үлдээх
          </h3>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Үнэлгээ
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? "text-yellow-400 fill-current"
                        : "text-neutral-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Санал сэтгэгдэл
            </label>
            <Textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Бүтээгдэхүүнийхээ тухай санал сэтгэгдлээ бичнэ үү..."
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSubmitReview}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Илгээж байна..." : "Илгээх"}
            </Button>
            <Button variant="outline" onClick={() => setShowReviewForm(false)}>
              Цуцлах
            </Button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-neutral-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 text-neutral-300" />
            <p>Одоогоор санал сэтгэгдэл байхгүй байна</p>
            <p className="text-sm">Анхны санал сэтгэгдлээ үлдээе!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-neutral-200 pb-4 last:border-b-0"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-neutral-800">
                      {review.userName}
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-neutral-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              </div>

              <p className="text-neutral-700 mb-3">{review.comment}</p>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-neutral-600 hover:text-green-600">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{review.helpful}</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-neutral-600 hover:text-red-600">
                  <ThumbsDown className="w-4 h-4" />
                  <span>{review.notHelpful}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
