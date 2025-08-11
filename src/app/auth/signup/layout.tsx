import Footer from "@app/components/Footer";
import Navbar from "@app/components/Navbar";

export default function SignUPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
