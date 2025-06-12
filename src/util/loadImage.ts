// /src/utils/loadImages.ts
const images = import.meta.glob('/src/assets/moments/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default'
});

export const imageUrls: string[] = Object.values(images) as string[];