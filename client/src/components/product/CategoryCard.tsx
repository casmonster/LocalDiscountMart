import { Link } from "wouter";

type CategoryCardProps = {
  name: string;
  slug: string;
  imageUrl: string;
};

export default function CategoryCard({ name, slug, imageUrl }: CategoryCardProps) {
  return (
    <Link href={`/category/${slug}`} className="group">
      <div className="relative overflow-hidden rounded-lg aspect-square">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end">
          <h3 className="text-white font-semibold text-lg p-4">{name}</h3>
        </div>
      </div>
    </Link>
  );
}
