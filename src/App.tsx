import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import PrayerTimesCard from './components/PrayerTimesCard';
import RamadanCountdown from './components/RamadanCountdown';
import DailyVerse from './components/DailyVerse';
import QuranSection from './components/QuranSection';
import Bookmarks from './components/Bookmarks';
import Tasbeeh from './components/Tasbeeh';
import PrayerLearning from './components/PrayerLearning';
import Ramadan from './components/Ramadan';
import IslamicEvents from './components/IslamicEvents';
import DateHeader from './components/DateHeader';
import GlobalAudioPlayer from './components/GlobalAudioPlayer';
import DeveloperPage from './components/DeveloperPage';
import IslamicQuiz from './components/IslamicQuiz';
import { useLocation } from './hooks/useLocation';
import { getPrayerTimes, PrayerTimes } from './services/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';

function Dashboard({ timings, loading }: { timings: PrayerTimes | null, loading: boolean }) {
  return (
    <div className="space-y-6">
      <DateHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RamadanCountdown timings={timings} />
          <DailyVerse />
        </div>
        <div className="lg:col-span-1">
          <PrayerTimesCard timings={timings} loading={loading} />
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { latitude, longitude, loading: locationLoading } = useLocation();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (latitude && longitude) {
      getPrayerTimes(latitude, longitude)
        .then((data) => {
          setPrayerTimes(data.timings);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [latitude, longitude]);

  const isLoading = loading || locationLoading;

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard timings={prayerTimes} loading={isLoading} />} />
        <Route path="/quran" element={<QuranSection />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/tasbeeh" element={<Tasbeeh />} />
        <Route path="/prayer-info" element={<PrayerLearning />} />
        <Route path="/ramadan" element={<Ramadan timings={prayerTimes} />} />
        <Route path="/events" element={<IslamicEvents />} />
        <Route path="/quiz" element={<IslamicQuiz />} />
        <Route path="/developer" element={<DeveloperPage />} />
      </Routes>
      <GlobalAudioPlayer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AudioProvider>
        <Layout>
          <AppContent />
        </Layout>
      </AudioProvider>
    </BrowserRouter>
  );
}
