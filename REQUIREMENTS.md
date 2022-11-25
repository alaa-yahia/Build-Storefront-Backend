# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index 'products' [GET]
- Show 'products/:id' [GET]
- Create [token required] 'products' [POST]

#### Users

- Index [token required] 'users' [GET]
- Show [token required] 'users/:id' [GET]
- Create [token required] 'users' [POST]

#### Orders

- Current Order by user (args: user id)[token required] 'orders/:id' [GET]

#### orders_products

- Orders_Products (args: id) [token required] '/orders/:id/products' [POST]

## Data Shapes

#### Product

```
CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name VARCHAR(100), price integer, category VARCHAR(100));
```

- id [integer][serial primary key]
- name [character varying(100)]
- price [integer]
- category [character varying(100)]

#### User

```
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password VARCHAR
);
```

- id [integer] [SERIAL PRIMARY KEY]
- firstName [character varying(100)]
- lastName [character varying(100)]
- password [character varying]

#### Orders

```
CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(100),
    user_id bigint REFERENCES users(id)
);
```

- id [integer] [SERIAL PRIMARY KEY]
- user_id [bigint]
- status of order (open or complete) [character varying(100)]

#### orders_products

```
CREATE TABLE IF NOT EXISTS orders_products(
    id SERIAL PRIMARY KEY,
    quantity integer,
    product_id bigint REFERENCES products(id),
    order_id bigint REFERENCES orders(id)
);
```

- id [integer] [SERIAL PRIMARY KEY]
- quantity [integer]
- order_id [bigint]
- product_id [bigint]
