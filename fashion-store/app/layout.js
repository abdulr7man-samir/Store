import './styles/globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'متجر الأزياء الفاخرة',
  description: 'أفضل متجر أزياء بالعربية',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 text-white mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-lg font-bold mb-2">© 2026 متجر الأزياء الفاخرة</p>
            <p className="text-gray-400">أفضل الموضات والملابس العصرية</p>
            <p className="text-gray-500 mt-2">الدفع عند الاستلام - شحن سريع - جودة مضمونة</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
