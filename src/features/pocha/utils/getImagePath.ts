export const getMenuImagePath = (menuID: number) => {
  if (!menuID) {
    return defaultImageURL;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/pocha/menu-${menuID}.png`;
};

// Alternative function if you want to specify image format/transformations
export const getMenuImagePathWithTransformations = (
  menuID: number,
  transformations?: string
) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const basePath = `https://res.cloudinary.com/${cloudName}/image/upload`;

  if (transformations) {
    return `${basePath}/${transformations}/pocha/menu-${menuID}`;
  }

  return `${basePath}/pocha/menu-${menuID}`;
};

export const defaultImageURL = "/kisa_logo.png";
