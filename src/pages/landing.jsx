import Header from "../Components/header";
import Feature from "../Components/feature";
import Benefit from "../Components/benefit";
import { CgArrowTopRight } from "react-icons/cg";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { VscFeedback } from "react-icons/vsc";
import { IoMdStar } from "react-icons/io";
import { GiCrimeSceneTape } from "react-icons/gi";

const features = [
  {
    title: "Verified Institutions",
    description: "Browse from verified profiles of colleges & universities",
    icon: <RiVerifiedBadgeFill className="h-16 w-16" />,
  },
  {
    title: "Transparent Fund Tracking",
    description: "Track and verify your contributions in real-time",
    icon: (
      <img
        src="material-symbols-light_eye-tracking.svg"
        className="h-16 w-16"
      ></img>
    ),
  },
  {
    title: "Cause-specific Donation Pools",
    description:
      "Contribute to pools for specific causes: Scholarships, infra, etc.",
    icon: <img src="icon-park_funds.svg"></img>,
  },
  {
    title: "Proof-of-Progress",
    description: "Introducing Milestone-based payments for donations",
    icon: <BiSolidReport className="h-16 w-16" />,
  },
  {
    title: "Crowdsourced Validation",
    description: "Student reviews & feedbacks validate institution's claims",
    icon: <VscFeedback className="h-16 w-16" />,
  },
  {
    title: "Reputation Scoring",
    description: "Reputation scores for institutions based on progress reports",
    icon: <IoMdStar className="h-16 w-16" />,
  },
  {
    title: "Automated Pool Creation",
    description: "Machine learning-driven smart allocation of donation funds",
    icon: (
      <img
        src="carbon_ibm-cloud-pak-manta-automated-data-lineage.svg"
        className="h-16 w-16"
      ></img>
    ),
  },
  {
    title: "Fraud Detection",
    description:
      "AI-powered anomaly detection for fake reports & falsified invoices",
    icon: <GiCrimeSceneTape className="h-16 w-16" />,
  },
];

const benefits = [
  {
    title: "Transparency You Can Trust",
    description: (
      <p className="text-xl">
        Edunate leverages the
        <span className="font-bold"> Educhain blockchain</span>, a decentralized
        ledger technology that ensures every transaction is immutable,
        traceable, and secure. By using smart contracts, donations are recorded
        with precise details, including donor identity (via{" "}
        <span className="font-bold"> Open Campus ID</span>), amount, timestamp,
        and allocation purpose. This eliminates the possibility of fund
        mismanagement or tampering, offering donors full visibility over their
        contributions.
      </p>
    ),
    num: "01",
    reverse: false,
  },
  {
    title: "Impact You Can See",
    description: (
      <p className="text-end text-xl">
        Our <span className="font-bold"> milestone-based payment system</span>{" "}
        utilizes blockchain-enabled{" "}
        <span className="font-bold"> proof-of-progess</span> validations,
        ensuring funds are released only when institutions achieve predefined
        milestones. Institutions submit progress reports, invoices, and
        multimedia proof (e.g., photos, videos) that are verified using a
        combination of <span className="font-bold"> smart contracts</span> and
        <span className="font-bold"> machine learning models</span> for
        authenticity.
      </p>
    ),
    num: "02",
    reverse: true,
  },
  {
    title: "Smarter Giving",
    description: (
      <p className="text-xl">
        Edunate integrates machine learning models to analyze donation patterns,
        institutional requirements, and student reviews. This ensures
        intelligent allocation of funds to areas with the highest impact. Using
        <span className="font-bold"> NLP (Natural Language Processing)</span>,
        student reviews are scanned to identify trends and flag potential
        issues, while <span className="font-bold"> predictive analysis</span>{" "}
        forecasts areas of need for proactive donation pool creation.
      </p>
    ),
    num: "03",
    reverse: false,
  },
  {
    title: "Community-Driven Ecosystem",
    description: (
      <p className="text-end text-xl">
        We foster a collaborative platform where alumni, students, and
        institutions can actively participate in the donation ecosystem. With
        tools like reputation scoring powered by{" "}
        <span className="font-bold"> blockchain-based weighted reviews</span>{" "}
        and <span className="font-bold"> student feedback analysis</span>,
        Alumnus and users can make informed decisions about where to contribute.
      </p>
    ),
    num: "04",
    reverse: true,
  },
];

export default function Landing() {
  return (
    <div className="flex flex-col items-center w-full text-[#220000]">
      <Header />
      <div className="main flex flex-col items-center w-full mt-20 mb-20">
        <div className="flex justify-center items-center w-full h-[80vh]">
          <div className="flex flex-col justify-center items-center w-[80%] text-center">
            <img
              src="flyingBills1.svg"
              className="right-[10%] top-0 absolute z-0"
            ></img>
            <div className="w-[80%] lg:w-[60%] z-10 flex flex-col items-center">
              <h1 className="text-7xl font-bold mb-8 text-wrap leading-none">
                “Think your donation ends at the cheque? Think again!”
              </h1>
              <p className="text-2xl mb-8">
                Transforming{" "}
                <span className="font-bold">alumni donations </span>
                into trust-fueled investments—where every dollar finds its
                rightful purpose, transparently and impactfully.
              </p>

              <button className="gap-2 bg-[#220000] text-[#f0f0f0] font-semibold py-2 px-8 rounded-lg text-xl flex justify-center items-center">
                <a href="/login">Get Started</a>
                <CgArrowTopRight className="h-8 w-6" />
              </button>
            </div>
            <img
              src="flyingBills2.svg"
              className="left-[10%] top-[60vh] absolute z-0"
            ></img>
          </div>
        </div>
        <div className="features flex flex-col justify-around items-center w-[90%] h-[80vh] mt-16">
          <div className="flex flex-col justify-center items-center w-[80%] text-center">
            <h1 className="text-3xl">Core Features of Edunate</h1>
            <h1 className="text-6xl font-extrabold mt-5">
              Trust. Track. Transform.
            </h1>
          </div>
          <div className="flex flex-wrap w-full">
            {features.map((feature, index) => (
              <Feature
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
          <button className="gap-2 bg-[#220000] text-white py-2 px-8 rounded-lg text-xl flex justify-center items-center">
            <a href="/signup">Explore More</a>
            <CgArrowTopRight className="h-8 w-6" />
          </button>
        </div>
        <div className="choose flex flex-col w-[90%] p-10 justify-around items-center mt-16">
          <h1 className="text-6xl font-bold">Why Choose Edunate? </h1>
          <div className="flex flex-col mt-10">
            {benefits.map((benefit, index) => (
              <Benefit
                key={index}
                title={benefit.title}
                description={benefit.description}
                num={benefit.num}
                reverse={benefit.reverse}
              />
            ))}
          </div>
        </div>
        <div className="join flex w-[90%] h-[40vh] justify-between items-center">
          <div className="flex flex-col justify-center items-center w-[40%] h-full">
            <h1 className="font-extrabold text-8xl">Edunate</h1>
            <div className="flex gap-3 justify-center items-center mt-3">
              Powered by <img src="openCampus.svg" alt="" />
            </div>
          </div>
          <div className="flex flex-col justify-around w-[50%] h-full">
            <div className="flex flex-col justify-center items-start">
              <h1 className="font-extrabold text-6xl">JOIN THE MOVEMENT,</h1>
              <h1 className="font-bold text-5xl mt-2">For a Good Cause!</h1>
            </div>
            <div className="text-2xl mt-5">
              Start your journey with Edunate today and turn your generosity
              into tangible change. Together, we can redefine the future of
              Educational Institutions.
            </div>
            <div className="flex w-full justify-start items-center mt-5 gap-3">
              <button className="gap-2 bg-[#220000] text-white py-2 px-8 rounded-lg text-xl flex justify-center items-center">
                <a href="/login">Sign Up as an Alumni</a>
              </button>
              <p className="font-bold text-xl">or</p>
              <button className="gap-2 bg-[#220000] text-white py-2 px-8 rounded-lg text-xl flex justify-center items-center">
                <a href="/instLogin">Register as an Instituition</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
