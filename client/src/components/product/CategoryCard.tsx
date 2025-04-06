import { Link } from "wouter";

type CategoryCardProps = {
  name: string;
  slug: string;
  imageUrl: string;
};

export default function CategoryCard({ name, slug, imageUrl }: CategoryCardProps) {
  return (
    <Link href={`/category/${slug}`} className="group">
      <div className="relative overflow-hidden rounded-lg aspect-square shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent flex flex-col justify-end">
          <div className="p-5 transform group-hover:translate-y-0 transition-all duration-300">
            <h3 className="text-white font-bold text-xl mb-1">{name}</h3>
            <div className="w-10 h-1 bg-primary rounded-full mb-2 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-left"></div>
            <span className="text-white/80 text-sm inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Browse Collection
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
