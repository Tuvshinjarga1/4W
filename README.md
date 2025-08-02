# 🍲 ХүнсХуваалцах - Хүнсний хог хаягдлыг бууруулах платформ

## 👥 Багийн гишүүд

- **Багийн ахлагч**: Э.Түвшинжаргал
- **fullstack**: Б.Алтансүх
- **research**: Б.Даваасамбуу
- **research**: Д.Балжинням

## 📖 Төслийн тайлбар

ХүнсХуваалцах нь хүнсний хог хаягдлыг бууруулах зорилготой олон нийтийн платформ юм. Энэ веб аппликэйшн нь хүмүүст илүүдэл хүнсээ бусадтай хуваалцах, дуусах хугацаа дөхсөн хүнсийг хямд үнээр худалдах боломжийг олгодог.

### 🎯 Үндсэн зорилго

- НҮБ-ын Тогтвортой хөгжлийн зорилго (SDG)-д хувь нэмэр оруулах
- Хүнсний хог хаягдлыг бууруулах
- Орон нутгийн хүмүүсийг холбож, тогтвортой хэрэглээг дэмжих
- Эдийн засгийн болон байгаль орчны ашиг тус авах

### ✨ Онцлог шинж чанарууд

- 📱 Хэрэглэхэд хялбар интерфейс
- 🔍 Хүнсний төрөл, байршил, дуусах хугацаагаар шүүх
- 💬 Борлуулагч, худалдан авагчийн хоорондын шууд чат
- ⚡ Дуусах хугацааны анхааруулга системтэй
- 🛡️ Аюулгүй нэвтрэх систем
- 📍 **GPS-ээр байршил хайх боломж**
- 🗺️ **Интерактив газрын зураг (Leaflet)**
- 🧭 **Байршил руу шилжиж очох боломж**
- 📊 **Координат хадгалах систем**

## 🛠️ Ашигласан технологи

### Frontend

- **Next.js 15** - React framework (App Router)
- **TypeScript** - Төрлийн аюулгүй байдал
- **Tailwind CSS** - Дизайн систем
- **Lucide React** - Дүрс тэмдэгтүүд
- **Radix UI** - Компонент сангууд
- **Leaflet** - Интерактив газрын зураг
- **React Leaflet** - React-д зориулсан Leaflet wrapper

### Backend & Database

- **Firebase** - Backend хөгжүүлэлт
- **Firestore** - NoSQL өгөгдлийн сан
- **Firebase Auth** - Нэвтрэх систем
- **Firebase Storage** - Файл хадгалах

### Хөгжүүлэлтийн хэрэгслүүд

- **ESLint** - Кодын чанар
- **Prettier** - Кодын форматлах
- **Git** - Хувилбарын хяналт

### Deployment

- **Vercel** - Хост хийх платформ
- **GitHub** - Кодын репозитори

## 🚀 Demo линк

🌐 **Live Demo**: https://4-w.vercel.app/

## 📱 Скриншотууд

### Үндсэн хуудас

![Үндсэн хуудас](./screenshots/homepage.png)

### Бүтээгдэхүүний дэлгэрэнгүй

![Бүтээгдэхүүний хуудас](./screenshots/product-detail.png)

### Чат интерфейс

![Чат](./screenshots/chat-interface.png)

### GPS функционал

![GPS функционал](./screenshots/gps-feature.png)

## 🗺️ GPS болон байршлын функционал

### 📍 GPS хайлт

- **FilterBar** дээр GPS товч дарж одоогийн байршил авах
- Координатыг автоматаар тооцоолж хадгалах
- Байршлын мэдээллийг харуулах

### 🗺️ Интерактив газрын зураг

- **LocationPicker** дээр Leaflet газрын зураг ашиглах
- Газрын зураг дээр дарж байршил сонгох
- GPS-ээр одоогийн байршил авах
- Сонгосон координатыг харуулах

### 🧭 Байршил руу шилжих

- **ProductCard** дээр "Зам" товч дарж Google Maps руу шилжих
- **Product detail** хуудас дээр бүтээгдэхүүний байршил харуулах
- Координат байвал түүнийг ашиглах, байхгүй бол байршлын нэрээр хайх

### 📊 Координат хадгалах

- Бүтээгдэхүн нэмэх үед координатыг хадгалах
- Firestore дээр координатын мэдээллийг хадгалах
- Координат байгаа эсэхийг харуулах UI

## 🏃‍♂️ Локаль дээр ажиллуулах

### Шаардлагатай зүйлс

- Node.js 18+
- npm эсвэл yarn
- Firebase project

### Суулгах

```bash
# Репозиторийг clone хийх
git clone https://github.com/Tuvshinjarga1/4W.git
cd 4W

# Dependencies суулгах
npm install

# Environment variables тохируулах
cp .env.example .env.local
# .env.local файлд Firebase config-ээ бичих

# Development server эхлүүлэх
npm run dev
```

Аппликэйшн [http://localhost:3000](http://localhost:3000) хаяг дээр ажиллана.

### Environment Variables

```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# ImgBB API (зураг хадгалах)
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

## 🗂️ Файлын бүтэц

```
4W/
├── app/                    # Next.js App Router
│   ├── add-product/       # Бүтээгдэхүүн нэмэх хуудас
│   ├── product/[id]/      # Бүтээгдэхүүний дэлгэрэнгүй
│   ├── globals.css        # Глобал CSS
│   ├── layout.tsx         # Үндсэн layout
│   └── page.tsx           # Үндсэн хуудас
├── components/            # React компонентууд
│   ├── ui/               # UI компонентууд (Radix UI)
│   ├── AddProductForm.tsx # Бүтээгдэхүүн нэмэх форм
│   ├── FilterBar.tsx     # Шүүлтүүр
│   ├── LocationPicker.tsx # Байршил сонгох
│   ├── ProductCard.tsx   # Бүтээгдэхүүний карт
│   ├── ProductMap.tsx    # Газрын зураг компонент
│   └── ...
├── lib/                  # Utility функцууд
│   ├── data.ts          # Firebase функцууд
│   ├── firebase.ts      # Firebase тохиргоо
│   └── types.ts         # TypeScript төрлүүд
└── public/              # Статик файлууд
```

## 🌱 Цаашдын хөгжүүлэлт

- [x] GPS-ээр байршил хайх боломж
- [x] Интерактив газрын зураг (Leaflet)
- [x] Байршил руу шилжиж очох боломж
- [x] Координат хадгалах систем
- [ ] Push notification систем
- [ ] Хүнсний зураг таних AI
- [ ] Мобайл аппликэйшн (React Native)
- [ ] Хүргэлтийн систем
- [ ] Хандивын систем
- [ ] Статистик болон тайлан
- [ ] Offline горим
- [ ] Хэлний сонголт (Монгол, Англи)

## 🤝 Хувь нэмэр оруулах

1. Fork хийх
2. Feature branch үүсгэх (`git checkout -b feature/AmazingFeature`)
3. Өөрчлөлтөө commit хийх (`git commit -m 'Add some AmazingFeature'`)
4. Branch-ээ push хийх (`git push origin feature/AmazingFeature`)
5. Pull Request нээх

## 📄 Лиценз

Энэ төсөл MIT лицензтэй. Дэлгэрэнгүйг `LICENSE` файлаас үзнэ үү.

## 📞 Холбоо барих

- **GitHub**: [https://github.com/Tuvshinjarga1](https://github.com/Tuvshinjarga1)
- **Email**: tuvshinjarga1@gmail.com
- **LinkedIn**: [Э.Түвшинжаргал](https://linkedin.com/in/tuvshinjarga)

## 🙏 Талархал

- **OpenStreetMap** - Газрын зургийн өгөгдөл
- **Leaflet** - Интерактив газрын зураг
- **Firebase** - Backend үйлчилгээ
- **Vercel** - Deployment платформ

---

**💚 Хамтдаа хүнсний хог хаягдлыг бууруулж, илүү тогтвортой ирээдүй бүтээцгээе!**

**📍 GPS функционалтай, байршил дээр суурилсан хүнсний хуваалцах платформ**
