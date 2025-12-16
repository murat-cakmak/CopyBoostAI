import type { Metadata } from "next";
import { CookiePolicyContent } from "@/components/CookiePolicyContent";

export const metadata: Metadata = {
  title: "Cookie Policy | CopyBoost AI",
  description: "Çerez kullanımımız ve veri işleme yaklaşımımız hakkında bilgi edinin.",
};

export default function CookiePolicyPage() {
  return (
    <div className="container max-w-3xl py-12">
      <CookiePolicyContent />
    </div>
  );
}
