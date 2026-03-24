import { ServiceSearch } from "@/components/ServiceSearch";

export default function SearchExamplePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Service Search Example</h1>
      <div className="max-w-md">
        <ServiceSearch />
      </div>
    </div>
  );
}