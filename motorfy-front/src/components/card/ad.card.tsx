import { formatDate } from "@/lib/utils";
import { Advertisement } from "../../../types/advertisement.type";
import Image from "next/image";

type AdvertisementCardProps = {
  ad: Advertisement;
};

export const AdvertisementCard = ({ ad }: AdvertisementCardProps) => {
  return (
    <div className="flex flex-row bg-white w-full items-center my-1 rounded-lg p-2 mx-2 search-sm:flex-col search-sm:w-[320px] search-sm:mx-0">
      <div className="w-[150px] h-[100px] p-2 relative search-sm:w-[310px] search-sm:h-[200px]">
        <Image
          src={ad.images[0]}
          alt={ad._id ?? ad.title}
          className="object-cover rounded-md"
          fill
        />
      </div>
      <div className=" flex flex-col items-start h-full ml-2 search-sm:h-[95px] search-sm:min-w-[300px] sm:mt-1 search-sm:ml-0">
        <p className=" font-bold text-[18px] ">{ad.title}</p>
        <p className="text-[16px]  text-mainRed font-bold">
          Rs.{ad.price.toLocaleString("en-US")}
        </p>
        <p>{ad.location && ad.location.join(" , ")}</p>
        <div className="flex justify-between w-full text-[14px] mt-auto">
          <p>{ad.mileage.toLocaleString("en-US")} KM</p>
          <p>{formatDate(ad.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};
