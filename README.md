# ShiftMap — тестовое задание (React Native CLI)

Приложение показывает список доступных смен для подработки по геолокации пользователя. Реализовано без Expo, с MobX для состояния и React Navigation для навигации.

## 📱 Скриншот приложения

![Список смен](https://github.com/DsikriD/shiftMap/raw/main/docs/screenshot.png)

*Приложение отображает список доступных смен с геолокацией в шапке и подробной информацией о каждой позиции.*

## 🚀 Функционал
- Запрос точной геолокации при первом запуске
- Загрузка списка смен по координатам пользователя: `https://mobile.handswork.pro/api/shift?latitude=...&longitude=...`
- Список смен с краткой информацией
- Экран деталей смены с использованием ранее загруженных данных

## 🛠 Технологии
- React Native 0.74.3 (CLI)
- MobX (`mobx`, `mobx-react-lite`)
- React Navigation (`@react-navigation/native`, `@react-navigation/native-stack`)
- Геолокация (`react-native-geolocation-service`)
- HTTP клиент (`axios`)

## 📁 Структура проекта
- `src/api/client.ts` — API-клиент и типы
- `src/stores/ShiftsStore.ts` — MobX-хранилище (локация, загрузка смен)
- `src/screens/ShiftListScreen.tsx` — список смен
- `src/screens/ShiftDetailsScreen.tsx` — детали смены
- `src/navigation/index.tsx` — стек навигации

## ⚙️ Запуск
1) Требования:
   - Node.js >= 18 (рекоменд. 20.10+)
   - JDK 17 (OpenJDK/Temurin)
   - Android Studio с Android SDK
   - Установленный `ANDROID_HOME` и платформенные инструменты в `PATH`
2) Установка зависимостей:
   ```bash
   npm install
   ```
3) Android: сборка/запуск
   ```bash
   cd android && gradlew.bat :app:assembleDebug
   # или
   npx react-native run-android
   ```

## 📋 Примечания по разрешениям
- Android: добавлены `ACCESS_FINE_LOCATION` и `ACCESS_COARSE_LOCATION` в `AndroidManifest.xml`. Рантайм-разрешение запрашивается в `ShiftsStore`.

## 📊 Описание полей смены
- `logo`, `address`, `companyName`, `dateStartByCity`, `timeStartByCity`, `timeEndByCity`, `currentWorkers`, `planWorkers`, `workTypes`, `priceWorker`, `customerFeedbacksCount`, `customerRating`.
