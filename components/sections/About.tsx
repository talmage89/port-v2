import { buttonVariants } from "../ui/button";
import { ArrowDown } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="bg-white py-16 md:py-32 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">About Me</h2>
          {/* <div className="w-20 h-1 bg-slate-900 rounded mb-8"></div> */}
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h3 className="mb-4 text-2xl font-bold">Who I Am</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              I'm a passionate software developer with 2 years of experience creating digital products that solve
              real-world problems. My journey in tech began with a curiosity about how things work, which evolved into a
              career building elegant solutions.
            </p>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              I specialize in full-stack development with a focus on creating responsive, accessible, and performant web
              applications. My approach combines technical expertise with an eye for design to build experiences that
              users love.
            </p>

            <div className="mb-8 grid grid-cols-2 gap-4">
              <div>
                <h4 className="mb-2 font-bold">Name:</h4>
                <p className="text-gray-600 dark:text-gray-400">Talmage Bergeson</p>
              </div>
              <div>
                <h4 className="mb-2 font-bold">Email:</h4>
                <p className="text-gray-600 dark:text-gray-400">talmage.bergeson@gmail.com</p>
              </div>
              <div>
                <h4 className="mb-2 font-bold">Location:</h4>
                <p className="text-gray-600 dark:text-gray-400">Salt Lake City, Utah</p>
              </div>
              <div>
                <h4 className="mb-2 font-bold">Availability:</h4>
                <p className="text-gray-600 dark:text-gray-400">Full-time</p>
              </div>
            </div>

            <a href="/resume.pdf" target="_blank" className={buttonVariants({ variant: "colorful", size: "lg" })}>
              Download Resume
              <ArrowDown />
            </a>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute -inset-0 rounded-sm bg-gradient-to-tr from-blue-500 to-purple-600 opacity-20 blur-xl"></div>
              {/* Replace with your actual image */}
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-sm bg-gray-200 dark:bg-gray-800">
                <span className="text-9xl font-bold text-gray-300 dark:text-gray-700">TB</span>
                {/* When you have an actual image, uncomment this: */}
                {/* <Image 
                  src="/your-image.jpg" 
                  alt="Your Name"
                  fill
                  className="object-cover"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
