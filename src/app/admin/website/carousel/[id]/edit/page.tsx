import CarouselItemFormView from "@/features/carousel-admin/components/CarouselItemFormView";
import { parseCarouselItemID } from "@/features/carousel-admin/components/carouselAdminRoutes";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCarouselItemPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <CarouselItemFormView
      mode="edit"
      carouselItemID={parseCarouselItemID(id)}
    />
  );
}
