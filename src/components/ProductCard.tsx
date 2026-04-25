import { useQuote } from "@/contexts/QuoteContext";
import { Product } from "@/data/schema";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToQuote } = useQuote();

  const handleAddToQuote = () => {
    addToQuote({
      id: product.id,
      productId: product.id,
      vendor: product.vendor,
      name: product.name,
      variantTitle: "1 lb",
    });
  };

  return (
    <article className="group border border-foreground hover:bg-foreground hover:text-background transition-colors flex flex-col">
      <div className="aspect-square bg-muted border-b border-foreground relative overflow-hidden">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-muted-foreground">NO IMAGE</span>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 space-y-3 flex-1 flex flex-col">
        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-muted-foreground group-hover:text-background/70">
            {product.vendor}
            {product.strain ? ` • ${product.strain}` : ""}
          </p>
          <h3 className="font-bold text-lg md:text-xl uppercase tracking-wider">{product.name}</h3>
          <p className="text-[10px] tracking-[0.2em] uppercase font-bold inline-block border border-foreground px-2 py-1 group-hover:border-background group-hover:bg-background group-hover:text-foreground">
            {product.category}
          </p>
        </div>

        <p className="text-sm leading-relaxed line-clamp-3">{product.description}</p>

        <div className="pt-2 mt-auto space-y-2">
          <button
            onClick={handleAddToQuote}
            className="w-full text-xs uppercase tracking-wider py-4 md:py-3 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors font-bold min-h-[52px] group-hover:bg-background group-hover:text-foreground group-hover:border-background"
          >
            ADD TO QUOTE
          </button>
          <p className="text-[10px] tracking-[0.2em] text-center uppercase text-muted-foreground group-hover:text-background/70">
            ASK FOR PRICING
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
