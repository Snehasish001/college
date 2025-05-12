import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About BikeFinder</h1>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            BikeFinder is your ultimate destination for motorcycle information, comparisons, and updates. 
            We strive to provide comprehensive and accurate information about motorcycles from all major brands, 
            helping enthusiasts and potential buyers make informed decisions.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>Detailed motorcycle specifications and reviews</li>
            <li>Side-by-side bike comparisons</li>
            <li>Latest motorcycle launches and updates</li>
            <li>Brand-specific information and news</li>
            <li>Expert insights and recommendations</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            Our team consists of passionate motorcycle enthusiasts and industry experts who are dedicated to 
            bringing you the most accurate and up-to-date information about the motorcycle world.
          </p>
        </section>

        <section className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you! Reach out to us at{' '}
            <a href="mailto:contact@bikefinder.com">contact@bikefinder.com</a>
          </p>
        </section>

        <section className="about-section project-info">
          <h2>About Our Project</h2>
          
          <div className="project-subsection">
            <h3>Project Overview</h3>
            <p>
              Welcome to BikeFinder, a collaborative Computer Science project developed as part of our final year curriculum at [University/College Name]. 
              Our team has worked diligently to create a solution that addresses the need for comprehensive motorcycle information through innovative technology implementation and thoughtful design.
            </p>
          </div>
          
          <div className="project-subsection">
            <h3>Our Vision</h3>
            <p>
              We aim to provide motorcycle enthusiasts with accurate, detailed information to make informed purchasing decisions. 
              Through this project, we demonstrate not only our technical proficiency but also our commitment to developing practical solutions for real-world challenges.
            </p>
          </div>
          
          <div className="project-subsection">
            <h3>The Team</h3>
            <p>Our diverse team brings together various strengths and perspectives:</p>
            <ul className="team-list">
              <li><strong>[Your Name]</strong> - Team Lead & Backend Developer<br />
                Responsible for project coordination, database architecture, and server-side implementation.</li>
              <li><strong>[Team Member 2]</strong> - Frontend Developer<br />
                Created the user interface and focused on delivering an intuitive user experience.</li>
              <li><strong>[Team Member 3]</strong> - Data Scientist<br />
                Developed algorithms and analysis frameworks to process and interpret user data.</li>
              <li><strong>[Team Member 4]</strong> - QA & Documentation<br />
                Ensured product reliability through comprehensive testing and created technical documentation.</li>
            </ul>
          </div>
          
          <div className="project-subsection">
            <h3>Technologies Used</h3>
            <p>Our project leverages several modern technologies:</p>
            <ul>
              <li><strong>Frontend:</strong> React.js</li>
              <li><strong>Backend:</strong> Node.js, Express</li>
              <li><strong>Database:</strong> MongoDB</li>
              <li><strong>Additional Tools:</strong> Git, AWS services</li>
            </ul>
          </div>
          
          <div className="project-subsection">
            <h3>Project Scope</h3>
            <p>
              This project was developed as our capstone work for the 2023-2024 academic year, representing the culmination of our Computer Science education. 
              It incorporates key concepts from various courses including:
            </p>
            <ul>
              <li>Software Engineering</li>
              <li>Database Management</li>
              <li>User Interface Design</li>
              <li>Web Development</li>
            </ul>
          </div>
          
          <div className="project-subsection">
            <h3>Acknowledgments</h3>
            <p>We would like to express our gratitude to:</p>
            <ul>
              <li><strong>[Professor/Advisor Name]</strong> for their guidance throughout the development process</li>
              <li><strong>[Department Name]</strong> for providing resources and support</li>
              <li><strong>[Any other individuals or organizations]</strong> who contributed to our success</li>
            </ul>
          </div>
          
          <div className="project-subsection">
            <h3>Contact</h3>
            <p>For inquiries about this project, please contact our team at <a href="mailto:email@example.com">[email@example.com]</a></p>
          </div>
          
          <div className="project-footer">
            <p>Project completed: Spring 2024<br />[University/College Name] - Department of Computer Science</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;