import { BackgroundLines } from "@/components/ui/background-lines";
import Link from "next/link";
import { VanishInput } from "./vanish-input";

function Landing() {
  return (
    <div className=" relative">
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 dark:bg-gray-900 dark:text-white">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          AI-Powered <br /> Prescription Generation.
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          Revolutionizing healthcare with intelligent, accurate, and efficient
          prescription management.
        </p>
        <div className="mt-10 ">
          <Link href="/prescription">
            {/* <Button
              borderRadius="50px"
              className="bg-white text-[20px] px-10 shadow-lg py-3 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              Try Now
            </Button> */}
          </Link>
          <div className=" w-[500px]">
            <VanishInput />
          </div>
        </div>
      </BackgroundLines>
      {/* <HeroParallax products={products} />; */}
    </div>
  );
}

export default Landing;
