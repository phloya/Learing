1. Internet и web-база

Это у тебя в roadmap идет как Internet и рядом вопросы: how internet works, HTTP, domain name, hosting, DNS, browser.

Что выучить
что такое клиент и сервер
как работает request/response
HTTP методы: GET, POST, PUT, PATCH, DELETE
status codes: 200, 201, 400, 401, 403, 404, 409, 500
headers, body, query params, path params
cookies vs headers
что такое JSON
что такое DNS
домен, IP, порт
как браузер отправляет запрос
что такое hosting / VPS / deployment
difference between http and https
DoD
можешь своими словами объяснить путь:
браузер → DNS → IP → сервер → response
понимаешь разницу между GET и POST
умеешь прочитать любой HTTP запрос в Postman / Swagger
понимаешь, что такое localhost:8000, домен и порт
2. Python с нуля

На схеме сначала идет Pick a Language, и для тебя берем Python.

Что выучить по Python
2.1 Базовый синтаксис
переменные
типы данных: int, float, str, bool, None
ввод / вывод
арифметика
сравнение
логические операторы
2.2 Управляющие конструкции
if / elif / else
for
while
break, continue
match можно позже
2.3 Коллекции
list
tuple
set
dict
когда какую структуру использовать
вложенные структуры
2.4 Работа со строками
методы строк
форматирование
f-strings
split / join / replace / strip
2.5 Функции
def
аргументы
return
default arguments
*args, **kwargs позже
области видимости
2.6 Работа с файлами
чтение / запись файлов
with open(...)
txt / json
pathlib
2.7 Исключения
try / except / finally
свои ошибки
когда ловить исключения, а когда нет
2.8 Модули и пакеты
import
разбиение кода по файлам
структура проекта
__init__.py базово
2.9 ООП
классы
объекты
__init__
методы
наследование
инкапсуляция
dataclass
2.10 Полезный Python для backend
list/dict comprehensions
lambda базово
datetime
uuid
enum
typing
Optional, list[str], dict[str, int]
virtualenv / venv
pip
.env
DoD
можешь без подсказки написать консольный mini-проект
умеешь разбить код на файлы
читаешь и пишешь JSON
понимаешь разницу между list / tuple / set / dict
умеешь написать класс и функцию
не путаешься в for, if, return, try/except
3. Git и version control

В roadmap это Git, Version Control Systems, GitHub / GitLab / Bitbucket.

Что выучить
что такое repository
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
basics of rebase
.gitignore
DoD
можешь создать репозиторий и залить проект на GitHub
умеешь работать через ветки
понимаешь, как исправить конфликт после merge
не ломаешь main на каждом действии
4. APIs и backend-мышление

В roadmap есть Learn about APIs, REST, JSON APIs, Open API Specs, SOAP, gRPC, GraphQL. Для старта тебе нужен REST + JSON + OpenAPI.

Что выучить
что такое API
что такое REST
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
idempotency базово
Что пока не нужно глубоко
SOAP
GraphQL
gRPC
DoD
можешь сам спроектировать API для:
users
posts
tasks
понимаешь, какие endpoints нужны для CRUD
умеешь объяснить, почему GET /users/1 и POST /users — это разные вещи
5. FastAPI как первый backend framework

Это уже логическое продолжение roadmap после Python и APIs.

Что выучить
создание проекта
роуты
request / response models
Pydantic схемы
валидация
dependency injection базово
status codes
exception handlers
middleware базово
async / await
project structure:
api/
models/
schemas/
services/
repositories/
DoD
можешь поднять API локально
у тебя есть Swagger
можешь сделать 5–10 endpoints
входящие данные валидируются схемами
код не свален в один файл на 1000 строк
6. SQL и relational databases

В roadmap это Relational Databases, PostgreSQL, MySQL, SQLite, а ниже Normalization, ACID, Transactions, Indexes, Migrations.

Что выучить по SQL
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
Что выучить по проектированию БД
primary key
foreign key
one-to-one
one-to-many
many-to-many
normalization
уникальные поля
nullable / not null
default values
timestamps
Что выучить по PostgreSQL
создание таблиц
индексы
транзакции
constraints
типы данных
json/jsonb базово
DoD
можешь сам спроектировать БД под mini CRM / task manager
умеешь писать JOIN без боли
понимаешь, когда нужен index
можешь объяснить ACID простыми словами
умеешь связать таблицы users, posts, comments
7. ORM и migrations

В roadmap отдельно есть ORMs и Migrations.

Что выучить
что такое ORM
зачем ORM нужен
SQLAlchemy models
связи между моделями
session
CRUD через ORM
Alembic migrations
автогенерация миграций
обновление схемы БД
DoD
можешь поднять проект с PostgreSQL + ORM
умеешь менять модели и делать миграции
БД не создается руками каждый раз с нуля
понимаешь difference между raw SQL и ORM
8. Authentication и authorization

В roadmap это блок Authentication: JWT, Basic Auth, Token Auth, Cookie Based Auth, OAuth, OpenID, SAML. Для старта тебе нужны session/cookie basics + JWT + roles.

Что выучить
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
Что выучить по security вокруг auth
bcrypt / password hashing
почему нельзя хранить пароли как plain text
token expiration
refresh flow
logout concept
Что пока не нужно глубоко
OAuth
OpenID
SAML
DoD
можешь сделать регистрацию и логин
пароли хэшируются
приватные endpoints доступны только после авторизации
есть роли типа user / admin
9. Testing

В roadmap есть Testing, Unit Testing, Integration Testing, Functional Testing.

Что выучить
зачем тесты нужны
unit tests
integration tests
test database
pytest
fixtures
mocking базово
тестирование API endpoints
happy path / negative cases
Какой минимум нужен
тесты на service layer
тесты на auth
тесты на ключевые API endpoints
тесты на валидацию
DoD
можешь запустить тесты одной командой
у проекта есть хотя бы базовый test suite
покрыты login, register, create/read/update/delete
умеешь написать fixture и 2–3 integration теста
10. Caching и Redis

В roadmap есть Caching, Redis, Memcached, server side / client side / CDN. Для backend старта тебе нужен server-side caching + Redis basics.

Что выучить
что такое кэш
зачем нужен Redis
TTL
key-value
caching responses
rate limiting базово
session storage базово
background tasks integration базово
DoD
понимаешь, когда кэш полезен
можешь сохранить и получить данные из Redis
можешь объяснить, почему не все надо кэшировать
умеешь сделать простой rate-limit или кэширование ответа
11. Web security

В roadmap это Web Security, HTTPS, CORS, SSL/TLS, OWASP Risks, CSP, Server Security, API Security Best Practices, hashing algorithms like MD5, SHA, scrypt, bcrypt.

Что выучить
CORS
HTTPS
SSL/TLS базово
password hashing
bcrypt
почему MD5 и SHA не подходят для хранения паролей
SQL injection
XSS базово
CSRF базово
secrets management
env variables
validation of input
rate limiting basics
DoD
не хранишь секреты в коде
не хранишь пароли в открытом виде
понимаешь, зачем нужен CORS
умеешь назвать топ-5 базовых API рисков
знаешь, почему bcrypt лучше plain hash для паролей
12. Docker и контейнеризация

В roadmap есть Docker, Containerization vs Virtualization, LXC, дальше Kubernetes. На старте тебе нужен только Docker + Docker Compose.

Что выучить
что такое контейнер
образ vs контейнер
Dockerfile
layers
volumes
ports
environment variables
docker compose
как поднять app + db + redis
Что пока не нужно
Kubernetes
orchestration deeply
LXC theory глубоко
DoD
можешь завернуть backend в Docker
одной командой поднимаешь:
app
postgres
redis
проект запускается одинаково у тебя и у другого человека
13. Web server и reverse proxy

В roadmap есть Nginx, Apache, Caddy, IIS, Web Servers. Для тебя старт — Nginx basics.

Что выучить
что такое reverse proxy
зачем Nginx перед приложением
proxy_pass
static files concept
SSL termination concept
routing to backend
ports 80/443
DoD
понимаешь, зачем backend не всегда торчит наружу напрямую
можешь описать схему:
client → nginx → app
умеешь базово прочитать nginx config
14. CI/CD

В roadmap есть CI / CD.

Что выучить
что такое pipeline
lint
test
build
deploy basics
GitHub Actions basics
env/secrets in CI
DoD
при push автоматически запускаются тесты
хотя бы lint + tests работают в CI
ты понимаешь, как код попадает из GitHub на сервер
15. Design and development principles

В roadmap есть GOF Design Patterns, Domain Driven Design, CQRS, Event Sourcing, Test Driven Development.

Что учить сначала
clean code
separation of concerns
service layer
repository pattern базово
dependency injection basics
SOLID на человеческом уровне
DRY / KISS / YAGNI
Что пока рано
full DDD
CQRS
Event Sourcing
сложные GOF patterns в большом количестве
DoD
код разделен по ответственности
бизнес-логика не смешана с роутами
можешь объяснить, почему “всё в одном файле” — плохо
умеешь сделать нормальную структуру проекта
16. Message brokers и background jobs

В roadmap есть RabbitMQ, Kafka, Message Brokers.

Что учить сначала
что такое очередь
producer / consumer
background tasks
retries
delayed jobs
Celery + Redis как старт
Что пока рано
Kafka
event streaming архитектуры
сложные distributed patterns
DoD
можешь вынести отправку email / тяжелую задачу в фон
понимаешь, зачем не всё делать внутри HTTP request
умеешь описать producer / worker / broker
17. Observability и логирование

В roadmap есть Observability, Metrics, Instrumentation, Monitoring, Telemetry.

Что выучить
logging
log levels
structured logs basics
metrics basics
healthcheck endpoint
tracing concept базово
error monitoring concept
DoD
у приложения есть нормальные логи
ты видишь ошибки не только “500”
есть /health или аналогичный endpoint
можешь быстро понять, где сломалось
18. Building for scale

В roadmap есть Building For Scale, Loadshifting, Backpressure, Circuit Breaker, Graceful Degradation, Migration Strategies, Types of Scaling, Sharding, Replication, CAP Theorem.

Что тебе нужно на старте

Только базовое понимание:

vertical vs horizontal scaling
replication basics
indexes
bottlenecks
caching
queue for heavy work
Что пока не нужно глубоко
sharding
CAP theorem deeply
circuit breaker production-grade
distributed systems hard mode
DoD
понимаешь, что сначала оптимизируют запросы и индексы, а не сразу “микросервисы”
можешь назвать 3 причины медленного backend:
плохие SQL запросы
отсутствие индексов
тяжелые операции внутри request
19. Что учить в каком порядке
Этап 1 — обязательно
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
Этап 2 — после базы
Redis
Background jobs
Nginx
CI/CD
Logging / observability
Security deeper
Этап 3 — потом
Architecture patterns
Message brokers deeper
Scaling
GraphQL / gRPC
Kubernetes
Kafka
Microservices
20. Глобальный DoD для junior backend на Python

Ты можешь считать, что база закрыта, если ты умеешь:

написать backend API с CRUD
подключить PostgreSQL
сделать регистрацию и логин
защитить приватные endpoints
покрыть ключевые части тестами
завернуть всё в Docker
поднять проект локально одной командой
залить код в GitHub
объяснить структуру проекта
сделать 1–2 нормальных pet-проекта
21. Самый практичный набор pet-проектов
Проект 1

Notes / Tasks API

CRUD
pagination
filters
PostgreSQL
Docker
Проект 2

Auth API

registration
login
JWT
roles
refresh tokens
Проект 3

Mini CRM / Booking API

users
orders / bookings
background jobs
Redis
tests

Если хочешь, я следующим сообщением превращу это в таблицу: “тема → что учить → mini-практика → DoD” без воды.
