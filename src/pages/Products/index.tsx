import styled from 'styled-components';
import { useState } from 'preact/hooks';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Select, type SelectItem } from '../../components/Select';
import { Meter } from '../../components/Meter';
import { Progress } from '../../components/Progress';
import Pill from '../../components/Pill/Pill';
import Divider from '../../components/Divider';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Profile', href: '/profile' },
  { label: 'Settings', href: '/settings' },
];

const CATEGORIES: SelectItem[] = [
  { label: 'All Categories', value: 'all' },
  { label: 'Hardware', value: 'hardware' },
  { label: 'Software', value: 'software' },
  { label: 'Services', value: 'services' },
];

type PillVariant = 'default' | 'success' | 'warning';

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  rating: number;
  statusLabel: string;
  statusVariant: PillVariant;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Widget Pro',
    category: 'hardware',
    stock: 72,
    rating: 88,
    statusLabel: 'In Stock',
    statusVariant: 'success',
    description: 'High-performance widget for enterprise use.',
  },
  {
    id: 2,
    name: 'Cloud License',
    category: 'software',
    stock: 100,
    rating: 95,
    statusLabel: 'Available',
    statusVariant: 'success',
    description: 'Unlimited cloud usage license for growing teams.',
  },
  {
    id: 3,
    name: 'Legacy Adapter',
    category: 'hardware',
    stock: 15,
    rating: 42,
    statusLabel: 'Low Stock',
    statusVariant: 'warning',
    description: 'Compatibility adapter for legacy system integration.',
  },
  {
    id: 4,
    name: 'Support Plan',
    category: 'services',
    stock: 100,
    rating: 78,
    statusLabel: 'Active',
    statusVariant: 'default',
    description: 'Priority support plan with guaranteed SLA response.',
  },
];

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[6]}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize[30]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.slate900};
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const FilterLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.slate700};
  white-space: nowrap;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ProductCard = styled.article`
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.slate200};
  border-radius: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ProductHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize[18]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.slate900};
`;

const ProductDesc = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize[14]};
  color: ${({ theme }) => theme.color.slate600};
`;

const ProductMetrics = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  flex-wrap: wrap;
`;

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string[]>(['all']);

  const filteredProducts =
    selectedCategory[0] === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory[0]);

  return (
    <Page>
      <Header title="Preact App" links={NAV_LINKS} isSticky />
      <Main>
        <PageTitle>Products</PageTitle>
        <FilterBar>
          <FilterLabel>Filter by category:</FilterLabel>
          <Select
            items={CATEGORIES}
            value={selectedCategory}
            onValueChange={(details) => setSelectedCategory(details.value)}
            placeholder="Select category"
          />
        </FilterBar>
        <ProductList>
          {filteredProducts.map((product, idx) => (
            <div key={product.id}>
              {idx > 0 && <Divider />}
              <ProductCard>
                <ProductHeader>
                  <ProductName>{product.name}</ProductName>
                  <Pill variant={product.statusVariant}>
                    {product.statusLabel}
                  </Pill>
                </ProductHeader>
                <ProductDesc>{product.description}</ProductDesc>
                <ProductMetrics>
                  <Meter value={product.stock} max={100} high={80} optimum={100}>
                    Stock Level
                  </Meter>
                  <Progress value={product.rating} max={100}>
                    Customer Rating
                  </Progress>
                </ProductMetrics>
              </ProductCard>
            </div>
          ))}
        </ProductList>
      </Main>
      <Footer label="© 2025 Preact App. All rights reserved.">
        {['Privacy', 'Terms', 'Contact']}
      </Footer>
    </Page>
  );
}
