/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/App.tsx
import React, { useEffect, useState } from 'react';
import SectionTitle from './components/SectionTitle';
import FacilityCard from './components/FacilityCard';
import ReviewCard from './components/ReviewCard';
import ServiceCard from './components/ServiceCard';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageGalleryModal from './components/ImageGalleryModal'
import { getAPI } from './service/apiService';

interface HotelData {
  name: string;
  description: string;
  image: string;
  facilities: Array<{
    name: string;
    description: string;
    icon: string;
  }>;
  reviews: Array<{
    author: string;
    rating: number;
    comment: string;
  }>;
  services: Array<{
    name: string;
    description: string;
    price: string;
  }>;
  aboutHotel: any,
  room: any[],
  bookingUrl: string
}

const App: React.FC = () => {
  const [hotelData, setHotelData] = useState<HotelData>();
  const [showAllImg, setShowAllImg] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const getHotelDetail = async () => {
    try {
      const response = await getAPI(`/hotel`);
      setHotelData(response);
      setImageUrls(response?.imageUrls)
      console.log({ ...response })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getHotelDetail();
  }, [])

  if (!hotelData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }


  const handleShowMoreImg = () => {
    setShowAllImg(!showAllImg); // Show all items when the button is clicked
  };

  const sort = (imageName: string[]): string[] => {
    const sorted = imageName.sort((a, b) => {
      const isDigit = (str: string) => /^\d/.test(str);

      if (isDigit(a) && !isDigit(b)) return -1;
      if (!isDigit(a) && isDigit(b)) return 1;
      return a.localeCompare(b);
    });
    return sorted;
  }

  const handleBooking = () => {
    const url = hotelData?.bookingUrl
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div
        className="relative h-screen min-h-[500px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hotelData.image})` }}
      >
        <Header hotelName={hotelData.name} onBooking={handleBooking} />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Content centered in the middle */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <span className="text-4xl md:text-7xl font-bold text-white mb-6">
            {hotelData.name}
          </span>
          <p className="text-xl md:text-2xl text-white max-w-2xl">
            "{hotelData.description}"
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-28 flex flex-col lg:flex-row gap-8 justify-center items-center">
        {/* Text Column */}
        <div className="w-full lg:w-1/2 flex items-center">
          <div className="flex flex-col text-center lg:text-left">
            <a href="#" className="text-sm text-blue-600 font-medium mb-2 inline-block">About Us</a>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
              {hotelData.aboutHotel.header}
            </h2>
            <p className="text-gray-600 mb-6 px-2 sm:px-0">
              {hotelData.aboutHotel.description}
            </p>
            <a
              href="#"
              className="text-blue-600 underline font-medium hover:text-blue-800 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Image Column */}
        <div className="w-full lg:w-1/2 flex flex-wrap gap-4 justify-center">
          {hotelData.aboutHotel.images?.map((src: string, index: number) => (
            <img
              key={index}
              src={src}
              alt={`Hotel Image ${index + 1}`}
              className={`w-[45%] sm:w-[30%] md:w-1/3 rounded-lg shadow-md object-cover ${(index + 1) % 2 === 0 ? 'mt-4' : 'mb-4'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Rest of your content remains the same */}
      <div className="container mx-auto px-4 py-16">
        {/* Facilities Section */}
        <section className="mb-20  bg-blue-50 p-4">
          <SectionTitle title="Our Facilities" subtitle="Enjoy our top-notch amenities" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotelData.facilities.map((facility, index) => (
              <FacilityCard key={index} facility={facility} />
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mb-20 py-12 px-4 rounded-xl">
          <SectionTitle
            title="Choose the best room"
            subtitle="Every room, a reason to stay."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotelData.room?.map((t: any) => {
              return (
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute left-6 bottom-6 text-white">
                    {/* <p className="text-sm mb-1">{t.price}</p> */}
                    <h3 className="text-2xl font-semibold">{t.name}</h3>
                  </div>

                  <button className="absolute right-6 bottom-6 text-white underline hover:text-teal-300 transition" onClick={() => handleBooking()}>
                    Book Now
                  </button>
                </div>
              )
            })}

          </div>
        </section>

        {/* Review Section */}
        <section className="mb-20 bg-blue-50 pt-12 px-4 rounded-xl">
          <SectionTitle
            title="Guest Experiences"
            subtitle="Friendly, lives as a family"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotelData.reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </section>
        <div className='flex w-full mb-20'>
          {sort(imageUrls)?.slice(0, 4).map((src: any, index) => (
            <div key={index} className="flex flex-wrap w-full relative overflow-hidden">
              <img className='w-auto flex' key={index} src={src} alt={`img-${index}`} />
              {!showAllImg &&
                index === 3 && ( // Only show on the last visible image
                  <button
                    className="absolute bottom-2 right-2 bg-white text-black text-sm font-semibold px-3 py-2 rounded-[16px] cursor-pointer"
                    onClick={handleShowMoreImg}
                  >
                    <span className='md:hidden'>+photos</span> <span className='hidden md:block'>+ view more photos</span>
                  </button>
                )}
            </div>
          ))}
        </div>

        {/* Services Section */}
        <section>
          <SectionTitle
            title="Additional Services"
            subtitle="Let us help you plan your journey"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotelData.services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </section>
      </div>
      {showAllImg && (
        <ImageGalleryModal images={imageUrls} isOpen={showAllImg} onClose={handleShowMoreImg} />
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;