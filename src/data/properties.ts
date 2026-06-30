export interface Property {
  id: number
  slug: string
  name: string
  location: string
  price: number
  guests: number
  beds: number
  baths: number
  rating: number
  reviews: number
  image: string
  gallery: string[]
  tag?: string
  type: string
  amenities: string[]
  description: string
}

// TODO: swap these Unsplash placeholders for real villa photos before launch
export const PROPERTIES: Property[] = [
  {
    id: 1,
    slug: "white-hill-villa",
    name: "White Hill Villa",
    location: "Kisumu, Kenya",
    price: 18000,
    guests: 8,
    beds: 4,
    baths: 3,
    rating: 4.9,
    reviews: 12,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=900&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=900&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop&auto=format",
    ],
    tag: "Lake View",
    type: "Villa",
    amenities: [
      "Lake View",
      "WiFi",
      "Gourmet Kitchen",
      "Parking",
      "Air Conditioning",
      "Garden",
      "Backup Generator",
      "DSTV",
    ],
    description:
      "Set on a quiet rise overlooking Lake Victoria, White Hill Villa pairs clean, modern interiors with sweeping lake views. Spacious living areas, a fully equipped kitchen, and a private garden make it ideal for family getaways or small group retreats.",
  },
  {
    id: 2,
    slug: "white-cliff-villa",
    name: "White Cliff Villa",
    location: "Mombasa, Kenya",
    price: 25000,
    guests: 6,
    beds: 3,
    baths: 3,
    rating: 5.0,
    reviews: 8,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=900&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=900&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=900&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=900&fit=crop&auto=format",
    ],
    tag: "Sea View",
    type: "Villa",
    amenities: [
      "Sea View",
      "Private Pool",
      "WiFi",
      "Kitchen",
      "Parking",
      "Air Conditioning",
      "Beach Access",
      "Backup Generator",
    ],
    description:
      "Steps from the Mombasa coastline, White Cliff Villa offers a private pool, ocean breeze, and effortless coastal living. Bright open-plan interiors flow out onto a shaded terrace — perfect for sunset evenings by the water.",
  },
]

export interface Testimonial {
  name: string
  location: string
  rating: number
  text: string
  property: string
  avatar: string
}

// Placeholder until first real guest reviews come in
export const TESTIMONIALS: Testimonial[] = []

export const GOLD = "#C9A55A"
export const GOLD_DARK = "#B08336"
export const CHARCOAL = "#1A1A1A"
export const CREAM = "#F8F5F0"
