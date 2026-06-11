import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AnalysisProvider } from '@/context/AnalysisContext';
import AppShell from '@/components/shell/AppShell';

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  weight: ['400', '500', '600', '700'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'AleaAI — NBA Kalshi Analyzer',
  description: 'Turn a Kalshi screenshot into a historical edge report.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`}>
      <body className="bg-ink font-display text-hi antialiased">
        <AnalysisProvider>
          <AppShell>{children}</AppShell>
        </AnalysisProvider>
      </body>
    </html>
  );
}
