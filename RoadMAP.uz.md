1. Internet va web asosi

Roadmapda bu senda Internet bo'limi bo'lib turibdi va yonida how internet works, HTTP, domain name, hosting, DNS, browser savollari bor.

Nimani o'rganish kerak
mijoz va server nima
request/response qanday ishlaydi
HTTP metodlari: GET, POST, PUT, PATCH, DELETE
status codes: 200, 201, 400, 401, 403, 404, 409, 500
headers, body, query params, path params
cookies vs headers
JSON nima
DNS nima
domen, IP, port
brauzer so'rovni qanday yuboradi
hosting / VPS / deployment nima
http va https o'rtasidagi farq
DoD
o'z so'zlaring bilan mana shu yo'lni tushuntira olasan:
browser -> DNS -> IP -> server -> response
GET va POST o'rtasidagi farqni tushunasan
istalgan HTTP so'rovini Postman / Swagger ichida o'qiy olasan
localhost:8000, domen va port nima ekanini tushunasan
2. Python noldan

Sxemada avval Pick a Language keladi, sen uchun esa Pythonni olamiz.

Python bo'yicha nimani o'rganish kerak
2.1 Bazaviy sintaksis
o'zgaruvchilar
ma'lumot turlari: int, float, str, bool, None
input / output
arifmetika
taqqoslash
mantiqiy operatorlar
2.2 Boshqaruv konstruksiyalari
if / elif / else
for
while
break, continue
match keyinroq mumkin
2.3 Kolleksiyalar
list
tuple
set
dict
qaysi struktura qachon kerakligini bilish
ichma-ich strukturalar
2.4 Satrlar bilan ishlash
satr metodlari
formatlash
f-strings
split / join / replace / strip
2.5 Funksiyalar
def
argumentlar
return
default arguments
*args, **kwargs keyinroq
scope lar
2.6 Fayllar bilan ishlash
faylni o'qish / yozish
with open(...)
txt / json
pathlib
2.7 Istisnolar
try / except / finally
o'z xatolaring
qachon exception ushlash kerak, qachon kerak emas
2.8 Modullar va paketlar
import
kodni fayllarga bo'lish
loyiha strukturasi
__init__.py bazaviy darajada
2.9 OOP
klasslar
obyektlar
__init__
metodlar
meros olish
inkapsulyatsiya
dataclass
2.10 Backend uchun foydali Python
list/dict comprehensions
lambda bazaviy darajada
datetime
uuid
enum
typing
Optional, list[str], dict[str, int]
virtualenv / venv
pip
.env
DoD
ko'rsatmasiz konsol uchun mini-loyiha yozib bera olasan
kodni fayllarga ajrata olasan
JSON ni o'qib ham, yozib ham bera olasan
list / tuple / set / dict farqini tushunasan
klass va funksiya yozishni bilasan
for, if, return, try/except ichida adashmaysan
3. Git va version control

Roadmapda bu Git, Version Control Systems, GitHub / GitLab / Bitbucket bo'limlari.

Nimani o'rganish kerak
repository nima
git init
git clone
git status
git add
git commit
git push
git pull
branches
git checkout / git switch
merge
rebase asoslari
.gitignore
DoD
repo yaratib, loyihani GitHub ga yuklay olasan
branchlar bilan ishlay olasan
merge dan keyin konfliktni qanday tuzatishni tushunasan
har bir harakatda main ni sindirmaysan
4. APIs va backend fikrlashi

Roadmapda Learn about APIs, REST, JSON APIs, Open API Specs, SOAP, gRPC, GraphQL bor. Boshlash uchun senga REST + JSON + OpenAPI kerak.

Nimani o'rganish kerak
API nima
REST nima
CRUD:
Create
Read
Update
Delete
resource-based routing
path params
query params
request body
response body
pagination
filtering
sorting
OpenAPI / Swagger
idempotency bazaviy darajada
Hozircha chuqur kirish shart emas
SOAP
GraphQL
gRPC
DoD
o'zing quyidagilar uchun API loyihalab bera olasan:
users
posts
tasks
CRUD uchun qaysi endpointlar kerakligini tushunasan
nega GET /users/1 va POST /users turli narsalar ekanini tushuntira olasan
5. FastAPI birinchi backend framework sifatida

Bu Python va APIs dan keyingi mantiqiy davom.

Nimani o'rganish kerak
loyiha yaratish
route lar
request / response models
Pydantic sxemalari
validatsiya
dependency injection bazaviy darajada
status codes
exception handlers
middleware bazaviy darajada
async / await
project structure:
api/
models/
schemas/
services/
repositories/
DoD
API ni lokalda ko'tara olasan
senda Swagger bor
5-10 ta endpoint qila olasan
kiruvchi ma'lumotlar sxemalar bilan validatsiya qilinadi
kod 1000 qatorlik bitta faylga yig'ilib ketmagan
6. SQL va relational databases

Roadmapda bu Relational Databases, PostgreSQL, MySQL, SQLite, pastroqda esa Normalization, ACID, Transactions, Indexes, Migrations bor.

SQL bo'yicha nimani o'rganish kerak
SELECT
INSERT
UPDATE
DELETE
WHERE
ORDER BY
LIMIT
OFFSET
GROUP BY
HAVING
JOIN
COUNT, SUM, AVG
MB loyihalash bo'yicha nimani o'rganish kerak
primary key
foreign key
one-to-one
one-to-many
many-to-many
normalization
unikal maydonlar
nullable / not null
default values
timestamps
PostgreSQL bo'yicha nimani o'rganish kerak
jadval yaratish
indekslar
tranzaksiyalar
constraints
ma'lumot turlari
json/jsonb bazaviy darajada
DoD
mini CRM / task manager uchun MB ni o'zing loyihalab bera olasan
JOIN ni qiynalmay yozasan
qachon index kerakligini tushunasan
ACID ni oddiy so'zlar bilan tushuntira olasan
users, posts, comments jadvallarini bog'lay olasan
7. ORM va migrations

Roadmapda ORMs va Migrations alohida bo'lim bo'lib turibdi.

Nimani o'rganish kerak
ORM nima
ORM nega kerak
SQLAlchemy models
modellar orasidagi bog'lanishlar
session
ORM orqali CRUD
Alembic migrations
migrationlarni auto-generatsiya qilish
MB sxemasini yangilash
DoD
PostgreSQL + ORM bilan loyiha ko'tara olasan
modellarga o'zgartirish kiritib migration qila olasan
MB har safar qo'lda noldan yaratilmaydi
raw SQL va ORM farqini tushunasan
8. Authentication va authorization

Roadmapda bu Authentication bloki: JWT, Basic Auth, Token Auth, Cookie Based Auth, OAuth, OpenID, SAML. Boshlash uchun senga session/cookie basics + JWT + roles kerak.

Nimani o'rganish kerak
authentication vs authorization
registration
login
password hashing
access token
refresh token
JWT structure
bearer token
roles
permissions
protected routes
Auth atrofidagi xavfsizlik bo'yicha nimani o'rganish kerak
bcrypt / password hashing
nega parollarni plain text ko'rinishida saqlab bo'lmaydi
token expiration
refresh flow
logout concept
Hozircha chuqur kirish shart emas
OAuth
OpenID
SAML
DoD
registration va login qila olasan
parollar hash qilinadi
private endpointlar faqat avtorizatsiyadan keyin ochiladi
user / admin kabi rollar bor
9. Testing

Roadmapda Testing, Unit Testing, Integration Testing, Functional Testing bor.

Nimani o'rganish kerak
testlar nega kerak
unit tests
integration tests
test database
pytest
fixtures
mocking bazaviy darajada
API endpointlarini test qilish
happy path / negative cases
Qanday minimum kerak
service layer uchun testlar
auth uchun testlar
asosiy API endpointlar uchun testlar
validatsiya uchun testlar
DoD
testlarni bitta komandada ishga tushira olasan
loyihada hech bo'lmasa bazaviy test suite bor
login, register, create/read/update/delete yopilgan
fixture va 2-3 ta integration test yoza olasan
10. Caching va Redis

Roadmapda Caching, Redis, Memcached, server side / client side / CDN bor. Backend start uchun senga server-side caching + Redis basics kerak.

Nimani o'rganish kerak
kesh nima
Redis nega kerak
TTL
key-value
responses ni keshlash
rate limiting bazaviy darajada
session storage bazaviy darajada
background tasks integration bazaviy darajada
DoD
kesh qachon foydali ekanini tushunasan
Redis ga ma'lumot saqlab, uni qayta ola olasan
nega hamma narsani keshlash kerak emasligini tushuntira olasan
oddiy rate-limit yoki response caching qila olasan
11. Web security

Roadmapda bu Web Security, HTTPS, CORS, SSL/TLS, OWASP Risks, CSP, Server Security, API Security Best Practices, MD5, SHA, scrypt, bcrypt kabi hashing algoritmlari.

Nimani o'rganish kerak
CORS
HTTPS
SSL/TLS bazaviy darajada
password hashing
bcrypt
nega MD5 va SHA parollarni saqlash uchun mos emas
SQL injection
XSS bazaviy darajada
CSRF bazaviy darajada
secrets management
env variables
input validation
rate limiting basics
DoD
sirlarni kod ichida saqlamaysan
parollarni ochiq ko'rinishda saqlamaysan
CORS nega kerakligini tushunasan
API bo'yicha eng asosiy 5 ta riskni ayta olasan
nega bcrypt oddiy hashga qaraganda parollar uchun yaxshiroq ekanini bilasan
12. Docker va konteynerlash

Roadmapda Docker, Containerization vs Virtualization, LXC, keyin esa Kubernetes bor. Startda senga faqat Docker + Docker Compose kerak.

Nimani o'rganish kerak
konteyner nima
image vs container
Dockerfile
layers
volumes
ports
environment variables
docker compose
app + db + redis ni qanday ko'tarish
Hozircha chuqur kirish shart emas
Kubernetes
orchestration deeply
LXC theory chuqur darajada
DoD
backend ni Docker ga o'rab bera olasan
bitta komandada ko'tarasan:
app
postgres
redis
loyiha senda ham, boshqa odamda ham bir xil ishga tushadi
13. Web server va reverse proxy

Roadmapda Nginx, Apache, Caddy, IIS, Web Servers bor. Sen uchun start - Nginx basics.

Nimani o'rganish kerak
reverse proxy nima
nega ilova oldiga Nginx qo'yiladi
proxy_pass
static files concept
SSL termination concept
backend ga routing
80/443 portlari
DoD
backend har doim ham tashqariga to'g'ridan-to'g'ri chiqib turmasligini tushunasan
quyidagi sxemani tasvirlab bera olasan:
client -> nginx -> app
nginx config ni bazaviy darajada o'qiy olasan
14. CI/CD

Roadmapda CI / CD bor.

Nimani o'rganish kerak
pipeline nima
lint
test
build
deploy basics
GitHub Actions basics
env/secrets in CI
DoD
push qilganda testlar avtomatik ishga tushadi
kamida lint + tests CI ichida ishlaydi
kod GitHub dan serverga qanday yetib borishini tushunasan
15. Design and development principles

Roadmapda GOF Design Patterns, Domain Driven Design, CQRS, Event Sourcing, Test Driven Development bor.

Avval nimani o'rganish kerak
clean code
separation of concerns
service layer
repository pattern bazaviy darajada
dependency injection basics
SOLID inson tushunadigan darajada
DRY / KISS / YAGNI
Hali erta
full DDD
CQRS
Event Sourcing
murakkab GOF patternlaridan juda ko'p ishlatish
DoD
kod mas'uliyat bo'yicha ajratilgan
biznes mantiq route lar bilan aralashmagan
nega "hammasi bitta faylda" yomon ekanini tushuntira olasan
normal loyiha strukturasi qila olasan
16. Message brokers va background jobs

Roadmapda RabbitMQ, Kafka, Message Brokers bor.

Avval nimani o'rganish kerak
navbat nima
producer / consumer
background tasks
retries
delayed jobs
Celery + Redis start uchun
Hali erta
Kafka
event streaming arxitekturalari
murakkab distributed patternlar
DoD
email yuborish / og'ir vazifani fonga chiqarib bera olasan
nega hamma narsani HTTP request ichida qilish kerak emasligini tushunasan
producer / worker / broker ni tasvirlab bera olasan
17. Observability va loglash

Roadmapda Observability, Metrics, Instrumentation, Monitoring, Telemetry bor.

Nimani o'rganish kerak
logging
log levels
structured logs basics
metrics basics
healthcheck endpoint
tracing concept bazaviy darajada
error monitoring concept
DoD
ilovada normal loglar bor
sen faqat "500" emas, xatolarning o'zini ham ko'rasan
/health yoki shunga o'xshash endpoint bor
qayeri buzilganini tez tushuna olasan
18. Building for scale

Roadmapda Building For Scale, Loadshifting, Backpressure, Circuit Breaker, Graceful Degradation, Migration Strategies, Types of Scaling, Sharding, Replication, CAP Theorem bor.

Boshlash uchun senga nima kerak

Faqat bazaviy tushuncha:

vertical vs horizontal scaling
replication basics
indexes
bottlenecks
caching
heavy work uchun queue
Hozircha chuqur kirish shart emas
sharding
CAP theorem deeply
circuit breaker production-grade
distributed systems hard mode
DoD
avval query va indekslar optimallashtirilishini, darrov "mikroservislar" qilinmasligini tushunasan
sekin backendning 3 ta sababini ayta olasan:
yomon SQL querylar
indekslarning yo'qligi
request ichidagi og'ir operatsiyalar
19. Nimani qaysi tartibda o'rganish kerak
Bosqich 1 - shart
Internet / HTTP
Python syntax
Git
SQL
PostgreSQL basics
FastAPI
ORM + migrations
Auth
Testing
Docker
Bosqich 2 - bazadan keyin
Redis
Background jobs
Nginx
CI/CD
Logging / observability
Security deeper
Bosqich 3 - keyinroq
Architecture patterns
Message brokers deeper
Scaling
GraphQL / gRPC
Kubernetes
Kafka
Microservices
20. Python junior backend uchun global DoD

Quyidagilarni qila olsang, bazani yopdim deb hisoblash mumkin:

backend API ni CRUD bilan yozish
PostgreSQL ni ulash
registration va login qilish
private endpointlarni himoya qilish
asosiy qismlarni testlar bilan yopish
hammasini Docker ga o'rash
loyihani lokalda bitta komandada ko'tarish
kodni GitHub ga yuklash
loyiha strukturasini tushuntirish
1-2 ta normal pet-loyiha qilish
21. Eng amaliy pet-loyihalar to'plami
Loyiha 1

Notes / Tasks API

CRUD
pagination
filters
PostgreSQL
Docker
Loyiha 2

Auth API

registration
login
JWT
roles
refresh tokens
Loyiha 3

Mini CRM / Booking API

users
orders / bookings
background jobs
Redis
tests

Agar xohlasang, keyingi xabarda buni jadvalga aylantirib beraman: "mavzu -> nimani o'rganish kerak -> mini-amaliyot -> DoD" ortiqcha suvsiz.
