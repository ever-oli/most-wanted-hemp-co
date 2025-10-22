import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address1: z.string().min(5, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().regex(/^\d{5}$/, "Valid ZIP code is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "TX",
      zipCode: "",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Order submitted:", data);
    toast.success("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black tracking-tighter">YOUR CART IS EMPTY</h1>
          <Button
            onClick={() => navigate("/")}
            className="border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors font-bold tracking-wider"
          >
            CONTINUE SHOPPING
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground">
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-lg md:text-xl font-black tracking-tighter hover:opacity-50 transition-opacity"
          >
            MW
          </button>
          <div className="flex items-center gap-3">
            <div className="text-xs font-bold tracking-widest">CHECKOUT</div>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter">CHECKOUT</h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold tracking-wider border-b border-foreground pb-2">
                    CUSTOMER INFORMATION
                  </h2>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs tracking-wider font-bold">EMAIL</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className="border-2 border-foreground rounded-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs tracking-wider font-bold">FULL NAME</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            className="border-2 border-foreground rounded-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs tracking-wider font-bold">PHONE NUMBER</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(555) 123-4567"
                            className="border-2 border-foreground rounded-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold tracking-wider border-b border-foreground pb-2">
                    SHIPPING ADDRESS
                  </h2>

                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs tracking-wider font-bold">ADDRESS LINE 1</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Main St"
                            className="border-2 border-foreground rounded-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs tracking-wider font-bold">
                          ADDRESS LINE 2 (OPTIONAL)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Apt 4B"
                            className="border-2 border-foreground rounded-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs tracking-wider font-bold">CITY</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="McAllen"
                              className="border-2 border-foreground rounded-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs tracking-wider font-bold">STATE</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-2 border-foreground rounded-none">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="TX">Texas</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs tracking-wider font-bold">ZIP CODE</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="78501"
                            className="border-2 border-foreground rounded-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Payment Placeholder */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold tracking-wider border-b border-foreground pb-2">
                    PAYMENT METHOD
                  </h2>
                  <div className="border border-foreground p-6 text-center">
                    <p className="text-sm tracking-wider text-muted-foreground">
                      PAYMENT PROCESSING WILL BE INTEGRATED
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors font-bold tracking-wider py-6 md:py-7 text-base md:text-lg min-h-[56px] sticky bottom-0 md:static"
                >
                  PLACE ORDER
                </Button>
              </form>
            </Form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="border border-foreground p-4 md:p-6 space-y-4 md:space-y-6 lg:sticky lg:top-24">
              <h2 className="text-lg md:text-xl font-bold tracking-wider border-b border-foreground pb-2">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-bold tracking-wider">{item.name}</p>
                      <p className="text-xs tracking-wider text-muted-foreground">
                        {item.strain} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-foreground pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="tracking-wider">SUBTOTAL</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="tracking-wider">SHIPPING</span>
                  <span className="font-bold">TBD</span>
                </div>
                <div className="flex justify-between text-lg font-black border-t border-foreground pt-2 mt-2">
                  <span className="tracking-wider">TOTAL</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
