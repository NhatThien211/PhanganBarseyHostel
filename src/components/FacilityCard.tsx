// src/components/FacilityCard.tsx
import React from 'react';
import {
  WifiIcon,
  CakeIcon,
  SparklesIcon,
  MusicalNoteIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

export const iconMap: Record<string, React.ElementType> = {
  wifi: WifiIcon,
  breakfast: CakeIcon,
  yoga: SparklesIcon,
  dancing: MusicalNoteIcon,
  dinner: UsersIcon,
};

interface Facility {
  name: string;
  description: string;
  icon: string;
}

const FacilityCard: React.FC<{ facility: Facility }> = ({ facility }) => {
  const Icon = iconMap[facility.icon];
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-3xl mb-4 text-blue-500">
         {Icon && <Icon className="h-6 w-6 text-teal-500" />}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{facility.name}</h3>
      <p className="text-gray-600">{facility.description}</p>
    </div>
  );
};

export default FacilityCard;