import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import ConfiguratorPage from './ConfiguratorPage';

const mockDownloadConfigurationPDF = jest.fn();
const mockDownloadConfigurationImage = jest.fn();
const mockPrintConfigurationPDF = jest.fn();
const mockToastSuccess = jest.fn();
const mockToastError = jest.fn();
const mockAddItem = jest.fn();

jest.mock('@/components/shared', () => ({
  PageCover: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PageSection: ({ children }: { children: React.ReactNode }) => <section>{children}</section>,
}));

jest.mock('@/components/InView', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/Konfiguratorius3D', () => {
  const React = require('react');

  return {
    __esModule: true,
    default: React.forwardRef(function MockKonfiguratorius3D(_props: unknown, ref: React.ForwardedRef<unknown>) {
      React.useImperativeHandle(ref, () => ({
        takePdfScreenshot: jest.fn().mockResolvedValue('data:image/png;base64,ZmFrZQ=='),
        takeScreenshot: jest.fn(() => 'data:image/png;base64,ZmFrZQ=='),
      }));

      return <div data-testid="configurator-3d" />;
    }),
  };
});

jest.mock('@/lib/models', () => ({
  getGenericModelUrl: jest.fn(() => '/models/configurator/model.glb'),
  getProductModelUrl: jest.fn(() => '/models/products/mock.glb'),
}));

jest.mock('@/i18n/paths', () => ({
  toLocalePath: jest.fn((path: string) => path),
}));

jest.mock('@/lib/cart/store', () => ({
  useCartStore: (selector: (state: { items: unknown[]; addItem: typeof mockAddItem }) => unknown) =>
    selector({ items: [], addItem: mockAddItem }),
}));

jest.mock('@/components/ui/Toast', () => ({
  useToast: () => ({
    success: mockToastSuccess,
    error: mockToastError,
  }),
}));

jest.mock('@/lib/configurator/pdf-generator', () => ({
  buildConfigurationExportBaseName: jest.fn(() => 'yakiwood-test-export'),
  downloadConfigurationPDF: (...args: unknown[]) => mockDownloadConfigurationPDF(...args),
  downloadConfigurationImage: (...args: unknown[]) => mockDownloadConfigurationImage(...args),
  printConfigurationPDF: (...args: unknown[]) => mockPrintConfigurationPDF(...args),
}));

jest.mock('@/lib/products.supabase', () => ({
  fetchProducts: jest.fn(async () => [
    {
      id: 'product-1',
      slug: 'degintos-medienos-terasine-lenta-terasai-egle-natural',
      name: 'Terasinė lenta / Eglė',
      nameEn: 'Terrace board / Spruce',
      price: 120,
      image: '/images/mock-product.webp',
      category: 'terrace',
      woodType: 'spruce',
      colors: [
        {
          id: 'color-natural',
          name: 'Natural',
          nameLt: 'Natūrali',
          nameEn: 'Natural',
          hex: '#8f6a4d',
          image: '/images/mock-color.webp',
          priceModifier: 0,
        },
      ],
      profiles: [
        {
          id: 'profile-rectangle',
          name: 'Rectangle',
          nameLt: 'Stačiakampis',
          nameEn: 'Rectangle',
          code: 'rectangle',
          priceModifier: 0,
          dimensions: {
            width: 120,
            thickness: 20,
            length: 3300,
          },
        },
      ],
      inStock: true,
    },
  ]),
  getLocalizedColorName: jest.fn((variant: { nameLt?: string; nameEn?: string; name: string }, locale: 'lt' | 'en') =>
    locale === 'en' ? variant.nameEn ?? variant.name : variant.nameLt ?? variant.name,
  ),
  getLocalizedProfileName: jest.fn((variant: { nameLt?: string; nameEn?: string; name: string }, locale: 'lt' | 'en') =>
    locale === 'en' ? variant.nameEn ?? variant.name : variant.nameLt ?? variant.name,
  ),
}));

function createDeferredPromise() {
  let resolve!: () => void;
  const promise = new Promise<void>((nextResolve) => {
    resolve = nextResolve;
  });

  return { promise, resolve };
}

describe('ConfiguratorPage exports', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDownloadConfigurationPDF.mockResolvedValue(undefined);
    mockDownloadConfigurationImage.mockResolvedValue(undefined);
    mockPrintConfigurationPDF.mockResolvedValue(undefined);
  });

  test('renders PDF, PNG, JPG and print export actions', async () => {
    render(<ConfiguratorPage />);

    expect(await screen.findByLabelText('configurator.downloadPdf')).toBeEnabled();
    expect(screen.getByLabelText('configurator.downloadPng')).toBeEnabled();
    expect(screen.getByLabelText('configurator.downloadJpg')).toBeEnabled();
    expect(screen.getByLabelText('configurator.print')).toBeEnabled();
  });

  test('shows PDF loading state and success toast after export', async () => {
    const deferred = createDeferredPromise();
    mockDownloadConfigurationPDF.mockReturnValueOnce(deferred.promise);

    render(<ConfiguratorPage />);

    const pdfButton = await screen.findByLabelText('configurator.downloadPdf');
    fireEvent.click(pdfButton);

    expect(await screen.findByText('configurator.downloadingPdfShort')).toBeInTheDocument();
    expect(screen.getByLabelText('configurator.downloadPng')).toBeDisabled();
    expect(mockToastSuccess).not.toHaveBeenCalled();

    await act(async () => {
      deferred.resolve();
      await deferred.promise;
    });

    await waitFor(() => {
      expect(mockDownloadConfigurationPDF).toHaveBeenCalledTimes(1);
      expect(mockToastSuccess).toHaveBeenCalledWith('configurator.exportPdfSuccess');
    });
  });
});