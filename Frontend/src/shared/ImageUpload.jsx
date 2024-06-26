import React, { useEffect, useMemo } from "react";
import { IoCloudUpload as UploadIcon } from "react-icons/io5";

const ImageUpload = ({ onUpload, fileValue }) => {
  const imagePreview = useMemo(() => {
    if (fileValue) {
      return URL.createObjectURL(fileValue);
    }
    return null;
  }, [fileValue]);

  return (
    <>
      {fileValue && (
        <div className="w-24 h-24 rounded-full border-white border-2 ">
          {imagePreview && (
            <img
              src={imagePreview}
              className="w-full h-full  rounded-full overflow-hidden"
            />
          )}
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              name="avatar"
              className="cursor-pointer opacity-0 z-50 absolute w-7 right-0 bottom-0"
              onChange={(e) => onUpload(e)}
            />
            <UploadIcon size={24} className="absolute bottom-0 right-0 z-0" />
          </div>
        </div>
      )}
      {!fileValue && (
        <div className="w-full">
          <div className="bg-lightBlack flex flex-col items-center p-6 rounded-lg border-dashed border-white border-2 relative">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              className="cursor-pointer opacity-0 z-50"
              onChange={(e) => onUpload(e)}
            />
            <UploadIcon size={28} className="absolute z-0" />
            <p>Please Upload your avatar</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
