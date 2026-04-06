import React, { useRef, useEffect } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

const libraries = ['places'];

export const EnhancedLocationInput = ({
  name,
  value,
  onChange,
  placeholder,
  required,
  theme = 'dark',
  customInputStyles = '',
  customContainerStyles = ''
}) => {
  const isDark = theme === 'dark';
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries
  });

  const autocompleteRef = useRef(null);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        onChange({
          target: {
            name,
            value: place.formatted_address
          }
        });
      }
    }
  };

  return isLoaded ? (
    <div className={`relative group ${customContainerStyles}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <MapPin className={`h-5 w-5 ${name === 'pickupLocation' ? 'text-green-500' : 'text-red-500'} group-focus-within:text-blue-500 transition-colors`} />
      </div>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{
          componentRestrictions: { country: "in" },
          fields: ["formatted_address", "geometry"],
          types: ["establishment", "geocode"]
        }}
      >
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-sm font-bold ${isDark
            ? 'bg-white/10 border-white/20 text-black-100 placeholder-white/30 backdrop-blur-sm'
            : 'bg-gray-50 border-transparent text-gray-900 placeholder-gray-500'
            } ${customInputStyles}`}
          style={isDark && !customInputStyles.includes('bg-') ? {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
          } : {}}
          required={required}
        />
      </Autocomplete>
    </div>
  ) : (
    <div className={`relative group ${customContainerStyles}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MapPin className="h-5 w-5 text-blue-300 animate-pulse" />
      </div>
      <input
        type="text"
        placeholder="Loading maps..."
        disabled
        className={`w-full pl-12 pr-4 py-4 rounded-2xl opacity-50 ${isDark ? 'bg-white/10 border-white/20 text-black-100' : 'bg-gray-50 border-transparent text-gray-900'
          } ${customInputStyles}`}
      />
    </div>
  );
};
