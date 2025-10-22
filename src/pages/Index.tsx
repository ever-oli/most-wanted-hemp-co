import { Button } from "@/components/ui/button";
import logoStar from "@/assets/logo-star.jpg";
import logoMoney from "@/assets/logo-money.png";
import logoMW from "@/assets/logo-mw.png";
import rioGrandeFlag from "@/assets/rio-grande-flag.png";
import ProductCard from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/contexts/CartContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
const Index = () => {
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  
  const products = [{
    name: "PRE-ROLL",
    price: "15.00"
  }, {
    name: "VAPE",
    price: "45.00"
  }, {
    name: "FLOWER",
    price: "50.00"
  }];
  return <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-foreground">
        <nav className="container mx-auto px-4 md:px-6 py-4 md:py-6 flex justify-between items-center">
          <div className="text-lg md:text-xl font-black tracking-tighter">MW</div>
          <div className="flex items-center gap-4 md:gap-12">
            <div className="flex gap-4 md:gap-12 text-xs font-bold tracking-widest">
              <a href="#shop" className="hover:opacity-50 transition-opacity min-h-[44px] flex items-center">SHOP</a>
              <a href="#about" className="hover:opacity-50 transition-opacity min-h-[44px] flex items-center">ABOUT</a>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setCartOpen(true)}
                className="relative hover:opacity-50 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-6 h-6 md:w-5 md:h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-foreground text-background text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      {/* Hero */}
      <section className="pt-20 md:pt-24 pb-12 md:pb-16 container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh] space-y-6 md:space-y-8">
            <div className="flex gap-2 md:gap-4 items-center">
              <img src={logoStar} alt="Most Wanted Star Logo" className="w-12 h-12 md:w-24 md:h-24 object-contain rotate-45 dark:invert" />
              <img src={logoMW} alt="Most Wanted MW Logo" className="w-24 h-24 md:w-40 md:h-40 object-contain dark:invert" />
              <img src={logoStar} alt="Most Wanted Star Logo" className="w-12 h-12 md:w-24 md:h-24 object-contain rotate-45 dark:invert" />
            </div>
            <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-center px-4">"MOST WANTED"</h1>
            <img src={rioGrandeFlag} alt="Republic of Rio Grande Flag" className="w-40 h-24 md:w-64 md:h-40 object-cover object-left border border-foreground" />
            <div className="w-full h-px bg-red max-w-xs mx-auto" />
            <p className="text-xs md:text-sm tracking-[0.5em] text-center px-2">PREMIUM THCA HEMP</p>
            <p className="text-xs tracking-[0.3em] text-center text-muted-foreground">SOUTH TEXAS</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-foreground" />

      {/* Products */}
      <section id="shop" className="py-16 md:py-24 container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-black mb-12 md:mb-16 tracking-tighter">
            "SHOP"
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {products.map(product => <ProductCard key={product.name} {...product} />)}
          </div>
        </div>
      </section>

      {/* Money Way Section */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col items-center space-y-6 md:space-y-8">
            <img src={logoMoney} alt="Money Way Logo" className="w-24 h-24 md:w-32 md:h-32 object-contain invert" />
            <h2 className="text-5xl md:text-9xl font-black tracking-tighter text-center leading-tight">
              "MONEY<br />WAY"
            </h2>
            <p className="text-xs md:text-sm tracking-[0.3em] text-center max-w-md px-4">
              SOUTH TEXAS HEMP CULTURE
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-24 container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">"ABOUT"</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              MOST WANTED IS A SOUTH TEXAS THCA HEMP BRAND BUILT ON QUALITY, 
              CULTURE, AND THE MONEY WAY MENTALITY.
            </p>
            <p>
              WE SOURCE PREMIUM HEMP AND CREATE PRODUCTS THAT REPRESENT 
              OUR ROOTS AND OUR FUTURE.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
            <div className="text-xs tracking-widest font-bold">MOST WANTED © 2025</div>
            <div className="flex gap-6 md:gap-8 text-xs">
              <a href="#" className="hover:text-red transition-colors min-h-[44px] flex items-center">INSTAGRAM</a>
              <a href="#" className="hover:text-blue transition-colors min-h-[44px] flex items-center">CONTACT</a>
              <a href="#" className="hover:text-green transition-colors min-h-[44px] flex items-center">TERMS</a>
            </div>
          </div>
        </div>
      </footer>
    </main>;
};
export default Index;