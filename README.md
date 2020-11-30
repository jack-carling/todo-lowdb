# Övningar med Lowdb

## Instruktioner

Dokumentation för Lowdb hittar ni [här](https://github.com/typicode/lowdb).

## Övning med enbart Lowdb

1. Börja med att installera det som ligger i package.json genom att enbart skriva installera `npm install`.

2. I mappen ligger en databas som heter **database** och i din server.js gör följande:
    * Hämta alla namn från databasen. Hämta alla namn efter det sorterat på förnamn.
    * Hämta det tredje namnet.
    * Hämta alla åldrar och sedan summera dessa.
    * Byt förnamn och ålder på det fjärde namnet.
    * Ta bort det andra namnet från databasen.


## Övning - musikspelaren och Lowdb

1. Starta med att skapa en package.json med `npm init`.
2. Installera express och lowdb med `npm install express --save` och `npm install lowdb --save`.
3. Skapa en databas som heter `tracks` och lägg in dina låtar från föregående API-övningen i nedan format:

```
{
    tracks: [
        {
            url: https://p.scdn.co/mp3-preview/729371ac317464304d4ca3511653bbe866ac7cef?cid=774b29d4f13844c495f206cafdad9c86,
            name: Suite from The Polar Express,
            artist: Alan Silvestri
        },
        {
            url: https://p.scdn.co/mp3-preview/729371ac317464304d4ca3511653bbe866ac7cef?cid=774b29d4f13844c495f206cafdad9c86,
            name: Suite from The Polar Express,
            artist: Alan Silvestri
        },
        {
            url: https://p.scdn.co/mp3-preview/729371ac317464304d4ca3511653bbe866ac7cef?cid=774b29d4f13844c495f206cafdad9c86,
            name: Suite from The Polar Express,
            artist: Alan Silvestri
        }
    ]
}
```

4. Ändra i dina routes `/api/songs/search` och `/api/songs/all` så att du istället söker och hämtar från din databas och returnerar
till klienten.


## Övning - todo app

1. Starta med att skapa en package.json med `npm init`.
2. Installera express, lowdb och body-parser:
    * `npm install express --save`
    * `npm install lowdb --save`
    * `npm install body-parse --save`
3. Skapa en todo app som har följande funktionalitet:
    * Hämta alla todos från databasen och visa för användaren
    * Kunna lägga till en ny todo i databasen
    * kunna ta bort en todo från databasen
4. Du ska ha tre endpoints:
    * `/api/tasks` - Method: GET
    * `/api/tasks` - Method: POST
    * `/api/tasks/:id` - Method: DELETE