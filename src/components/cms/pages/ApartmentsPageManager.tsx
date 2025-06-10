
import ApartmentsHeaderEditor from "./apartments/ApartmentsHeaderEditor";
import ApartmentsFiltersEditor from "./apartments/ApartmentsFiltersEditor";
import ApartmentsSEOEditor from "./apartments/ApartmentsSEOEditor";

interface ApartmentsPageContent {
  title: string;
  subtitle: string;
  description: string;
  filters: {
    guests: string;
    location: string;
    priceRange: string;
    anyGuests: string;
    onePlus: string;
    twoPlus: string;
    threePlus: string;
    fourPlus: string;
    anyLocation: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

interface ApartmentsPageManagerProps {
  content: ApartmentsPageContent;
  onUpdate: (content: ApartmentsPageContent) => void;
}

export default function ApartmentsPageManager({ content, onUpdate }: ApartmentsPageManagerProps) {
  const updateHeader = (headerContent: { title: string; subtitle: string; description: string }) => {
    onUpdate({
      ...content,
      ...headerContent
    });
  };

  const updateFilters = (filters: typeof content.filters) => {
    onUpdate({
      ...content,
      filters
    });
  };

  const updateSEO = (seo: typeof content.seo) => {
    onUpdate({
      ...content,
      seo
    });
  };

  return (
    <div className="space-y-6">
      <ApartmentsHeaderEditor
        content={{
          title: content.title,
          subtitle: content.subtitle,
          description: content.description
        }}
        onUpdate={updateHeader}
      />
      <ApartmentsFiltersEditor
        filters={content.filters}
        onUpdate={updateFilters}
      />
      <ApartmentsSEOEditor
        seo={content.seo}
        onUpdate={updateSEO}
      />
    </div>
  );
}
