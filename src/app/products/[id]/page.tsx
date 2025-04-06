import { prisma } from "@/lib/prisma";
import ProductDetail from "@/components/ProductDetail";

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return product;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetail product={product} />;
}
