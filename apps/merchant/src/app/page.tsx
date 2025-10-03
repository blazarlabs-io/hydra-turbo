// Force dynamic rendering to prevent Cardano library issues during build
export const dynamic = "force-dynamic";

export default function Home() {
  // This page should never render because middleware handles redirects
  return null;
}
