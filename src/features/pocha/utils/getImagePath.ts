export const getMenuImagePath = (menuID: number) => {
  if (!menuID) {
    return defaultImageURL;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/pocha/menu-${menuID}.png`;
};

export const defaultImageURL = "/kisa_logo.png";
