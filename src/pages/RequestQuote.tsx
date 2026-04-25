import { useNavigate } from "react-router-dom";
import { useQuote } from "@/contexts/QuoteContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  preferredContact: z.enum(["text", "phone", "email"]),
  notes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const RequestQuote = () => {
  const navigate = useNavigate();
  const { items, clearQuote } = useQuote();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferredContact: "email",
      notes: "",
    },
  });

  const onSubmit = (data: QuoteFormData) => {
    const itemLines = items.map(
      (item) => `[${item.vendor}] ${item.name} — ${item.quantity} lb`
    );
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Preferred contact: ${data.preferredContact}`,
      data.notes ? `Notes: ${data.notes}` : "",
      "",
      "Quote list:",
      ...itemLines,
    ]
      .filter(Boolean)
      .join("\n");

    const subject = `Quote request — ${items.length} item${items.length === 1 ? "" : "s"}`;
    const href = `mailto:mstwntdpacks@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    toast.success("Quote submitted! Opening your email client...");
    clearQuote();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black tracking-tighter">YOUR QUOTE LIST IS EMPTY</h1>
          <Button
            onClick={() => navigate("/")}
            className="border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors font-bold tracking-wider"
          >
            CONTINUE BROWSING
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
            <div className="text-xs font-bold tracking-widest">REQUEST QUOTE</div>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Quote Form */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter">REQUEST QUOTE</h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold tracking-wider border-b border-foreground pb-2">
                    CONTACT INFORMATION
                  </h2>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs tracking-wider font-bold">NAME</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="preferredContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs tracking-wider font-bold">PREFERRED CONTACT METHOD</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="text" id="contact-text" />
                              <Label htmlFor="contact-text" className="text-xs tracking-wider uppercase">Text</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="phone" id="contact-phone" />
                              <Label htmlFor="contact-phone" className="text-xs tracking-wider uppercase">Phone</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="email" id="contact-email" />
                              <Label htmlFor="contact-email" className="text-xs tracking-wider uppercase">Email</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs tracking-wider font-bold">NOTES (OPTIONAL)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Each item on your list represents 1 lb. Use this space for any special requests, strain preferences, or questions..."
                            className="border-2 border-foreground rounded-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors font-bold tracking-wider py-6 md:py-7 text-base md:text-lg min-h-[56px] sticky bottom-0 md:static"
                >
                  SUBMIT QUOTE REQUEST
                </Button>
              </form>
            </Form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="border border-foreground p-4 md:p-6 space-y-4 md:space-y-6 lg:sticky lg:top-24">
              <h2 className="text-lg md:text-xl font-bold tracking-wider border-b border-foreground pb-2">
                QUOTE SUMMARY
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-bold tracking-wider">{item.name}</p>
                      <p className="text-xs tracking-wider text-muted-foreground">
                        {item.vendor} — {item.quantity} lb
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-foreground pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="tracking-wider">ITEMS</span>
                  <span className="font-bold">{items.length}</span>
                </div>
                <div className="text-xs tracking-wider text-muted-foreground">
                  PRICING WILL BE PROVIDED AFTER REVIEW
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RequestQuote;
