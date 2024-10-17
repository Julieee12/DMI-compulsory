--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Customers" VALUES (4, 'Creed Bratton', 'nobody@creedthoughts.com', '301 Vague Lane', 5845889);
INSERT INTO public."Customers" VALUES (2, 'Jim Halpert', 'pranks4dwight@dundermifflin.com', '216 Stamford Street', 4566514);
INSERT INTO public."Customers" VALUES (3, 'Kevin Malone', 'chili@malonespecial.com', '77 Scranton Bowl Alley', 5678945);
INSERT INTO public."Customers" VALUES (5, 'Angela Martin', 'catlady@dundermeow.com', '9 Little Paw Place', 4589324);
INSERT INTO public."Customers" VALUES (6, 'Kelly Kapoor', 'dramaqueen@customer4life.com', '69 Gossip Avenue', 4206900);
INSERT INTO public."Customers" VALUES (7, 'Phyllis Vance', 'vancewife@floralicious.com', '77 Vance Refrigeration Drive', 2475888);
INSERT INTO public."Customers" VALUES (1, 'Dwight Schrute', 'beetking@schrute-farms.com', 'Schrute Farms,Mose Lane', 5709876);


--
-- Data for Name: OrderStatuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."OrderStatuses" VALUES (3, 'Pending');
INSERT INTO public."OrderStatuses" VALUES (4, 'Shipped');
INSERT INTO public."OrderStatuses" VALUES (5, 'Delivered');


--
-- Data for Name: Orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Orders" VALUES (16, '2024-10-08 13:29:19.31459+02', 4, '2024-10-08 13:28:56.187+02', 42, 3);
INSERT INTO public."Orders" VALUES (17, '2024-10-08 13:39:41.987557+02', 4, '2024-10-09 02:00:00+02', 40, 3);
INSERT INTO public."Orders" VALUES (18, '2024-10-08 13:40:09.594971+02', 4, '2024-10-09 02:00:00+02', 40, 3);
INSERT INTO public."Orders" VALUES (19, '2024-10-08 13:50:44.155081+02', 4, '2024-10-17 02:00:00+02', 77, 3);
INSERT INTO public."Orders" VALUES (20, '2024-10-10 13:51:50.146103+02', 4, '2024-10-11 02:00:00+02', 8, 3);
INSERT INTO public."Orders" VALUES (21, '2024-10-10 14:03:04.792945+02', 4, '2024-10-26 02:00:00+02', 91, 3);
INSERT INTO public."Orders" VALUES (22, '2024-10-10 14:03:51.850422+02', 2, '2024-10-24 02:00:00+02', 63, 3);
INSERT INTO public."Orders" VALUES (15, '2024-10-08 13:29:13.187491+02', 4, '2024-10-08 13:28:56.187+02', 42, 4);
INSERT INTO public."Orders" VALUES (24, '2024-10-16 17:34:59.63864+02', 5, '2024-10-18 02:00:00+02', 8, 3);
INSERT INTO public."Orders" VALUES (14, '2024-10-07 16:36:31.647147+02', 1, '2024-10-07 16:36:21.924+02', 6, 4);
INSERT INTO public."Orders" VALUES (23, '2024-10-10 14:12:48.692835+02', 4, '2024-10-22 02:00:00+02', 26, 5);
INSERT INTO public."Orders" VALUES (25, '2024-10-17 16:30:27.631977+02', 4, '2024-10-24 02:00:00+02', 95, 3);


--
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Products" VALUES (3, 'Funky Fold', 'Premium medium', 4, 5, false);
INSERT INTO public."Products" VALUES (1, 'Ninja Note', 'Premium', 6, 10, true);
INSERT INTO public."Products" VALUES (2, 'Bubblegum', 'Thicc', 9, 15, true);
INSERT INTO public."Products" VALUES (5, 'Confetti Paper', 'Smooth', 2, 3, false);
INSERT INTO public."Products" VALUES (6, 'Fluffy Cloud Paper', 'Transparent', 5, 55, true);
INSERT INTO public."Products" VALUES (4, 'Oopsie Daisy', 'Cheap', 2, 54, true);
INSERT INTO public."Products" VALUES (7, 'a', 'bla', 12, 38, false);


--
-- Data for Name: OrderEntry; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."OrderEntry" VALUES (4, 1, 1, 14);
INSERT INTO public."OrderEntry" VALUES (5, 1, 7, 15);
INSERT INTO public."OrderEntry" VALUES (6, 1, 7, 16);
INSERT INTO public."OrderEntry" VALUES (7, 6, 8, 17);
INSERT INTO public."OrderEntry" VALUES (8, 6, 8, 18);
INSERT INTO public."OrderEntry" VALUES (9, 3, 8, 19);
INSERT INTO public."OrderEntry" VALUES (10, 2, 5, 19);
INSERT INTO public."OrderEntry" VALUES (11, 5, 2, 20);
INSERT INTO public."OrderEntry" VALUES (12, 3, 1, 20);
INSERT INTO public."OrderEntry" VALUES (13, 3, 7, 21);
INSERT INTO public."OrderEntry" VALUES (14, 2, 7, 21);
INSERT INTO public."OrderEntry" VALUES (15, 3, 7, 22);
INSERT INTO public."OrderEntry" VALUES (16, 6, 7, 22);
INSERT INTO public."OrderEntry" VALUES (17, 3, 4, 23);
INSERT INTO public."OrderEntry" VALUES (18, 6, 2, 23);
INSERT INTO public."OrderEntry" VALUES (19, 3, 2, 24);
INSERT INTO public."OrderEntry" VALUES (20, 7, 5, 25);
INSERT INTO public."OrderEntry" VALUES (21, 6, 7, 25);


--
-- Data for Name: ProductProperties; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ProductProperties" VALUES (1, 'string', 1);
INSERT INTO public."ProductProperties" VALUES (2, 'string', 2);
INSERT INTO public."ProductProperties" VALUES (3, 'string', 3);
INSERT INTO public."ProductProperties" VALUES (4, 'string', 4);


--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."__EFMigrationsHistory" VALUES ('20241001140010_Initial', '8.0.8');
INSERT INTO public."__EFMigrationsHistory" VALUES ('20241001150814_initialcreate', '8.0.8');
INSERT INTO public."__EFMigrationsHistory" VALUES ('20241001153906_updateentities1', '8.0.8');
INSERT INTO public."__EFMigrationsHistory" VALUES ('20241001154552_updateentities2', '8.0.8');
INSERT INTO public."__EFMigrationsHistory" VALUES ('20241005182131_updatetables', '8.0.8');


--
-- Name: Customers_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Customers_Id_seq"', 11, true);


--
-- Name: OrderEntry_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrderEntry_Id_seq"', 21, true);


--
-- Name: OrderStatuses_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrderStatuses_Id_seq"', 5, true);


--
-- Name: Orders_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Orders_Id_seq"', 25, true);


--
-- Name: ProductProperties_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProductProperties_Id_seq"', 4, true);


--
-- Name: Products_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Products_Id_seq"', 7, true);


--
-- PostgreSQL database dump complete
--

