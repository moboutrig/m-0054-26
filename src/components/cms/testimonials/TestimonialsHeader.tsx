
interface TestimonialsHeaderProps {
  onSave: () => void;
}

export default function TestimonialsHeader({ onSave }: TestimonialsHeaderProps) {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold">Customer Testimonials</h3>
        <p className="text-sm text-muted-foreground">
          Manage customer reviews and testimonials displayed on your website.
        </p>
      </div>
    </>
  );
}
