import Trends from "../Pages/Trends.jsx"
import Popart from "../Pages/Popart.jsx"
import Pas from "../Pages/Pas.jsx"
import Pr from "../Pages/Pr.jsx"
import Fc from "../Pages/Fc.jsx"
import Footer from "../Pages/Footer.jsx"

const Rights = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-[#121212] p-4
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-thumb]:bg-[#121212]
      hover:[&::-webkit-scrollbar-thumb]:bg-gray-600
      [&::-webkit-scrollbar-thumb]:rounded-full">
      <Trends />
      <Popart />
      <Pas />
      <Pr />
      <Fc />
      <Footer />
    </main>
  );
};

export default Rights;