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

# Sprawozdanie z Testów Aplikacji Pysstektor

## 1. Wstęp
**Cel testów**: Celem testów było sprawdzenie poprawności działania komponentów aplikacji React oraz ich wzajemnej integracji.

**Zakres testów**: Przetestowano główne komponenty aplikacji, takie jak `UserData`, `TargetView`, `TragetForm`, `TargetDetails`, `ReportView`, `ReportForm`, `RegisterDetails`, `RegisterForm`, `Navbar`, `LoginForm`, `LinkButton`, `Heading`, `Footer`, `FollowButton`, `FindTarget`, `ActualityButton`.

## 2. Opis Środowiska Testowego
**Technologie**: 
- React
- Jest ^29.7.0

## 3. Wyniki Testów
### Podsumowanie Wyników
- Liczba testów: 18
- Przeszło: 18
- Nie przeszło: 0

## 4. Pokrycie Testów
### Podsumowanie
Sprawdzono wszystkie przypadki z wyjątkiem catch oraz wypisywania do konsoli błędów


## 5. Problemy i Rozwiązania
**Problem 1**: Znaleziono problem w ReportDetails, naprawiony.


