import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.comment.deleteMany()
    await prisma.post.deleteMany()

    const posts = await prisma.post.createMany({
        data: [
            {
                title: 'Witaj w świecie programowania',
                body: 'Programowanie to niesamowita przygoda. W tym wpisie dowiesz się, od czego zacząć swoją przygodę z kodowaniem. Przede wszystkim wybierz język, który Cię interesuje, np. JavaScript, Python lub Java. Następnie znajdź dobre kursy online i zacznij tworzyć swoje pierwsze projekty. Pamiętaj, że kluczem do sukcesu jest regularna praktyka i cierpliwość.',
                userId: 1
            },
            {
                title: 'React 19 - nowości i zmiany',
                body: 'React 19 wprowadza wiele ekscytujących funkcji. Nowy kompilator React Forget automatycznie optymalizuje renderowanie komponentów. Actions ułatwiają zarządzanie formularzami i stanami asynchronicznymi. Directives pozwalają na lepszą kontrolę nad ładowaniem zasobów. To tylko niektóre z nowości, które sprawiają, że praca z Reactem staje się jeszcze przyjemniejsza.',
                userId: 2
            },
            {
                title: 'TypeScript dla początkujących',
                body: 'TypeScript to nadzbiór JavaScriptu, który dodaje statyczne typowanie. Dzięki temu możesz łapać błędy już na etapie pisania kodu, zanim trafią do przeglądarki. W tym artykule pokażę Ci podstawy: typy proste, interfejsy, typy generyczne oraz jak skonfigurować TypeScript w projekcie React. Przekonasz się, że warto inwestować czas w naukę TypeScriptu.',
                userId: 1
            },
            {
                title: 'Najlepsze praktyki w Node.js',
                body: 'Tworząc aplikacje backendowe w Node.js, warto stosować sprawdzone wzorce. Organizacja kodu w moduły, używanie async/await zamiast callbacków, walidacja danych wejściowych, obsługa błędów oraz odpowiednie zabezpieczenia (helmet, cors, rate limiting) to podstawa. W tym wpisie znajdziesz praktyczne wskazówki, które pomogą Ci tworzyć solidne i bezpieczne API.',
                userId: 3
            },
            {
                title: 'Prisma - nowoczesne ORM',
                body: 'Prisma to ORM nowej generacji dla Node.js i TypeScript. Umożliwia łatwe zarządzanie bazą danych poprzez intuicyjny schema language. Automatyczne generowanie klienta, migracje, wsparcie dla wielu baz danych (PostgreSQL, MySQL, SQLite, MongoDB) to tylko niektóre z zalet. W tym poradniku pokażę, jak szybko zintegrować Prismę z aplikacją Express i wykonywać operacje CRUD.',
                userId: 2
            },
            {
                title: 'CSS Modules - stylowanie w React',
                body: 'CSS Modules to sposób na lokalne stylowanie komponentów w React. Każda klasa CSS jest automatycznie haszowana, co eliminuje konflikty nazw. W tym wpisie pokażę, jak skonfigurować CSS Modules w projekcie Vite, tworzyć dynamiczne klasy oraz łączyć z SASS. Dzięki temu Twoje style będą czyste, modułowe i łatwe w utrzymaniu.',
                userId: 1
            },
            {
                title: 'Vite vs Webpack - który wybrać?',
                body: 'Vite to nowoczesne narzędzie do budowania aplikacji frontendowych, które znacząco przyspiesza proces deweloperski. Dzięki natywnym modułom ES, serwer deweloperski działa błyskawicznie, a hot module replacement jest niezawodny. Webpack wciąż jest potężnym narzędziem, ale Vite zyskuje coraz większą popularność. Sprawdź, które rozwiązanie lepiej sprawdzi się w Twoim projekcie.',
                userId: 3
            },
            {
                title: 'REST API - kompletny przewodnik',
                body: 'REST API to standard tworzenia interfejsów sieciowych. W tym artykule omówię wszystkie kluczowe koncepcje: metody HTTP (GET, POST, PUT, DELETE), kody statusu, autoryzację (JWT, OAuth), wersjonowanie API oraz najlepsze praktyki projektowania endpointów. Przykłady w Node.js z Express pomogą Ci zrozumieć, jak zbudować własne REST API od podstaw.',
                userId: 2
            },
            {
                title: 'Debugowanie w JavaScript',
                body: 'Skuteczne debugowanie to kluczowa umiejętność każdego programisty. W tym wpisie poznasz narzędzia takie jak console.log, debugger statement, breakpointy w DevToolsach, a także zaawansowane techniki: monitorowanie eventów, profilowanie wydajności i debugowanie asynchroniczne. Nauczysz się szybko lokalizować i naprawiać błędy w swoim kodzie.',
                userId: 1
            },
            {
                title: 'Next.js - framework dla React',
                body: 'Next.js to framework do tworzenia aplikacji React po stronie serwera. Oferuje SSR (Server Side Rendering), SSG (Static Site Generation), API routes oraz automatyczne dzielenie kodu. W tym artykule pokażę, jak stworzyć aplikację z Next.js, skonfigurować routing oraz optymalizować wydajność. Next.js jest idealnym wyborem dla projektów wymagających SEO i szybkości ładowania.',
                userId: 3
            },
            {
                title: 'Tailwind CSS - użyteczność i szybkość',
                body: 'Tailwind CSS to framework CSS typu utility-first. Zamiast pisać customowe style, używasz gotowych klas takich jak flex, pt-4, text-center. To przyspiesza tworzenie interfejsów i zapewnia spójność. W tym wpisie pokażę, jak skonfigurować Tailwind w projekcie Vite, tworzyć responsywne layouty oraz dostosowywać motywy kolorystyczne.',
                userId: 2
            },
            {
                title: 'Zarządzanie stanem w React',
                body: 'Zarządzanie stanem to kluczowy aspekt aplikacji React. Poznaj różne rozwiązania: useState i useReducer dla lokalnego stanu, Context API dla średnich aplikacji oraz Redux, Zustand lub MobX dla dużych projektów. W tym artykule porównam te narzędzia i pokażę, kiedy warto używać każdego z nich.',
                userId: 1
            },
            {
                title: 'GraphQL - nowa jakość API',
                body: 'GraphQL to alternatywa dla REST API, która daje klientowi pełną kontrolę nad pobieranymi danymi. Możesz zapytać dokładnie o to, czego potrzebujesz, bez over-fetchingu. W tym wpisie pokażę, jak zbudować serwer GraphQL z Apollo Server, zdefiniować schema oraz resolvery, a także jak używać GraphQL z Reactem.',
                userId: 3
            },
            {
                title: 'MongoDB dla programistów Node.js',
                body: 'MongoDB to popularna baza danych NoSQL. W tym artykule pokażę, jak zintegrować MongoDB z aplikacją Node.js przy użyciu Mongoose. Omówię modele, schema, relacje, agregacje oraz indeksy. Nauczysz się wykonywać operacje CRUD i budować wydajne zapytania do bazy danych.',
                userId: 2
            },
            {
                title: 'JWT - autoryzacja w API',
                body: 'JSON Web Token (JWT) to standard autoryzacji w nowoczesnych aplikacjach webowych. W tym artykule pokażę, jak generować tokeny, weryfikować je po stronie serwera oraz przechowywać bezpiecznie po stronie klienta. Omówię również odświeżanie tokenów (refresh tokens) oraz najczęstsze błędy w implementacji JWT.',
                userId: 1
            },
            {
                title: 'WebSockets - komunikacja w czasie rzeczywistym',
                body: 'WebSockets umożliwiają dwukierunkową komunikację między klientem a serwerem w czasie rzeczywistym. W tym poradniku pokażę, jak zbudować czat lub powiadomienia na żywo używając Socket.io z Node.js i Reactem. Nauczysz się obsługiwać zdarzenia, pokoje oraz broadcastowanie wiadomości.',
                userId: 3
            },
            {
                title: 'Testowanie w React - Jest i React Testing Library',
                body: 'Testowanie to nieodłączny element profesjonalnego tworzenia oprogramowania. W tym artykule pokażę, jak testować komponenty React przy użyciu Jest i React Testing Library. Omówię testy jednostkowe, testy integracyjne, mockowanie API oraz testowanie hooków. Dowiesz się, jak pisać czytelne i łatwe w utrzymaniu testy.',
                userId: 2
            },
            {
                title: 'Docker dla programistów webowych',
                body: 'Docker pozwala na konteneryzację aplikacji, co ułatwia zarządzanie środowiskiem deweloperskim i produkcyjnym. W tym wpisie pokażę, jak stworzyć Dockerfile dla aplikacji Node.js, użyć docker-compose do uruchomienia bazy danych oraz jak skonteneryzować aplikację React. Nauczysz się budować obrazy i uruchamiać kontenery.',
                userId: 1
            },
            {
                title: 'CI/CD - automatyzacja wdrożeń',
                body: 'CI/CD to praktyka automatyzacji budowania, testowania i wdrażania aplikacji. W tym artykule pokażę, jak skonfigurować GitHub Actions dla projektu React i Node.js. Omówię automatyzację testów, budowanie aplikacji oraz wdrażanie na serwer produkcyjny. Dowiesz się, jak zaoszczędzić czas i uniknąć błędów przy wdrożeniach.',
                userId: 3
            },
            {
                title: 'ESLint i Prettier - czysty kod',
                body: 'ESLint i Prettier to narzędzia, które pomagają utrzymać spójny i czysty kod. W tym wpisie pokażę, jak skonfigurować je w projekcie TypeScript, dodać popularne konfiguracje (Airbnb, Standard) oraz zintegrować z VS Code. Nauczysz się automatycznie formatować kod i łapać potencjalne błędy przed runtime.',
                userId: 2
            },
            {
                title: 'PWA - Progressive Web Apps',
                body: 'Progressive Web Apps to aplikacje webowe, które działają jak natywne. W tym artykule pokażę, jak zamienić aplikację React w PWA: dodać service worker, manifest, obsługę offline oraz powiadomienia push. Dowiesz się, jak zwiększyć zaangażowanie użytkowników i poprawić doświadczenia mobilne.',
                userId: 1
            },
            {
                title: 'Webpack - szczegółowa konfiguracja',
                body: 'Webpack to potężny bundler dla aplikacji JavaScript. W tym zaawansowanym poradniku pokażę, jak skonfigurować Webpack od zera: loadery dla CSS, obrazków, fontów, plugin do generowania HTML, hot module replacement oraz optymalizacje produkcyjne. Zrozumiesz, jak działa bundling i jak dostosować Webpack do swoich potrzeb.',
                userId: 3
            },
            {
                title: 'Redux Toolkit - zarządzanie stanem',
                body: 'Redux Toolkit to oficjalne, nowoczesne narzędzie do pracy z Reduxem. Upraszcza konfigurację, redukuje boilerplate i dodaje przydatne funkcje jak createSlice, createAsyncThunk. W tym artykule pokażę, jak zintegrować Redux Toolkit z Reactem, tworzyć slice, obsługiwać akcje asynchroniczne i korzystać z DevTools.',
                userId: 2
            },
            {
                title: 'SEO w aplikacjach React',
                body: 'SEO w jednostronicowych aplikacjach React może być wyzwaniem. W tym wpisie omówię techniki poprawy SEO: SSR z Next.js, React Helmet do zarządzania meta tagami, generowanie mapy strony, oraz optymalizację wydajności. Dowiesz się, jak sprawić, by Twoja aplikacja React była lepiej indeksowana przez wyszukiwarki.',
                userId: 1
            },
            {
                title: 'Bazy danych relacyjne vs NoSQL',
                body: 'Wybór między bazą relacyjną (PostgreSQL, MySQL) a NoSQL (MongoDB) ma ogromne znaczenie dla architektury aplikacji. W tym artykule porównam oba typy pod kątem spójności danych, skalowalności, wydajności i łatwości rozwoju. Pokażę przykłady, kiedy wybrać SQL, a kiedy NoSQL dla Twojego projektu.',
                userId: 3
            },
            {
                title: 'Microservices w Node.js',
                body: 'Architektura mikroserwisów zyskuje na popularności. W tym zaawansowanym artykule pokażę, jak podzielić monolityczną aplikację Node.js na mikroserwisy. Omówię komunikację między serwisami (HTTP, gRPC, RabbitMQ), zarządzanie konfiguracją, API Gateway oraz wyzwania związane z transakcjami rozproszonymi.',
                userId: 2
            },
            {
                title: 'Sztuczna inteligencja w web development',
                body: 'AI zmienia sposób tworzenia aplikacji webowych. W tym wpisie pokażę, jak zintegrować modele AI (OpenAI API, TensorFlow.js) z aplikacją React i Node.js. Omówię przypadki użycia: chatboty, generowanie treści, analiza sentymentu, rekomendacje. Dowiesz się, jak dodać inteligencję do swoich projektów.',
                userId: 1
            }
        ]
    })

    console.log(`${posts.count} postów zostało dodanych!`)

    const comments = await prisma.comment.createMany({
        data: [
            { name: 'Anna Kowalska', email: 'anna@example.com', body: 'Świetny artykuł! Bardzo pomocny.', postId: 1 },
            { name: 'Piotr Nowak', email: 'piotr@example.com', body: 'Dziękuję za te informacje. Czekam na więcej!', postId: 1 },
            { name: 'Katarzyna Wiśniewska', email: 'kasia@example.com', body: 'React 19 brzmi obiecująco. Kiedy premiera?', postId: 2 },
            { name: 'Marek Zieliński', email: 'marek@example.com', body: 'TypeScript to must-have w większych projektach.', postId: 3 },
            { name: 'Tomasz Lewandowski', email: 'tomek@example.com', body: 'Prisma znacznie ułatwia pracę z bazą danych.', postId: 5 },
            { name: 'Ewa Dąbrowska', email: 'ewa@example.com', body: 'Czy możesz polecić jakieś kursy Vite?', postId: 7 },
            { name: 'Grzegorz Kamiński', email: 'grzegorz@example.com', body: 'Bardzo przydatny poradnik o REST API!', postId: 8 },
            { name: 'Monika Zając', email: 'monika@example.com', body: 'Next.js zmienił moje podejście do Reacta!', postId: 10 },
            { name: 'Jakub Kwiatkowski', email: 'jakub@example.com', body: 'Tailwind to strzał w dziesiątkę. Polecam każdemu.', postId: 11 },
            { name: 'Agnieszka Malinowska', email: 'agnieszka@example.com', body: 'GraphQL wydaje się skomplikowane, ale po tym artykule mam lepsze pojęcie.', postId: 13 },
            { name: 'Robert Lewandowski', email: 'robert@example.com', body: 'JWT - wreszcie ktoś to dobrze wytłumaczył!', postId: 15 },
            { name: 'Karolina Woźniak', email: 'karolina@example.com', body: 'Docker to przyszłość. Świetny wpis!', postId: 18 },
            { name: 'Mateusz Szymański', email: 'mateusz@example.com', body: 'CI/CD zmieniło mój workflow. Dzięki za poradnik!', postId: 19 },
            { name: 'Natalia Duda', email: 'natalia@example.com', body: 'PWA to świetny sposób na aplikacje mobilne.', postId: 21 },
            { name: 'Paweł Czarnecki', email: 'pawel@example.com', body: 'Redux Toolkit jest o niebo lepszy od klasycznego Reduxa.', postId: 23 }
        ]
    })

    console.log(`${comments.count} komentarzy zostało dodanych!`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })