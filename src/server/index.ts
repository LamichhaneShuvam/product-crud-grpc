import {
  sendUnaryData,
  Server,
  ServerCredentials,
  ServerUnaryCall,
  status,
} from "@grpc/grpc-js";
import {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  GetProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  ProductServiceService,
  UpdateProductRequest,
  UpdateProductResponse,
} from "../../proto/product";
import AppDataSource from "./db";
import { Product } from "./entity/product.entity";

const server = new Server();

async function createProduct(
  call: ServerUnaryCall<CreateProductRequest, CreateProductResponse>,
  callback: sendUnaryData<GetProductResponse>,
) {
  try {
    const { description, image, name, tags } = call.request;
    const productRepository = AppDataSource.getRepository(Product);

    const product: Partial<Product> = {
      description,
      image,
      name,
      tags,
    };

    const insertedProduct = await productRepository.save(product);
    callback(null, {
      product: {
        id: insertedProduct.id,
        description: insertedProduct.description,
        image: insertedProduct.image,
        name: insertedProduct.name,
        tags: insertedProduct.tags,
        createdAt: insertedProduct.createdAt,
        updatedAt: insertedProduct.updatedAt ?? undefined,
      },
    });
  } catch (error) {
    console.log(error);
    callback({ code: status.INTERNAL }, null);
  }
}

async function getProduct(
  call: ServerUnaryCall<GetProductRequest, GetProductResponse>,
  callback: sendUnaryData<GetProductResponse>,
) {
  try {
    const { id } = call.request;
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({ id });
    if (!product) {
      callback({ code: status.NOT_FOUND }, null);
    }
    callback(null, {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.image,
        tags: product.tags,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt ?? undefined,
      },
    });
  } catch (error) {
    console.log(error);
    callback({ code: status.INTERNAL }, null);
  }
}

async function listProducts(
  call: ServerUnaryCall<ListProductsRequest, ListProductsResponse>,
  callback: sendUnaryData<ListProductsResponse>,
) {
  try {
    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find();
    products.forEach(
      (product) => (product["updatedAt"] = product["updatedAt"] ?? undefined),
    );
    console.log(products);
    callback(null, {
      products: products,
    });
  } catch (error) {
    console.log(error);
    callback({ code: status.INTERNAL }, null);
  }
}

async function updateProduct(
  call: ServerUnaryCall<UpdateProductRequest, UpdateProductResponse>,
  callback: sendUnaryData<UpdateProductResponse>,
) {
  try {
    const { id, tags, description, image, name } = call.request;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id });

    if (!product) {
      callback({ code: status.NOT_FOUND }, null);
    }

    if (tags && tags?.length > 0) {
      product.tags = tags;
    }

    product.description = description ?? product.description;
    product.image = image ?? product.image;
    product.name = name ?? product.name;
    product.updatedAt = new Date();

    await productRepository.save(product);

    callback(null, { product: product });
  } catch (error) {
    console.log(error);
    callback({ code: status.INTERNAL }, null);
  }
}

async function deleteProduct(
  call: ServerUnaryCall<DeleteProductRequest, DeleteProductResponse>,
  callback: sendUnaryData<DeleteProductResponse>,
) {
  try {
    const { id } = call.request;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id });

    if (!product) {
      callback({ code: status.NOT_FOUND }, null);
    }

    await productRepository.delete({ id });

    product["updatedAt"] = product?.updatedAt ?? undefined;
    callback(null, { product: product });
  } catch (error) {
    console.log(error);
    callback({ code: status.INTERNAL }, null);
  }
}

server.addService(ProductServiceService, {
  createProduct,
  getProduct,
  listProducts,
  deleteProduct,
  updateProduct,
});
server.bindAsync(
  "0.0.0.0:50051",
  ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      throw error;
    }
    console.log(`GRPC BOUND ON PORT => :${port}`);
  },
);
