import { redirect } from "next/navigation";
import { DEFAULT_LANGUAGE } from "@/lib/i18n";

export default function RootRedirectPage() {
  redirect(`/${DEFAULT_LANGUAGE}`);
}
