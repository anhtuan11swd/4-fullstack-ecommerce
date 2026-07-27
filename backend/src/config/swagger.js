import swaggerJsdoc from "swagger-jsdoc";

const options = {
  apis: ["./src/routes/*.js", "./src/controllers/*.js"],
  definition: {
    components: {
      schemas: {
        CartItem: {
          properties: {
            product: { example: "665f1a2b3c4d5e6f7a8b9c0d", type: "string" },
            quantity: { example: 2, type: "number" },
          },
          type: "object",
        },
        Coupon: {
          properties: {
            _id: { example: "665f1a2b3c4d5e6f7a8b9c0d", type: "string" },
            code: { example: "SAVE10", type: "string" },
            createdAt: { format: "date-time", type: "string" },
            discountPercentage: { example: 10, type: "number" },
            expirationDate: {
              example: "2026-08-30T00:00:00.000Z",
              format: "date-time",
              type: "string",
            },
            isActive: { example: true, type: "boolean" },
            updatedAt: { format: "date-time", type: "string" },
            userId: { example: "665f1a2b3c4d5e6f7a8b9c0d", type: "string" },
          },
          type: "object",
        },
        Error: {
          properties: {
            message: { example: "Lỗi máy chủ", type: "string" },
          },
          type: "object",
        },
        Product: {
          properties: {
            _id: { example: "665f1a2b3c4d5e6f7a8b9c0d", type: "string" },
            category: { example: "shoes", type: "string" },
            createdAt: { format: "date-time", type: "string" },
            description: { example: "Giày thể thao thoải mái", type: "string" },
            image: {
              example: "https://res.cloudinary.com/.../nike.png",
              type: "string",
            },
            imagePublicId: { example: "products/abc123", type: "string" },
            isFeatured: { example: false, type: "boolean" },
            name: { example: "Nike Air Max", type: "string" },
            price: { example: 2500000, type: "number" },
            updatedAt: { format: "date-time", type: "string" },
          },
          type: "object",
        },
        User: {
          properties: {
            _id: { example: "665f1a2b3c4d5e6f7a8b9c0d", type: "string" },
            createdAt: { format: "date-time", type: "string" },
            email: { example: "user@example.com", type: "string" },
            name: { example: "Nguyễn Văn A", type: "string" },
            role: {
              enum: ["customer", "admin"],
              example: "customer",
              type: "string",
            },
            updatedAt: { format: "date-time", type: "string" },
          },
          type: "object",
        },
        ValidationError: {
          properties: {
            errors: {
              items: {
                properties: {
                  field: { example: "email", type: "string" },
                  message: { example: "Email không hợp lệ", type: "string" },
                },
                type: "object",
              },
              type: "array",
            },
            message: { example: "Dữ liệu không hợp lệ", type: "string" },
          },
          type: "object",
        },
      },
      securitySchemes: {
        cookieAuth: {
          in: "cookie",
          name: "accessToken",
          type: "apiKey",
        },
      },
    },
    info: {
      description: "API documentation for E-Commerce Admin Dashboard",
      title: "E-Commerce Admin Dashboard API",
      version: "1.0.0",
    },
    openapi: "3.0.0",
    servers: [
      {
        description: "Development server",
        url: "http://localhost:5000",
      },
    ],
  },
};

export const swaggerSpec = swaggerJsdoc(options);
