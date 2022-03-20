# Webová evidence realizovaných prací pro OSVČ

[IS link](https://is.muni.cz/auth/rozpis/tema?fakulta=1433;kod=PB138;predmet=1323839;sorter=vedouci;balik=405650;tema=406373;uplne_info=1;obdobi=8064)

Studenti navrhnou a vytvoří on-line evidenci odvedených prací pro OSVČ. Aplikace bude umožňovat správu klientů (přidání, vyhledávání, rušení) a hlavně správu odvedených prací pro jednotlivé klienty. Data budou uložena buď ve formátu JSON nebo v XML databázi. Požadovaná funkcionalita je:

- přidání odvedené práce (zadání data/použití aktuálního, zadání množství fakturované činnosti (doba od-do, typ zakázky, ...) odvedené práce, výběr klienta, zadání sazby za jednotku práce)
- spočítání celkového času/sumy za všechny zákázky odpracovaného pro zvoleného klienta

Ke každému klientovi si bude aplikace pamatovat:
základní kontaktní údaje - jméno, adresa
bankovní spojení (číslo účtu)
pokud je klient podnikající (fyzická/právnická osoba) tak i IČ a DIČ.

# Run locally

create .env file in packages/api and add this line  
SERVER_PORT=3000  
create .env file in packages/client and add this  
PORT=9000

- `npm i` inside the projects root directory
- `npm start` inside the projects root directory

# Team members

| Member         | Role      |
| -------------- | --------- |
| Marek Hamerník | UX        |
| Josef Frola    | Team lead |
| Zdeněk Toufar  | Backend   |
| Lukáš Bašista  | Frontend  |

# Requirements

The application does not support more user accounts for one running session. One user is using exactly one running instance of the application. The data are not shared between users of the application (between the running sessions of the application) and each and every session has its own data-storage.  
There won't be any authentication needed. The user will have the application running somewhere (eg. locally, cloud, ...) and will be his responsibility not to share the URL.  
If the user wants to somehow protect the endpoint where the application is running we suggest to use some password protected proxy.

- [x] ERD diagram
- [x] Start guide
- [x] Default state start (pre-set categories)

## Non-function requirements

### NPM installed

### Internet Browser

### Design

[Graphical design in Figma](https://www.figma.com/file/PHT3LO5nL7n2KKGyiBRM5L/osvc_app)

Clients view: (Landing page)

- view of all clients
- filters
- add client button
- view client detail

Task categories view:

- view of all created categories
- only filter by hour pay

Work log view:

- view of all work logs
- filters
- create new button
- detail buttons for each row

Modal windows:

- create/edit client
- create/edit work log
- create/edit work category

Client detail: (clients/client_id)

- show info about client
- table of work logs for viewed client
- edit button
- delete button

Work log detail:

- show information about work log
- edit button
- delete button

## Data structures

---

[ERD diagram](https://gitlab.fi.muni.cz/xfrola/pb138-osvc/-/blob/master/docs/erd.png)
