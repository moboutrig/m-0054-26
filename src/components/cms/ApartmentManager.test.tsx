import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ApartmentManager from './ApartmentManager';
import { CMSContext, CMSContextType } from '@/contexts/CMSContext';
import { Toaster } from '@/components/ui/toaster';

// Mock crypto.randomUUID
vi.mock('crypto', async (importOriginal) => {
  const originalCrypto = await importOriginal<typeof crypto>();
  return {
    ...originalCrypto,
    randomUUID: () => 'test-uuid-' + Math.random().toString(36).substring(2, 15),
  };
});

// Mock useToast
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

const mockUpdateApartments = vi.fn();
const initialApartmentsData = [
  { id: 'apt1', name: 'Beach View', description: 'Nice view', capacity: 2, size: 50, location: 'Beachfront', features: ['Wi-Fi'], isActive: true, order: 1 },
  { id: 'apt2', name: 'City Central', description: 'In the city', capacity: 4, size: 70, location: 'Custom City Location', features: ['Kitchen'], isActive: true, order: 2 },
];

const mockCmsDataDefaults = {
  siteTitle: "Test Site", siteDescription: "Test Description", logoUrl: "/logo.png", faviconUrl: "/favicon.ico",
  themeSettings: { primaryColor: "blue", secondaryColor: "green", backgroundColor: "white", font: "Arial" },
  navigation: [{ id: "1", label: "Home", path: "/" }],
  footerContent: { copyright: "Test Inc.", links: [] },
  contactInfo: { email: "test@example.com", phone: "123", address: "Test St" },
  socialMediaLinks: [{ platform: "twitter", url: "example.com" }],
  seoSettings: { defaultTitle: "Test", defaultDescription: "Test", keywords: ["test"] },
  pages: [{ id: "home", title: "Home", path: "/", sections: [] }],
  apartments: initialApartmentsData, rooms: [], uiText: {}, bookings: [], testimonials: [], images: [],
  pageContent: {}, pricingPlans: [], globalSettings: {},
};

const renderApartmentManager = (apartments = initialApartmentsData) => {
  const cmsContent: CMSContextType['content'] = {
    ...mockCmsDataDefaults,
    apartments: apartments,
  };

  const mockCMSContextValue: CMSContextType = {
    content: cmsContent,
    updateApartments: mockUpdateApartments,
    updateCMSContent: vi.fn(), updateRooms: vi.fn(), updateNavigation: vi.fn(), updateSiteSettings: vi.fn(),
    updateThemeSettings: vi.fn(), updateFooterSettings: vi.fn(), updateContactSettings: vi.fn(),
    updateSocialMediaLinks: vi.fn(), updateSEOSettings: vi.fn(), updatePageContent: vi.fn(),
    updateImage: vi.fn(), deleteImage: vi.fn(), updateTestimonial: vi.fn(), deleteTestimonial: vi.fn(),
    addTestimonial: vi.fn(), updateUIText: vi.fn(), updateBookingSettings: vi.fn(),
    updatePricingPlans: vi.fn(), updateGlobalSetting: vi.fn(), addApartment: vi.fn(),
    removeApartment: vi.fn(), updateApartment: vi.fn(), addRoomToApartment: vi.fn(),
    updateRoomInApartment: vi.fn(), deleteRoomFromApartment: vi.fn(),
  };

  return render(
    <CMSContext.Provider value={mockCMSContextValue}>
      <ApartmentManager />
      <Toaster />
    </CMSContext.Provider>
  );
};

describe('ApartmentManager', () => {
  beforeEach(() => {
    mockUpdateApartments.mockClear();
    vi.clearAllMocks();
  });

  // Replace the initial 'should render without crashing' or add alongside it.
  it('should render the ApartmentManager component', () => {
    renderApartmentManager();
    expect(screen.getByRole('button', { name: /Add Apartment Type/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save All Apartments/i })).toBeInTheDocument();
  });

  describe('New Apartment Creation', () => {
    it('should add a new apartment with a generated ID when saved', async () => {
      renderApartmentManager([]); // Start with no apartments

      fireEvent.change(screen.getByLabelText(/Apartment Name/i), { target: { value: 'New Suite' } });
      fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'A brand new suite.' } });
      // Capacity, Size, Location will use defaults as per component logic

      // Click "Add Apartment Type" to add to local component state
      fireEvent.click(screen.getByRole('button', { name: /Add Apartment Type/i }));

      // Verify the new apartment appears in the list (e.g., its name is in an input field for editing)
      expect(screen.getByDisplayValue('New Suite')).toBeInTheDocument();

      // Click "Save All Apartments" to trigger updateApartments context function
      fireEvent.click(screen.getByRole('button', { name: /Save All Apartments/i }));

      await waitFor(() => {
         expect(mockUpdateApartments).toHaveBeenCalledWith(
           expect.arrayContaining([
             expect.objectContaining({
               name: 'New Suite',
               id: expect.stringMatching(/^test-uuid-.*/) // Check for our mocked UUID format
             })
           ])
         );
      });
    });

    it('should validate capacity and size for new apartment, defaulting to min values', () => {
      renderApartmentManager([]);

      // Find inputs for the "Add New Apartment Type" form specifically.
      // These inputs are not part of the existing apartments list.
      // const newAptForm = screen.getByRole('region', {'name': /Add New Apartment Type/i}); // Assuming CardTitle sets aria-label on Card for region role
      // If not a region, find by a more specific structure or test ID if available.
      // For now, let's assume inputs can be uniquely found, e.g. not having certain parent structure of existing items.
      // A simpler approach: get all and filter, but that's fragile.
      // The most robust is specific labels for new form if they are unique, or test IDs.
      // The labels "Apartment Name", "Description" are for the new apt form.
      // Capacity and Size labels are "Capacity (guests)" and "Size (sqm)".
      // We need to ensure these are the ones in the "Add New Apartment Type" card.

      const capacityInput = screen.getByRole('spinbutton', { name: /Capacity \(guests\)/i });
      const sizeInput = screen.getByRole('spinbutton', { name: /Size \(sqm\)/i });
      // Note: Using getByRole('spinbutton') as type="number" inputs often have this role.

      expect(capacityInput).toBeInTheDocument(); // Make sure we found them
      expect(sizeInput).toBeInTheDocument();

      fireEvent.change(capacityInput, { target: { value: 'abc' } }); // Invalid text
      expect(capacityInput.value).toBe('1'); // Should default to min 1

      fireEvent.change(capacityInput, { target: { value: '0' } });   // Below min
      expect(capacityInput.value).toBe('1'); // Should default to min 1

      fireEvent.change(capacityInput, { target: { value: '5' } });   // Valid
      expect(capacityInput.value).toBe('5');

      fireEvent.change(sizeInput, { target: { value: 'xyz' } }); // Invalid text
      expect(sizeInput.value).toBe('10'); // Should default to min 10

      fireEvent.change(sizeInput, { target: { value: '5' } });   // Below min
      expect(sizeInput.value).toBe('10'); // Should default to min 10

      fireEvent.change(sizeInput, { target: { value: '100' } }); // Valid
      expect(sizeInput.value).toBe('100');
    });

    it('should save with default predefined location for new apartment if location select is not changed', async () => {
      renderApartmentManager([]); // Start with no apartments

      fireEvent.change(screen.getByLabelText(/Apartment Name/i), { target: { value: 'Default Loc Apt' } });
      fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Desc for default loc' } });

      // The component defaults `newApartment.location` to `locationOptions[0]`.
      // `locationOptions` is defined inside ApartmentManager as:
      // ["Beachfront", "Second row", "City center", "Mountain view", "Garden view", "Pool view", "Sea view", "Custom location"]
      // So, the default is "Beachfront".

      fireEvent.click(screen.getByRole('button', { name: /Add Apartment Type/i }));
      fireEvent.click(screen.getByRole('button', { name: /Save All Apartments/i }));

      await waitFor(() => {
        expect(mockUpdateApartments).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              name: 'Default Loc Apt',
              location: 'Beachfront' // Check for the default location
            })
          ])
        );
      });
    });

    it('should allow selecting "Custom location" and saving the entered text for a new apartment', async () => {
      renderApartmentManager([]); // Start with no apartments

      fireEvent.change(screen.getByLabelText(/Apartment Name/i), { target: { value: 'My Custom Spot Apartment' } });
      fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'An apartment with a unique, user-defined location.' } });

      // Find the SelectTrigger for the new apartment's location.
      // This should be the only combobox present when starting with an empty list of apartments.
      const locationSelectTrigger = screen.getByRole('combobox');
      // Shadcn's Select doesn't typically associate the label directly with the combobox role in a way that
      // getByRole('combobox', { name: /Location/i }) works easily.
      // A more robust selector would be a data-testid if available.
      // If multiple comboboxes exist, this selector would need refinement.

      fireEvent.mouseDown(locationSelectTrigger); // Open the select dropdown

      // Options are usually rendered with role 'option'. Find and click "Custom location".
      // Ensure the option text matches exactly what's in `locationOptions`.
      const customLocationOption = await screen.findByText('Custom location', { selector: 'div[role="option"]' });
      fireEvent.click(customLocationOption);

      // After selecting "Custom location", the input for custom text should appear.
      // This input was given placeholder="Enter custom location text" in the implementation.
      const customLocationTextInput = screen.getByPlaceholderText(/Enter custom location text/i);
      expect(customLocationTextInput).toBeInTheDocument(); // Verify it appeared

      // Enter text into the custom location input
      fireEvent.change(customLocationTextInput, { target: { value: 'Near the Old Oak Tree' } });

      // Click "Add Apartment Type"
      fireEvent.click(screen.getByRole('button', { name: /Add Apartment Type/i }));

      // Verify the new apartment appears in the list with the custom location (though not saved to context yet)
      // The custom location itself isn't directly displayed in a simple text field in the list item,
      // but it's part of the data. We'll check it upon saving.

      // Click "Save All Apartments"
      fireEvent.click(screen.getByRole('button', { name: /Save All Apartments/i }));

      await waitFor(() => {
         expect(mockUpdateApartments).toHaveBeenCalledWith(
           expect.arrayContaining([
             expect.objectContaining({
               name: 'My Custom Spot Apartment',
               location: 'Near the Old Oak Tree' // Check for the entered custom location
             })
           ])
         );
      });
    });
  });

  // Placeholder for 'Existing Apartment Editing' tests - to be added later if feasible
  describe('Existing Apartment Editing', () => {
    it('should display existing apartments from context', () => {
      renderApartmentManager(); // Uses initialApartmentsData from setup
      expect(screen.getByDisplayValue('Beach View')).toBeInTheDocument();
      expect(screen.getByDisplayValue('City Central')).toBeInTheDocument(); // This is a custom location, will be in an input
    });
  });
});
