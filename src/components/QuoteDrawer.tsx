import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/contexts/QuoteContext";
import { Minus, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuoteDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuoteDrawer = ({ open, onOpenChange }: QuoteDrawerProps) => {
  const { items, removeFromQuote, updateQuantity } = useQuote();
  const navigate = useNavigate();

  const handleRequestQuote = () => {
    onOpenChange(false);
    navigate("/request-quote");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0">
        <div className="p-4 md:p-6 h-full flex flex-col">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl md:text-3xl font-black tracking-tighter">QUOTE LIST</SheetTitle>
          </SheetHeader>

          <div className="flex-1 flex flex-col min-h-0">
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm tracking-wider text-muted-foreground">YOUR QUOTE LIST IS EMPTY</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto space-y-4 pr-2 mb-4">
                  {items.map((item) => (
                    <article key={item.id} className="border border-foreground p-4 space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm tracking-wider">{item.name}</h3>
                          <p className="text-xs tracking-wider text-muted-foreground mt-1">
                            {item.vendor} — {item.variantTitle}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromQuote(item.id)}
                          className="p-2 hover:opacity-50 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
                          aria-label="Remove item"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="border border-foreground p-3 hover:bg-foreground hover:text-background transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-base font-bold min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="border border-foreground p-3 hover:bg-foreground hover:text-background transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="border-t border-foreground pt-4 space-y-4">
                  <p className="text-xs tracking-wider text-muted-foreground text-center">
                    NO PRICES SHOWN. SUBMIT YOUR LIST AND WE WILL CONTACT YOU WITH SOURCING DETAILS.
                  </p>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={handleRequestQuote}
                      className="w-full border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors font-bold tracking-wider py-6 md:py-7 text-sm min-h-[52px]"
                    >
                      REQUEST QUOTE
                    </Button>
                    <Button
                      onClick={() => onOpenChange(false)}
                      variant="outline"
                      className="w-full border-2 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background transition-colors font-bold tracking-wider py-6 md:py-7 text-sm min-h-[52px]"
                    >
                      CONTINUE BROWSING
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
