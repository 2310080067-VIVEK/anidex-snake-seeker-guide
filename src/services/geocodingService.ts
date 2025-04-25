
const NOMINATIM_API = 'https://nominatim.openstreetmap.org/reverse';

export interface GeocodingResult {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export async function reverseGeocode(lat: number, lon: number): Promise<GeocodingResult> {
  try {
    const response = await fetch(
      `${NOMINATIM_API}?format=json&lat=${lat}&lon=${lon}`,
      {
        headers: {
          'User-Agent': 'SnakeIdentifierApp/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Geocoding failed');
    }
    
    const data = await response.json();
    
    // Format the address from Nominatim response
    const address = data.display_name || 'Location found';
    
    return {
      address,
      coordinates: {
        latitude: lat,
        longitude: lon
      }
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}

// Extract location details from Nominatim response
export function extractLocationDetails(data: any): { country: string; state: string; locality: string } {
  const address = data.address || {};
  return {
    country: address.country || '',
    state: address.state || '',
    locality: address.city || address.town || address.village || address.county || ''
  };
}

// Function to get a location's detailed information
export async function getLocationDetails(lat: number, lon: number): Promise<{ 
  country: string; 
  state: string; 
  locality: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }
}> {
  try {
    const response = await fetch(
      `${NOMINATIM_API}?format=json&lat=${lat}&lon=${lon}`,
      {
        headers: {
          'User-Agent': 'SnakeIdentifierApp/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Geocoding failed');
    }
    
    const data = await response.json();
    const locationDetails = extractLocationDetails(data);
    
    return {
      ...locationDetails,
      coordinates: {
        latitude: lat,
        longitude: lon
      }
    };
  } catch (error) {
    console.error('Location details error:', error);
    throw error;
  }
}
