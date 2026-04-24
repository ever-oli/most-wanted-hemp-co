import React from "react";
import { useQuote } from "@/contexts/QuoteContext";
import { Product } from "@/data/schema";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedVariantId, setSelectedVariantId] = React.useState<string>(
    product.variants[0]?.id ?? ""
  );
  const { addToQuote } = useQuote();

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  const handleAddToQuote = () => {
    if (!selectedVariant) return;
    addToQuote({
      id: `${product.id}:${selectedVariant.id}`,
      productId: product.id,
      vendor: product.vendor,
      name: product.name,
      variantTitle: selectedVariant.title,
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

        {product.variants.length > 1 && (
          <div className="flex flex-col gap-2 pt-1">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                disabled={!variant.available}
                className={`text-xs uppercase tracking-wider py-2 border transition-colors min-h-[44px] ${
                  selectedVariantId === variant.id
                    ? "bg-foreground text-background border-foreground group-hover:bg-background group-hover:text-foreground group-hover:border-background"
                    : "border-foreground hover:bg-foreground hover:text-background group-hover:border-background group-hover:bg-background group-hover:text-foreground"
                } ${!variant.available ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {variant.title}
              </button>
            ))}
          </div>
        )}

        <div className="pt-2 mt-auto space-y-2">
          <button
            onClick={handleAddToQuote}
            disabled={!selectedVariant?.available}
            className="w-full text-xs uppercase tracking-wider py-4 md:py-3 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors font-bold min-h-[52px] disabled:opacity-40 disabled:cursor-not-allowed group-hover:bg-background group-hover:text-foreground group-hover:border-background"
          >
            ADD TO QUOTE
          </button>
          <p className="text-[10px] tracking-[0.2em] text-center uppercase text-muted-foreground group-hover:text-background/70">
            CONTACT FOR PRICING
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
