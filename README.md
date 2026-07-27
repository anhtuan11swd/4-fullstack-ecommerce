<div align="center">

# 🛍️ Full-Stack E-Commerce Admin Dashboard

**Nền tảng thương mại điện tử hiện đại với bảng điều khiển quản trị tích hợp Stripe**

[![Stack](https://img.shields.io/badge/Stack-MERN-blue?style=flat-square)](https://www.mongodb.com/)
[![Backend](https://img.shields.io/badge/Backend-Express%205-000?style=flat-square&logo=express)](https://expressjs.com/)
[![Frontend](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Database](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Cache](https://img.shields.io/badge/Cache-Redis-FF4438?style=flat-square&logo=redis)](https://redis.io/)
[![Payments](https://img.shields.io/badge/Payments-Stripe-008CDD?style=flat-square&logo=stripe)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)]()

</div>

---

## 📋 Mục lục

- [Tổng quan](#-tổng-quan)
- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Cài đặt](#-cài-đặt)
- [Cấu hình môi trường](#-cấu-hình-môi-trường)
- [Chạy ứng dụng](#-chạy-ứng-dụng)
- [API Endpoints](#-api-endpoints)
- [Kiến trúc & Luồng dữ liệu](#-kiến-trúc--luồng-dữ-liệu)
- [Đóng góp](#-đóng-góp)
- [Giấy phép](#-giấy-phép)
- [Tác giả](#-tác-giả)

---

## 🎯 Tổng quan

**Full-Stack E-Commerce Admin Dashboard** là ứng dụng thương mại điện tử full-stack hoàn chỉnh, cho phép khách hàng duyệt sản phẩm, quản lý giỏ hàng và thanh toán qua Stripe. Đồng thời cung cấp bảng điều khiển quản trị để quản lý sản phẩm, theo dõi đơn hàng và xem phân tích doanh thu.

Dự án được xây dựng với kiến trúc **MERN** kết hợp **Redis** cho caching và **Stripe** cho xử lý thanh toán, đảm bảo hiệu suất và trải nghiệm người dùng mượt mà.

---

## ✨ Tính năng

### 👤 Người dùng

- **Đăng ký & Đăng nhập** — JWT authentication với access/refresh token, cookie httpOnly
- **Xem danh mục sản phẩm** — 6 danh mục: Quần Jean, Áo Sơ Mi, Giày Dép, Kính Mắt, Áo Khoác, Comple
- **Sản phẩm nổi bật** — Carousel với responsive grid, cache qua Redis
- **Giỏ hàng** — Thêm/xoá/sửa số lượng sản phẩm
- **Mã giảm giá** — Nhập mã, tự động nhận mã BONUS khi đơn hàng ≥ 5.000.000₫
- **Thanh toán Stripe** — Checkout session an toàn, xác nhận real-time
- **Hoàn tiền & Hủy đơn** — Xử lý các trường hợp thanh toán thất bại

### 🔐 Quản trị (Admin)

- **Tạo sản phẩm** — Upload ảnh qua Cloudinary, validation với Zod
- **Quản lý sản phẩm** — Xem danh sách, xoá, gắn nhãn nổi bật
- **Bảng phân tích** — Thống kê người dùng, sản phẩm, đơn hàng, doanh thu + biểu đồ 7 ngày với Recharts

### ⚡ Hiệu năng & UX

- **Redis caching** — Featured products cache 1 giờ
- **Refresh token rotation** — Tự động refresh access token qua interceptor
- **Responsive design** — Tối ưu trên mọi thiết bị với Tailwind CSS 4
- **Animations** — Framer Motion cho chuyển động mượt mà
- **Validation** — Zod validation cả client lẫn server
- **Swagger API docs** — Tài liệu API tự động tại `/api-docs`

---

## 🛠 Công nghệ sử dụng

### Backend

| Công nghệ                                        | Mục đích                    |
| ------------------------------------------------ | --------------------------- |
| **Node.js** + **Express 5**                      | Nền tảng server & routing   |
| **MongoDB** + **Mongoose 9**                     | Cơ sở dữ liệu NoSQL         |
| **Redis** (ioredis)                              | Caching & lưu refresh token |
| **Stripe SDK**                                   | Xử lý thanh toán            |
| **Cloudinary SDK**                               | Quản lý & upload hình ảnh   |
| **JWT** (jsonwebtoken)                           | Xác thực người dùng         |
| **Zod**                                          | Validation dữ liệu đầu vào  |
| **bcryptjs**                                     | Mã hóa mật khẩu             |
| **Swagger** (swagger-jsdoc + swagger-ui-express) | Tài liệu API tự động        |
| **cookie-parser**                                | Đọc/ghi cookie              |
| **dotenv**                                       | Quản lý biến môi trường     |

### Frontend

| Công nghệ             | Mục đích                       |
| --------------------- | ------------------------------ |
| **React 19**          | UI library                     |
| **Vite 8**            | Build tool & dev server        |
| **Tailwind CSS 4**    | Utility-first CSS framework    |
| **Zustand**           | State management nhẹ           |
| **React Router v7**   | Định tuyến SPA                 |
| **Framer Motion**     | Animations                     |
| **Axios**             | HTTP client + interceptor      |
| **Recharts**          | Biểu đồ phân tích              |
| **Lucide React**      | Icon system                    |
| **@stripe/stripe-js** | Stripe Elements                |
| **react-hot-toast**   | Thông báo toast                |
| **react-confetti**    | Hiệu ứng confetti khi mua hàng |
| **Zod**               | Validation form phía client    |

### Công cụ phát triển

| Công nghệ   | Mục đích             |
| ----------- | -------------------- |
| **Biome**   | Linting & formatting |
| **ESLint**  | Linting bổ sung      |
| **Nodemon** | Hot-reload backend   |

---

## 📁 Cấu trúc dự án

```
4-fullstack-ecommerce/
├── .env                          # Biến môi trường
├── .gitignore                    # File loại trừ git
├── package.json                  # Root package (scripts chung)
│
├── backend/                      # 🖥 Server - Express API
│   ├── package.json
│   ├── .vscode/
│   ├── biome.json
│   ├── eslint.config.js
│   └── src/
│       ├── server.js             # Entry point - khởi tạo Express app
│       ├── config/
│       │   └── swagger.js        # Cấu hình Swagger/OpenAPI
│       ├── controllers/
│       │   ├── auth.controller.js      # Xử lý đăng ký, đăng nhập, logout
│       │   ├── product.controller.js   # CRUD sản phẩm, featured, category
│       │   ├── cart.controller.js      # Thêm/xoá/sửa giỏ hàng
│       │   ├── coupon.controller.js    # Lấy/xác thực mã giảm giá
│       │   ├── payment.controller.js   # Stripe Checkout Session
│       │   └── analytics.controller.js # Thống kê & biểu đồ doanh thu
│       ├── lib/
│       │   ├── db.js             # Kết nối MongoDB
│       │   ├── redis.js          # Kết nối Redis (Upstash)
│       │   ├── stripe.js         # Khởi tạo Stripe client
│       │   └── cloudinary.js     # Cấu hình Cloudinary
│       ├── middleware/
│       │   ├── protectRoute.js   # Xác thực JWT
│       │   ├── adminRoute.js     # Kiểm tra quyền admin
│       │   └── validate.js       # Middleware validation với Zod
│       ├── models/
│       │   ├── user.model.js     # User schema (name, email, password, role, cart)
│       │   ├── product.model.js  # Product schema (name, price, image, category...)
│       │   ├── order.model.js    # Order schema (sản phẩm, stripeSessionId, user)
│       │   └── coupon.model.js   # Coupon schema (code, discount, expiration...)
│       ├── routes/
│       │   ├── auth.route.js     # /api/v1/auth/*
│       │   ├── product.route.js  # /api/v1/products/*
│       │   ├── cart.route.js     # /api/v1/cart/*
│       │   ├── coupon.route.js   # /api/v1/coupons/*
│       │   ├── payment.route.js  # /api/v1/payments/*
│       │   └── analytics.route.js # /api/v1/analytics/*
│       ├── utils/
│       │   └── generateToken.js  # Tạo JWT, lưu refresh token vào Redis
│       └── validators/
│           ├── auth.validator.js
│           ├── product.validator.js
│           ├── cart.validator.js
│           └── coupon.validator.js
│
└── frontend/                     # 🌐 Client - React SPA
    ├── package.json
    ├── vite.config.js            # Cấu hình Vite (proxy /api → backend)
    ├── index.html
    ├── biome.json
    ├── eslint.config.js
    └── src/
        ├── main.jsx              # Entry point - BrowserRouter
        ├── App.jsx               # Component gốc - routes & layout
        ├── index.css             # Tailwind + design tokens (OKLCH)
        ├── lib/
        │   ├── axios.js          # Axios instance (baseURL: /api/v1)
        │   └── validators.js     # Zod schemas cho form
        ├── stores/
        │   ├── useUserStore.js   # Zustand store - auth & interceptor
        │   ├── useProductStore.js # Zustand store - sản phẩm
        │   └── useCartStore.js   # Zustand store - giỏ hàng & coupon
        ├── pages/
        │   ├── HomePage.jsx      # Trang chủ (danh mục + sản phẩm nổi bật)
        │   ├── CategoryPage.jsx  # Sản phẩm theo danh mục
        │   ├── CartPage.jsx      # Giỏ hàng + thanh toán
        │   ├── LoginPage.jsx     # Đăng nhập
        │   ├── SignUpPage.jsx    # Đăng ký
        │   ├── AdminPage.jsx     # Bảng điều khiển quản trị
        │   ├── PurchaseSuccessPage.jsx  # Thành công + confetti
        │   └── PurchaseCancelPage.jsx   # Hủy thanh toán
        └── components/
            ├── Navbar.jsx             # Navigation bar (responsive)
            ├── ProductCard.jsx        # Card sản phẩm
            ├── CategoryItem.jsx       # Item danh mục
            ├── FeaturedProducts.jsx   # Carousel sản phẩm nổi bật
            ├── CartItem.jsx           # Item trong giỏ hàng
            ├── OrderSummary.jsx       # Tóm tắt đơn hàng
            ├── GiftCouponCard.jsx     # Áp dụng mã giảm giá
            ├── PeopleAlsoBought.jsx   # Gợi ý sản phẩm
            ├── LoadingSpinner.jsx     # Spinner tải
            ├── AlertDialog.jsx        # Dialog xác nhận xoá
            ├── ProtectedRoute.jsx     # Route guards (Auth/Admin)
            └── admin/
                ├── CreateProductForm.jsx  # Form tạo sản phẩm
                ├── ProductList.jsx        # Bảng danh sách sản phẩm
                └── AnalyticsTab.jsx       # Dashboard analytics + biểu đồ
```

---

## 🚀 Cài đặt

### Yêu cầu

- **Node.js** ≥ 18 (khuyến nghị 20+)
- **npm** ≥ 9
- **MongoDB** — tài khoản [MongoDB Atlas](https://www.mongodb.com/atlas) (hoặc MongoDB local)
- **Redis** — tài khoản [Upstash](https://upstash.com/) (hoặc Redis local)
- **Cloudinary** — tài khoản [Cloudinary](https://cloudinary.com/) miễn phí
- **Stripe** — tài khoản [Stripe](https://stripe.com/) (dùng mode test)

### Bước 1: Clone dự án

```bash
git clone https://github.com/your-username/4-fullstack-ecommerce.git
cd 4-fullstack-ecommerce
```

### Bước 2: Cài đặt dependencies

```bash
# Cài tất cả dependencies (root, backend, frontend)
npm run build
```

Hoặc cài thủ công từng phần:

```bash
# Backend
npm install --prefix backend

# Frontend
npm install --prefix frontend

# Root
npm install
```

### Bước 3: Tạo tài nguyên bên thứ ba

1. **MongoDB Atlas**: Tạo cluster → Database → lấy `MONGO_URI`
2. **Upstash Redis**: Tạo database → lấy `REDIS_URL`
3. **Cloudinary**: Vào Dashboard → lấy `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
4. **Stripe**: Vào Developers → API keys → lấy `STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`
5. **JWT Secrets**: Tạo 2 chuỗi ngẫu nhiên (có thể dùng `openssl rand -hex 32`)

---

## 🔧 Cấu hình môi trường

Tạo file `.env` tại thư mục gốc với nội dung:

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true

# Redis (Upstash)
REDIS_URL=rediss://default:<password>@<endpoint>.upstash.io:6379

# JWT
ACCESS_TOKEN_SECRET=<64-char-hex-string>
REFRESH_TOKEN_SECRET=<64-char-hex-string>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxx

# Client URL (Vite dev server)
CLIENT_URL=http://localhost:5173
```

---

## 🏃 Chạy ứng dụng

### Development

Terminal 1 — Backend (cổng 5000):

```bash
npm run dev
```

Terminal 2 — Frontend (cổng 5173):

```bash
npm run dev --prefix frontend
```

Sau đó truy cập:

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Swagger API Docs**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

> **Lưu ý**: Frontend Vite được cấu hình proxy `/api` → `http://localhost:5000`, nên trong development mọi request API đều được chuyển tiếp tự động mà không cần CORS.

### Production build

```bash
npm run build
```

Backend sẽ serve static files từ `frontend/dist` ở chế độ production.

### Các script hữu ích

```bash
# Backend
npm run predev --prefix backend    # Giải phóng cổng 5000 trước khi chạy dev

# Frontend
npm run predev --prefix frontend   # Giải phóng cổng 5173 trước khi chạy dev
npm run build --prefix frontend    # Build frontend cho production
npm run preview --prefix frontend  # Preview bản build

# Linting & Formatting (Biome)
npm run biome:check --prefix backend
npm run biome:format --prefix frontend
```

---

## 📡 API Endpoints

### 🔐 Xác thực (`/api/v1/auth`)

| Method | Endpoint         | Mô tả                    | Auth |
| ------ | ---------------- | ------------------------ | ---- |
| `POST` | `/signup`        | Đăng ký tài khoản        | ✗    |
| `POST` | `/login`         | Đăng nhập                | ✗    |
| `POST` | `/logout`        | Đăng xuất                | ✗    |
| `POST` | `/refresh-token` | Làm mới access token     | ✗    |
| `GET`  | `/profile`       | Lấy thông tin người dùng | ✓    |

### 📦 Sản phẩm (`/api/v1/products`)

| Method   | Endpoint              | Mô tả                                 | Auth  |
| -------- | --------------------- | ------------------------------------- | ----- |
| `GET`    | `/featured`           | Sản phẩm nổi bật (có cache Redis)     | ✗     |
| `GET`    | `/category/:category` | Sản phẩm theo danh mục                | ✗     |
| `GET`    | `/recommendations`    | 3 sản phẩm gợi ý ngẫu nhiên           | ✗     |
| `GET`    | `/`                   | Tất cả sản phẩm (Admin)               | Admin |
| `POST`   | `/`                   | Tạo sản phẩm mới (Admin)              | Admin |
| `DELETE` | `/:id`                | Xóa sản phẩm (Admin)                  | Admin |
| `PATCH`  | `/:id`                | Chuyển đổi trạng thái nổi bật (Admin) | Admin |

### 🛒 Giỏ hàng (`/api/v1/cart`)

| Method   | Endpoint | Mô tả                                   | Auth |
| -------- | -------- | --------------------------------------- | ---- |
| `GET`    | `/`      | Lấy giỏ hàng kèm số lượng               | ✓    |
| `POST`   | `/`      | Thêm sản phẩm (tăng số lượng nếu đã có) | ✓    |
| `DELETE` | `/`      | Xoá 1 sản phẩm hoặc toàn bộ giỏ         | ✓    |
| `PUT`    | `/:id`   | Cập nhật số lượng (quantity=0 → xóa)    | ✓    |

### 🏷 Mã giảm giá (`/api/v1/coupons`)

| Method | Endpoint    | Mô tả                          | Auth |
| ------ | ----------- | ------------------------------ | ---- |
| `GET`  | `/`         | Lấy mã giảm giá đang hoạt động | ✓    |
| `POST` | `/validate` | Xác thực mã giảm giá           | ✓    |

### 💳 Thanh toán (`/api/v1/payments`)

| Method | Endpoint                   | Mô tả                          | Auth |
| ------ | -------------------------- | ------------------------------ | ---- |
| `POST` | `/create-checkout-session` | Tạo Stripe Checkout Session    | ✓    |
| `POST` | `/checkout-success`        | Xác nhận thanh toán thành công | ✓    |

### 📊 Phân tích (`/api/v1/analytics`)

| Method | Endpoint | Mô tả                                         | Auth  |
| ------ | -------- | --------------------------------------------- | ----- |
| `GET`  | `/`      | Dữ liệu phân tích tổng quan & doanh số 7 ngày | Admin |

> 📘 **Tài liệu đầy đủ**: Truy cập [http://localhost:5000/api-docs](http://localhost:5000/api-docs) khi server đang chạy để xem Swagger UI với đầy đủ schema, ví dụ request/response.

---

## 🧠 Kiến trúc & Luồng dữ liệu

### Xác thực (JWT với Refresh Token Rotation)

```
┌─────────┐         ┌──────────┐          ┌───────┐
│  Client │ ◄──►   │  Express  │  ◄──►    │ Redis │
│ (React) │  cookie │  Server   │  refresh │(token │
└─────────┘         └──────────┘   token   │storage│
     │                                    └───────┘
     │ axios interceptor
     │ tự động refresh token
     ▼  khi gặp 401
  Access Token (15 phút)
  Refresh Token (7 ngày, httpOnly)
```

- **Access Token**: 15 phút, gửi qua cookie `httpOnly`, `sameSite: strict`
- **Refresh Token**: 7 ngày, lưu trong Redis, tự động rotate khi hết hạn
- **Axios interceptor**: Tự động gọi `/refresh-token` khi nhận 401, queue các request đang chờ

### Cache sản phẩm nổi bật

```
[GET /products/featured]
       │
       ▼
   Redis GET "featured_products"
       │
  ┌────┴────┐
  │  HIT?   │
  └────┬────┘
       │
  YES──┴──NO
   return    ──► MongoDB find({isFeatured:true})
   cached         ──► Redis SET (EX 3600s)
   JSON              ──► return
```

### Luồng thanh toán

```
1. User click "Thanh toán"
2. Frontend gọi POST /payments/create-checkout-session
3. Server tạo Stripe Checkout Session (line_items, metadata, success/cancel url)
4. Nếu tổng >= 5.000.000₫ → tạo mã BONUS coupon cho user
5. Redirect user đến Stripe Checkout page
6. Sau khi thanh toán xong → redirect về /purchase-success?session_id=xxx
7. Frontend gọi POST /payments/checkout-success để xác nhận
8. Server verify session từ Stripe, tạo Order, clear giỏ hàng, deactivate coupon
```

---

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy làm theo các bước sau:

1. **Fork** dự án
2. Tạo nhánh mới: `git checkout -b feature/ten-tinh-nang`
3. **Commit** thay đổi: `git commit -m 'feat: thêm tính năng XYZ'`
4. **Push** lên nhánh: `git push origin feature/ten-tinh-nang`
5. Tạo **Pull Request**

### Quy ước commit

Dự án sử dụng [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — Tính năng mới
- `fix:` — Sửa lỗi
- `refactor:` — Tái cấu trúc code
- `style:` — Formatting, CSS
- `docs:` — Tài liệu
- `chore:` — Công việc bảo trì

---

## 📄 Giấy phép

Dự án được phân phối dưới giấy phép **ISC**.

---

## 👨‍💻 Tác giả

**Trần Anh Tuấn**

- GitHub: [@anhtuan11swd](https://github.com/anhtuan11swd)

---

<div align="center">
  <sub>Built with ❤️ using React, Express, MongoDB & Redis</sub>
</div>
