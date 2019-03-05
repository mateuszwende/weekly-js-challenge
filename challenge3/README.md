# Zadanie:
Stwórz aplikację w JavaScript i HTML. Aplikacja po uruchomieniu ma wyświetlić prosty formularz (opis poniżej). Wszystkie zmiany wprowadzone w formularzu muszą być widoczne po ponownym otwarciu/odświeżeniu strony w tej samej przeglądarce.

## Założenia i wymagania:
- użytkownik może uzupełniać pola w formularzu
- dowolne zmiany są automatycznie zapisywane w przeglądarce
- formularz powinien składać się z kilku części:
    -- Dane Klienta: imię, nazwisko, adres (ulica, miasto, kod pocztowy)
    -- Dane Firmy: nazwa, adres (ulica, miasto, kod pocztowy), numer NIP
    -- Kwota
    -- Możliwość zaznaczenia stanu: wystawiona, doręczona, opłacona, spóźniona (input typu radio)
    -- gdzieś na stronie powinna być widoczna również informacja o tym, kiedy ostatni raz formularz został zapisany
- formularz może być wpisany w kodzie HTML, nie musi być generowany dynamicznie
- oceniane będą: Prawidłowe działanie, obsługa błędów, czytelność kodu
- dodatkowe punkty: walidacja numeru NIP