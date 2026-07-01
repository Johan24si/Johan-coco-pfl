import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/landing/HeroSection';
import StatsSection from '../components/landing/StatsSection';
import FeatureSection from '../components/landing/FeatureSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import TestimonialSection from '../components/landing/TestimonialSection';
import CTASection from '../components/landing/CTASection';
import { useAuthContext } from '../context/AuthContext';

export default function LandingPage() {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Auth guard: Jika user sudah login, redirect ke dashboard yang sesuai
    if (!loading && user) {
      if (user.role === 'admin') {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/member/dashboard', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  if (loading) return null; // Wait for auth check

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
}
