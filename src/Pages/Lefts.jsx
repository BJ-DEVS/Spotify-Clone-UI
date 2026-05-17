import { FaPlus } from "react-icons/fa6";

const Lefts = () => {
  return (
    <aside className="w-[300px] xl:w-[380px] flex-shrink-0 h-[calc(100vh-72px)] sticky top-[72px] bg-black p-2 flex flex-col">
      <div className="flex flex-col h-full bg-[#121212] rounded-lg overflow-hidden">

        {/* Header — sticky */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-4 bg-[#121212] z-10">
          <span className="font-bold text-lg text-white">Your Library</span>
          <button className="flex items-center gap-2 bg-[#1f1f1f] hover:bg-[#282828] text-white px-3 py-2 rounded-full font-bold transition text-sm">
            <FaPlus size={14} color="white" />
            <span>Create</span>
          </button>
        </div>

        {/* Cards — scrollable area */}
        <div className="flex-1 overflow-y-auto px-2 mt-6 flex flex-col gap-3
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]">

          {/* Playlist Card */}
          <div className="bg-[#242424] w-[85%] h-50 rounded-xl flex flex-col items-center justify-center text-center gap-2 shrink-0 p-4 mx-auto">
            <span className="text-white text-sm font-bold">Create your first playlist</span>
            <span className="text-gray-300 text-xs">It's easy, we'll help you</span>
            <button className="bg-white text-black  text-xs font-bold py-2 px-4 mt-1 rounded-full w-fit transition hover:scale-105">
              Create playlist
            </button>
          </div>

          {/* Podcast Card */}
          <div className="bg-[#242424] w-[85%] h-50 rounded-xl flex flex-col items-center justify-center text-center gap-2 shrink-0 p-4 mx-auto">
            <span className="text-white font-bold text-sm">Let's find some podcasts to follow</span>
            <span className="text-gray-300 text-xs">We'll keep you updated on new episodes</span>
            <button className="bg-white text-black text-xs font-bold py-2 px-4 mt-1 rounded-full w-fit transition hover:scale-105">
              Browse podcasts
            </button>
          </div>

        </div>

        {/* Footer — always fixed at bottom */}
        <div className="flex-shrink-0 px-4 py-12 bg-[#121212] border-t border-gray-800 flex flex-col gap-3">
          <div className="flex flex-wrap gap-5 text-md  text-gray-400 font-medium">
            <a href="#" className="hover:underline">Legal</a>
            <a href="#" className="hover:underline">Safety & Privacy</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookies</a>
            <a href="#" className="hover:underline">About Ads</a>
            <a href="#" className="hover:underline">Accessibility</a>
          </div>
          <button className="flex items-center mt-4 gap-1.5 px-3 py-1.5 border border-gray-500 rounded-full text-white text-xs font-bold hover:border-white w-fit">
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c2.5 3 2.5 17 0 20M12 2c-2.5 3-2.5 17 0 20" />
            </svg>
            English
          </button>
        </div>

      </div>
    </aside>
  );
};

export default Lefts;