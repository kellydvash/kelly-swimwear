import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelly Swimwear",
  description: "The Kelly Swimwear storefront.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
