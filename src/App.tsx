import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { GlobalVideoBackground } from './components/GlobalVideoBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWorks } from './components/SelectedWorks';
import { Journal } from './components/Journal';
import { Explorations } from './components/Explorations';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-transparent text-text-primary min-h-screen relative font-body selection:bg-white/20 selection:text-white">
      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Global Fixed Video Background */}
      {!isLoading && <GlobalVideoBackground />}

      {/* Main Page Layout */}
      {!isLoading && (
        <div className="relative z-10 bg-transparent">
          <Navbar />
          <main className="bg-transparent">
            <Hero />
            <SelectedWorks />
            <Journal />
            <Explorations />
            <Stats />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
