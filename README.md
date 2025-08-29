Mindbox ToDo (React + Vite + TS + Tailwind)

Features
- Добавление задач: поле ввода + кнопка/Enter.
- Списки: все, невыполненные, выполненные (вкладки).
- Переключение выполнения, удаление, счётчик оставшихся.
- Очистка выполненных.
- Хранение в localStorage.

Tech
- React 18, TypeScript, Vite.
- TailwindCSS (кастомные компоненты в `src/ui`, острые углы, без эмодзи).
- Тесты: Vitest + React Testing Library.

Scripts
- `npm i` — установка зависимостей
- `npm run start` — запуск dev-сервера Vite
- `npm run build` — сборка
- `npm run preview` — локальный предпросмотр сборки
- `npm test` — запуск тестов

Deploy
- GitHub Pages: добавьте в `vite.config.ts` `base: '/<repo>/'` при необходимости и публикуйте содержимое `dist`.
- Vercel/Netlify: импортируйте репозиторий, команда билда `npm run build`, директория `dist`.

Структура
- `src/modules/app/App.tsx` — основное приложение.
- `src/ui` — минимальные UI-компоненты (Button, Input, Checkbox, Tabs).
- `src/modules/app/App.test.tsx` — ключевые тесты.

