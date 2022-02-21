import React, { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Spinner from "./Spinner";
import { client } from "../client";
import { categories } from "../utils/data";
import { useNavigate } from "react-router-dom";

const CreatePin = ({ user }) => {
  let navigate = useNavigate();
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldsError, setFieldsError] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const uploadImage = (event) => {
    let selectedFile = event.target.files[0];
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff "
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          filename: selectedFile.name,
          contentType: selectedFile.type,
        })
        .then((document) => {
          setImageAsset(document);
          console.log(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setWrongImageType(true);
    }
  };
  const savePin = () => {
    if (title && about && category  && imageAsset?._id) {
      const doc = {
        _type: "pin",
        about,
        category,
      
        image: {
          _type: "image",
          asset: {
            _ref: imageAsset?._id,
            _type: "reference",
          },
        },
        postedBy: {
          _ref: user._id,
          _type: "postedBy",
        },

        title,
      };
      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setFieldsError(true);
      setTimeout(() => {
        setFieldsError(false);
      }, 2000);
    }
  };
return (
  <div className="flex flex-col justify-center items-center w-full h-full">
    {fieldsError && (
      <p className="bg-red-500 p-2 rounded-xl flex text-white items-center  ">
        <FiAlertCircle className="mr-2" />
        Please fill in all fields
      </p>
    )}
    <div className="flex flex-col w-2/3  h-1/4 bg-white p-2">
      <div className="flex flex-col w-full h-full   bg-secondaryColor items-center justify-center">
        {loading && <Spinner />}
        {wrongImageType && <p>Wrong Image Type</p>}

        {!imageAsset ? (
          <label>
            <div className="flex items-center justify-center   min-w-400 flex-col">
              <div className="flex flex-col items-center  min-w-400 justify-center">
                <p className="font-bold text-2xl text-black">
                  <AiOutlineCloudUpload />{" "}
                </p>
                <p className="text-lg">Click to Upload</p>
                <p className="mt-4 text-gray-400">
                  Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or
                  TIFF less than 20MB
                </p>
              </div>
            </div>
            <input
              type="file"
              name="upload-image"
              onChange={uploadImage}
              className="w-0 h-0"
            />
          </label>
        ) : (
          <div className="relative h-full">
            <img
              src={imageAsset?.url}
              alt="uploaded-pic"
              className="h-full w-full"
            />
            <button
              type="button"
              className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
              onClick={() => setImageAsset(null)}
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>
    </div>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Add your title"
      className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
    />

    {user && (
      <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
        <img
          src={user?.image}
          className="w-10 h-10 rounded-full"
          alt="user-profile"
        />
        <p className="font-bold">{user?.userName}</p>
      </div>
    )}
    <input
      type="text"
      value={about}
      onChange={(e) => setAbout(e.target.value)}
      placeholder="Tell everyone what your Pin is about"
      className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 w-1/3"
    />
  
    <div className="flex flex-col w-1/3">
      <div>
        <p className="mb-2 font-semibold text:lg sm:text-xl">
          Choose Pin Category
        </p>
        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
        >
          <option value="others" className="sm:text-bg bg-white">
            Select Category
          </option>
          {categories.map((item) => (
            <option
              className="text-base border-0 outline-none capitalize bg-white text-black "
              value={item.name}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end items-end mt-5 w-1/3">
        <button
          type="button"
          onClick={savePin}
          className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
        >
          Save Pin
        </button>
      </div>
    </div>
  </div>
);
}
export default CreatePin;
