
const imageUrl = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const storeImages = {
  vegetables: "photo-1542838132-92c53300491e",
  fruits: "photo-1610832958506-aa56368176cf",
  meat: "photo-1607623814075-e51df1bdc82f",
  restaurant: "photo-1547592180-85f173990554",
  eggs: "photo-1506976785307-8732e854ad03",
  dairy: "photo-1550583724-b2692b85b150",
  bakery: "photo-1509440159596-0249088772ff",
  home: "photo-1547592166-23ac45744acd",
  diet: "photo-1512621776951-a57141f2eefd",
  nuts: "photo-1505576399274-565b52d4ac71",
};

const categoryImages = {
  veg: "photo-1542838132-92c53300491e",
  "non-veg": "photo-1607623814075-e51df1bdc82f",
  restaurants: "photo-1547592180-85f173990554",
  eggs: "photo-1506976785307-8732e854ad03",
  "dairy-foods": "photo-1550583724-b2692b85b150",
  "fruits-vegetables": "photo-1610832958506-aa56368176cf",
  "bakery-sweets": "photo-1509440159596-0249088772ff",
  "home-foods": "photo-1547592166-23ac45744acd",
  "diet-foods": "photo-1512621776951-a57141f2eefd",
};

const bannerImages = {
  veg: [
    "photo-1542838132-92c53300491e",
    "photo-1540420773420-3366772f4999",
  ],
  "non-veg": [
    "photo-1607623814075-e51df1bdc82f",
    "photo-1604503468506-a8da13d82791",
  ],
  restaurants: [
    "photo-1547592180-85f173990554",
    "photo-1512621776951-a57141f2eefd",
  ],
  eggs: [
    "photo-1506976785307-8732e854ad03",
    "photo-1518569656558-1f25e69d93d7",
  ],
  "dairy-foods": [
    "photo-1550583724-b2692b85b150",
    "photo-1563636619-e9143da7973b",
  ],
  "fruits-vegetables": [
    "photo-1610832958506-aa56368176cf",
    "photo-1542838132-92c53300491e",
  ],
  "bakery-sweets": [
    "photo-1509440159596-0249088772ff",
    "photo-1555507036-ab1f4038808a",
  ],
  "home-foods": [
    "photo-1547592180-85f173990554",
    "photo-1547592166-23ac45744acd",
  ],
  "diet-foods": [
    "photo-1512621776951-a57141f2eefd",
    "photo-1490645935967-10de6ba17061",
  ],
};

const makeStore = (
  name,
  description,
  image,
  rating,
  minutes,
  distance,
  isOpen,
  offer
) => ({
  name,
  description,
  image: imageUrl(storeImages[image], 600),
  rating,
  minutes,
  distance,
  isOpen,
  offer,
  delivery: "Free delivery",
});

const makeCategory = (slug, name, tagline, stores) => ({
  slug,
  name,
  tagline,
  image: imageUrl(categoryImages[slug], 400),

  banners: bannerImages[slug].map((image, index) => ({
    id: `${slug}-banner-${index + 1}`,
    title:
      index === 0
        ? "Shop Smart, Eat Fresh"
        : `Discover the Best ${name}`,
    subtitle: tagline,
    image: imageUrl(image, 1500),
    button:
      index === 0 ? "Explore Stores" : "Find Your Favorites",
  })),

  stores,
});

export const FOOD_STORE_CATEGORIES = {
  veg: makeCategory(
    "veg",
    "Veg",
    "Fresh vegetables, everyday essentials and healthy choices.",
    [
      makeStore("Sai Charan Provisions", "Fresh groceries & vegetables", "vegetables", "4.5", 20, "2.1 km", true, "Upto 10%"),
      makeStore("Nani Nuts & Dry Fruits", "Nuts, dry fruits & snacks", "nuts", "4.0", 30, "3.94 km", true, "Upto 10%"),
      makeStore("JD Provisions", "Daily grocery essentials", "fruits", "4.0", 25, "3.09 km", false, "Upto 10%"),
      makeStore("Nandhan Kaju House", "Premium nuts & dry fruits", "nuts", "4.0", 30, "3.95 km", false, "Upto 8%"),
      makeStore("Green Basket", "Fresh farm vegetables", "vegetables", "4.8", 15, "1.2 km", true, "Upto 15%"),
    ]
  ),

  "non-veg": makeCategory(
    "non-veg",
    "Non Veg",
    "Fresh meat and poultry from local stores.",
    [
      makeStore("Fresh Meat Corner", "Fresh cuts & poultry", "meat", "4.6", 25, "1.8 km", true, "Upto 10%"),
      makeStore("Daily Chicken Mart", "Chicken and meat essentials", "meat", "4.4", 30, "2.4 km", true, "Upto 8%"),
      makeStore("Farm Fresh Poultry", "Fresh poultry products", "meat", "4.2", 35, "3.2 km", false, "Upto 5%"),
      makeStore("Prime Meat House", "Quality meat selection", "meat", "4.7", 20, "1.5 km", true, "Upto 12%"),
    ]
  ),

  restaurants: makeCategory(
    "restaurants",
    "Restaurants",
    "Discover delicious meals and local restaurants.",
    [
      makeStore("Daily Bites", "Healthy meals & more", "restaurant", "4.5", 25, "1.4 km", true, "Upto 10%"),
      makeStore("Spice Garden", "Freshly prepared meals", "restaurant", "4.6", 30, "2.0 km", true, "Upto 15%"),
      makeStore("Green Bowl Kitchen", "Fresh bowls and salads", "diet", "4.7", 20, "2.8 km", false, "Upto 8%"),
      makeStore("Home Taste Restaurant", "Traditional favourites", "home", "4.3", 35, "3.5 km", true, "Upto 10%"),
    ]
  ),

  eggs: makeCategory(
    "eggs",
    "Eggs",
    "Protein-rich eggs and fresh poultry products.",
    [
      makeStore("Egg House", "Fresh eggs & poultry", "eggs", "4.5", 25, "1.8 km", true, "Upto 10%"),
      makeStore("Farm Egg Centre", "Farm-fresh eggs", "eggs", "4.6", 20, "2.3 km", true, "Upto 8%"),
      makeStore("Daily Protein Store", "Eggs and protein foods", "nuts", "4.4", 30, "3.1 km", false, "Upto 5%"),
      makeStore("Fresh Poultry Mart", "Eggs delivered fresh", "eggs", "4.3", 25, "3.7 km", true, "Upto 10%"),
    ]
  ),

  "dairy-foods": makeCategory(
    "dairy-foods",
    "Dairy Foods",
    "Milk, cheese, curd and everyday dairy essentials.",
    [
      makeStore("Daily Dairy Fresh", "Milk, curd & paneer", "dairy", "4.6", 20, "1.1 km", true, "Upto 10%"),
      makeStore("Milk Basket", "Fresh milk and dairy", "dairy", "4.5", 25, "1.9 km", true, "Upto 8%"),
      makeStore("Pure Dairy House", "Cheese, butter & curd", "dairy", "4.4", 30, "2.6 km", false, "Upto 5%"),
      makeStore("Farm Milk Store", "Farm-fresh dairy products", "dairy", "4.7", 15, "3.0 km", true, "Upto 12%"),
    ]
  ),

  "fruits-vegetables": makeCategory(
    "fruits-vegetables",
    "Fruits & Vegetables",
    "Colourful fresh produce for a healthier lifestyle.",
    [
      makeStore("Nature's Basket", "Fresh fruits & vegetables", "fruits", "4.6", 20, "1.2 km", true, "Upto 10%"),
      makeStore("Green Basket", "Organic farm produce", "vegetables", "4.8", 15, "1.6 km", true, "Upto 15%"),
      makeStore("Fresh Farm Market", "Seasonal fruits & greens", "fruits", "4.5", 25, "2.5 km", false, "Upto 8%"),
      makeStore("Daily Veg Mart", "Fresh vegetables every day", "vegetables", "4.4", 30, "3.0 km", true, "Upto 10%"),
    ]
  ),

  "bakery-sweets": makeCategory(
    "bakery-sweets",
    "Bakery & Sweets",
    "Freshly baked treats, cakes and traditional sweets.",
    [
      makeStore("S R Bakery", "Bakery items, sweets & snacks", "bakery", "4.3", 30, "2.4 km", true, "Upto 10%"),
      makeStore("Sweet Treats", "Cakes and fresh pastries", "bakery", "4.6", 25, "1.8 km", true, "Upto 12%"),
      makeStore("Golden Oven", "Bread, biscuits & cakes", "bakery", "4.5", 20, "2.9 km", false, "Upto 8%"),
      makeStore("Traditional Sweets", "Local sweets and snacks", "bakery", "4.4", 35, "3.5 km", true, "Upto 10%"),
    ]
  ),

  "home-foods": makeCategory(
    "home-foods",
    "Home Foods",
    "Enjoy homemade flavours and traditional favourites.",
    [
      makeStore("Amma Home Foods", "Homemade meals & pickles", "home", "4.7", 30, "1.6 km", true, "Upto 10%"),
      makeStore("Village Kitchen", "Traditional homemade food", "home", "4.5", 35, "2.2 km", true, "Upto 8%"),
      makeStore("Andhra Pickles House", "Homemade pickles & powders", "home", "4.6", 25, "3.0 km", false, "Upto 5%"),
      makeStore("Home Taste Foods", "Authentic regional flavours", "restaurant", "4.4", 30, "3.8 km", true, "Upto 10%"),
    ]
  ),

  "diet-foods": makeCategory(
    "diet-foods",
    "Diet Foods",
    "Balanced meals and nutritious everyday options.",
    [
      makeStore("Healthy Bowl", "Healthy bowls & salads", "diet", "4.7", 20, "1.5 km", true, "Upto 10%"),
      makeStore("Fit Food Kitchen", "Balanced protein-rich meals", "diet", "4.6", 25, "2.1 km", true, "Upto 12%"),
      makeStore("Green Plate", "Fresh salads & diet meals", "diet", "4.5", 30, "2.8 km", false, "Upto 8%"),
      makeStore("Protein Hub", "Nuts and protein foods", "nuts", "4.8", 20, "3.4 km", true, "Upto 15%"),
    ]
  ),
};

export const foodStoreCategoryList = Object.values(
  FOOD_STORE_CATEGORIES
).map((category) => ({
  slug: category.slug,
  name: category.name,
  image: category.image,
}));
