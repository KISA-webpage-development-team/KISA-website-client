import CarouselItemFormView from "@/features/carousel-admin/components/CarouselItemFormView";
import { parseCarouselItemID } from "@/features/carousel-admin/components/carouselAdminRoutes";

type PageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function NewCarouselItemPage({ searchParams }: PageProps) {
  const { from } = await searchParams;
  return (
    <CarouselItemFormView sourceItemID={parseCarouselItemID(from)} />
  );
}
