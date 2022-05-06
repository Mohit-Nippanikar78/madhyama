import React, { useState, useEffect } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Spinner from "./Spinner";
import { client } from "../client";
import { categories } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Axios from "axios";

const CreatePin = ({ user }) => {
  let navigate = useNavigate();
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldsError, setFieldsError] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [selected, setSelected] = useState(categories[3]);
  const [videoUrl, setVideoUrl] = useState(null);
  let selectedFile;
  useEffect(() => {
    setCategory(selected.name);
  }, [selected]);
  const uploadVideo = () => {
    let form = new FormData();
    form.append("file", selectedFile);
    form.append("upload_preset", "tzhnmdgj");
    form.append("folder", "Netflix");
    Axios.post(
      "https://api.cloudinary.com/v1_1/dk5acaaxg/video/upload",
      form
    ).then((Response) => {
      setVideoUrl(Response.data.url);
    });
    
  };
  const uploadImage = () => {
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
  };
  const uploadContent = (event) => {
    selectedFile = event.target.files[0];
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff "
    ) {
      uploadImage();
    } else if (selectedFile.type == "video/mp4") {
      uploadVideo();
    } else {
      setWrongImageType(true);
    }
  };
  const savePin = () => {
    if (title && about && category && imageAsset?._id) {
      let userId = user._id;
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
        userId,
        likesCount: 0,
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
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      {!imageAsset ? (
        <div
          className=" w-full px-2 sm:mx-0 sm:w-2/3 "
          style={{ margin: "auto" }}
        >
          <label
            for="file-upload"
            class="block text-sm font-medium text-gray-700"
          >
            {" "}
            Cover photo{" "}
          </label>
          <label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      onChange={uploadContent}
                      class="sr-only"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </label>
        </div>
      ) : (
        <div class="m-auto w-2/3 relative flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <img
            src={imageAsset?.url}
            alt="uploaded-pic"
            className="h-1/3 w-1/3"
          />
          <button
            type="button"
            className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
            onClick={() => setImageAsset(null)}
          >
            <MdDelete />
          </button>
        </div>
        // <div className="relative w-2/5 m-auto">
        //   <img
        //     src={imageAsset?.url}
        //     alt="uploaded-pic"
        //     className="h-full w-full"
        //   />
        //   <button
        //     type="button"
        //     className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
        //     onClick={() => setImageAsset(null)}
        //   >
        //     <MdDelete />
        //   </button>
        // </div>
      )}
      <div
        className="flex flex-col justify-center items-center w-full h-full"
        style={{ width: "clamp(300px,60%,700px", margin: "auto" }}
      >
        {fieldsError && (
          <p className="bg-red-500 p-2 rounded-xl flex text-white items-center  ">
            <FiAlertCircle className="mr-2" />
            Please fill in all fields
          </p>
        )}
        {wrongImageType && (
          <div className="flex flex-col w-2/3  h-1/4 bg-white p-2">
            <div className="flex flex-col w-full h-full   bg-secondaryColor items-center justify-center">
              {/* {loading && <Spinner />} */}
              <p>Wrong Image Type</p>
            </div>
          </div>
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add your title"
          className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2 my-2"
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
        {/* <input
        type="text"
        value={about}
        placeholder="Tell everyone what your Pin is about"
        className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 w-1/3"
        /> */}
        <div className="w-full">
          <label for="about" class="block text-sm font-medium text-gray-700">
            About
          </label>
          <div class="mt-1 w-full">
            <textarea
              id="about"
              name="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="3"
              class="w-full shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Tell everyone what your Pin is about"
            ></textarea>
          </div>
          <p class="mt-2 text-sm text-gray-500">
            Brief description for your profile. URLs are hyperlinked.
          </p>
        </div>

        <div className="flex flex-col w-3/5 min-w-max my-2">
          {/*  <div>
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
          </div> */}
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-gray-700">
                  Assigned to
                </Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="flex items-center">
                      <img
                        src={selected.image}
                        alt=""
                        className="flex-shrink-0 h-6 w-6 rounded-full"
                      />
                      <span className="ml-3 block truncate">
                        {selected.name}
                      </span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {categories.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-indigo-600"
                                : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <img
                                  src={person.image}
                                  alt=""
                                  className="flex-shrink-0 h-6 w-6 rounded-full"
                                />
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {person.name}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
          <div className="flex justify-center items-center mt-5 ">
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
    </>
  );
};
export default CreatePin;
