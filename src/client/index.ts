import { ChannelCredentials, ServiceError } from "@grpc/grpc-js";
import {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  GetProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  ProductServiceClient,
  UpdateProductRequest,
  UpdateProductResponse,
} from "../../proto/product";

const productServiceClient = new ProductServiceClient(
  "0.0.0.0:50051",
  ChannelCredentials.createInsecure(),
);

const createProduct = async () => {
  const createProductRequest: CreateProductRequest = {
    description: "Description of the product",
    image: "https://www.google.com/hello.png",
    name: "Name of the product",
    tags: ["tag1", "tag2", "tag3"],
  };

  productServiceClient.createProduct(
    createProductRequest,
    (error: ServiceError | null, response: CreateProductResponse) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response.product);
      }
    },
  );
};

const getProductById = async (productId: number) => {
  const getProductRequest: GetProductRequest = {
    id: productId,
  };

  productServiceClient.getProduct(
    getProductRequest,
    (error: ServiceError | null, response: GetProductResponse) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response.product);
      }
    },
  );
};

const listProducts = async () => {
  const listProductRequest: ListProductsRequest = null;

  productServiceClient.listProducts(
    listProductRequest,
    (error: ServiceError | null, response: ListProductsResponse) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response.products);
      }
    },
  );
};

const updateProduct = async (id: number) => {
  const updateProductRequest: UpdateProductRequest = {
    id,
    name: "Product updated!",
    description: "Description updated!",
    image: "https://www.tutorialspoint.com/protobuf/protobuf_list_repeated.htm",
    tags: ["product-tag1", "product-tag2"],
  };

  productServiceClient.updateProduct(
    updateProductRequest,
    (error: ServiceError | null, response: UpdateProductResponse) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response.product);
      }
    },
  );
};

const deleteProduct = async (id: number) => {
  const deleteProductRequest: DeleteProductRequest = {
    id,
  };

  productServiceClient.deleteProduct(
    deleteProductRequest,
    (error: ServiceError | null, response: DeleteProductResponse) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response.product);
      }
    },
  );
};

// createProduct();
// getProductById(1);
// listProducts();
// deleteProduct(1);
updateProduct(2);
