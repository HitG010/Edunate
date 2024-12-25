import Header from "../Components/header";
import { CgArrowTopRight } from "react-icons/cg";

export default function Landing() {
  return (
    <div className="flex flex-col items-center w-full">
      <Header />
      <div className="main">
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
              <button className="gap-2 bg-black text-white py-2 px-8 rounded-lg text-xl flex justify-center items-center">
                <a href="/signup">Get Started</a>
                <CgArrowTopRight className="h-8 w-6" />
              </button>
            </div>
            <img
              src="flyingBills2.svg"
              className="left-[10%] top-[60vh] absolute z-0"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
