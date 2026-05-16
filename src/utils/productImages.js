/**
 * Nessa Pearls Product Images Manager
 * Images de bijoux en perles de culture et accessoires de luxe
 */

import gourdeImage from "../images/image.png";
import collierDameImage from "../images/WhatsApp Image 2026-04-27 at 15.02.28.jpeg";
import bijouxDameImage from "../images/WhatsApp Image 2026-04-27 at 15.09.21.jpeg";
import nombrilLuxeImage from "../images/WhatsApp Image 2026-04-27 at 10.43.28.jpeg";
import nombrilCristalImage from "../images/WhatsApp Image 2026-04-27 at 10.43.37.jpeg";
import nezSimpleImage from "../images/WhatsApp Image 2026-04-27 at 11.07.34.jpeg";
import nezDoubleImage from "../images/WhatsApp Image 2026-04-27 at 10.43.38.jpeg";
import septumSeptImage from "../images/WhatsApp Image 2026-04-27 at 10.43.39.jpeg";
import septumMagnImage from "../images/WhatsApp Image 2026-04-27 at 10.43.37 (1).jpeg";
import ensembleDame1 from "../images/image1.png";
import ensembleDame2 from "../images/image2.png";
import ensembleDame3 from "../images/image3.png";
import coffretHommeImage from "../images/image4.png";
import collierPrenomImage from "../images/image5.png";
import collierCoupleImage from "../images/image6.png";
import collierLuxeImage from "../images/image7.png";
import collierStandardImage from "../images/image8.png";

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
  
  // Special case for Gourde thermique bois
  if (productId === 501) {
    return gourdeImage;
  }
  
  // Collier prénom 😍🦋💕
  if (productId === 101) {
    return collierPrenomImage;
  }
  if (productId === 102) {
    return collierCoupleImage;
  }
  if (productId === 103) {
    return collierStandardImage;
  }
  if (productId === 104) {
    return collierLuxeImage;
  }
  
  // Collier Dame 💕
  if (productId === 111) {
    return collierDameImage;
  }
  
  // Bijoux dame (divers)
  if (productId === 115) {
    return bijouxDameImage;
  }

  // Ensemble Dame
  if (productId === 409) {
    return ensembleDame1;
  }
  if (productId === 410) {
    return ensembleDame2;
  }
  if (productId === 411) {
    return ensembleDame3;
  }

  // Coffret Homme
  if (productId === 402) {
    return coffretHommeImage;
  }
  
  // Faux piercing septum
  if (productId === 603) {
    return septumSeptImage;
  }
  
  // Faux piercing nombril
  if (productId === 605) {
    return nombrilLuxeImage;
  }
  if (productId === 606) {
    return nombrilCristalImage;
  }
  
  // Faux piercing nez
  if (productId === 604) {
    return nezSimpleImage;
  }
  if (productId === 607) {
    return nezDoubleImage;
  }
  
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
