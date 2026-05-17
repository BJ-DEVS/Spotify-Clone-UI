import { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiPlay, FiChevronRight } from "react-icons/fi";
 
const songs = [
  { id: 1, title: "Jaiye Sajana", artist: "Shashwat Sachdev, Jasmine Sandlas", img: "https://i.pinimg.com/736x/d2/84/21/d28421688f49eb021c34347613c55611.jpg", yt: "" },
  { id: 2, title: "Bairan", artist: "Banjaare", img: "https://i.pinimg.com/736x/2d/86/6e/2d866ef5996c9623fa599b2ccf6fd2e7.jpg", yt: "https://www.youtube.com/embed/hqFdZ_UGFOo?autoplay=1" },
  { id: 3, title: "Khat", artist: "Navjot Ahuja", img: "https://i.pinimg.com/736x/29/22/d6/2922d686695e59a4a3961e553d346abb.jpg", yt: "https://www.youtube.com/embed/9ubTY6yJWFo?autoplay=1" },
  { id: 4, title: "Meri Zindagi Hai Tu", artist: "Asim Azhar, Sabri Sisters", img: "https://i.pinimg.com/736x/08/5c/56/085c56a147b9ccfd4f11bd886a35a1f8.jpg", yt: "https://www.youtube.com/embed/qLgwGUxpj_Q?autoplay=1" },
  { id: 5, title: "Pal Pal", artist: "Afusic, AliSoomroMusic", img: "https://i.pinimg.com/1200x/36/d1/b8/36d1b88be42b523b1d75bcf1ed3e7c6d.jpg", yt: "https://www.youtube.com/embed/tkKBSiQJu7g?autoplay=1" },
  { id: 6, title: "Ishqa Ve", artist: "Zeeshan Ali, Yuvraj Tung", img: "https://i.pinimg.com/736x/ab/5f/45/ab5f45d37b21ae5d5bc83a1e69ecbfc1.jpg", yt: "https://www.youtube.com/embed/fVVqSc6c2wc?autoplay=1" },
  { id: 7, title: "Haseen", artist: "Talwiinder, NDS, Rippy Grewal", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg2wvO06xMZVbBkMhVvqpdbhNedOh3exX2DA&s", yt: "https://www.youtube.com/embed/JQ3nFKVBM9o?autoplay=1" },
  { id: 8, title: "Gal Sun", artist: "Sabat Batin, Rackstar", img: "https://i.pinimg.com/1200x/a9/8f/e6/a98fe67d92a303eb3b671d12ac38a469.jpg", yt: "https://www.youtube.com/embed/6SWIi0L8IXQ?autoplay=1" },
  { id: 9, title: "Majboor", artist: "Shehrayar Rehan, Zoya Waseem", img: "https://i.pinimg.com/736x/d9/55/7e/d9557ef2aba37b44b0e624cdbb468ecc.jpg", yt: "https://www.youtube.com/embed/6SWIi0L8IXQ?autoplay=1" },
  { id: 10, title: "Dealer", artist: "Diljit Dosanjh, De Future, Virk Andaz", img: "https://i.pinimg.com/736x/21/fc/6e/21fc6ef6206359635494b777e37b0586.jpg", yt: "https://www.youtube.com/embed/6SWIi0L8IXQ?autoplay=1" },
  { id: 11, title: "Aarzu", artist: "Noor, Khan, Madhurxo", img: "https://i.pinimg.com/736x/c6/9b/ec/c69bec34376143c336676e918caa17de.jpg", yt: "https://www.youtube.com/embed/6SWIi0L8IXQ?autoplay=1" },
];
 
const CARD_WIDTH = 220;
const GAP = 16;
const STEP = CARD_WIDTH + GAP;
 
const Trends = () => {
  const [index, setIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);
 
  // Responsive: container width se visible cards calculate karo
  useEffect(() => {
    const updateVisible = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const count = Math.floor((w + GAP) / STEP);
        setVisibleCount(count);
      }
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);
 
  const maxIndex = Math.max(0, songs.length - visibleCount);
 
  const next = () => setIndex((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setIndex((prev) => Math.max(prev - 1, 0));
 
  const handlePlay = (e, song) => {
    e.stopPropagation();
    setActiveId((prev) => (prev === song.id ? null : song.id));
  };
 
  return (
    <div className="w-full max-w-[940px] mx-auto mt-2 px-4">
 
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-3xl font-bold hover:underline cursor-pointer">
          Trending Songs
        </h2>
        <button className="text-xs text-gray-400 font-semibold uppercase tracking-widest hover:underline hover:text-white">
          Show all
        </button>
      </div>
 
      {/* Slider */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * STEP}px)` }}
        >
          {songs.map((song) => {
            const isPlaying = activeId === song.id;
            return (
              <div
                key={song.id}
                style={{ minWidth: `${CARD_WIDTH}px`, maxWidth: `${CARD_WIDTH}px` }}
                className="bg-[#181818] hover:bg-[#282828] rounded-lg p-3 cursor-pointer group transition-all hover:scale-[1.03]"
              >
                {/* Image */}
                <div className="relative w-full aspect-square bg-black rounded-md overflow-hidden">
                  <img
                    src={song.img}
                    alt={song.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      isPlaying ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  {isPlaying && (
                    <iframe
                      src={song.yt}
                      allow="autoplay"
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  )}
                  {/* Play Button */}
                  <button
                    onClick={(e) => handlePlay(e, song)}
                    className={`absolute bottom-2 right-2 bg-[#1db954] text-black p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105 ${
                      isPlaying
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                    }`}
                  >
                    <FiPlay size={20} />
                  </button>
                </div>
 
                {/* Text */}
                <div className="mt-3">
                  <p className="text-white text-sm font-bold truncate">{song.title}</p>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">{song.artist}</p>
                </div>
              </div>
            );
          })}
        </div>
 
        {/* Arrows */}
        {showArrows && (
          <>
            {index > 0 && (
              <button
                onClick={prev}
                className="absolute top-[40%] left-1 z-20 bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <FiChevronLeft />
              </button>
            )}
            {index < maxIndex && (
              <button
                onClick={next}
                className="absolute top-[40%] right-1 z-20 bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <FiChevronRight />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
 
export default Trends;