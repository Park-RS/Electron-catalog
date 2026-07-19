# Electron Catalog — каталог кофейни

Десктопное приложение-витрина кофейни: древовидный каталог категорий с товарами, поиск по всему каталогу и карточки товаров с подробной информацией (описание, КБЖУ, вес, бренд).

## Стек

- [Electron](https://www.electronjs.org/) + [electron-vite](https://electron-vite.org/)
- [Vue 3](https://vuejs.org/) (Composition API, TypeScript)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide](https://lucide.dev/) — иконки
- [@formkit/auto-animate](https://auto-animate.formkit.com/) — анимация списков
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) — тесты

## Возможности

- Дерево категорий с несколькими уровнями вложенности, клавиатурная навигация (стрелки, Enter)
- Просмотр товаров выбранной категории, включая товары вложенных подкатегорий
- Поиск по всему каталогу с первого введённого символа, результат — плоским списком
- Карточка товара: клик открывает модальное окно с описанием, КБЖУ (калории, белки, жиры, углеводы), весом и брендом
- Анимации: открытие карточки, перестроение списка, «резиновый» overscroll списков
- Состояния загрузки и ошибки чтения справочника с кнопкой повтора

## Требования

- Node.js 18+
- npm

## Установка и запуск

```bash
git clone https://github.com/Park-RS/Electron-catalog.git
cd Electron-catalog
npm i
npm run dev
```

## Скрипты

| Скрипт                                            | Назначение                        |
| ------------------------------------------------- | --------------------------------- |
| `npm run dev`                                     | Запуск в режиме разработки с HMR  |
| `npm run start`                                   | Предпросмотр production-сборки    |
| `npm run build`                                   | Сборка main/preload/renderer      |
| `npm run build:win` / `build:mac` / `build:linux` | Сборка дистрибутива под платформу |
| `npm run test`                                    | Запуск тестов (Vitest)            |
| `npm run test:watch`                              | Тесты в watch-режиме              |
| `npm run typecheck`                               | Проверка типов (main + renderer)  |
| `npm run lint`                                    | ESLint                            |
| `npm run format`                                  | Prettier                          |
