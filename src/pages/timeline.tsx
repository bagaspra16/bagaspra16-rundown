import Head from 'next/head';
import Navbar from '@/components/Navbar';
import TimelineView from '@/components/TimelineView';

export default function Timeline() {
  return (
    <>
      <Head>
        <title>Timeline Proyek | Portfolio</title>
        <meta name="description" content="Timeline 30 proyek portfolio untuk fullstack, backend, dan cybersecurity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="min-h-screen pt-16">
        <TimelineView />
      </main>
      
      <footer className="bg-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-text-secondary text-sm">
            &copy; {new Date().getFullYear()} <span className="text-primary font-medium">bagaspra16-rundown</span>. All rights reserved.
          </p>
          <div className="flex justify-center mt-4 space-x-2">                        
              <p>Created by</p>
              <a href="https://bagaspra16-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors flex items-center gap-1.5">
              <span className="text-primary font-medium">bagaspra16</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
} 