interface ProductCardProps {
  name: string;
  price: string;
}

const ProductCard = ({ name, price }: ProductCardProps) => {
  return (
    <article className="group cursor-pointer border border-foreground p-8 hover:bg-foreground hover:text-background transition-colors">
      <div className="space-y-2">
        <h3 className="font-bold text-xl uppercase tracking-wider">{name}</h3>
        <p className="text-sm">${price}</p>
      </div>
    </article>
  );
};

export default ProductCard;
