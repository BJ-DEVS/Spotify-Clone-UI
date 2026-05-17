import Lefts from "../Pages/Lefts.jsx"
import Rights from "../Pages/Rights.jsx"

const Herosec = () => {
  return (
    <div className="flex min-h-screen pt-[72px] gap-2 bg-black text-white">
      
      {/* Lefts — hidden on mobile, visible on lg+ */}
      <div className="hidden lg:block flex-shrink-0">
        <Lefts />
      </div>

      {/* Rights — full width on mobile, flex-1 on lg+ */}
      <div className="flex-1 min-w-0">
        <Rights />
      </div>

    </div>
  );
};

export default Herosec;