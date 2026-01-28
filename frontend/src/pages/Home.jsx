import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/public/HeroSection';
import FeaturedProjects from '../components/public/FeaturedProjects';
import ServicesSection from '../components/public/ServicesSection';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <HeroSection />
                <ServicesSection />
                <FeaturedProjects />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
