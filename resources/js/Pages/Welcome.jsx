import Card from "@/Components/Card";
import ExploreByCategory from "@/Components/ExploreByCategory";
import HeroSection from "@/Components/HeroSection";
import Testimonial from "@/Components/Testimonial";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormater from "@/lib/CurrencyFormater";
import { Head, Link } from "@inertiajs/react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Welcome({
  categories,
  featuredProducts,
  testimonials,
}) {
  return (
    <AuthenticatedLayout>
      <Head title="Welcome" />
      <div className="container mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="px-6 py-20 md:px-12 md:pb-0 md:pt-40 lg:py-0 lg:px-10">
          <HeroSection />
        </div>

        <div className="py-20 sm:py-32 lg:max-w-7xl lg:py-24">
          <div className="mb-8 flex justify-center">
            <h2 className="text-2xl font-bold">Popular Products</h2>
          </div>
          <Swiper
            spaceBetween={20}
            className={"swiper py-4"}
            pagination={{
              type: "progressbar",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            modules={[Pagination]}
          >
            {featuredProducts.map((product, index) => (
              <SwiperSlide key={index}>
                <Link href={route("product.show", product.id)}>
                  <Card
                    className={
                      "card-compact h-96 border shadow-xl hover:bg-base-200"
                    }
                  >
                    <Card.Image
                      src={product.images[0]}
                      alt={product.name}
                      className="aspect-square object-contain"
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {CurrencyFormater(product.prices[0].price)}
                        </span>
                        <span className="badge-accent badge p-2 font-semibold">
                          {product.category.name}
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="py-20 sm:py-32 lg:py-24">
          <ExploreByCategory categories={categories} />
        </div>

        {/* <div className="max-w-7xl py-20 sm:py-32 lg:py-24">
          <FeatureSection />
        </div> */}

        <div className="max-w-7xl py-20 sm:py-32 lg:py-24">
          <div className="mb-8 flex justify-center">
            <h2 className="text-2xl font-bold">Testimonial</h2>
          </div>
          <Testimonial testimonials={testimonials} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
