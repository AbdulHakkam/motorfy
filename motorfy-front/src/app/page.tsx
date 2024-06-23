"use client";
import { BASE_URL } from "@/lib/constants";
import useSWR, { Fetcher } from "swr";
import { BaseResponse } from "../../types/network.type";
import { Advertisement } from "../../types/advertisement.type";
import LoadingSpinner from "@/components/ui/spinner";
import { AdvertisementCard } from "@/components/card/ad.card";
import {
  CaretLeft,
  CaretRight,
  Faders,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import FilterForm from "@/components/forms/searchFilter";
import { useCallback, useState } from "react";

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  const adFetcher: Fetcher<any, ReadonlyURLSearchParams> = async (
    params: ReadonlyURLSearchParams
  ) => {
    try {
      const formdata = new FormData();
      params.forEach((value, key) => {
        if (key === "page" || value === undefined) return;
        if (value.includes("+")) {
          value.split("+").forEach((v) => formdata.append(key, v));
        } else formdata.append(key, value);
      });

      const res = await fetch(
        `${BASE_URL}/advertisement/filter?page=${
          params.get("page") || "1"
        }&limit=10`,
        {
          method: "POST",
          body: formdata,
          headers: { Accept: "multipart/form-data" },
        }
      );
      return await res.json();
    } catch (error) {
      return error;
    }
  };
  const handleQueryParams = useCallback(
    (name: string, value: string | number) => {
      console.log;
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toString());

      return params.toString();
    },
    [searchParams]
  );

  const {
    data: adData,
    error: adError,
    isLoading: adLoading,
  } = useSWR<BaseResponse<Advertisement[]>, Error>(searchParams, adFetcher, {});
  return (
    <div className="min-h-custom w-full mt-[50px] flex flex-row justify-center">
      <FilterForm />
      <div className="flex flex-col items-center">
        <div className="w-screen bg-mainRed p-2 fixed search-sm:w-full search-sm:mt-3 search-sm:bg-transparent search-sm:relative search-sm:p-0 z-10 ">
          <div className="flex items-center p-2 rounded-md border-mainRed border-opacity-50 border-solid border-[1px] bg-white">
            <input
              className="w-[100%] rounded-md focus:outline-none z-0"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <button
              onClick={() => {
                router.push(
                  pathname + "?" + handleQueryParams("text", searchValue)
                );
              }}
            >
              <MagnifyingGlass size={25} weight="regular" />
            </button>
          </div>
        </div>
        {adLoading ? (
          <div className="flex items-center justify-center bg-slate-200 h-full search-sm:w-[650px]">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="flex flex-wrap mt-[62px] search-sm:w-[650px] search-sm:justify-between search-sm:mt-2">
            {adData?.data.map((ad) => {
              return <AdvertisementCard ad={ad} key={ad._id} />;
            })}
          </div>
        )}
        <div className="flex w-[150px] items-center justify-between mt-5 ">
          <CaretLeft
            size={20}
            onClick={() => {
              router.push(
                pathname +
                  "?" +
                  handleQueryParams(
                    "page",
                    parseInt(searchParams.get("page") ?? "2", 10) > 1
                      ? parseInt(searchParams.get("page") ?? "2", 10) - 1
                      : 1
                  )
              );
            }}
          />
          <p className="text-[17px]">{searchParams.get("page") || 1}</p>
          <CaretRight
            size={20}
            onClick={() => {
              router.push(
                pathname +
                  "?" +
                  handleQueryParams(
                    "page",
                    parseInt(searchParams.get("page") ?? "1", 10) + 1
                  )
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
