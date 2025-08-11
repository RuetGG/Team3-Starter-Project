import Card from "@components/IndexCard";
import CardJourney from "@components/CardJourney";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import styles from "./Orbit.module.css";

function Index() {
  return (
    <>
      <Navbar></Navbar>
      {/* Hero Section */}
      <div className="bg-gray-200">
        <div className="relative w-full">
          <img
            src="images/Diverse group of students working together.png"
            alt="Students working together"
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-white px-4 max-w-4xl">
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
                Forge Your Future in Tech
              </h1>
              <p className="mb-6 text-base sm:text-lg leading-relaxed">
                Join an elite community of Africa's brightest minds and get
                fast-tracked to a software engineering career
                <br /> at the world’s leading tech companies.
              </p>
              <a
                href="/auth/signup"
                className="btn btn-primary"
                aria-label="Start Your Application"
              >
                Start Your Application
              </a>
            </div>
          </div>
        </div>

        {/* Logo Marquee */}
        <div className="overflow-hidden relative w-full h-12 sm:h-16 my-6">
          <div className={styles.marquee}>
            <div className={styles.logoGroup}>
              <img
                src="images/google-logo.png"
                alt="Google logo"
                className="h-8 sm:h-12"
              />
              <img
                src="images/amazon-logo.png"
                alt="Amazon logo"
                className="h-8 sm:h-12"
              />
              {/* Add more logos here if needed */}
            </div>
            <div className={styles.logoGroup}>
              <img
                src="images/google-logo.png"
                alt="Google logo"
                className="h-8 sm:h-12"
              />
              <img
                src="images/amazon-logo.png"
                alt="Amazon logo"
                className="h-8 sm:h-12"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Your Journey Section */}
      <section
        id="journey"
        className="w-full max-w-6xl mx-auto px-4 mt-16 p-16"
      >
        <h2 className="text-3xl font-extrabold text-center mb-10">
          Your Journey to Silicon Valley
        </h2>
        <div className="flex flex-wrap flex-row gap-8 justify-center ">
          <CardJourney
            image="images/phase1.png"
            description="Master data structures,
algorithms, and problem-solving techniques in an intensive 3-month bootcamp."
            title="Phase 1: Foundations"
          ></CardJourney>
          <CardJourney
            image="images/phase2.png"
            description="Apply your skills to build complex projects, collaborate in teams, and prepare for technical interviews."
            title="Phase 2: Real-world Projects"
          ></CardJourney>
          <CardJourney
            image="images/phase3.png"
            description="We help you secure internships at top global tech companies to gain invaluable experience."
            title="Phase 3: Internship Placement"
          ></CardJourney>
          <CardJourney
            image="images/phase4.png"
            description="Excel in your internship and convert it into a full-time offer, launching your global career."
            title="Phase 4: Full-Time Conversion"
          ></CardJourney>
        </div>
      </section>

      {/* About Section */}
      <div id="about" className="bg-gray-200 p-5">
        <section className="w-full flex justify-center mt-16 px-4">
          <div className="card lg:card-side max-w-6xl w-full">
            <div className="card-body lg:w-1/2">
              <h2 className="text-3xl font-extrabold mb-10">
                Built by Engineers, for Engineers!
              </h2>
              <p>
                A2SV is not just a program; it's a community. We're on a mission
                to identify Africa's most brilliant minds and provide them with
                the resources, mentorship, and opportunities to solve humanity's
                greatest challenges.
              </p>
            </div>
            <figure className="lg:w-1/2">
              <img
                src="images/Team meeting.png"
                alt="Team meeting"
                className="object-cover w-full h-full"
              />
            </figure>
          </div>
        </section>
      </div>

      {/* Alumni Section */}
      <section id="alumni" className="w-full max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-3xl font-extrabold text-center mb-10">
          Hear from our Alumni
        </h2>
        <div className="flex flex-wrap flex-row gap-8 justify-center">
          <Card
            image="images/abel.png" /* Replace with real images */
            role="Software Engineer, Google"
            name="Abel Tadesse"
            description="A2SV completely changed the trajectory of my career. The training is intense, but the community and the opportunities are unparalleled. I'm now at my dream company, and I owe it all to A2SV."
          />
          <Card
            image="images/bethlehem.png"
            role="Software Engineer, Amazon"
            name="Bethlehem Tadesse"
            description="The problem-solving skills I learned at A2SV are invaluable. The mentors push you to be your best, and you're surrounded by people who are just as passionate as you are."
          />
          <Card
            image="images/caleb.png"
            role="Software Engineer, Palantir"
            name="Caleb Alemayehu"
            description="A2SV is more than a bootcamp. It's a family that supports you long after you've graduated. The network you build here is for life."
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-primary text-neutral-content mt-16">
        <div className="card-body items-center text-center py-16 px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-10">
            Ready to change your life?
          </h2>
          <p className="mb-6">
            The next application cycle is now open. Take the first step towards
            your dream career.
          </p>
          <a className="btn" aria-label="Apply Now" href="/auth/signup">
            Apply Now
          </a>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}

export default Index;