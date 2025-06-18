/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getAPI, postAPI, uploadImage } from "../service/apiService";

interface HotelData {
  name: string;
  address: string;
  phone: string;
  bookingUrl: string;
  logo: string;
  description: string;
  image: string;
  social: {
    facebook: string;
    instagram: string;
  };
  aboutHotel: {
    header: string;
    description: string;
    images: string[];
  };
  facilities: { name: string; description: string; icon: string }[];
  room: { name: string; price: string; image: string }[];
  reviews: { author: string; rating: number; comment: string }[];
  services: { name: string; description: string; price: string }[];
}

export default function AdminPage() {
  const [data, setData] = useState<HotelData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [momentImages, setMomentImages] = useState<string[]>([]);
  const [uploadingMoment, setUploadingMoment] = useState(false);

   const getHotelDetail = async () => {
      try {
        const response = await getAPI(`/hotel`);
        setData(response)
        setMomentImages(response?.imageUrls)
        console.log({ ...response.data })
      } catch (err) {
        console.log(err)
      }
    }

  useEffect(() => {
  getHotelDetail()
  }, []);

  const handleChange = (key: keyof HotelData, value: any) => {
    if (!data) return;
    setData({ ...data, [key]: value });
  };

  const handleNestedChange = (section: keyof HotelData, index: number, field: string, value: string) => {
    if (!data) return;
    const updated = [...(data[section] as any[])];
    updated[index][field] = value;
    setData({ ...data, [section]: updated });
  };

  const handleSocialChange = (key: string, value: string) => {
    if (!data) return;
    setData({ ...data, social: { ...data.social, [key]: value } });
  };

  const handleUpload = async (file: File, cb: (url: string) => void) => {
    try {
      const res = await uploadImage("/upload", file);
      cb(res);
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    }
  };

  const handleMomentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingMoment(true);

    try {
      const res = await uploadImage('/upload/moment', file);
      setMomentImages([...momentImages, res]);
    } catch (err: any) {
      alert('Moment upload failed: ' + err.message);
    } finally {
      setUploadingMoment(false);
    }
  };

  const handleDeleteMoment = async (filename: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/moments/${filename}`);
      setMomentImages(momentImages.filter(img => !img.includes(filename)));
    } catch (err: any) {
      alert('Failed to delete image: ' + err.message);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
      await axios.post("http://localhost:5000/api/hotel", data);
      alert("Saved successfully!");
    } catch (err: any) {
      alert("Save failed: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Admin - Hotel Editor</h1>

      {/* BASIC INFO */}
      {["name", "address", "phone", "bookingUrl", "description"].map(key => (
        <div className="mb-4" key={key}>
          <label className="block font-semibold capitalize">{key}</label>
          <input
            type="text"
            className="w-full p-2 border"
            value={data[key as keyof HotelData] as string}
            onChange={(e) => handleChange(key as keyof HotelData, e.target.value)}
          />
        </div>
      ))}

      {/* COVER IMAGE UPLOAD */}
      <div className="mb-4">
        <label className="block font-semibold">Cover Image</label>
        <input type="file" className="p-2 bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-800 rounded-md" onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file, (url) => handleChange("image", url));
        }} />
        {data.image && <img src={data.image} alt="Cover" className="h-32 mt-2" />}
      </div>

      {/* SOCIAL LINKS */}
      <h2 className="text-xl mt-6 mb-2 font-bold">Social</h2>
      {["facebook", "instagram"].map(key => (
        <div className="mb-4" key={key}>
          <label className="block font-semibold capitalize">{key}</label>
          <input
            type="text"
            className="w-full p-2 border"
            value={data.social[key as keyof typeof data.social]}
            onChange={(e) => handleSocialChange(key, e.target.value)}
          />
        </div>
      ))}

      {/* ABOUT HOTEL */}
      <h2 className="text-xl mt-6 mb-2 font-bold">About Hotel</h2>
      <div className="mb-4">
        <label className="block font-semibold">Header</label>
        <input
          type="text"
          className="w-full p-2 border"
          value={data.aboutHotel.header}
          onChange={(e) => handleChange("aboutHotel", { ...data.aboutHotel, header: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Description</label>
        <textarea
          className="w-full p-2 border"
          value={data.aboutHotel.description}
          onChange={(e) => handleChange("aboutHotel", { ...data.aboutHotel, description: e.target.value })}
        />
      </div>
      {data.aboutHotel.images.map((img, i) => (
        <div className="mb-2" key={i}>
          <label className="block font-semibold">Image #{i + 1}</label>
          <input
            type="file"
            className="p-2 bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-800 rounded-md"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file, (url) => {
                const newImages = [...data.aboutHotel.images];
                newImages[i] = url;
                handleChange("aboutHotel", { ...data.aboutHotel, images: newImages });
              });
            }}
          />
          <img src={img} alt={`About ${i}`} className="h-24 mt-1" />
        </div>
      ))}

      {/* FACILITIES */}
      <h2 className="text-xl mt-6 mb-2 font-bold">Facilities</h2>
      {data.facilities.map((f, i) => (
        <div className="grid grid-cols-3 gap-4 mb-4" key={i}>
          <input
            type="text"
            className="p-2 border"
            placeholder="Name"
            value={f.name}
            onChange={(e) => handleNestedChange("facilities", i, "name", e.target.value)}
          />
          <input
            type="text"
            className="p-2 border"
            placeholder="Description"
            value={f.description}
            onChange={(e) => handleNestedChange("facilities", i, "description", e.target.value)}
          />
          <input
            type="text"
            className="p-2 border"
            placeholder="Icon"
            value={f.icon}
            onChange={(e) => handleNestedChange("facilities", i, "icon", e.target.value)}
          />
        </div>
      ))}

      {/* ROOMS */}
      <h2 className="text-xl mt-6 mb-2 font-bold">Rooms</h2>
      {data.room.map((room, i) => (
        <div className="grid grid-cols-3 gap-4 mb-4" key={i}>
          <input
            type="text"
            className="p-2 border"
            placeholder="Name"
            value={room.name}
            onChange={(e) => handleNestedChange("room", i, "name", e.target.value)}
          />
          <input
            type="text"
            className="p-2 border"
            placeholder="Price"
            value={room.price}
            onChange={(e) => handleNestedChange("room", i, "price", e.target.value)}
          />
          <div>
            <input
              type="file"
              className="p-2 bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-800 rounded-md w-30 overflow-hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file, (url) => {
                  const newRooms = [...data.room];
                  newRooms[i].image = url;
                  handleChange("room", newRooms);
                });
              }}
            />
            {room.image && <img src={room.image} alt={`Room ${i}`} className="h-24 mt-1" />}
          </div>
        </div>
      ))}

      {/* REVIEWS */}
      <h2 className="text-xl mt-6 mb-2 font-bold">Reviews</h2>
      {data.reviews.map((review, i) => (
        <div className="grid grid-cols-3 gap-4 mb-4" key={i}>
          <input
            type="text"
            className="p-2 border"
            placeholder="Author"
            value={review.author}
            onChange={(e) => handleNestedChange("reviews", i, "author", e.target.value)}
          />
          <input
            type="number"
            className="p-2 border"
            placeholder="Rating"
            value={review.rating}
            onChange={(e) => handleNestedChange("reviews", i, "rating", e.target.value)}
          />
          <input
            type="text"
            className="p-2 border"
            placeholder="Comment"
            value={review.comment}
            onChange={(e) => handleNestedChange("reviews", i, "comment", e.target.value)}
          />
        </div>
      ))}

      {/* SERVICES */}
      <h2 className="text-xl mt-6 mb-2 font-bold">Services</h2>
      {data.services.map((service, i) => (
        <div className="grid grid-cols-3 gap-4 mb-4" key={i}>
          <input
            type="text"
            className="p-2 border"
            placeholder="Name"
            value={service.name}
            onChange={(e) => handleNestedChange("services", i, "name", e.target.value)}
          />
          <input
            type="text"
            className="p-2 border"
            placeholder="Description"
            value={service.description}
            onChange={(e) => handleNestedChange("services", i, "description", e.target.value)}
          />
          <input
            type="text"
            className="p-2 border"
            placeholder="Price"
            value={service.price}
            onChange={(e) => handleNestedChange("services", i, "price", e.target.value)}
          />
        </div>
      ))}

      <section className="bg-white p-4 shadow rounded-xl mt-6">
        <h2 className="text-xl font-semibold mb-4">Moment Images</h2>
        <input type="file" onChange={handleMomentUpload} accept="image/*" className=" w-80 p-2 bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-800 rounded-md" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {momentImages.map((url, idx) => {
            const filename = url.split('/').pop() || '';
            return (
              <div key={idx} className="relative">
                <img src={url} className="w-full h-auto rounded shadow" />
                <button
                  onClick={() => handleDeleteMoment(filename)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="mt-8 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {isSaving ? "Saving..." : "Save All"}
      </button>
    </div>
  );
}
