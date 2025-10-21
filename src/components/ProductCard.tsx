interface ProductCardProps {
  name: string;
  price: string;
  image: string;
}

const ProductCard = ({ name, price, image }: ProductCardProps) => {
  return (
    <article className="group cursor-pointer">
      <div className="aspect-square bg-muted mb-4 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-sm uppercase tracking-wider">{name}</h3>
        <p className="text-sm">${price}</p>
      </div>
    </article>
  );
};

export default ProductCard;
