import { useEffect, useState } from "react";
import CardDefault from "../components/CardDefault";
import api from "../helper/api";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Pagination } from "../components/Pagination";

export default function List() {
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0); // Total number of games
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/games", {
          params: {
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
          },
        });

        setCardData(response.data.games);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCardData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto font-sans px-2 py-2 md:px-0 md:py-0">
        <div className="flex flex-col my-6 gap-2 border-b-2 pb-2">
          <h1 className="text-5xl font-extrabold">Browse Games</h1>
        </div>

        {loading ? (
          <Spinner />
        ) : !cardData || cardData.length === 0 ? (
          <p className="text-center text-gray-500">No games found.</p>
        ) : (
          <>
            {/* Game Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 place-items-center gap-10">
              {cardData.map((data) => (
                <CardDefault
                  key={data.id}
                  id={data.id}
                  group={data.group}
                  title={data.title}
                  cover={data.cover}
                  isAI={data.isAI}
                />
              ))}
            </div>

            {/* Pagination Component */}
            <div className="mt-6 flex justify-center">
              <Pagination
                totalPosts={totalItems}
                postsPerPage={itemsPerPage}
                currentPage={currentPage} // Pass currentPage explicitly
                setCurrentPage={setCurrentPage} // Ensure correct state update
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
