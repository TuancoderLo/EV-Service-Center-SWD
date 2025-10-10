# EV Service Center Mobile App

Ứng dụng di động cho hệ thống dịch vụ xe điện, được phát triển bằng React Native và Expo.

## 🚀 Tính năng chính

### 👥 Đa vai trò người dùng

- **Member (Thành viên)**: Đặt lịch dịch vụ, xem lịch sử, quản lý hồ sơ
- **Technician (Kỹ thuật viên)**: Xem công việc được phân công, báo cáo tiến độ
- **Staff (Nhân viên)**: Quản lý đặt lịch, hỗ trợ khách hàng
- **Admin (Quản trị viên)**: Toàn quyền quản lý hệ thống

### 📱 Tính năng ứng dụng

- Đăng nhập/Đăng xuất an toàn
- Đặt lịch dịch vụ theo thời gian thực
- Quản lý lịch đặt cá nhân
- Dashboard theo vai trò
- Profile và cài đặt cá nhân
- Thông báo push (sẵn sàng implement)

## 🛠 Công nghệ sử dụng

### Core Technologies

- **React Native**: Framework phát triển app di động
- **Expo**: Platform phát triển và build
- **TypeScript**: Ngôn ngữ lập trình chính

### State Management & API

- **Zustand**: Quản lý state toàn cục
- **React Query**: Quản lý server state và caching
- **Axios**: HTTP client
- **Expo Secure Store**: Lưu trữ dữ liệu bảo mật

### Navigation & UI

- **React Navigation v7**: Điều hướng ứng dụng
- **React Hook Form**: Quản lý form
- **Zod**: Validation schema
- **Custom UI Components**: Thiết kế đồng bộ với website

## 🎨 Design System

### Colors (Đồng bộ với website Next.js)

```typescript
primary: "hsl(142, 76%, 36%)"; // Xanh lá chính
background: "hsl(0, 0%, 100%)"; // Trắng
foreground: "hsl(222, 84%, 5%)"; // Đen chữ
muted: "hsl(210, 40%, 94%)"; // Xám nhạt
border: "hsl(214, 32%, 91%)"; // Viền
```

### Typography

- Font sizes: xs(12) → 6xl(60)
- Font weights: normal(400) → bold(700)
- Line heights: tight(1.25) → loose(2)

## 📁 Cấu trúc thư mục

```
src/
├── components/           # UI Components
│   └── ui/              # Base UI components (Button, Input, Card)
├── constants/           # Hằng số (Colors, Spacing, etc.)
├── hooks/              # Custom hooks
├── navigation/         # Navigation setup
├── screens/            # Màn hình ứng dụng
├── services/           # API services
├── store/              # Zustand stores
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🏃‍♂️ Cách chạy ứng dụng

### Prerequisites

```bash
# Cài đặt Node.js (v16+)
# Cài đặt Expo CLI
npm install -g @expo/cli
```

### Installation

```bash
# Clone repository
git clone <repository-url>
cd fe-mobile/fe-mobile

# Cài đặt dependencies
npm install

# Chạy ứng dụng
npm start
```

### Development Commands

```bash
npm start          # Khởi động Expo development server
npm run android    # Chạy trên Android
npm run ios        # Chạy trên iOS
npm run web        # Chạy trên web browser
```

## 🔐 Authentication

### Demo Accounts

Ứng dụng có sẵn các tài khoản demo (password: `password`):

| Email              | Role       | Mô tả                             |
| ------------------ | ---------- | --------------------------------- |
| admin@example.com  | Admin      | Quản trị viên - toàn quyền        |
| staff@example.com  | Staff      | Nhân viên - quản lý đặt lịch      |
| tech@example.com   | Technician | Kỹ thuật viên - thực hiện dịch vụ |
| member@example.com | Member     | Thành viên - đặt lịch dịch vụ     |

### Security Features

- Secure token storage với Expo SecureStore
- Auto-refresh token mechanism
- Role-based access control
- Input validation với Zod

## 📱 Screens Overview

### Authentication Flow

- **LoginScreen**: Đăng nhập với demo accounts

### Member Flow

- **HomeScreen**: Tổng quan dịch vụ và thao tác nhanh
- **BookingScreen**: Đặt lịch dịch vụ mới
- **MyBookingsScreen**: Quản lý lịch đã đặt
- **ProfileScreen**: Thông tin cá nhân và cài đặt

### Staff/Admin Flow

- **DashboardScreen**: Thống kê và quản lý theo role
- **HomeScreen**: Tổng quan hệ thống
- **ProfileScreen**: Cài đặt cá nhân

### Technician Flow

- **DashboardScreen**: Công việc và lịch trình
- **HomeScreen**: Tổng quan công việc
- **ProfileScreen**: Thông tin cá nhân

## 🔄 API Integration

### Mock Services

Hiện tại ứng dụng sử dụng mock data để development:

- `mockAuth`: Authentication service
- Mock booking data
- Mock user profiles

### Real API Ready

Cấu trúc đã sẵn sàng tích hợp API thật:

```typescript
// Chỉ cần thay đổi baseURL trong src/services/api.ts
const api = axios.create({
  baseURL: "https://your-api-domain.com/api",
  // ...
});
```

## 🚀 Production Build

### Expo Build

```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios

# Build with EAS (recommended)
eas build --platform android
eas build --platform ios
```

### Environment Variables

Tạo file `.env`:

```
API_BASE_URL=https://your-api-domain.com/api
APP_NAME=EV Service Center
APP_VERSION=1.0.0
```

## 🔮 Roadmap

### Phase 1 (Completed)

- ✅ Authentication system
- ✅ Multi-role navigation
- ✅ Basic booking flow
- ✅ Profile management
- ✅ Design system implementation

### Phase 2 (Next)

- 🔄 Real-time notifications
- 🔄 Map integration for locations
- 🔄 Payment integration
- 🔄 Chat support
- 🔄 Offline mode

### Phase 3 (Future)

- 📋 Advanced analytics
- 📋 Multi-language support
- 📋 Dark mode
- 📋 Advanced search & filters

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

Nếu có vấn đề hoặc cần hỗ trợ:

- Create issue trên GitHub
- Email: support@evservice.com
- Phone: 1900-xxxx

---

**EV Service Center Mobile App** - Phiên bản 1.0.0
Developed with ❤️ using React Native & Expo
