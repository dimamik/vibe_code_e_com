import { prisma } from "../src/lib/prisma";

const sampleProducts = [
  {
    name: "Classic Black T-Shirt",
    description:
      "A timeless black t-shirt made from 100% premium cotton. Perfect for any casual occasion.",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000",
    colors: ["Black", "White", "Gray"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Vintage Graphic Tee",
    description:
      "Retro-inspired graphic t-shirt featuring a unique vintage design. Made from soft, breathable cotton blend.",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
    colors: ["Navy", "Burgundy", "Forest Green"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    name: "Essential Striped T-Shirt",
    description:
      "Classic striped pattern t-shirt perfect for a casual yet stylish look. Made from lightweight cotton.",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000",
    colors: ["Blue/White", "Black/White", "Red/Navy"],
    sizes: ["S", "M", "L"],
  },
  {
    name: "Premium V-Neck Tee",
    description:
      "Sophisticated v-neck t-shirt crafted from premium cotton. Features a modern slim fit design.",
    price: 32.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000",
    colors: ["White", "Black", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Urban Street T-Shirt",
    description:
      "Contemporary street-style t-shirt with modern cut and premium fabric. Perfect for urban fashion.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000",
    colors: ["Black", "White", "Olive", "Sand"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];

async function main() {
  console.log("Starting to seed products...");

  // First, delete all existing products
  await prisma.product.deleteMany({});

  // Then create new products
  for (const product of sampleProducts) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((error) => {
    console.error("Error seeding products:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
