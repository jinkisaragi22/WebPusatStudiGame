import { useEffect, useState } from "react";
import CardDefault from "../components/CardDefault";
import api from "../helper/api";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function List() {
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; 

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      try {
        const cardDataRequest = await api.get("/games", {
          params: {
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
          },
        });

        const cardDataResponse = cardDataRequest.data;

        // Alphabeticall order
        const sortedCardData = cardDataResponse.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        setCardData(sortedCardData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [currentPage]); 

  const totalPages = Math.ceil(cardData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto font-sans px-2 py-2 md:px-0 md:py-0">
        <div className="flex flex-col my-6 gap-2 border-b-2 pb-2">
          <h1 className="text-5xl font-extrabold">Browse Games</h1>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <>
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
            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
