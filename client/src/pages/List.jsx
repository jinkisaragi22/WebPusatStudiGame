import { useEffect, useState } from "react";
import CardDefault from "../components/CardDefault";
import api from "../helper/api";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function List() {
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const cardDataRequest = await api.get("/games", {
        params: {
          skip: 0,
          take: 12,
        },
      });

      try {
        const cardDataResponse = cardDataRequest.data;
        setCardData(cardDataResponse);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

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
        )}
      </div>
      <Footer />
    </div>
  );
}
