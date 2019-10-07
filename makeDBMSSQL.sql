IF OBJECT_ID('dbo.TV', 'U') IS NOT NULL DROP TABLE TV;
IF OBJECT_ID('dbo.Notebook', 'U') IS NOT NULL	DROP TABLE dbo.Notebook;
IF OBJECT_ID('dbo.Smartphone', 'U') IS NOT NULL DROP TABLE dbo.Smartphone;
IF OBJECT_ID('dbo.Rates', 'U') IS NOT NULL DROP TABLE dbo.Rates;
IF OBJECT_ID('dbo.Comments', 'U') IS NOT NULL DROP TABLE dbo.Comments;
IF OBJECT_ID('dbo.Cart', 'U') IS NOT NULL DROP TABLE dbo.Cart;
IF OBJECT_ID('dbo.OrderedProducts', 'U') IS NOT NULL DROP TABLE dbo.OrderedProducts;
IF OBJECT_ID('dbo.Bills', 'U') IS NOT NULL DROP TABLE dbo.Bills;
IF OBJECT_ID('dbo.Orders', 'U') IS NOT NULL DROP TABLE dbo.Orders;
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL DROP TABLE dbo.Users;
IF OBJECT_ID('dbo.Products', 'U') IS NOT NULL DROP TABLE dbo.Products;

CREATE TABLE Users (
	id int identity(1,1) PRIMARY KEY,
	balance int DEFAULT 0 ,
	authorizationLevel int DEFAULT 0,
	email varchar(32) UNIQUE,
	password varchar(200),
	name varchar (32),
	phoneNumber int,
	postalCode int,
	city varchar(32),
	street varchar(32),
	streetNumber int,
  maincustomer int DEFAULT 0
);

INSERT INTO Users(balance,AuthorizationLevel,Email,Password,Name, PhoneNumber, PostalCode, City, Street, StreetNumber, Maincustomer) VALUES (100000, 1, 'h.oliver@gmail.com', 'outdated', 'Horvath Oliver Zoltan', 203933021, 6723, 'Szeged', 'Zoldfa', '3',0);
INSERT INTO Users(balance,AuthorizationLevel,Email,Password,Name, PhoneNumber, PostalCode, City, Street, StreetNumber, Maincustomer) VALUES (100000, 1, 'szabo.tamas@gmail.com', '$2b$10$1MyPk9kTpQu.U3VZ0Q2p3uNmLtTKCKeJJAaPQRKBwm3SB/Vr2jaFq', 'Szabo Tamas', 309533716, 6723, 'Szeged', 'Malom', '13',0);
INSERT INTO Users(balance,AuthorizationLevel,Email,Password,Name, PhoneNumber, PostalCode, City, Street, StreetNumber, Maincustomer) VALUES (100000, 1, 'lukacs.mate@gmail.com', 'pass1234', 'Lukacs Mate', 303827563, 6723, 'Szeged', 'Petofi Sandor', '126',0);
INSERT INTO Users(balance,AuthorizationLevel,Email,Password,Name, PhoneNumber, PostalCode, City, Street, StreetNumber, Maincustomer) VALUES (2313, 0, 'balog.kinga@gmail.com', 'jelszo', 'Balog Kinga', 708423921, 5634, 'Ketegyhaza', 'Robert Karoly', '64',0);
INSERT INTO Users(balance,AuthorizationLevel,Email,Password,Name, PhoneNumber, PostalCode, City, Street, StreetNumber, Maincustomer) VALUES (6523, 0, 'lovasz.tibor@gmail.com', 'nemtalalodki', 'Lovasz Tibor', 308592832, 5043, 'Bekescsaba', 'Nagy Lajos', '2',0);
INSERT INTO Users(balance,AuthorizationLevel,Email,Password,Name, PhoneNumber, PostalCode, City, Street, StreetNumber, Maincustomer) VALUES (4310, 0, 'daniel.balint@gmail.com', 'titkoskod', 'Balint Daniel', 309584732, 6233, 'Murony', 'Fo', '15',0);
INSERT INTO Users(balance,AuthorizationLevel,Email,Password,Name, PhoneNumber, PostalCode, City, Street, StreetNumber, Maincustomer) VALUES (1200, 0, 'bodnaar.peter@gmail.com', 'probajelszo', 'Bodnar Peter', 209382756, 6142, 'Csardaszallas', 'Ady Endre', '63',0);
INSERT INTO Users(balance,AuthorizationLevel,Email,Password,Name, PhoneNumber, PostalCode, City, Street, StreetNumber, Maincustomer) VALUES (2500, 0, 'janki.zoltan@gmail.com', 'minekezide', 'Janki Zoltan Richard', 706328195, 5403, 'Mezotur', 'Lugas', '12',0);
INSERT INTO Users(balance,AuthorizationLevel,Email,Password,Name, PhoneNumber, PostalCode, City, Street, StreetNumber, Maincustomer) VALUES (2000, 0, 'szendrei.david@gmail.com', 'regiazoracle', 'Szendrei David', 708329642, 5502, 'Gyomaendrod', 'Kiraly Lajos', '18',0);


CREATE TABLE  Products(
	id int UNIQUE NOT NULL,
	productName varchar(32),
	productNumber int PRIMARY KEY,
	productColor varchar(32),
	releaseDate DATE,
	manufacturer varchar(32),
	price int,
	quantity int DEFAULT 10,
  productType varchar(20),
	imgURL varchar(200)
);



CREATE TABLE  TV(
	id int UNIQUE NOT NULL,
	productName varchar(32),
	productNumber int PRIMARY KEY,
	productColor varchar(32),
	releaseDate DATE,
	manufacturer varchar(32),
	price int,
	quantity int DEFAULT 10,
  productType varchar(20),
	imgURL varchar(200),
	resolution varchar(32),
	screensize int,
	panelType varchar(40),
	refreshRate int,
	portType varchar(150)
);



CREATE TABLE  Smartphone(
	id int UNIQUE NOT NULL,
	productName varchar(32),
	productNumber int PRIMARY KEY,
	productColor varchar(32),
	releaseDate DATE,
	manufacturer varchar(32),
	price int,
	quantity int DEFAULT 10,
	productType varchar(20),
	imgURL varchar(200),
	resolution varchar(32),
	screensize int,
	panelType varchar(10),
	os varchar(10),
	ram int,
	rom int
);



CREATE TABLE  Notebook(
	id int UNIQUE NOT NULL ,
	productName varchar(32),
	productNumber int PRIMARY KEY,
	productColor varchar(32),
	releaseDate DATE,
	manufacturer varchar(32),
	price int,
	quantity int DEFAULT 10,
  productType varchar(20),
	imgURL varchar(200),
	resolution varchar(32),
	screensize int,
	panelType varchar(10),
	os varchar(10) DEFAULT null,
	ram int,
	cpu varchar(60),
	storageType varchar(15),
	storageCapacity int
);

INSERT INTO Products VALUES (1, 'UE43NU7122KXXH', 1263850, 'BLK', '2018-10-03', 'SAMSUNG', 112987, 3,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77651280/fee_786_587_png/SAMSUNG-UE43NU7122KXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (1, 'UE43NU7122KXXH', 1263850, 'BLK', '2018-10-03', 'SAMSUNG', 112987, 3, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77651280/fee_786_587_png/SAMSUNG-UE43NU7122KXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 108, 'UHD', 60, '3x HDMI, 2x USB, Komponens bemenet, Kompozit bemenet, RJ-45, Digitális audio kimenet, CI slot');
INSERT INTO Products VALUES (2, '49UK6400PLF', 1261725, 'BROWN', '2018-11-05', 'LG', 118109, 5,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77531820/fee_786_587_png/LG-49UK6400PLF-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (2, '49UK6400PLF', 1261725, 'BROWN', '2018-11-05', 'LG', 118109, 5, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77531820/fee_786_587_png/LG-49UK6400PLF-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 123, 'UHD', 120, '3x HDMI, 2x USB, RJ-45, Komponens bemenet, Digitális audio kimenet, CI slot');
INSERT INTO Products VALUES (3, '55UK6300MLB', 1261728, 'BLK', '2018-09-23', 'LG', 142991, 1,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77480483/fee_786_587_png/LG-55UK6300MLB-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (3, '55UK6300MLB', 1261728, 'BLK', '2018-09-23', 'LG', 142991, 1, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77480483/fee_786_587_png/LG-55UK6300MLB-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 139, 'UHD', 60, '3x HDMI, 2x USB, RJ-45, Komponens bemenet, Digitális audio kimenet, CI slot');
INSERT INTO Products VALUES (4, 'UE49NU7102KXXH', 1263575, 'BLK', '2018-01-04', 'SAMSUNG', 124999, 5,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77651280/fee_786_587_png/SAMSUNG-UE40NU7122KXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (4, 'UE49NU7102KXXH', 1263575, 'BLK', '2018-01-04', 'SAMSUNG', 124999, 5, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77651280/fee_786_587_png/SAMSUNG-UE40NU7122KXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 123, 'UHD', 140, '3x HDMI, 2x USB, Komponens bemenet, Kompozit bemenet, RJ-45, Digitálius audio kimenet (optikai), CI slot');
INSERT INTO Products VALUES (5, '55SK8500PLA', 1260468, 'BLK,SILVER', '2018-10-03', 'LG', 267987, 0,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77530732/fee_786_587_png/LG-55SK8500PLA-4K-SUHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (5, '55SK8500PLA', 1260468, 'BLK,SILVER', '2018-10-03', 'LG', 267987, 0, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77530732/fee_786_587_png/LG-55SK8500PLA-4K-SUHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 139, 'SUHD', 60, '4x HDMI, 3x USB, RJ-45, Digitális audio kimenet, Fejhallgató kimenet, CI slot');
INSERT INTO Products VALUES (6, '43UK6470PLC', 1261724, 'GRAY', '2018-10-03', 'LG', 114987, 6,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77480808/fee_786_587_png/LG-43UK6470PLC-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (6, '43UK6470PLC', 1261724, 'GRAY', '2018-10-03', 'LG', 114987, 6, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77480808/fee_786_587_png/LG-43UK6470PLC-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 108, 'UHD', 120, '3x HDMI, 2x USB, RJ-45, Komponens bemenet, Digitális audio kimenet, CI slot');
INSERT INTO Products VALUES (7, '43UK6950PLB', 1260457, 'BLK,TITAN', '2018-10-03', 'LG', 137987, 5,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77530323/fee_325_225_png/LG-43UK6950PLB-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (7, '43UK6950PLB', 1260457, 'BLK,TITAN', '2018-10-03', 'LG', 137987, 5, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77530323/fee_325_225_png/LG-43UK6950PLB-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 108, 'UHD', 120, '4x HDMI, 2x USB, RJ-45, Komponens bemenet, Digitális audio kimenet, CI slot');
INSERT INTO Products VALUES (8, 'UE75NU7102KXXH', 1258952, 'BLK', '2018-10-03', 'SAMSUNG', 351999, 3,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77429382/fee_786_587_png/SAMSUNG-UE75NU7102KXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (8, 'UE75NU7102KXXH', 1258952, 'BLK', '2018-10-03', 'SAMSUNG', 351999, 3, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77429382/fee_786_587_png/SAMSUNG-UE75NU7102KXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 189, 'UHD',144, '3x HDMI, 2x USB, Komponens bemenet, Kompozit bemenet, RJ-45, Digitálius audio kimenet (optikai), CI slot');
INSERT INTO Products VALUES (9, '43UK6300MLB', 1261722, 'BLK', '2018-10-03', 'LG', 110987, 14,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77480483/fee_786_587_png/LG-43UK6300MLB-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (9, '43UK6300MLB', 1261722, 'BLK', '2018-10-03', 'LG', 110987, 14, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77480483/fee_786_587_png/LG-43UK6300MLB-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 108, 'UHD', 60, '3x HDMI, 2x USB, RJ-45, Komponens bemenet, Digitális audio kimenet, CI slot');
INSERT INTO Products VALUES (10, 'UE49NU8002TXXH', 1258971, 'BLK,SILVER', '2018-10-03', 'LG', 184799, 12,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-74704067/fee_786_587_png/SAMSUNG-Outlet-UE49MU8002TXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (10, 'UE49NU8002TXXH', 1258971, 'BLK,SILVER', '2018-10-03', 'LG', 184799, 12, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-74704067/fee_786_587_png/SAMSUNG-Outlet-UE49MU8002TXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 123, 'UHD', 60, '4x HDMI, 2x USB, RJ-45, Digitális audio kimenet (optikai), CI slot');

INSERT INTO Products VALUES (11, 'Mate 20 Lite', 1268945, 'BLK', '2018-10-03', 'HUAWEI', 84251, 3, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-78310778/fee_786_587_png/HUAWEI-Mate-20-Lite-Dual-SIM-fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon');
INSERT INTO Smartphone VALUES (11, 'Mate 20 Lite', 1268945, 'BLK', '2018-10-03', 'HUAWEI', 84251, 3, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-78310778/fee_786_587_png/HUAWEI-Mate-20-Lite-Dual-SIM-fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon', '2340 x 1080', 16, 'IPS', 'Android', 3, 64);
INSERT INTO Products VALUES (12, 'Galaxy S10+', 1284188, 'BLK', '2018-11-05', 'SAMSUNG', 344990, 5, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-80519897/fee_786_587_png/SAMSUNG-Galaxy-S10--1TB-DualSIM-Fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon--%28SM-G975%29');
INSERT INTO Smartphone VALUES (12, 'Galaxy S10+', 1284188, 'BLK', '2018-11-05', 'SAMSUNG', 344990, 5, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-80519897/fee_786_587_png/SAMSUNG-Galaxy-S10--1TB-DualSIM-Fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon--%28SM-G975%29', '3040 x 1440', 16, 'AMOLED', 'Android', 4, 128);
INSERT INTO Products VALUES (13, 'P20 Lite', 1258580, 'BLK', '2018-09-23', 'HUWAEI', 79538, 1, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-77301386/fee_786_587_png/HUAWEI-P20-Lite-DualSIM-%C3%A9jfekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon');
INSERT INTO Smartphone VALUES (13, 'P20 Lite', 1258580, 'BLK', '2018-09-23', 'HUAWEI', 79538, 1, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-77301386/fee_786_587_png/HUAWEI-P20-Lite-DualSIM-%C3%A9jfekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon', '2280 x 1080', 14, 'LCD', 'Android', 4, 64);
INSERT INTO Products VALUES (14, 'P smart 2019', 1279904, 'BLK', '2018-01-04', 'HUAWEI', 69999, 5, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-80143872/fee_786_587_png/HUAWEI-P-smart-2019-DualSIM--Fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon');
INSERT INTO Smartphone VALUES (14, 'P smart 2019', 1279904, 'BLK', '2018-01-04', 'HUAWEI', 69999, 5, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-80143872/fee_786_587_png/HUAWEI-P-smart-2019-DualSIM--Fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon', '2340 x 1080', 14, 'IPS', 'Android', 4, 64);
INSERT INTO Products VALUES (15, 'iPhone 6S 32GB', 1213791, 'BLK,SILVER', '2018-10-03', 'APPLE', 109999, 0, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-71653362/fee_786_587_png/APPLE-iPhone-6S-32GB-asztrosz%C3%BCrke-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28mn0w2gh-a%29');
INSERT INTO Smartphone VALUES (15, 'iPhone 6S 32GB', 1213791, 'BLK,SILVER', '2018-10-03', 'APPLE', 109999, 0, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-71653362/fee_786_587_png/APPLE-iPhone-6S-32GB-asztrosz%C3%BCrke-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28mn0w2gh-a%29', '1334 x 750', 15, 'AMOLED', 'iOS', 3, 32);
INSERT INTO Products VALUES (16, 'Y7 Prime', 1259624, 'GRAY', '2018-10-03', 'HUAWEI', 49605, 6, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-77634161/fee_786_587_png/HUAWEI-Y7-Prime-2018-Dual-SIM-fekete-32GB-k%C3%A1rtyaf%C3%BCggetlen-okostelefon');
INSERT INTO Smartphone VALUES (16, 'Y7 Prime', 1259624, 'GRAY', '2018-10-03', 'HUAWEI', 49605, 6, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-77634161/fee_786_587_png/HUAWEI-Y7-Prime-2018-Dual-SIM-fekete-32GB-k%C3%A1rtyaf%C3%BCggetlen-okostelefon', '1440 x 720', 16, 'IPS', 'Android', 4, 32);
INSERT INTO Products VALUES (17, 'Galaxy A6', 1262120, 'BLK,TITAN', '2018-10-03', 'SAMSUNG', 69999, 5, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-77576631/fee_786_587_png/SAMSUNG-Galaxy-A6--%282018%29-fekete-Dual-SIM-32GB-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28SM-A605F%29');
INSERT INTO Smartphone VALUES (17, 'Galaxy A6', 1262120, 'BLK,TITAN', '2018-10-03', 'SAMSUNG', 69999, 5, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-77576631/fee_786_587_png/SAMSUNG-Galaxy-A6--%282018%29-fekete-Dual-SIM-32GB-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28SM-A605F%29', '1480 x 720', 13, 'AMOLED', 'iOS', 3, 32);
INSERT INTO Products VALUES (18, 'Galaxy S9', 1255010, 'BLK', '2018-10-03', 'SAMSUNG', 165353, 3, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-77087588/fee_786_587_png/SAMSUNG-Galaxy-S9-%28SM-G960F%29-DualSIM-%C3%A9jfekete-64GB-k%C3%A1rtyaf%C3%BCggetlen-okostelefon');
INSERT INTO Smartphone VALUES (18, 'Galaxy S9', 1255010, 'BLK', '2018-10-03', 'SAMSUNG', 165353, 3, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-77087588/fee_786_587_png/SAMSUNG-Galaxy-S9-%28SM-G960F%29-DualSIM-%C3%A9jfekete-64GB-k%C3%A1rtyaf%C3%BCggetlen-okostelefon', '2960 x 1440', 14, 'AMOLED', 'Android', 4, 64);
INSERT INTO Products VALUES (19, 'Galaxy A7', 1271173, 'BLK', '2018-10-03', 'SAMSUNG', 74999, 14, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-78509078/fee_786_587_png/SAMSUNG-Galaxy-A7-DualSIM-fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28SM-A750%29');
INSERT INTO Smartphone VALUES (19, 'Galaxy A7', 1271173, 'BLK', '2018-10-03', 'SAMSUNG', 74999, 14, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-78509078/fee_786_587_png/SAMSUNG-Galaxy-A7-DualSIM-fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28SM-A750%29', '2220 x 1080', 15, 'AMOLED', 'Android', 4, 64);
INSERT INTO Products VALUES (20, 'iPhone 7 32GB', 1213799, 'BLK,SILVER', '2018-10-03', 'APPLE', 149999, 12, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-76402070/fee_786_587_png/APPLE-iPhone-7-32GB-fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28mn8x2gh-a%29');
INSERT INTO Smartphone VALUES (20, 'iPhone 7 32GB', 1213799, 'BLK,SILVER', '2018-10-03', 'APPLE', 149999, 12, 'smartphone','https://picscdn.redblue.de/doi/pixelboxx-mss-76402070/fee_786_587_png/APPLE-iPhone-7-32GB-fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28mn8x2gh-a%29', '1334 x 750', 11, 'AMOLED', 'iOS', 3, 32);

INSERT INTO Products VALUES (21, '15-ra049nh 3QT64EA', 1263167, 'BLK', '2018-10-03', 'HP', 94409, 3, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-77520646/fee_786_587_png/HP-15-ra049nh-laptop-3QT64EA-%2815-6%22-matt-Celeron-4GB-500GB-HDD-Windows-10%29');
INSERT INTO Notebook VALUES (21, '15-ra049nh 3QT64EA', 1263167, 'BLK', '2018-10-03', 'HP', 94409, 3, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-77520646/fee_786_587_png/HP-15-ra049nh-laptop-3QT64EA-%2815-6%22-matt-Celeron-4GB-500GB-HDD-Windows-10%29', '1366 x 768', 15, 'IPS', 'Windows 10', 4, 'Intel® Celeron® N3060 processzor', 'HDD', '500' );
INSERT INTO Products VALUES (22, 'MacBook Air 13 (2017)', 1236801, 'BLK', '2018-11-05', 'APPLE', 309989, 5, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-75574271/fee_786_587_png/APPLE-MacBook-Air-13%22-%282017%29-Core-i5-1-8G-8GB-128GB-SSD-%28mqd32mg-a%29');
INSERT INTO Notebook VALUES (22, 'MacBook Air 13 (2017)', 1236801, 'BLK', '2018-11-05', 'APPLE', 309989, 5, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-75574271/fee_786_587_png/APPLE-MacBook-Air-13%22-%282017%29-Core-i5-1-8G-8GB-128GB-SSD-%28mqd32mg-a%29', '1440 x 900', 15, 'AMOLED', 'OS Sierra', 8, 'Intel® Core™ i5-5350U processzor', 'SSD', '128' );
INSERT INTO Products VALUES (23, '250 G6 4BD80EA', 1278153, 'BLK', '2018-09-23', 'HP', 105456, 1, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-79989163/fee_786_587_png/HP-250-G6-sz%C3%BCrke-laptop-4BD80EA-%2815-6%22-FullHD-Celeron-4GB-128-GB-SSD-Windows10%29');
INSERT INTO Notebook VALUES (23, '250 G6 4BD80EA', 1278153, 'BLK', '2018-09-23', 'HP', 105456, 1, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-79989163/fee_786_587_png/HP-250-G6-sz%C3%BCrke-laptop-4BD80EA-%2815-6%22-FullHD-Celeron-4GB-128-GB-SSD-Windows10%29', '1920 x 1080', 15, 'IPS', 'Windows 10', 4, 'Intel® Celeron® N4000 processzor', 'SSD', '128' );
INSERT INTO Products VALUES (24, 'IdeaPad 330 81DC00KQHV', 1277671, 'BLK', '2018-01-04', 'LENOVO', 120647, 5, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78229846/fee_786_587_png/LENOVO-IdeaPad-330-laptop-81DC00KQHV-%2815-6%22-HD-Core-i3-4GB-128-GB-SSD-Windows-10%29');
INSERT INTO Notebook VALUES (24, 'IdeaPad 330 81DC00KQHV', 1277671, 'BLK', '2018-01-04', 'LENOVO', 120647, 5, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78229846/fee_786_587_png/LENOVO-IdeaPad-330-laptop-81DC00KQHV-%2815-6%22-HD-Core-i3-4GB-128-GB-SSD-Windows-10%29', '1920 x 1080', 15, 'IPS', 'Windows 10', 4, 'Intel® Celeron® N4000 processzor', 'SSD', '128' );
INSERT INTO Products VALUES (25, 'Stark NX14 PRO', 1267629, 'BLK,SILVER', '2018-10-03', 'NAVON', 54989, 0, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78590494/fee_786_587_png/NAVON-Stark-NX14-PRO-laptop-%2814-1%22-HD--Atom-X5-2GB-32-GB-eMMC-Windows10%29');
INSERT INTO Notebook VALUES (25, 'Stark NX14 PRO', 1267629, 'BLK,SILVER', '2018-10-03', 'NAVON', 54989, 0, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78590494/fee_786_587_png/NAVON-Stark-NX14-PRO-laptop-%2814-1%22-HD--Atom-X5-2GB-32-GB-eMMC-Windows10%29', '1920 x 1080', 15, 'IPS', 'Windows 10', 4, 'Intel® Celeron® N4000 processzor', 'SSD', '128' );
INSERT INTO Products VALUES (26, 'TUF Gaming FX705GD-EW078', 1281545, 'GRAY', '2018-10-03', 'ASUS', 307989, 6, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-80273419/fee_786_587_png/ASUS-TUF-Gaming-FX705GD-EW078-gamer-laptop-%2817-3%22-FHD-Core-i7-8GB-256-GB-SSD-GTX-1050-OC-4GB-NoOS%29');
INSERT INTO Notebook VALUES (26, 'TUF Gaming FX705GD-EW078', 1281545, 'GRAY', '2018-10-03', 'ASUS', 307989, 6, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-80273419/fee_786_587_png/ASUS-TUF-Gaming-FX705GD-EW078-gamer-laptop-%2817-3%22-FHD-Core-i7-8GB-256-GB-SSD-GTX-1050-OC-4GB-NoOS%29', '1920 x 1080', 17, 'AMOLED', 'Windows 10', 8, 'Intel® Core™ i7-8750H processzor', 'SSD', '256' );
INSERT INTO Products VALUES (27, 'Yoga 530 2in1 81EK00PQHV', 1278318, 'BLK,TITAN', '2018-10-03', 'LENOVO', 184011, 5, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78450228/fee_786_587_png/LENOVO-Yoga-530-2in1-eszk%C3%B6z-81EK00PQHV-%2814-1%22-FHD-Touch-Core-i3-4GB-256-GD-SSD-Windows-10%29');
INSERT INTO Notebook VALUES (27, 'Yoga 530 2in1 81EK00PQHV', 1278318, 'BLK,TITAN', '2018-10-03', 'LENOVO', 184011, 5, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78450228/fee_786_587_png/LENOVO-Yoga-530-2in1-eszk%C3%B6z-81EK00PQHV-%2814-1%22-FHD-Touch-Core-i3-4GB-256-GD-SSD-Windows-10%29', '1920 x 1080', 14, 'IPS', 'Windows 10', 4, 'Intel® Core™ i3-7130U processzor', 'SSD', '256' );
INSERT INTO Products VALUES (28, 'V130 81HN00HKHV', 1284203, 'BLK', '2018-10-03', 'LENOVO', 125117, 3, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78913164/fee_786_587_png/LENOVO-V130-sz%C3%BCrke-laptop-81HN00HJHV-%2815-6%22-FullHD-Core-i3-4GB-128-GB-SSD-DOS%29');
INSERT INTO Notebook VALUES (28, 'V130 81HN00HKHV', 1284203, 'BLK', '2018-10-03', 'LENOVO', 125117, 3, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78913164/fee_786_587_png/LENOVO-V130-sz%C3%BCrke-laptop-81HN00HJHV-%2815-6%22-FullHD-Core-i3-4GB-128-GB-SSD-DOS%29', '1920 x 1080', 15, 'IPS', 'Windows 10', 4, 'Intel® Core™ i3-6006U processzor', 'SSD', '128' );
INSERT INTO Products VALUES (29, '15-ra048nh 3QT62EA', 1263166, 'BLK', '2018-10-03', 'HP', 76409, 14, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-76574989/fee_786_587_png/HP-15-ra048nh-laptop-3QT62EA-%2815-6%22-matt-Celeron-4GB-500GB-HDD-DOS%29');
INSERT INTO Notebook VALUES (29, '15-ra048nh 3QT62EA', 1263166, 'BLK', '2018-10-03', 'HP', 76409, 14, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-76574989/fee_786_587_png/HP-15-ra048nh-laptop-3QT62EA-%2815-6%22-matt-Celeron-4GB-500GB-HDD-DOS%29', '1366 x 768', 15, 'IPS', 'Windows 10', 4, 'Intel® Celeron® N3060 processzor', 'HDD', '500' );
INSERT INTO Products VALUES (30, 'Pavilion x360 2in1 4TW27EA', 1270125, 'BLK,SILVER', '2018-10-03', 'HP', 249989, 12, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-76043215/fee_786_587_png/HP-Pavilion-x360-14-cd0003nh-ez%C3%BCst-2in1-eszk%C3%B6z-4TW27EA-%2814%22-FullHD-touch-Core-i5-8GB-256GB-Windows-10%29');
INSERT INTO Notebook VALUES (30, 'Pavilion x360 2in1 4TW27EA', 1270125, 'BLK,SILVER', '2018-10-03', 'HP', 249989, 12, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-76043215/fee_786_587_png/HP-Pavilion-x360-14-cd0003nh-ez%C3%BCst-2in1-eszk%C3%B6z-4TW27EA-%2814%22-FullHD-touch-Core-i5-8GB-256GB-Windows-10%29', '1366 x 768', 14, 'IPS', 'Windows 10', 8, 'Intel® Core™ i5-8250U processzor', 'SSD', '256' );

CREATE TABLE Rates(
	product_Id int,
	user_Id int,
	rateValue float,
	FOREIGN KEY (product_Id) REFERENCES Products(id),
	FOREIGN KEY (user_Id) REFERENCES Users(id),
	PRIMARY KEY (product_Id, user_Id)
);


INSERT INTO Rates VALUES (1,1,10);
INSERT INTO Rates VALUES (2,2,8);
INSERT INTO Rates VALUES (3,1,5);
INSERT INTO Rates VALUES (4,3,7);
INSERT INTO Rates VALUES (5,1,4);
INSERT INTO Rates VALUES (6,2,7);
INSERT INTO Rates VALUES (7,1,2);
INSERT INTO Rates VALUES (8,2,7);
INSERT INTO Rates VALUES (9,2,2);
INSERT INTO Rates VALUES (10,1,2);
INSERT INTO Rates VALUES (11,3,2);
INSERT INTO Rates VALUES (12,2,7);
INSERT INTO Rates VALUES (13,1,2);
INSERT INTO Rates VALUES (14,2,7);
INSERT INTO Rates VALUES (15,3,5);
INSERT INTO Rates VALUES (16,2,6);
INSERT INTO Rates VALUES (17,3,4);
INSERT INTO Rates VALUES (18,1,3);
INSERT INTO Rates VALUES (19,2,7);
INSERT INTO Rates VALUES (20,3,4);
INSERT INTO Rates VALUES (21,2,7);
INSERT INTO Rates VALUES (22,2,8);
INSERT INTO Rates VALUES (23,1,6);
INSERT INTO Rates VALUES (24,2,4);
INSERT INTO Rates VALUES (25,1,8);
INSERT INTO Rates VALUES (26,2,6);
INSERT INTO Rates VALUES (27,2,8);
INSERT INTO Rates VALUES (28,3,8);
INSERT INTO Rates VALUES (29,3,9);
INSERT INTO Rates VALUES (30,3,5);
INSERT INTO Rates VALUES (27,1,7);

CREATE TABLE Comments(
	product_Id int,
	user_Id int,
	content varchar(100),
	commentDate Date,
	FOREIGN KEY (product_Id) REFERENCES Products(id),
	FOREIGN KEY (user_Id) REFERENCES Users(id),
	PRIMARY KEY (product_Id, user_Id)
);

INSERT INTO Comments VALUES (1,1,'Nagyon szuper termek, azt kaptam amit vartam, Koszonom!', '2019-03-09');
INSERT INTO Comments VALUES (2,1,'Az eddigi legszebb kepe van, amit valaha lattam!', '2019-03-09');
INSERT INTO Comments VALUES (3,1,'Strapabiro, eros es hatarozott a megjelenese.', '2019-03-09');
INSERT INTO Comments VALUES (4,1,'Igazi elegans darab.', '2019-03-09');
INSERT INTO Comments VALUES (5,1,'Nagyon tetszik!', '2019-03-09');
INSERT INTO Comments VALUES (6,1,'Jo vetel volt, nem bantam meg.', '2019-03-09');
INSERT INTO Comments VALUES (7,1,'Ujra megvennem, eddigi legjobb amit vettem.', '2019-03-09');
INSERT INTO Comments VALUES (8,1,'Csodalatos tueles kepe van, legjobb vetel.', '2019-03-09');
INSERT INTO Comments VALUES (9,1,'Nagyon elegedett vagyok vele, es gyors pontos volt a szallitas.', '2019-03-09');
INSERT INTO Comments VALUES (10,1,'Azt kaptam amit vartam, tokeletes ugyfelkiszolgalas.', '2019-03-09');
INSERT INTO Comments VALUES (11,1,'Mindenkinek ajanlom! Z.', '2019-03-09');
INSERT INTO Comments VALUES (12,1,'Eddigi legjobb.', '2019-03-09');
INSERT INTO Comments VALUES (13,1,'Ar/ertek aranyban a legjobb.', '2019-03-09');
INSERT INTO Comments VALUES (14,1,'Marha gyors, orom hasznalni.', '2019-03-09');
INSERT INTO Comments VALUES (15,1,'Elegans darab, koszonom a preciz szallitast.', '2019-03-09');
INSERT INTO Comments VALUES (16,1,'Mindenkinek ajanlom, legjobb vetel.', '2019-03-09');
INSERT INTO Comments VALUES (17,1,'Ha vasarolni tervezel, ezt ajanlom.', '2019-03-09');
INSERT INTO Comments VALUES (18,1,'A leheto legjobb ar ertek aranyu a penztiacon.', '2019-03-09');
INSERT INTO Comments VALUES (19,1,'Nem csalodtam benne, nagyon olcso de mindent tud amit a dragabbak is.', '2019-03-09');
INSERT INTO Comments VALUES (20,1,'Megeri a penzt, nagyon franko.', '2019-03-09');
INSERT INTO Comments VALUES (21,1,'Rohadt jo !', '2019-03-09');
INSERT INTO Comments VALUES (22,1,'Tokeletes cucc, ajanlom hogy vegyetek vigyetek!', '2019-03-09');
INSERT INTO Comments VALUES (23,1,'Talan egy kicsit draga, de minden penzt meger.', '2019-03-09');
INSERT INTO Comments VALUES (24,1,'Ha most tervezel venni, ez a legjobb dontes!', '2019-03-09');
INSERT INTO Comments VALUES (25,1,'Nalam 5/5!', '2019-03-09');
INSERT INTO Comments VALUES (26,1,'Sokadik vasarlasom innen, most sem csalodtam!', '2019-03-09');
INSERT INTO Comments VALUES (27,1,'Mindent tud amit kell, ennyi penzert.', '2019-03-09');
INSERT INTO Comments VALUES (28,1,'Nagyon kiraly, ajanlom ! 10/10', '2019-03-09');
INSERT INTO Comments VALUES (29,1,'Nem jott be, allandoan lefagy :/ ', '2019-03-09');
INSERT INTO Comments VALUES (30,1,'Nem tul gyors, banom hogy nem masikat vettem.', '2019-03-09');

CREATE TABLE Orders(
	id int PRIMARY KEY identity(1,1),
	user_Id int,
	buyingDate Date,
  payDate Date DEFAULT NULL,
	status varchar(35),
  totalPrice int,
	FOREIGN KEY (user_Id) REFERENCES Users(id)
);
CREATE TABLE OrderedProducts(
  order_Id int,
  product_Id int,
  quantity int DEFAULT 1,
  FOREIGN KEY (order_Id) REFERENCES Orders(id),
	FOREIGN KEY (product_Id) REFERENCES Products(id),
  PRIMARY KEY (product_Id, order_Id)
);


INSERT INTO Orders(User_Id, BuyingDate, PayDate, Status, totalprice) VALUES (6, '2019-04-13', '2019-04-20','Fizetve',500000);
INSERT INTO Orders(User_Id, BuyingDate, PayDate, Status, totalprice) VALUES (7, '2019-04-20', '2019-04-20','Szallitas alatt',500000);
INSERT INTO Orders(User_Id, BuyingDate, PayDate, Status, totalprice) VALUES (8, '2019-04-19',null,'Fizetesre var',500000);
INSERT INTO Orders(User_Id, BuyingDate, PayDate, Status, totalprice) VALUES (9, '2019-04-18',null,'Fizetesre var',500000);
INSERT INTO Orders(User_Id, BuyingDate, PayDate, Status, totalprice) VALUES (4, '2019-04-15',  '2019-04-20','Fizetve',500000);
INSERT INTO Orders(User_Id, BuyingDate, PayDate, Status, totalprice) VALUES (5, '2019-04-15', '2019-04-20','Szallitas alatt',500000);
INSERT INTO Orders(User_Id, BuyingDate, PayDate, Status, totalprice) VALUES (6, '2019-04-17', '2019-04-20','Szallitas alatt',500000);
INSERT INTO Orders(User_Id, BuyingDate, PayDate, Status, totalprice) VALUES (7, '2019-04-11',null ,'Fizetesre var',500000);
INSERT INTO Orders(User_Id, BuyingDate, PayDate, Status, totalprice) VALUES (8, '2019-04-13', '2019-04-20','Fizetve',500000);
INSERT INTO Orders(User_Id, BuyingDate, PayDate, Status, totalprice) VALUES (2, '2019-04-14', '2019-04-20','Fizetve',500000);

INSERT INTO OrderedProducts VALUES(1,1,1);
INSERT INTO OrderedProducts VALUES(2,2,1);
INSERT INTO OrderedProducts VALUES(3,3,1);
INSERT INTO OrderedProducts VALUES(4,4,1);
INSERT INTO OrderedProducts VALUES(5,5,1);
INSERT INTO OrderedProducts VALUES(6,6,1);
INSERT INTO OrderedProducts VALUES(7,7,1);
INSERT INTO OrderedProducts VALUES(8,8,1);
INSERT INTO OrderedProducts VALUES(9,9,1);
INSERT INTO OrderedProducts VALUES(10,10,1);

CREATE TABLE Bills(
	id int PRIMARY KEY identity(1,1),
	order_id int,
	vat int DEFAULT 27,
	FOREIGN KEY (order_id) REFERENCES Orders(id)
);

INSERT INTO Bills(Order_id, VAT) VALUES (1,27);
INSERT INTO Bills(Order_id, VAT) VALUES (2,27);
INSERT INTO Bills(Order_id, VAT) VALUES (3,27);
INSERT INTO Bills(Order_id, VAT) VALUES (4,27);
INSERT INTO Bills(Order_id, VAT) VALUES (5,27);
INSERT INTO Bills(Order_id, VAT) VALUES (6,27);
INSERT INTO Bills(Order_id, VAT) VALUES (7,27);
INSERT INTO Bills(Order_id, VAT) VALUES (8,27);
INSERT INTO Bills(Order_id, VAT) VALUES (9,27);
INSERT INTO Bills(Order_id, VAT) VALUES (10,27);

CREATE TABLE Cart(
  product_Id int,
  user_Id int,
  quantity int,
  FOREIGN KEY (product_Id) REFERENCES Products(id),
    FOREIGN KEY (user_Id) REFERENCES Users(id),
	PRIMARY KEY (product_Id, user_Id)
);
GO

CREATE OR ALTER TRIGGER wanna_be_main_customer
ON OrderedProducts AFTER INSERT
AS
BEGIN
DECLARE @newOrder_id int, @total int, @bool int
SELECT @newOrder_id = order_id FROM inserted
SELECT @bool = maincustomer FROM Users WHERE id = (SELECT distinct user_ID FROM Orders WHERE id=@newOrder_id);

SELECT @total = COALESCE(SUM(TOTALPRICE),0) FROM Orders  WHERE User_id = (SELECT distinct User_ID FROM Orders WHERE ID=@newOrder_id);
IF (@total>1000000 AND @bool=0)
  BEGIN
	UPDATE USERS SET Maincustomer=1 WHERE ID =(SELECT distinct User_ID FROM Orders WHERE ID=@newOrder_id);
  END
END

GO
/*
CREATE OR REPLACE TRIGGER wanna_be_main_customer
AFTER INSERT ON OrderedProducts
FOR EACH ROW
DECLARE
  total number;
  bool number;
BEGIN
  SELECT Maincustomer INTO bool FROM Users WHERE id = (SELECT distinct User_ID FROM Orders WHERE ID=:NEW.ORDER_ID);
  SELECT COALESCE(SUM(TOTALPRICE),0) INTO total FROM Orders  WHERE User_id = (SELECT distinct User_ID FROM Orders WHERE ID=:NEW.ORDER_ID);
  IF (total>1000000 AND bool=0) THEN
    UPDATE USERS SET Maincustomer=1 WHERE ID =(SELECT distinct User_ID FROM Orders WHERE ID=:NEW.ORDER_ID);
  END IF;
END;*/
