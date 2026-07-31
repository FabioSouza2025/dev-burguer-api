import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import User from "../app/models/User";
import Product from "../app/models/Products";
import Category from "../app/models/Category";
import configDatabase from "../config/database";

dotenv.config();

const sequelize = new Sequelize({ ...configDatabase, logging: false });

Category.init(sequelize);
Product.init(sequelize);
User.init(sequelize);
Product.associate(sequelize.models);

const catalog = [
  {
    name: "Hambúrgueres",
    path: "c6a54df6-2628-4ccf-a85c-ec2d0ea1c4f5.png",
    products: [
      [
        "Burger Crocante",
        2790,
        "10604740-5278-47da-813b-7a7a7c90d2d0.png",
        true,
      ],
      [
        "Burger de Camarão",
        3190,
        "25fe6127-1ab3-4efd-8fb9-a156299e59e6.png",
        false,
      ],
      ["Bacon Duplo", 3490, "352b75b1-8623-4c62-971b-07e8ed775103.png", true],
      [
        "Cheddar Bacon",
        3390,
        "360ad343-7820-4260-b80f-a6943627ea1e.webp",
        false,
      ],
      [
        "Classic Burger",
        2790,
        "4216d427-d44a-4bbd-a407-628baecc423e.png",
        false,
      ],
      [
        "Burger Especial",
        3090,
        "53fe24f7-6f31-4811-8024-7cbbeab34178.png",
        false,
      ],
      ["Cheese Salad", 2990, "570c3ce5-5203-47c9-9c4b-938421103bfc.png", false],
      [
        "Chicken Crispy",
        2990,
        "5a24ac08-c8d8-4c2b-b42e-6d11a13b2ef7.png",
        false,
      ],
      ["Dev Burger", 3690, "768ce3b8-bd7b-41f0-b5b7-00cdfc939467.jpg", true],
      [
        "Bacon Supreme",
        3590,
        "8356b11d-7a08-4393-b275-d13861a67a4b.png",
        false,
      ],
      [
        "Duplo Cheddar",
        3490,
        "84a1d1b2-99a9-4900-a327-d579d48543ec.png",
        false,
      ],
      [
        "Gourmet Burger",
        3790,
        "c6a54df6-2628-4ccf-a85c-ec2d0ea1c4f5.png",
        true,
      ],
    ],
  },
  {
    name: "Bebidas",
    path: "43440b1e-cda8-4fe6-bbcd-f60260b0fdd4.png",
    products: [
      [
        "Drink Tropical",
        1600,
        "0592e363-4a3e-4ec8-8870-87c5ffdc6e24.png",
        false,
      ],
      [
        "Coca-Cola 2L",
        1400,
        "1d4f8ab1-1ad8-4b16-b577-65c693cb4101.webp",
        false,
      ],
      ["Suco Natural", 1200, "16db4df3-2fbd-4367-afee-52ab7d460472.png", true],
      [
        "Whisky com Gelo",
        2200,
        "2090f40a-c2f6-4ef5-9dae-d23898c32c58.png",
        false,
      ],
      ["Coca-Cola", 900, "3155d11e-edd3-44d3-a02b-e2f56fbb8a92.png", false],
      [
        "Refresco de Frutas",
        1400,
        "43440b1e-cda8-4fe6-bbcd-f60260b0fdd4.png",
        true,
      ],
      [
        "Taça Especial",
        2500,
        "463f1d07-4856-46f2-91fc-e4f847389f80.png",
        false,
      ],
      ["Cappuccino", 1100, "4b63b8c5-02fe-4ba3-b715-1c54795c3cd2.png", false],
      ["Água Gelada", 600, "71cc0cdb-14e5-4419-84e6-ad82c847cd0f.png", false],
      [
        "Chocolate Quente",
        1200,
        "7a273196-da29-47ed-af61-4d3980652386.png",
        false,
      ],
      ["Chá da Casa", 900, "ae992221-4813-4414-837d-c3f601969775.png", false],
    ],
  },
  {
    name: "Acompanhamentos",
    path: "23b7f3ba-4a84-48f3-812a-6368bf1e0be6.png",
    products: [
      ["Croquetes", 1490, "06c9624d-a169-494f-a6cc-d668dd665b08.png", false],
      [
        "Iscas de Peixe",
        1890,
        "0ca2ec07-09e8-4714-8787-839366bf806e.png",
        true,
      ],
      ["Mini Pizza", 1590, "1332bb43-2189-4a9d-b5d8-f821242f572d.png", false],
      [
        "Tábua de Petiscos",
        4290,
        "17530997-b23e-4323-8a8b-164065b29698.png",
        true,
      ],
      ["Batata Frita", 1290, "23b7f3ba-4a84-48f3-812a-6368bf1e0be6.png", false],
      [
        "Pastel de Carne",
        1390,
        "2b0fcdb4-72eb-406d-afde-734d34617767.png",
        false,
      ],
      [
        "Cestinha Recheada",
        1690,
        "2cb6482d-8d12-4693-8222-69db2b4aabe2.jpg",
        false,
      ],
      [
        "Bolinho de Queijo",
        1490,
        "308a64b0-f469-4eff-a603-64fd5396d3ab.png",
        false,
      ],
      ["Bruschetta", 1590, "70a7e4ab-efa9-494f-b82f-0f42ead86aca.png", false],
      ["Carpaccio", 2490, "893b46b2-41d9-44d0-bb75-dcdbdf62cba6.png", false],
      [
        "Salada Especial",
        1390,
        "ad7184ad-ad99-4560-926e-bfbb197856e6.png",
        false,
      ],
    ],
  },
  {
    name: "Sobremesas",
    path: "4bc9eac8-4118-43d4-9e8a-2aa4a3b128fd.png",
    products: [
      [
        "Gelatina com Frutas",
        990,
        "223760c3-327b-4af2-ac94-97878772fe1a.png",
        false,
      ],
      [
        "Mousse de Caramelo",
        1490,
        "23c3d5c8-edcd-4eed-9fb9-f64e0ef56839.png",
        false,
      ],
      [
        "Sorvete Especial",
        1390,
        "37d880ff-8ce0-435c-a2fa-e6ae64a4725e.png",
        false,
      ],
      ["Brownie", 1590, "40395a10-59d0-4523-bfdd-af074f179f04.png", true],
      [
        "Torta de Morango",
        1490,
        "2c723701-9424-4818-856c-a7cea83e8347.png",
        false,
      ],
      ["Multicake", 1690, "4a0ba1ef-8b00-46d2-8fb9-deb79111a6fa.png", false],
      ["Bolo Vulcão", 1590, "4bc9eac8-4118-43d4-9e8a-2aa4a3b128fd.png", true],
      ["Mousse Duo", 1490, "4f2803fc-ded7-4683-974b-02b5f4dd1cb9.png", false],
      [
        "Cupcake de Chocolate",
        1190,
        "82c3af13-eec8-445d-bf14-cfe34828060d.png",
        false,
      ],
      [
        "Pudim de Caramelo",
        1290,
        "9610a232-ce47-48fe-ab6f-faa391950dc7.png",
        false,
      ],
    ],
  },
];

async function seed() {
  try {
    await sequelize.authenticate();

    await Category.sync({ force: false });
    await Product.sync({ force: false });
    await User.sync({ force: false });

    await Product.update(
      { name: "Multicake" },
      { where: { name: "Cheesecake" } },
    );

    for (const categoryData of catalog) {
      const [category] = await Category.findOrCreate({
        where: { name: categoryData.name },
        defaults: { path: categoryData.path },
      });

      await category.update({ path: categoryData.path });

      for (const [name, price, path, offer] of categoryData.products) {
        const [product] = await Product.findOrCreate({
          where: { name },
          defaults: { name, price, path, offer, category_id: category.id },
        });

        await product.update({ price, path, offer, category_id: category.id });
      }
    }

    console.log("Catalog seed completed");
  } catch (error) {
    console.error("Catalog seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

seed();
