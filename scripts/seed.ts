import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

const sampleTShirts = [
  {
    name: "Classic White T-Shirt",
    description: "A timeless white t-shirt made from 100% organic cotton.",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    colors: ["white", "black", "gray"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Vintage Black T-Shirt",
    description: "A soft black t-shirt with a vintage wash finish.",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    colors: ["black", "navy", "charcoal"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Striped Blue T-Shirt",
    description: "A comfortable striped t-shirt perfect for casual wear.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    colors: ["blue", "navy", "white"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Graphic Print T-Shirt",
    description: "A trendy t-shirt featuring a unique graphic print.",
    price: 44.99,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    colors: ["white", "black", "gray"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Oversized T-Shirt",
    description: "A relaxed fit t-shirt for ultimate comfort.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    colors: ["black", "white", "beige"],
    sizes: ["M", "L", "XL", "XXL"],
  },
];

async function main() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.user.upsert({
      where: { email: "dima@example.com" },
      update: {
        isAdmin: true,
        password: hashedPassword,
      },
      create: {
        email: "dima@example.com",
        name: "Admin User",
        password: hashedPassword,
        isAdmin: true,
      },
    });

    // Add sample t-shirts
    for (const tshirt of sampleTShirts) {
      await prisma.product.create({
        data: {
          name: tshirt.name,
          description: tshirt.description,
          price: tshirt.price,
          image: tshirt.image,
          colors: tshirt.colors,
          sizes: tshirt.sizes,
        },
      });
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
