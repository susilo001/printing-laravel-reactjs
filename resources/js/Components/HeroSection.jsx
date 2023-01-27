import { Link } from "@inertiajs/inertia-react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function HeroSection() {
  return (
    <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
      <div className="w-full lg:w-1/2">
        <div className="lg:max-w-lg">
          <h1 className="text-3xl font-semibold tracking-wide lg:text-4xl">
            Print like a pro with our premium printing services.
          </h1>
          <p className="mt-4">
            From business cards to brochures, we've got you covered. With
            state-of-the-art equipment, experienced technicians and a wide range
            of paper and ink options, we guarantee your print job will exceed
            your expectations. Trust us for your next project and experience the
            difference in quality.
          </p>
          <div className="grid gap-6 my-8 sm:grid-cols-2">
            <div className="flex items-center">
              <CheckIcon className="w-6 h-5" />

              <span className="mx-3">Premium selection</span>
            </div>

            <div className="flex items-center -px-3 ">
              <CheckIcon className="w-6 h-5" />

              <span className="mx-3">Insurance</span>
            </div>

            <div className="flex items-center -px-3">
              <CheckIcon className="w-6 h-5" />

              <span className="mx-3">All legal documents</span>
            </div>

            <div className="flex items-center  -px-3 ">
              <CheckIcon className="w-6 h-5" />

              <span className="mx-3">From US glasses dealers</span>
            </div>

            <div className="flex items-center  -px-3 ">
              <CheckIcon className="w-6 h-5" />

              <span className="mx-3">Payment Security</span>
            </div>

            <div className="flex items-center  -px-3 ">
              <CheckIcon className="w-6 h-5" />

              <span className="mx-3">Fast shipping (+ Express)</span>
            </div>
          </div>
          <Link
            href="/design"
            as="button"
            className="btn btn-primary text-base-100"
          >
            Try Design Tool
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
        <img
          className="object-cover w-full h-full max-w-2xl rounded-md"
          src="../asset/hero-section.jpg"
          alt="Printing Services"
        />
      </div>
    </div>
  );
}
