export const carTypes = [
  'Sedan',
  'SUV',
  'Premium Sedan',
  'Premium SUV',
  'Luxury',
  'Tempo Traveller'
];

export const cities = [
  'Delhi (NCR)',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Chandigarh',
  'Jaipur'
];

export const pricingData = {
  'Delhi (NCR)': {
    'Sedan': {
      baseCharge: 1511,
      outstationMinKms: 250,
      outstationRate: 11,
      localPackages: {
        '2hr-20km': 600,
        '3hr-30km': 900,
        '4hr-40km': 1200,
        '5hr-50km': 1500,
        '6hr-60km': 1800,
        '7hr-70km': 2100,
        '8hr-80km': 2400,
        '9hr-90km': 2700,
        '10hr-100km': 3000
      }
    },
    'SUV': {
      baseCharge: 2011,
      outstationMinKms: 250,
      outstationRate: 15,
      localPackages: {
        '2hr-20km': 800,
        '3hr-30km': 1200,
        '4hr-40km': 1600,
        '5hr-50km': 2000,
        '6hr-60km': 2400,
        '7hr-70km': 2800,
        '8hr-80km': 3200,
        '9hr-90km': 3600,
        '10hr-100km': 4000
      }
    },
    'Premium Sedan': {
      baseCharge: 2511,
      outstationMinKms: 250,
      outstationRate: 18,
      localPackages: {
        '2hr-20km': 1000,
        '3hr-30km': 1500,
        '4hr-40km': 2000,
        '5hr-50km': 2500,
        '6hr-60km': 3000,
        '7hr-70km': 3500,
        '8hr-80km': 4000,
        '9hr-90km': 4500,
        '10hr-100km': 5000
      }
    },
    'Premium SUV': {
      baseCharge: 3011,
      outstationMinKms: 250,
      outstationRate: 20,
      localPackages: { /* similarly populate */ }
    },
    'Luxury': {
      baseCharge: 4011,
      outstationMinKms: 250,
      outstationRate: 35,
      localPackages: { /* similarly populate */ }
    },
    'Tempo Traveller': {
      baseCharge: 3511,
      outstationMinKms: 250,
      outstationRate: 25,
      localPackages: { /* similarly populate */ }
    }
  }
};
