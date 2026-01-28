import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                            About Me
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="EcodeJR Profile"
                                className="rounded-lg shadow-xl w-full h-auto object-cover"
                            />
                        </div>
                        <div className="w-full md:w-1/2 prose lg:prose-xl">
                            <p>
                                Hello! I'm EcodeJR, a passionate Full Stack Developer with a knack for building robust and scalable web applications.
                            </p>
                            <p>
                                With years of experience in the MERN stack (MongoDB, Express, React, Node.js), I help businesses transform their ideas into digital reality.
                                My philosophy is simple: write clean code, design intuitive interfaces, and deliver value.
                            </p>
                            <h3>My Skills</h3>
                            <ul>
                                <li>Frontend: React, Vue, Tailwind CSS, Next.js</li>
                                <li>Backend: Node.js, Express, Python, Django</li>
                                <li>Database: MongoDB, PostgreSQL, Redis</li>
                                <li>DevOps: Docker, AWS, CI/CD</li>
                            </ul>
                            <p>
                                When I'm not coding, you can find me exploring new technologies, contributing to open source, or enjoying a good cup of coffee.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;
