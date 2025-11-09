// Blog 404 Error Page
export default function NotFound() {
  return (
    <main className="container mx-auto py-24 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">Sorry, the blog page you are looking for does not exist.</p>
      <a href="/blog" className="btn btn-primary">Go to Blog Home</a>
    </main>
  );
}
