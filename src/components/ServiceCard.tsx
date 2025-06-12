// src/components/ServiceCard.tsx
import React from 'react';

interface Service {
  name: string;
  description: string;
  price: string;
}

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.name}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <p className="text-blue-600 font-medium">{service.price}</p>
    </div>
  );
};

export default ServiceCard;