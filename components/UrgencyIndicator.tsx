import { Badge } from "@/components/ui/badge";

interface UrgencyIndicatorProps {
  expiryDate: string;
}

export default function UrgencyIndicator({
  expiryDate,
}: UrgencyIndicatorProps) {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return (
      <Badge variant="destructive" className="text-xs">
        Дууссан
      </Badge>
    );
  }

  if (diffDays === 0) {
    return (
      <Badge variant="destructive" className="text-xs">
        Өнөөдөр дуусна
      </Badge>
    );
  }

  if (diffDays === 1) {
    return (
      <Badge
        variant="destructive"
        className="bg-orange-500 hover:bg-orange-600 text-xs"
      >
        1 хоног үлдсэн
      </Badge>
    );
  }

  if (diffDays <= 3) {
    return (
      <Badge
        variant="secondary"
        className="bg-yellow-100 text-yellow-800 text-xs"
      >
        {diffDays} хоног үлдсэн
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
      {diffDays} хоног үлдсэн
    </Badge>
  );
}
