import { NextResponse } from 'next/server';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const GEO_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const AQI_API_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');

  if (!location) {
    return NextResponse.json(
      { error: 'Location parameter is required' },
      { status: 400 }
    );
  }

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Step 1: Get lat/lon for the city
    const geoRes = await fetch(
      `${GEO_API_URL}?q=${encodeURIComponent(location)}&limit=1&appid=${API_KEY}`
    );
    const geoText = await geoRes.text();
    if (!geoRes.ok) {
      console.error('Geocoding API error:', geoText);
      throw new Error('Failed to fetch geolocation');
    }
    let geoData;
    try {
      geoData = JSON.parse(geoText);
    } catch {
      console.error('Failed to parse geocoding response:', geoText);
      throw new Error('Failed to parse geolocation response');
    }
    if (!geoData || geoData.length === 0) {
      console.error('Geocoding API returned empty data:', geoData);
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }
    const { lat, lon, name: city, state = '', country = '' } = geoData[0];

    // Step 2: Get AQI for the lat/lon
    const aqiRes = await fetch(
      `${AQI_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    if (!aqiRes.ok) throw new Error('Failed to fetch AQI data');
    const aqiData = await aqiRes.json();
    if (!aqiData || !aqiData.list || aqiData.list.length === 0) {
      return NextResponse.json(
        { error: 'No air quality data found for this location' },
        { status: 404 }
      );
    }
    const aqiItem = aqiData.list[0];
    // OpenWeather AQI: 1-Good, 2-Fair, 3-Moderate, 4-Poor, 5-Very Poor
    // We'll map to India scale: 1->50, 2->100, 3->200, 4->300, 5->400
    const aqiMap = [0, 50, 100, 200, 300, 400];
    const aqi = aqiMap[aqiItem.main.aqi] || 0;
    const components = aqiItem.components || {};
    return NextResponse.json({
      aqi,
      city,
      state,
      country,
      timestamp: aqiItem.dt ? new Date(aqiItem.dt * 1000).toISOString() : '',
      station: 'OpenWeather',
      pollutants: {
        pm25: components.pm2_5 ?? null,
        pm10: components.pm10 ?? null,
        no2: components.no2 ?? null,
        so2: components.so2 ?? null,
        o3: components.o3 ?? null,
        co: components.co ?? null,
      },
    });
  } catch (error) {
    console.error('Error fetching AQI data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch air quality data' },
      { status: 500 }
    );
  }
} 