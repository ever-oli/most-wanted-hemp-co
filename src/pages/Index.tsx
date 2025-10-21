import { Button } from "@/components/ui/button";
import logoStar from "@/assets/logo-star.jpg";
import logoMoney from "@/assets/logo-money.png";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const products = [
    {
      name: "INDICA BLEND",
      price: "45.00",
      image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&q=80"
    },
    {
      name: "SATIVA BLEND",
      price: "45.00", 
      image: "https://images.unsplash.com/photo-1612159498633-e876c81c08c0?w=800&q=80"
    },
    {
      name: "HYBRID BLEND",
      price: "50.00",
      image: "https://images.unsplash.com/photo-1610920190674-d3bb0a6d9aaf?w=800&q=80"
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-foreground">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xs font-bold tracking-widest">MOST WANTED</div>
          <div className="flex gap-8 text-xs">
            <a href="#shop" className="hover:text-green transition-colors">SHOP</a>
            <a href="#about" className="hover:text-blue transition-colors">ABOUT</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-16 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-12">
            <img 
              src={logoStar} 
              alt="Most Wanted Star Logo" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
            />
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-center">
              "MOST<br />WANTED"
            </h1>
            <div className="flex gap-4 items-center">
              <div className="w-4 h-4 bg-red" />
              <div className="w-4 h-4 bg-background border-2 border-blue" />
              <div className="w-4 h-4 bg-green" />
            </div>
            <p className="text-sm tracking-[0.5em] text-center">PREMIUM THCA HEMP</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-foreground" />

      {/* Products */}
      <section id="shop" className="py-24 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tighter">
            "SHOP"
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {products.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Money Way Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col items-center space-y-8">
            <img 
              src={logoMoney} 
              alt="Money Way Logo" 
              className="w-32 h-32 object-contain invert"
            />
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-center">
              "MONEY<br />WAY"
            </h2>
            <p className="text-sm tracking-[0.3em] text-center max-w-md">
              SOUTH TEXAS HEMP CULTURE
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 container mx-auto px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-black tracking-tighter">"ABOUT"</h2>
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
      <footer className="border-t border-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xs tracking-widest font-bold">MOST WANTED © 2025</div>
            <div className="flex gap-8 text-xs">
              <a href="#" className="hover:text-red transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-blue transition-colors">CONTACT</a>
              <a href="#" className="hover:text-green transition-colors">TERMS</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
