import React from "react";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  name: string;
  price: string;
}

const ProductCard = ({ name, price }: ProductCardProps) => {
  const [selectedStrain, setSelectedStrain] = React.useState<"SATIVA" | "INDICA" | "HYBRID">("SATIVA");
  const { addToCart } = useCart();
  
  return (
    <article className="group cursor-pointer border border-foreground p-6 md:p-8 hover:bg-foreground hover:text-background transition-colors">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-lg md:text-xl uppercase tracking-wider">{name}</h3>
          <p className="text-sm md:text-base">${price}</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setSelectedStrain("SATIVA")}
            className={`text-xs uppercase tracking-wider py-3 md:py-2 border transition-colors min-h-[44px] ${
              selectedStrain === "SATIVA"
                ? "bg-foreground text-background border-foreground"
                : "border-foreground hover:bg-foreground hover:text-background"
            }`}
          >
            SATIVA
          </button>
          <button
            onClick={() => setSelectedStrain("INDICA")}
            className={`text-xs uppercase tracking-wider py-3 md:py-2 border transition-colors min-h-[44px] ${
              selectedStrain === "INDICA"
                ? "bg-foreground text-background border-foreground"
                : "border-foreground hover:bg-foreground hover:text-background"
            }`}
          >
            INDICA
          </button>
          <button
            onClick={() => setSelectedStrain("HYBRID")}
            className={`text-xs uppercase tracking-wider py-3 md:py-2 border transition-colors min-h-[44px] ${
              selectedStrain === "HYBRID"
                ? "bg-foreground text-background border-foreground"
                : "border-foreground hover:bg-foreground hover:text-background"
            }`}
          >
            HYBRID
          </button>
        </div>
        
        <button
          onClick={() => {
            addToCart({
              id: `${name.toLowerCase()}-${selectedStrain.toLowerCase()}`,
              name,
              price,
              strain: selectedStrain,
            });
          }}
          className="w-full text-xs uppercase tracking-wider py-4 md:py-3 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors font-bold mt-4 min-h-[52px]"
        >
          ADD TO CART
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
