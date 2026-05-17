import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const Pr = () => {
  const [index, setIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const containerRef = useRef(null);
  
  // Responsive card width according to screen size
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 480) return 160;  // mobile small
      if (window.innerWidth < 640) return 180;  // mobile
      if (window.innerWidth < 768) return 200;  // tablet
      if (window.innerWidth < 1024) return 220; // small desktop
      return 240; // large desktop
    }
    return 220;
  };
  
  const [CARD_WIDTH, setCardWidth] = useState(220);
  const GAP = window.innerWidth < 640 ? 12 : 16;
  const STEP = CARD_WIDTH + GAP;

  const radioStations = [
    { id: 1, title: "Arijit Singh", artist: "With Sachin-Jigar, Pritam, Shreya Ghoshal...", img: "https://i.pinimg.com/1200x/1b/77/70/1b77704d3bec8466e247a516194431cb.jpg" },
    { id: 2, title: "Shubh", artist: "With Karan Aujla, AP Dhillon, Sidhu Moose Wala...", img: "https://i.pinimg.com/736x/e6/70/a0/e670a0aa189386d0df231704698199a0.jpg" },
    { id: 3, title: "Talwinder", artist: "With Shubh, Karan Aujla, Anuv Jain...", img: "https://i.pinimg.com/736x/19/7e/1f/197e1fdfb6b23afb97c9202dee3a1bc2.jpg" },
    { id: 4, title: "Diljit Dosanjh", artist: "With AP Dhillon, Shubh, Gurinder Gill...", img: "https://i.pinimg.com/736x/83/da/12/83da12fcd641e4dd1bd194fe848d395d.jpg" },
    { id: 5, title: "Sidhu Moose Wala", artist: "With Amrit Maan, Prem Dhillon...", img: "https://i.pinimg.com/736x/81/3b/aa/813baa610fb4dd818d9854de7c464dc4.jpg" },
    { id: 6, title: "Karan Aujla", artist: "With Shubh, Deep Jandu...", img: "https://i.pinimg.com/736x/1d/ea/ae/1deaaede7d06acc5b77667dcd2c90e96.jpg" },
    { id: 7, title: "Atif Aslam", artist: "With Rahat Fateh Ali Khan...", img: "https://i.pinimg.com/1200x/73/72/16/73721641914bd895a3be18530ee1941c.jpg" },
    { id: 8, title: "Hassan Raheem", artist: "By Spotify", img: "https://i.pinimg.com/736x/02/5b/e8/025be84683fc3f5ebc15de2e2eb1feab.jpg" },
    { id: 9, title: "Samar Jafri", artist: "By Spotify", img: "https://i.pinimg.com/1200x/f4/1a/b3/f41ab3504ae14212fde4ec608e81dd8c.jpg" },
  ];

  useEffect(() => {
    const updateVisible = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const currentCardWidth = getCardWidth();
        const currentGap = window.innerWidth < 640 ? 12 : 16;
        const currentStep = currentCardWidth + currentGap;
        
        // Calculate how many FULL cards can fit
        let count = Math.floor((containerWidth + currentGap) / currentStep);
        count = Math.max(1, Math.min(count, radioStations.length));
        
        setVisibleCount(count);
        setCardWidth(currentCardWidth);
        
        // Reset index if current index is out of bounds
        const newMaxIndex = Math.max(0, radioStations.length - count);
        if (index > newMaxIndex) {
          setIndex(newMaxIndex);
        }
      }
    };
    
    updateVisible();
    
    // Debounce resize event for better performance
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateVisible, 100);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [index]);

  const maxIndex = Math.max(0, radioStations.length - visibleCount);

  const next = () => {
    if (index < maxIndex) {
      setIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-8 sm:mt-12 md:mt-15 px-2 sm:px-4 md:px-6">
      {/* Header - Responsive */}
      <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6 px-1">
        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold hover:underline cursor-pointer transition-all">
          Popular radio
        </h2>
        <button className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-400 font-bold hover:underline hover:text-white transition-colors">
          Show all
        </button>
      </div>

      <div
        ref={containerRef}
        className="overflow-hidden relative"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${index * STEP}px)`,
            gap: `${GAP}px`
          }}
        >
          {radioStations.map((item) => (
            <div
              key={item.id}
              style={{ minWidth: `${CARD_WIDTH}px`, width: `${CARD_WIDTH}px` }}
              className="flex-shrink-0 hover:bg-[#1a1a1a] p-2 sm:p-2.5 md:p-3 rounded-xl flex flex-col gap-1.5 sm:gap-2 cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Image Container */}
              <div className="relative w-full pt-[120%] rounded-lg overflow-hidden shadow-lg">
                {/* Background blurred image */}
                <img
                  src={item.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm brightness-[0.4] z-[1]"
                  loading="lazy"
                />

                {/* Main singer image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[82%] h-[94%] object-cover object-top z-[2] rounded-t"
                  loading="lazy"
                />

                {/* Play Button */}
                <button
                  className="absolute bottom-2 right-2 bg-[#1ed760] text-black p-1.5 sm:p-2 rounded-full shadow-xl opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 z-[4]"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Play"
                >
                  <FiPlay size={window.innerWidth < 640 ? 14 : 18} fill="black" />
                </button>
              </div>

              {/* Text Info */}
              <div className="flex flex-col gap-[2px] px-0.5 sm:px-1">
                <span className="text-white font-bold text-xs sm:text-sm md:text-base truncate hover:underline">
                  {item.title}
                </span>
                <p className="text-gray-400 text-[10px] sm:text-xs line-clamp-1 leading-relaxed">
                  {item.artist}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Responsive positioning */}
        {showArrows && (
          <>
            {index > 0 && (
              <button
                onClick={prev}
                className="absolute top-[40%] -translate-y-1/2 left-0 sm:left-1 z-10 bg-black/70 backdrop-blur-sm hover:bg-black/90 p-1.5 sm:p-2 rounded-full text-white shadow-xl hover:scale-110 transition-all duration-200"
                aria-label="Previous"
              >
                <FiChevronLeft size={window.innerWidth < 640 ? 18 : 22} />
              </button>
            )}
            {index < maxIndex && (
              <button
                onClick={next}
                className="absolute top-[40%] -translate-y-1/2 right-0 sm:right-1 z-10 bg-black/70 backdrop-blur-sm hover:bg-black/90 p-1.5 sm:p-2 rounded-full text-white shadow-xl hover:scale-110 transition-all duration-200"
                aria-label="Next"
              >
                <FiChevronRight size={window.innerWidth < 640 ? 18 : 22} />
              </button>
            )}
          </>
        )}
        
        {/* Mobile touch hint - optional */}
        <div className="sm:hidden absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-500 text-[10px] opacity-50">
          ← swipe →
        </div>
      </div>
    </div>
  );
};

export default Pr;