import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onOpenChange(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-black tracking-tighter">CART</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-[calc(100vh-8rem)]">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm tracking-wider text-muted-foreground">YOUR CART IS EMPTY</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-4 pr-2">
                {items.map((item) => (
                  <article key={item.id} className="border border-foreground p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-sm tracking-wider">{item.name}</h3>
                        <p className="text-xs tracking-wider text-muted-foreground mt-1">
                          {item.strain}
                        </p>
                        <p className="text-sm mt-1">${item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:opacity-50 transition-opacity"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="border border-foreground p-2 hover:bg-foreground hover:text-background transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="border border-foreground p-2 hover:bg-foreground hover:text-background transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="border-t border-foreground pt-4 mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold tracking-wider">SUBTOTAL</span>
                  <span className="text-lg font-black">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="space-y-2">
                  <Button
                    onClick={handleCheckout}
                    className="w-full border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors font-bold tracking-wider py-6"
                  >
                    CHECKOUT
                  </Button>
                  <Button
                    onClick={() => onOpenChange(false)}
                    variant="outline"
                    className="w-full border-2 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background transition-colors font-bold tracking-wider py-6"
                  >
                    CONTINUE SHOPPING
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
