import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Button from "@/Components/Button";

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm();

  const submit = (e) => {
    e.preventDefault();

    post(route("verification.send"));
  };

  return (
    <GuestLayout>
      <Head title="Email Verification" />

      <div className="mb-4 text-sm">
        Thanks for signing up! Before getting started, could you verify your
        email address by clicking on the link we just emailed to you? If you
        didn&apos;t receive the email, we will gladly send you another.
      </div>

      {status === "verification-link-sent" && (
        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      )}

      <form onSubmit={submit}>
        <div className="mt-4 flex items-center justify-between">
          <Button
            className="btn-outline btn-ghost ml-4"
            disabled={processing}
          >
            Resend Verification Email
          </Button>

          <Link
            href={route("logout")}
            method="post"
            as="button"
            className="link-hover link"
          >
            Log Out
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}
