import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import InsightsSection from "@/components/InsightsSection"
import AboutSection from "@/components/AboutSection"
import TeamSection from "@/components/TeamSection"
import ExpertiseSection from "@/components/ExpertiseSection"
import CtaSection from "@/components/CtaSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <InsightsSection />
      <AboutSection />
      <TeamSection />
      <ExpertiseSection />
      <CtaSection />
      <Footer />
    </main>
  )
}

