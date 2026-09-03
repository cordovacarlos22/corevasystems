"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackPurchaseConversion } from "@/lib/gtag";
import { trackPurchasePixel } from "@/lib/metapixel";

export default function PurchaseConversionTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      // transaction_id dedupes this conversion if the page is reloaded/revisited.
      trackPurchaseConversion({ transactionId: sessionId });
      trackPurchasePixel();
    }
  }, [searchParams]);

  return null;
}
