import Footer from "@app/components/Footer";
import Navbar from "@app/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </body>
  );
}
