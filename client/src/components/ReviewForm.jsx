import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { submitProductReview } from "../services/api";

function ReviewForm({ productId, orderId, productName }) {
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);

  const reviewMutation = useMutation({
    mutationFn: submitProductReview,

    onSuccess: () => {
      setHasReviewed(true);

      queryClient.invalidateQueries({
        queryKey: ["product-reviews", productId],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    reviewMutation.mutate({
      product_id: Number(productId),
      order_id: Number(orderId),
      rating,
      comment: comment.trim(),
    });
  };

  // Hide the form after successful submission.
  if (hasReviewed) {
    return (
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700">
        <CheckCircle2 size={18} />
        Review submitted successfully!
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 space-y-3 rounded-xl border border-slate-200 p-4"
    >
      <h4 className="font-bold text-slate-900">
        Rate {productName}
      </h4>

      {/* Rating stars */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            aria-label={`Rate ${star} out of 5 stars`}
            className="rounded p-1 transition hover:scale-110"
          >
            <Star
              size={24}
              className={
                star <= rating
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-300"
              }
            />
          </button>
        ))}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a review (optional)..."
        maxLength={1000}
        rows={3}
        className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      {/* Error message */}
      {reviewMutation.isError && (
        <p className="text-sm text-red-600">
          {reviewMutation.error.message}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={reviewMutation.isPending}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {reviewMutation.isPending ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  );
}

export default ReviewForm;