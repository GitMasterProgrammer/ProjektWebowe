# ProjektWebowe
![images](https://github.com/GitMasterProgrammer/ProjektWebowe/assets/118828179/9fe273df-f5f7-448e-9961-cbe878c8e6e9)
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
<h1>Aplikacja "Detektor szefa"</h1>
Aplikacja służy do zgłaszania lokalizacji osób.

# Funkcjonalności:
1. Logowanie i rejestracja konta (hasła są hashowane po stronie klienta)
2. Tworzenie i szukanie osób do zgłoszenia
3. Zgłaszanie osób wraz ze szczytywaniem lokalizacji oraz wygodnym szukaniem osoby.
4. Przeglądanie najnowszych zgłoszeń
5. Ocenianie i ustawianie zgłoszeń jako nieaktywne.
6. Dodawanie osób do ulubionych

# Podział zadań:
Piotr:
- Baza danych
- testy backend
- frontend

Kacper:
- API
- stylowanie
- testy frontend

Wspólne:
- Logika biznesowa

# Dane szczegółowe:
- Baza danych - mySQL (Prisma)
- Backend - Express
- Fontend - React (Vite)


# Schemat bazy danych
![schamat_bazy_danych](https://github.com/GitMasterProgrammer/ProjektWebowe/assets/126171998/3c2f9319-5f55-4882-9d4f-e2f946405258)

# Sprawozdanie z Testów Komponentów Aplikacji Pysstektor

## 1. Wstęp
**Cel testów**: Celem testów było sprawdzenie poprawności działania komponentów aplikacji React oraz ich wzajemnej integracji.

**Zakres testów**: Przetestowano główne komponenty aplikacji, takie jak `UserData`, `TargetView`, `TragetForm`, `TargetDetails`, `ReportView`, `ReportForm`, `RegisterDetails`, `RegisterForm`, `Navbar`, `LoginForm`, `LinkButton`, `Heading`, `Footer`, `FollowButton`, `FindTarget`, `ActualityButton`.

## 2. Opis Środowiska Testowego
**Technologie**: 
- React
- Jest ^29.7.0

## 3. Wyniki Testów
### Podsumowanie Wyników
- Liczba zestawów testów: 18
- Liczba testów: 87 przeszło, 87 razem
- Nie przeszło: 0

## 4. Pokrycie Testów
![obraz](https://github.com/GitMasterProgrammer/ProjektWebowe/assets/118828179/a5c4b44e-45f9-41e1-a082-4bb4ad81a1dc)

### Podsumowanie
Sprawdzono wszystkie przypadki z wyjątkiem catch oraz wypisywania do konsoli błędów


## 5. Problemy i Rozwiązania
**Problem 1**: Znaleziono problem w ReportDetails, naprawiony.

# Sprawozdanie z Testów API Aplikacji Pysstektor

## 1. Wstęp
**Cel testów**: Celem testów było sprawdzenie poprawności działania Rest Api utworzonego w Node (Express).

**Zakres testów**: Przetestowano główne wszystkie ścieżki Api zwracającego dane z bazy danych wraz z sortawaniem i innymi funkcjami dostepnymi w API.

## 2. Opis Środowiska Testowego
**Technologie**: 
- Node v20.9.0
- Jest ^29.7.0
- supertest: 7.0.0
## 3. Wyniki Testów

### Podsumowanie Wyników
- Liczba zestawów testów: 6
- Liczba testów: 58 przeszło, 58 razem
- Czas: 8.195 s


## 4. Pokrycie Testów
![obraz](https://github.com/GitMasterProgrammer/ProjektWebowe/assets/118828179/447787ef-18b1-4fdf-b02b-4ce15ac41f79)

### Podsumowanie
Sprawdzono wszystkie możliwe przypadki z wyjątkiem instrukcji try...catch i mniej ważnych funkcji.


## 5. Problemy i Rozwiązania
**Nie znaleziono**

