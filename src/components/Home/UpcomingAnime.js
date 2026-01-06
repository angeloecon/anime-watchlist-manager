import SwiperCard from '../Carousel/SwiperCard'
import Link from "next/link";


const UpcomingAnime = ({upcomingAnime}) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-500 mb-4 text-center">
          Upcoming Anime
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-xl">
          Get ready for the next wave of animation. Here is what is scheduled to
          air soon.
        </p>
      </div>

     
        <div className="relative">
          <SwiperCard data={upcomingAnime} />

          <div className="mt-12 text-center">
            <Link
              href="/browse/upcoming"
              prefetch={false}
              className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-lg group focus:outline-none focus:ring focus:ring-indigo-300 active:scale-95"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-800 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-800 rounded group-hover:-ml-4 group-hover:-mb-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-700 rounded-md group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                View Full Schedule
              </span>
            </Link>
          </div>
        </div>
    </section>
  );
};

export default UpcomingAnime;
