export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-2">
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your information when you use our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-2">
        We may collect your name, email address, and profile information when
        you sign in with Google.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Information</h2>
      <p className="mb-2">
        We use this information only to provide authentication and improve your
        experience. We do not sell your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
      <p className="mb-2">
        We use Supabase and Google OAuth for authentication. Your data is
        handled according to their policies as well.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>
        If you have questions, contact us at{" "}
        <a href="mailto:youremail@example.com" className="text-blue-600 underline">
          youremail@example.com
        </a>.
      </p>
    </main>
  );
}
