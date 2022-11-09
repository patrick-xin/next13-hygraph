import Image from "next/image";
import bgimg from "../../public/bg.jpg";

const AboutPage = () => {
  return (
    <div>
      <h1 className="text-4xl md:text-5xl lg:text-7xl my-6 md:text-center">
        About us
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 md:gap-8 border-b-2 border-brand py-6 lg:py-12 lg:gap-12 md:border-none">
        <div className="relative w-full h-[40vh]">
          <Image src={bgimg} className="object-cover" fill />
        </div>

        <div>
          <div className="italic text-sm">Newspaper from scratch</div>
          <h3 className="text-3xl my-5 md:text-4xl lg:text-5xl">
            Our company creates with a hobby
          </h3>
          <div className="font-semibold text-lg my-2">Employed people</div>
          <p>
            We focus on and take care of the development of our articles, taking
            care of the highest level. Meet our creators and their biographies.
          </p>
        </div>
      </section>

      <section className="py-6 grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:py-12 lg:gap-12">
        <div>
          <div className="italic text-sm">Our mission</div>
          <h3 className="text-3xl my-5 md:text-4xl lg:text-5xl">
            We always look to the future
          </h3>
          <p>
            We focus on and care for the development of our employees, taking
            care of the highest level of production. We provide constant and
            scientific work, focusing on benefit.
          </p>
        </div>
        <div className="relative w-full h-[40vh]">
          <Image src={bgimg} className="object-cover" fill />
        </div>
      </section>
      <section className="py-6 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <h3 className="text-3xl my-5 md:text-4xl lg:text-5xl">
            Evolution System
          </h3>
          <div>
            <p className="my-4">
              We have a modern STUDIO platform, where we can edit content and
              adjust our content for optimal display on any desktop and mobile
              device. The page loading speed is also optimized. Get to know our
              office and where to visit us. This is just an example of
              information about our activities.
            </p>
            <p>
              We are a company that has been operating on the market for over 20
              years. We have created many startup projects during this time. Our
              office is a process that we create all the time
            </p>
          </div>
        </div>
      </section>
      <section className="py-6 lg:py-12">
        <div className="relative w-full h-[40vh] lg:w-1/2">
          <Image src={bgimg} className="object-cover" fill />
        </div>
        <div className="bg-[#333F36] text-white w-full lg:grid grid-cols-2 gap-10 lg:p-12">
          <div className="p-6">
            <h5 className="text-xl my-4">Daily Update</h5>
            <div>
              The frequency of adding new articles is very important and builds
              confidence that we will see something new with every visit.
            </div>
          </div>
          <div className="bg-[#404A41] p-6">
            <h5 className="text-xl my-4">Only reliable information</h5>
            <div>
              We try to provide only certain information, learn from experience
              and show our best side
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
