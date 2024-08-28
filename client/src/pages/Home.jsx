import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/CardDefault";
import api from "../helper/api";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardDefault from "../components/CardDefault";
import { Link } from "react-router-dom";

export default function Home() {
  const [bannerData, setBannerData] = useState({});
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const bannerDataRequest = await api.get("/games", {
        params: {
          skip: 0,
          take: 3,
        },
      });

      const cardDataRequest = await api.get("/games", {
        // params: {
        //   skip: 0,
        //   take: 4,
        // },
      });

      try {
        const [bannerDataResponse, cardDataResponse] = await Promise.all([
          bannerDataRequest.data,
          cardDataRequest.data,
        ]);
        const lastFourCards = cardDataResponse.slice(-4).reverse();

        setBannerData(bannerDataResponse);
        setCardData(lastFourCards);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        console.log(cardData)
      }
    };

    fetch();
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col w-full gap-5 font-nunito">
          <Navbar />
          <div className="flex flex-col justify-center items-center px-12 bg-[#f8f8f8">
            <Banner banners={bannerData} />
          </div>
          <div className="bg-white">
            <div className="container mx-auto mt-5 px-2 py-2 md:px-0 md:py-0">
              <h1 className="text-5xl font-extrabold mb-5 border-b-2 pb-2">
                Recent Releases
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10 place-items-center">
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
              <Link to="/games" className="flex w-full mt-2 justify-end ">
                See more...
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
