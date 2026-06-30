INSERT INTO public.properties (id, slug, title, location, price_per_night, max_guests, bedrooms, bathrooms, rating, review_count, image_urls, tag, amenities, description, status)
VALUES
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'white-hill-villa',
  'White Hill Villa',
  'Kisumu, Kenya',
  18000,
  8,
  4,
  3,
  4.9,
  12,
  ARRAY[
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=900&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop&auto=format'
  ],
  'Lake View',
  ARRAY['Lake View', 'WiFi', 'Gourmet Kitchen', 'Parking', 'Air Conditioning', 'Garden', 'Backup Generator', 'DSTV'],
  'Set on a quiet rise overlooking Lake Victoria, White Hill Villa pairs clean, modern interiors with sweeping lake views. Spacious living areas, a fully equipped kitchen, and a private garden make it ideal for family getaways or small group retreats.',
  'active'
),
(
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'white-cliff-villa',
  'White Cliff Villa',
  'Mombasa, Kenya',
  25000,
  6,
  3,
  3,
  5.0,
  8,
  ARRAY[
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=900&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=900&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=900&fit=crop&auto=format'
  ],
  'Sea View',
  ARRAY['Sea View', 'Private Pool', 'WiFi', 'Kitchen', 'Parking', 'Air Conditioning', 'Beach Access', 'Backup Generator'],
  'Steps from the Mombasa coastline, White Cliff Villa offers a private pool, ocean breeze, and effortless coastal living. Bright open-plan interiors flow out onto a shaded terrace — perfect for sunset evenings by the water.',
  'active'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  location = EXCLUDED.location,
  price_per_night = EXCLUDED.price_per_night,
  max_guests = EXCLUDED.max_guests,
  bedrooms = EXCLUDED.bedrooms,
  bathrooms = EXCLUDED.bathrooms,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  image_urls = EXCLUDED.image_urls,
  tag = EXCLUDED.tag,
  amenities = EXCLUDED.amenities,
  description = EXCLUDED.description,
  status = EXCLUDED.status;