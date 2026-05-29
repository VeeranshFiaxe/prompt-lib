import './globals.css';
import { FavoritesProvider } from '@/context/FavoritesContext';

export const metadata = {
  title: 'AI Prompt Library · Tata AIA Partner Office',
  description:
    'Ready-to-use AI prompts for insurance professionals. Copy, paste into Claude or ChatGPT, and get polished results in seconds. Powered by the PET Framework.',
  keywords: [
    'AI prompts',
    'insurance',
    'Tata AIA',
    'prompt library',
    'ChatGPT',
    'Claude',
    'PET framework',
    'business communication',
  ],
  authors: [{ name: 'Tata AIA Partner Office' }],
  openGraph: {
    title: 'AI Prompt Library · Tata AIA Partner Office',
    description:
      'Ready-to-use AI prompts for insurance professionals. Copy, paste, and get things done.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#fcfbf9] antialiased">
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
