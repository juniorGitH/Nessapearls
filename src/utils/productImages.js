/**
 * Nessa Pearls Product Images Manager
 * Images de bijoux en perles de culture et accessoires de luxe
 */

// Bagues - Rings (Pearl focused)
const ringsImages = [
  "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=400&q=80", // Pearl ring
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", // Pearl & Diamond
  "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&q=80", // Gold & Pearl
  "https://images.unsplash.com/photo-1602751584418-15e2817c274f?w=400&q=80", // Elegant pearl ring
  "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80", // Silver & Pearl
];

// Colliers - Necklaces (Pearl focused)
const necklacesImages = [
  "https://images.unsplash.com/photo-1611085583191-a3b13ef24fd2?w=400&q=80", // Pearl strand
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", // Luxury pearl necklace
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80", // Gold & Pearl necklace
  "https://images.unsplash.com/photo-1620656715918-08c33162aadc?w=400&q=80", // Statement pearl
  "https://images.unsplash.com/photo-1596944210900-34a5cfad0127?w=400&q=80", // Pendant pearl
];

// Bracelets (Pearl focused)
const braceletsImages = [
  "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?w=400&q=80", // Pearl bracelet
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", // Gold pearl bangle
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80", // Silver pearl bracelet
  "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=400&q=80", // Designer pearl bracelet
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", // Elegant pearl cuff
];

// Hero images pour Nessa Pearls
const heroImages = {
  main: "https://images.unsplash.com/photo-1611085583191-a3b13ef24fd2?w=1200&q=80", // Beautiful pearl closeup
  rings: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800&q=80",
  necklaces: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
  bracelets: "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?w=800&q=80",
};

// Aliases for compatibility
const menClothingImages = ringsImages;
const womenClothingImages = necklacesImages;
const sneakerImages = braceletsImages;

const phoneImages = ringsImages;
const computerImages = necklacesImages;
const accessoryImages = braceletsImages;

// Map to track which images are already assigned
const assignedImages = new Map();

/**
 * Get a unique image for a product based on its ID and category
 * Ensures no duplicate images across products
 */
export const getProductImage = (productId, categoryId) => {
  const cacheKey = `${categoryId}-${productId}`;
  
  // Return cached image if already assigned
  if (assignedImages.has(cacheKey)) {
    return assignedImages.get(cacheKey);
  }
  
  let imageArray;
  switch (categoryId) {
    case 1: // Bagues
      imageArray = ringsImages;
      break;
    case 2: // Colliers
      imageArray = necklacesImages;
      break;
    case 3: // Bracelets
      imageArray = braceletsImages;
      break;
    default:
      imageArray = ringsImages;
  }
  
  // Use product ID to deterministically select an image
  const imageIndex = productId % imageArray.length;
  const selectedImage = imageArray[imageIndex];
  
  // Cache the assignment
  assignedImages.set(cacheKey, selectedImage);
  
  return selectedImage;
};

/**
 * Get fallback image by category
 */
export const getFallbackImage = (categoryId) => {
  switch (categoryId) {
    case 1:
      return ringsImages[0];
    case 2:
      return necklacesImages[0];
    case 3:
      return braceletsImages[0];
    default:
      return ringsImages[0];
  }
};

/**
 * Process articles array and assign unique images
 */
export const assignImagesToArticles = (articles, categoryId) => {
  return articles.map((article, index) => ({
    ...article,
    photo: getProductImage(article.id || index, categoryId),
    // Keep original photo as backup
    originalPhoto: article.photo
  }));
};

// Named exports for direct access
export { 
  ringsImages as menClothingImages,
  necklacesImages as womenClothingImages,
  braceletsImages as sneakerImages,
  heroImages,
  ringsImages,
  necklacesImages,
  braceletsImages
};

export default {
  getProductImage,
  getFallbackImage,
  assignImagesToArticles,
  ringsImages,
  necklacesImages,
  braceletsImages,
  heroImages
};

