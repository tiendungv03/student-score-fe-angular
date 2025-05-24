```
student-score-fe-angular/
├── src/
│ ├── app/
│ │ ├── core/ # Cấu hình lõi, service, guard, interceptor
│ │ │ ├── services/ # Http services: Auth, User, Score...
│ │ │ ├── guards/ # AuthGuard, RoleGuard
│ │ │ ├── interceptors/ # JWT Interceptor, Error Handler
│ │ │ └── core.module.ts # Module chỉ import 1 lần ở App
│ │ │
│ │ ├── shared/ # Component dùng chung
│ │ │ ├── components/ # Header, Footer, Sidebar, Table, Modal...
│ │ │ ├── pipes/ # Custom pipes
│ │ │ ├── directives/ # Custom directives
│ │ │ └── shared.module.ts
│ │ │
│ │ ├── layouts/ # Giao diện khung
│ │ │ ├── public-layout/ # Layout cho Login, Landing
│ │ │ │ └── public-layout.component.ts|html|scss
│ │ │ ├── private-layout/ # Layout cho Dashboard & hệ thống
│ │ │ │ └── private-layout.component.ts|html|scss
│ │ │
│ │ ├── pages/
│ │ │ ├── landing/ # Trang giới thiệu
│ │ │ ├── login/ # Trang đăng nhập
│ │ │ ├── dashboard/ # Trang trung tâm (tùy vai trò)
│ │ │ ├── change-password/ # Đổi mật khẩu
│ │ │
│ │ │ ├── admin/ # Quản trị viên
│ │ │ │ ├── accounts/ # Quản lý tài khoản
│ │ │ │ ├── departments/ # Quản lý khoa
│ │ │ │ ├── teachers/ # Quản lý giảng viên
│ │ │ │ ├── students/ # Quản lý sinh viên
│ │ │ │ ├── courses/ # Quản lý học phần
│ │ │ │ ├── course-classes/ # Lớp học phần
│ │ │ │ ├── registrations/ # Đăng ký hộ
│ │ │ │ ├── schedules/ # Lịch học
│ │ │ │ ├── reports/ # Thống kê, báo cáo
│ │ │
│ │ │ ├── lecturer/ # Giảng viên
│ │ │ │ ├── course-classes/ # Danh sách lớp dạy
│ │ │ │ ├── scores/ # Nhập điểm
│ │ │ │ ├── reports/ # Thống kê lớp học
│ │ │
│ │ │ ├── student/ # Sinh viên
│ │ │ │ ├── course-classes/ # Đăng ký học phần
│ │ │ │ ├── schedules/ # Lịch học
│ │ │ │ ├── scores/ # Xem điểm
│ │ │
│ │ ├── app.component.ts|html|scss # Gốc ứng dụng
│ │ └── app.routes.ts # App Routes cấu hình
│ │
│ ├── assets/
│ │ ├── images/
│ │ └── styles/
│ │ └── _variables.scss # SCSS chung
│ └── environments/
│ ├── environment.ts # Môi trường dev
│ └── environment.prod.ts # Môi trường prod
│
├── angular.json
├── package.json
├── tsconfig.app.json
└── README.md
```
