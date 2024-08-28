import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Banner({ banners }) {
  console.log(banners);
  return (
    <Carousel transition={{duration: 1}} loop autoplay autoplayDelay={10000} className="rounded-xl z-10">
      {banners.map((banner) => (
        <div key={banner.id} className="relative h-96">
          <img
            src={`https://pusatstudibucket.s3.ap-southeast-2.amazonaws.com/covers/${banner.cover}`}
            alt={banner.title}
            className="h-full w-full object-cover aspect-video"
          />
          <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
            <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                {banner.title}
              </Typography>
              <div className="flex gap-2">
                <Link to={`/games/${banner.id}`}>
                  <Button size="lg" color="white">
                    FIND OUT MORE
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
