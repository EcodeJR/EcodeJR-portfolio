import HeroSection from '../components/public/HeroSection';
import FeaturedProjects from '../components/public/FeaturedProjects';
import ServicesSection from '../components/public/ServicesSection';
import TestimonialsSection from '../components/public/TestimonialsSection';

const Home = () => {
    return (
        <>
            <HeroSection />
            <ServicesSection />
            <FeaturedProjects />
            <TestimonialsSection />
        </>
    );
};

export default Home;
