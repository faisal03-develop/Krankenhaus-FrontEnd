import Biography from '../../../components/landing-page-components/biograghy/index';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 pt-30 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About MediCare
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Dedicated to providing exceptional healthcare services with compassion, innovation, and excellence for over 15 years.
          </p>
        </div>
      </section>

      {/* Biography Section */}
      <Biography />
      
      {/* Stats Section */}
      <section className="py-12 md:py-16 px-4 bg-blue-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-sm md:text-base opacity-90">Happy Patients</div>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base opacity-90">Expert Doctors</div>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">15+</div>
              <div className="text-sm md:text-base opacity-90">Years Experience</div>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm md:text-base opacity-90">Emergency Care</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide compassionate, high-quality healthcare services that improve the health and well-being of our community. We are committed to excellence in patient care, medical education, and research.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading healthcare provider in our region, recognized for our innovative treatments, exceptional patient experience, and commitment to advancing medical knowledge for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;