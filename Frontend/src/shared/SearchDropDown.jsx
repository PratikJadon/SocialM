import React from "react";
import { memo } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLayout = () => {
  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <div>
          <Skeleton
            circle={true}
            borderRadius={"50%"}
            count={1}
            baseColor="#413F40"
            width={50} // Adjust width if needed
            height={50} // Adjust height if needed
          />
        </div>
        <div className="w-full">
          <Skeleton count={1} baseColor="#413F40" width={"100%"} height={20} />
        </div>
      </div>
    </>
  );
};

const DataLayout = ({ data }) => {
  return (
    <div className="flex gap-4 w-full items-center p-1 rounded-lg cursor-pointer">
      <img className="w-12 h-12 rounded-full object-cover" src={data.avatar} />
      <div className="flex flex-col">
        <div>{data.name} </div>
        <div className="text-xs text-gray-400">{data.username}</div>
      </div>
    </div>
  );
};

const SearchDropDown = ({ count = 1, data }) => {
  return (
    <>
      {!data ? (
        <SkeletonTheme highlightColor="#737172" width={"100%"}>
          {Array.from({ length: count }).map((_, index) => (
            <SkeletonLayout key={index} />
          ))}
        </SkeletonTheme>
      ) : (
        <>
          {data &&
            data.length > 0 &&
            data.map((ele, index) => <DataLayout key={index} data={ele} />)}
          {data && data.length === 0 && <div>Not Found</div>}
        </>
      )}
    </>
  );
};

export default memo(SearchDropDown);
