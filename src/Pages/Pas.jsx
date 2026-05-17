import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const Pas = () => {
  const [index, setIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);
  
  // Responsive card width based on screen size
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 480) return 180;   // mobile small
      if (window.innerWidth < 640) return 200;   // mobile
      if (window.innerWidth < 768) return 220;   // tablet
      if (window.innerWidth < 1024) return 240;  // desktop small
      return 260;  // large desktop
    }
    return 250;
  };
  
  const [cardWidth, setCardWidth] = useState(250);
  const gap = 16;
  const STEP = cardWidth + gap;
  
  const songs = [
    { id:1, title: "Pal Pal", artist: "Afusic, AliSoomroMusic", img: "https://i.pinimg.com/1200x/36/d1/b8/36d1b88be42b523b1d75bcf1ed3e7c6d.jpg", yt: "https://www.youtube.com/embed/tkKBSiQJu7g?autoplay=1" },
    { id: 2, title: "Bairan", artist: "Banjaare", img: "https://i.pinimg.com/736x/2d/86/6e/2d866ef5996c9623fa599b2ccf6fd2e7.jpg", yt: "https://www.youtube.com/embed/hqFdZ_UGFOo?autoplay=1" },
    { id: 3, title: "Jhol", artist: "MaanuX Annural Khalid", img: "https://i.pinimg.com/736x/57/d7/e7/57d7e7407c0bfd6384e4073f20027eca.jpg", yt: "https://www.youtube.com/embed/9ubTY6yJWFo?autoplay=1" },
    { id: 4, title: "Sahiba", artist: "Aditiya Rikhari", img: "https://i.pinimg.com/736x/25/88/f1/2588f16fb8dfc840f087a40ead24ea00.jpg", yt: "https://www.youtube.com/embed/qLgwGUxpj_Q?autoplay=1" },
    { id: 5, title: "Pasoori", artist: "Ali Sethi, Shae Gill", img: "https://i.pinimg.com/736x/70/dd/20/70dd20a4c6b73537e172a00a3e6edd00.jpg", yt: "https://www.youtube.com/embed/tkKBSiQJu7g?autoplay=1" },
    { id: 6, title: "Ishqa Ve", artist: "Zeeshan Ali, Yuvraj Tung", img: "https://i.pinimg.com/736x/ab/5f/45/ab5f45d37b21ae5d5bc83a1e69ecbfc1.jpg", yt: "https://www.youtube.com/embed/fVVqSc6c2wc?autoplay=1" },
    { id: 7, title: "Haseen", artist: "Talwiinder, NDS, Rippy Grewal", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg2wvO06xMZVbBkMhVvqpdbhNedOh3exX2DA&s", yt: "https://www.youtube.com/embed/JQ3nFKVBM9o?autoplay=1" },
    { id: 8, title: "Gal Sun", artist: "Sabat Batin, Rackstar", img: "https://i.pinimg.com/1200x/a9/8f/e6/a98fe67d92a303eb3b671d12ac38a469.jpg", yt: "https://www.youtube.com/embed/6SWIi0L8IXQ?autoplay=1" },
    { id: 9, title: "Brown Munday", artist: "Ap Dhillon", img: "https://i.pinimg.com/1200x/ae/da/d5/aedad583bd2397eb3f19875b1804c643.jpg", yt: "https://www.youtube.com/embed/6SWIi0L8IXQ?autoplay=1" },
    { id: 10, title: "O Rangreez", artist: "Shreya Ghoshal, Javed Bashir", img: "https://i.pinimg.com/736x/e5/05/7f/e5057fc1bddfe3f561c06e76f7564268.jpg", yt: "https://www.youtube.com/embed/6SWIi0L8IXQ?autoplay=1" },
    { id: 11, title: "Aarzu", artist: "Noor Khan, Madhurxo", img: "https://i.pinimg.com/736x/c6/9b/ec/c69bec34376143c336676e918caa17de.jpg", yt: "https://www.youtube.com/embed/6SWIi0L8IXQ?autoplay=1" },
  ];

  // Calculate visible cards based on container width
  useEffect(() => {
    const updateVisible = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const currentCardWidth = getCardWidth();
        const currentStep = currentCardWidth + gap;
        
        // Calculate how many FULL cards can fit
        let count = Math.floor((containerWidth + gap) / currentStep);
        count = Math.max(1, Math.min(count, songs.length));
        
        setVisibleCount(count);
        setCardWidth(currentCardWidth);
        
        // Reset index if out of bounds
        const maxIndex = Math.max(0, songs.length - count);
        if (index > maxIndex) {
          setIndex(maxIndex);
        }
      }
    };
    
    updateVisible();
    
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateVisible, 150);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [index]);

  // Calculate max index based on visible count
  const maxIndex = Math.max(0, songs.length - visibleCount);

  const next = () => {
    if (index < maxIndex) {
      setIndex(prev => Math.min(prev + 1, maxIndex));
    }
  };

  const prev = () => {
    setIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-8 sm:mt-12 md:mt-15 px-3 sm:px-4 md:px-6 lg:px-8">
      
      {/* Header: Popular albums and singles + Show all */}
      <div className="flex justify-between items-center mb-4 sm:mb-5 md:mb-6 px-1">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold hover:underline cursor-pointer transition-all">
          Popular albums and singles
        </h2>
        <button
          className="text-[11px] sm:text-[12px] md:text-[15px] text-gray-400 font-medium hover:underline hover:text-white transition-colors"
          onClick={() => console.log("Show all clicked")}
        >
          Show all
        </button>
      </div>
      
      <div
        ref={containerRef}
        className="overflow-hidden relative"
        onMouseLeave={() => setShowArrows(false)}
        onMouseEnter={() => setShowArrows(true)}
      >
        {/* Songs Row */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${index * STEP}px)`,
            gap: `${gap}px`
          }}
        >
          {songs.map((song, idx) => (
            <div
              key={`${song.id}-${idx}`}
              className="relative flex-shrink-0 hover:bg-[#242424] p-3 sm:p-4 md:p-6 rounded-lg flex flex-col gap-2 sm:gap-3 md:gap-4 cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
              style={{ width: `${cardWidth}px` }}
            >
              {/* Image container with hidden play button */}
              <div className="relative">
                <img
                  src={song.img}
                  className="w-full rounded-md object-cover"
                  style={{ height: `${cardWidth * 0.9}px` }}
                  alt={song.title}
                  loading="lazy"
                />
                
                {/* Play button – appears on card hover */}
                <button
                  className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 bg-[#1ed760] text-black rounded-full shadow-lg opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 z-10"
                  style={{ 
                    padding: window.innerWidth < 640 ? '6px' : window.innerWidth < 768 ? '8px' : '12px'
                  }}
                  onClick={() => console.log(`Playing ${song.title}`)}
                  aria-label={`Play ${song.title}`}
                >
                  <FiPlay 
                    size={window.innerWidth < 640 ? 14 : window.innerWidth < 768 ? 16 : 20} 
                    fill="black"
                  />
                </button>
              </div>

              <div className="px-1">
                <span className="text-white font-bold text-sm sm:text-base md:text-lg truncate block hover:underline">
                  {song.title}
                </span>
                <span className="text-gray-400 text-[11px] sm:text-xs md:text-sm block mt-0.5 sm:mt-1 truncate">
                  {song.artist}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow buttons (appear on container hover) - Responsive */}
        {showArrows && (
          <>
            {index > 0 && (
              <button
                onClick={prev}
                className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-1 md:left-2 z-10 bg-black/70 backdrop-blur-sm hover:bg-black/90 rounded-full text-white cursor-pointer hover:scale-110 transition-all duration-200 shadow-lg"
                style={{ 
                  padding: window.innerWidth < 640 ? '8px' : window.innerWidth < 768 ? '12px' : '20px'
                }}
                aria-label="Previous"
              >
                <FiChevronLeft 
                  size={window.innerWidth < 640 ? 16 : window.innerWidth < 768 ? 18 : 20} 
                />
              </button>
            )}
            
            {index < maxIndex && (
              <button
                onClick={next}
                className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-1 md:right-2 z-10 bg-black/70 backdrop-blur-sm hover:bg-black/90 rounded-full text-white cursor-pointer hover:scale-110 transition-all duration-200 shadow-lg"
                style={{ 
                  padding: window.innerWidth < 640 ? '8px' : window.innerWidth < 768 ? '12px' : '20px'
                }}
                aria-label="Next"
              >
                <FiChevronRight 
                  size={window.innerWidth < 640 ? 16 : window.innerWidth < 768 ? 18 : 20} 
                />
              </button>
            )}
          </>
        )}
        
        {/* Mobile swipe hint */}
        <div className="sm:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-[10px] opacity-60 whitespace-nowrap">
          ← swipe to see more →
        </div>
      </div>
    </div>
  );
};

export default Pas;