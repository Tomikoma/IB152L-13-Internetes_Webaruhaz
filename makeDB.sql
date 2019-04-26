DROP TABLE TV;
DROP TABLE Notebook;
DROP TABLE Smartphone;
DROP TABLE Rates;
DROP TABLE Comments;
DROP TABLE Bills;
DROP TABLE Orders;
DROP TABLE Users;
DROP TABLE Products;

DROP SEQUENCE seq_users;
DROP SEQUENCE seq_products;
DROP SEQUENCE seq_orders;
DROP SEQUENCE seq_bills;


CREATE SEQUENCE seq_users
MINVALUE 0
START WITH 0
INCREMENT BY 1
CACHE 10;

CREATE TABLE Users (
	id int UNIQUE NOT NULL,
	balance int DEFAULT 0 ,
	AuthorizationLevel int DEFAULT 0,
	Email varchar(32) UNIQUE,
	Password varchar(200),
	Name varchar (32),
	PhoneNumber int,
	PostalCode int,
	City varchar(32),
	Street varchar(32),
	StreetNumber int
);


INSERT INTO Users VALUES (seq_users.nextval, 100000, 1, 'h.oliver@gmail.com', 'outdated', 'Horvath Oliver Zoltan', 203933021, 6723, 'Szeged', 'Zoldfa', '3');
INSERT INTO Users VALUES (seq_users.nextval, 100000, 1, 'szabo.tamas@gmail.com', 'uptodate', 'Szabo Tamas', 309533716, 6723, 'Szeged', 'Malom', '13');
INSERT INTO Users VALUES (seq_users.nextval, 100000, 1, 'lukacs.mate@gmail.com', 'pass1234', 'Lukacs Mate', 303827563, 6723, 'Szeged', 'Petofi Sandor', '126');
INSERT INTO Users VALUES (seq_users.nextval, 2313, 0, 'balog.kinga@gmail.com', 'jelszo', 'Balog Kinga', 708423921, 5634, 'Ketegyhaza', 'Robert Karoly', '64');
INSERT INTO Users VALUES (seq_users.nextval, 6523, 0, 'lovasz.tibor@gmail.com', 'nemtalalodki', 'Lovasz Tibor', 308592832, 5043, 'Bekescsaba', 'Nagy Lajos', '2');
INSERT INTO Users VALUES (seq_users.nextval, 4310, 0, 'daniel.balint@gmail.com', 'titkoskod', 'Balint Daniel', 309584732, 6233, 'Murony', 'Fo', '15');
INSERT INTO Users VALUES (seq_users.nextval, 1200, 0, 'bodnaar.peter@gmail.com', 'probajelszo', 'Bodnar Peter', 209382756, 6142, 'Csardaszallas', 'Ady Endre', '63');
INSERT INTO Users VALUES (seq_users.nextval, 2500, 0, 'janki.zoltan@gmail.com', 'minekezide', 'Janki Zoltan Richard', 706328195, 5403, 'Mezotur', 'Lugas', '12');
INSERT INTO Users VALUES (seq_users.nextval, 3000, 0, 'nemethg.gabor@gmail.com', 'amyadminjobb', 'Nemeth Gabor', 7085621345, 5421, 'Szeged', 'Lugas', '23');
INSERT INTO Users VALUES (seq_users.nextval, 2000, 0, 'szendrei.david@gmail.com', 'regiazoracle', 'Szendrei David', 708329642, 5502, 'Gyomaendrod', 'Kiraly Lajos', '18');

CREATE SEQUENCE seq_products
MINVALUE 0
START WITH 0
INCREMENT BY 1
CACHE 10;


CREATE TABLE  Products(
	Id int UNIQUE NOT NULL,
	ProductName varchar(32),
	ProductNumber int PRIMARY KEY,
	ProductColor varchar(32),
	ReleaseDate DATE,
	Manufacturer varchar(32),
	Price int,
	Quantity int DEFAULT 10,
  	ProductType varchar(20),
	imgURL varchar(200)
);



CREATE TABLE  TV(
	Id int UNIQUE NOT NULL,
	ProductName varchar(32),
	ProductNumber int PRIMARY KEY,
	ProductColor varchar(32),
	ReleaseDate DATE,
	Manufacturer varchar(32),
	Price int,
	Quantity int DEFAULT 10,
	ProductType varchar(20),
	imgURL varchar(200),
	Resolution varchar(32),
	Screensize int,
	Paneltype varchar(40),
	RefreshRate int,
	PortType varchar(150)
);



CREATE TABLE  Smartphone(
	Id int UNIQUE NOT NULL,
	ProductName varchar(32),
	ProductNumber int PRIMARY KEY,
	ProductColor varchar(32),
	ReleaseDate DATE,
	Manufacturer varchar(32),
	Price int,
	Quantity int DEFAULT 10,
  	ProductType varchar(20),
	imgURL varchar(200),
	Resolution varchar(32),
	Screensize int,
	Paneltype varchar(10),
	OS varchar(10),
	RAM int,
	ROM int
);



CREATE TABLE  Notebook(
	Id int UNIQUE NOT NULL ,
	ProductName varchar(32),
	ProductNumber int PRIMARY KEY,
	ProductColor varchar(32),
	ReleaseDate DATE,
	Manufacturer varchar(32),
	Price int,
	Quantity int DEFAULT 10,
  	ProductType varchar(20),
	imgURL varchar(200),
	Resolution varchar(32),
	Screensize int,
	Paneltype varchar(10),
	OS varchar(10) DEFAULT null,
	RAM int,
	CPU varchar(60),
	StorageType varchar(15),
	StorageCapacity int
);




INSERT INTO Products VALUES (seq_products.nextval, 'UE43NU7122KXXH', 1263850, 'BLK', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'SAMSUNG', 112987, 3,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77651280/fee_786_587_png/SAMSUNG-UE43NU7122KXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (seq_products.currval, 'UE43NU7122KXXH', 1263850, 'BLK', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'SAMSUNG', 112987, 3, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77651280/fee_786_587_png/SAMSUNG-UE43NU7122KXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 108, 'UHD', 60, '3x HDMI, 2x USB, Komponens bemenet, Kompozit bemenet, RJ-45, Digitális audio kimenet, CI slot');
INSERT INTO Products VALUES (seq_products.nextval, '49UK6400PLF', 1261725, 'BROWN', TO_DATE('2018-11-05', 'YYYY-MM-DD'), 'LG', 118109, 5,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77531820/fee_786_587_png/LG-49UK6400PLF-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (seq_products.currval, '49UK6400PLF', 1261725, 'BROWN', TO_DATE('2018-11-05', 'YYYY-MM-DD'), 'LG', 118109, 5, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77531820/fee_786_587_png/LG-49UK6400PLF-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 123, 'UHD', 120, '3x HDMI, 2x USB, RJ-45, Komponens bemenet, Digitális audio kimenet, CI slot');
INSERT INTO Products VALUES (seq_products.nextval, '55UK6300MLB', 1261728, 'BLK', TO_DATE('2018-09-23', 'YYYY-MM-DD'), 'LG', 142991, 1,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77480483/fee_786_587_png/LG-55UK6300MLB-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (seq_products.currval, '55UK6300MLB', 1261728, 'BLK', TO_DATE('2018-09-23', 'YYYY-MM-DD'), 'LG', 142991, 1, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77480483/fee_786_587_png/LG-55UK6300MLB-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 139, 'UHD', 60, '3x HDMI, 2x USB, RJ-45, Komponens bemenet, Digitális audio kimenet, CI slot');
INSERT INTO Products VALUES (seq_products.nextval, 'UE49NU7102KXXH', 1263575, 'BLK', TO_DATE('2018-01-04', 'YYYY-MM-DD'), 'SAMSUNG', 124999, 5,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77651280/fee_786_587_png/SAMSUNG-UE40NU7122KXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (seq_products.currval, 'UE49NU7102KXXH', 1263575, 'BLK', TO_DATE('2018-01-04', 'YYYY-MM-DD'), 'SAMSUNG', 124999, 5, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77651280/fee_786_587_png/SAMSUNG-UE40NU7122KXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 123, 'UHD', 140, '3x HDMI, 2x USB, Komponens bemenet, Kompozit bemenet, RJ-45, Digitálius audio kimenet (optikai), CI slot');
INSERT INTO Products VALUES (seq_products.nextval, '55SK8500PLA', 1260468, 'BLK,SILVER', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'LG', 267987, 0,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77530732/fee_786_587_png/LG-55SK8500PLA-4K-SUHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (seq_products.currval, '55SK8500PLA', 1260468, 'BLK,SILVER', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'LG', 267987, 0, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77530732/fee_786_587_png/LG-55SK8500PLA-4K-SUHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 139, 'SUHD', 60, '4x HDMI, 3x USB, RJ-45, Digitális audio kimenet, Fejhallgató kimenet, CI slot');
INSERT INTO Products VALUES (seq_products.nextval, '43UK6470PLC', 1261724, 'GRAY', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'LG', 114987, 6,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77480808/fee_786_587_png/LG-43UK6470PLC-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (seq_products.currval, '43UK6470PLC', 1261724, 'GRAY', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'LG', 114987, 6, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77480808/fee_786_587_png/LG-43UK6470PLC-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 108, 'UHD', 120, '3x HDMI, 2x USB, RJ-45, Komponens bemenet, Digitális audio kimenet, CI slot');
INSERT INTO Products VALUES (seq_products.nextval, '43UK6950PLB', 1260457, 'BLK,TITAN', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'LG', 137987, 5,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77530323/fee_325_225_png/LG-43UK6950PLB-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (seq_products.currval, '43UK6950PLB', 1260457, 'BLK,TITAN', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'LG', 137987, 5, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77530323/fee_325_225_png/LG-43UK6950PLB-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 108, 'UHD', 120, '4x HDMI, 2x USB, RJ-45, Komponens bemenet, Digitális audio kimenet, CI slot');
INSERT INTO Products VALUES (seq_products.nextval, 'UE75NU7102KXXH', 1258952, 'BLK', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'SAMSUNG', 351999, 3,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77429382/fee_786_587_png/SAMSUNG-UE75NU7102KXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (seq_products.currval, 'UE75NU7102KXXH', 1258952, 'BLK', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'SAMSUNG', 351999, 3, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77429382/fee_786_587_png/SAMSUNG-UE75NU7102KXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 189, 'UHD',144, '3x HDMI, 2x USB, Komponens bemenet, Kompozit bemenet, RJ-45, Digitálius audio kimenet (optikai), CI slot');
INSERT INTO Products VALUES (seq_products.nextval, '43UK6300MLB', 1261722, 'BLK', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'LG', 110987, 14,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77480483/fee_786_587_png/LG-43UK6300MLB-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (seq_products.currval, '43UK6300MLB', 1261722, 'BLK', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'LG', 110987, 14, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-77480483/fee_786_587_png/LG-43UK6300MLB-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 108, 'UHD', 60, '3x HDMI, 2x USB, RJ-45, Komponens bemenet, Digitális audio kimenet, CI slot');
INSERT INTO Products VALUES (seq_products.nextval, 'UE49NU8002TXXH', 1258971, 'BLK,SILVER', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'LG', 184799, 12,'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-74704067/fee_786_587_png/SAMSUNG-Outlet-UE49MU8002TXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3');
INSERT INTO TV VALUES (seq_products.currval, 'UE49NU8002TXXH', 1258971, 'BLK,SILVER', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'LG', 184799, 12, 'tv','https://picscdn.redblue.de/doi/pixelboxx-mss-74704067/fee_786_587_png/SAMSUNG-Outlet-UE49MU8002TXXH-4K-UHD-Smart-LED-telev%C3%ADzi%C3%B3', '3840 x 2160', 123, 'UHD', 60, '4x HDMI, 2x USB, RJ-45, Digitális audio kimenet (optikai), CI slot');



INSERT INTO Products VALUES (seq_products.nextval, 'Mate 20 Lite', 1268945, 'BLK', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'HUAWEI', 84251, 3, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-78310778/fee_786_587_png/HUAWEI-Mate-20-Lite-Dual-SIM-fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon');
INSERT INTO Smartphone VALUES (seq_products.currval, 'Mate 20 Lite', 1268945, 'BLK', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'HUAWEI', 84251, 3, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-78310778/fee_786_587_png/HUAWEI-Mate-20-Lite-Dual-SIM-fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon', '2340 x 1080', 16, 'IPS', 'Android', 3, 64);
INSERT INTO Products VALUES (seq_products.nextval, 'Galaxy S10+', 1284188, 'BLK', TO_DATE('2018-11-05', 'YYYY-MM-DD'), 'SAMSUNG', 344990, 5, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-80519897/fee_786_587_png/SAMSUNG-Galaxy-S10--1TB-DualSIM-Fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon--%28SM-G975%29');
INSERT INTO Smartphone VALUES (seq_products.currval, 'Galaxy S10+', 1284188, 'BLK', TO_DATE('2018-11-05', 'YYYY-MM-DD'), 'SAMSUNG', 344990, 5, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-80519897/fee_786_587_png/SAMSUNG-Galaxy-S10--1TB-DualSIM-Fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon--%28SM-G975%29', '3040 x 1440', 16, 'AMOLED', 'Android', 4, 128);
INSERT INTO Products VALUES (seq_products.nextval, 'P20 Lite', 1258580, 'BLK', TO_DATE('2018-09-23', 'YYYY-MM-DD'), 'LG', 79538, 1, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-77301386/fee_786_587_png/HUAWEI-P20-Lite-DualSIM-%C3%A9jfekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon');
INSERT INTO Smartphone VALUES (seq_products.currval, 'P20 Lite', 1258580, 'BLK', TO_DATE('2018-09-23', 'YYYY-MM-DD'), 'LG', 79538, 1, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-77301386/fee_786_587_png/HUAWEI-P20-Lite-DualSIM-%C3%A9jfekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon', '2280 x 1080', 14, 'LCD', 'Android', 4, 64);
INSERT INTO Products VALUES (seq_products.nextval, 'P smart 2019', 1279904, 'BLK', TO_DATE('2018-01-04', 'YYYY-MM-DD'), 'HUAWEI', 69999, 5, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-80143872/fee_786_587_png/HUAWEI-P-smart-2019-DualSIM--Fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon');
INSERT INTO Smartphone VALUES (seq_products.currval, 'P smart 2019', 1279904, 'BLK', TO_DATE('2018-01-04', 'YYYY-MM-DD'), 'HUAWEI', 69999, 5, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-80143872/fee_786_587_png/HUAWEI-P-smart-2019-DualSIM--Fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon', '2340 x 1080', 14, 'IPS', 'Android', 4, 64);
INSERT INTO Products VALUES (seq_products.nextval, 'iPhone 6S 32GB', 1213791, 'BLK,SILVER', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'APPLE', 109999, 0, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-71653362/fee_786_587_png/APPLE-iPhone-6S-32GB-asztrosz%C3%BCrke-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28mn0w2gh-a%29');
INSERT INTO Smartphone VALUES (seq_products.currval, 'iPhone 6S 32GB', 1213791, 'BLK,SILVER', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'APPLE', 109999, 0, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-71653362/fee_786_587_png/APPLE-iPhone-6S-32GB-asztrosz%C3%BCrke-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28mn0w2gh-a%29', '1334 x 750', 15, 'AMOLED', 'iOS', 3, 32);
INSERT INTO Products VALUES (seq_products.nextval, 'Y7 Prime', 1259624, 'GRAY', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'HUAWEI', 49605, 6, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-77634161/fee_786_587_png/HUAWEI-Y7-Prime-2018-Dual-SIM-fekete-32GB-k%C3%A1rtyaf%C3%BCggetlen-okostelefon');
INSERT INTO Smartphone VALUES (seq_products.currval, 'Y7 Prime', 1259624, 'GRAY', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'HUAWEI', 49605, 6, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-77634161/fee_786_587_png/HUAWEI-Y7-Prime-2018-Dual-SIM-fekete-32GB-k%C3%A1rtyaf%C3%BCggetlen-okostelefon', '1440 x 720', 16, 'IPS', 'Android', 4, 32);
INSERT INTO Products VALUES (seq_products.nextval, 'Galaxy A6', 1262120, 'BLK,TITAN', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'SAMSUNG', 69999, 5, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-77576631/fee_786_587_png/SAMSUNG-Galaxy-A6--%282018%29-fekete-Dual-SIM-32GB-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28SM-A605F%29');
INSERT INTO Smartphone VALUES (seq_products.currval, 'Galaxy A6', 1262120, 'BLK,TITAN', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'SAMSUNG', 69999, 5, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-77576631/fee_786_587_png/SAMSUNG-Galaxy-A6--%282018%29-fekete-Dual-SIM-32GB-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28SM-A605F%29', '1480 x 720', 13, 'AMOLED', 'iOS', 3, 32);
INSERT INTO Products VALUES (seq_products.nextval, 'Galaxy S9', 1255010, 'BLK', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'SAMSUNG', 165353, 3, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-77087588/fee_786_587_png/SAMSUNG-Galaxy-S9-%28SM-G960F%29-DualSIM-%C3%A9jfekete-64GB-k%C3%A1rtyaf%C3%BCggetlen-okostelefon');
INSERT INTO Smartphone VALUES (seq_products.currval, 'Galaxy S9', 1255010, 'BLK', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'SAMSUNG', 165353, 3, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-77087588/fee_786_587_png/SAMSUNG-Galaxy-S9-%28SM-G960F%29-DualSIM-%C3%A9jfekete-64GB-k%C3%A1rtyaf%C3%BCggetlen-okostelefon', '2960 x 1440', 14, 'AMOLED', 'Android', 4, 64);
INSERT INTO Products VALUES (seq_products.nextval, 'Galaxy A7', 1271173, 'BLK', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'SAMSUNG', 74999, 14, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-78509078/fee_786_587_png/SAMSUNG-Galaxy-A7-DualSIM-fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28SM-A750%29');
INSERT INTO Smartphone VALUES (seq_products.currval, 'Galaxy A7', 1271173, 'BLK', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'SAMSUNG', 74999, 14, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-78509078/fee_786_587_png/SAMSUNG-Galaxy-A7-DualSIM-fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28SM-A750%29', '2220 x 1080', 15, 'AMOLED', 'Android', 4, 64);
INSERT INTO Products VALUES (seq_products.nextval, 'iPhone 7 32GB', 1213799, 'BLK,SILVER', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'APPLE', 149999, 12, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-76402070/fee_786_587_png/APPLE-iPhone-7-32GB-fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28mn8x2gh-a%29');
INSERT INTO Smartphone VALUES (seq_products.currval, 'iPhone 7 32GB', 1213799, 'BLK,SILVER', TO_DATE('2018-10-03', 'YYYY-MM-DD'), 'APPLE', 149999, 12, 'phone','https://picscdn.redblue.de/doi/pixelboxx-mss-76402070/fee_786_587_png/APPLE-iPhone-7-32GB-fekete-k%C3%A1rtyaf%C3%BCggetlen-okostelefon-%28mn8x2gh-a%29', '1334 x 750', 11, 'AMOLED', 'iOS', 3, 32);



INSERT INTO Products VALUES (seq_products.nextval, '15-ra049nh 3QT64EA', 1263167, 'BLK', TO_DATE('2018-10-03','YYYY-MM-DD'), 'HP', 94409, 3, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-77520646/fee_786_587_png/HP-15-ra049nh-laptop-3QT64EA-%2815-6%22-matt-Celeron-4GB-500GB-HDD-Windows-10%29');
INSERT INTO Notebook VALUES (seq_products.currval, '15-ra049nh 3QT64EA', 1263167, 'BLK', TO_DATE('2018-10-03','YYYY-MM-DD'), 'HP', 94409, 3, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-77520646/fee_786_587_png/HP-15-ra049nh-laptop-3QT64EA-%2815-6%22-matt-Celeron-4GB-500GB-HDD-Windows-10%29', '1366 x 768', 15, 'IPS', 'Windows 10', 4, 'Intel® Celeron® N3060 processzor', 'HDD', '500' );
INSERT INTO Products VALUES (seq_products.nextval, 'MacBook Air 13 (2017)', 1236801, 'BLK', TO_DATE('2018-11-05','YYYY-MM-DD'), 'APPLE', 309989, 5, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-75574271/fee_786_587_png/APPLE-MacBook-Air-13%22-%282017%29-Core-i5-1-8G-8GB-128GB-SSD-%28mqd32mg-a%29');
INSERT INTO Notebook VALUES (seq_products.currval, 'MacBook Air 13 (2017)', 1236801, 'BLK', TO_DATE('2018-11-05','YYYY-MM-DD'), 'APPLE', 309989, 5, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-75574271/fee_786_587_png/APPLE-MacBook-Air-13%22-%282017%29-Core-i5-1-8G-8GB-128GB-SSD-%28mqd32mg-a%29', '1440 x 900', 15, 'AMOLED', 'OS Sierra', 8, 'Intel® Core™ i5-5350U processzor', 'SSD', '128' );
INSERT INTO Products VALUES (seq_products.nextval, '250 G6 4BD80EA', 1278153, 'BLK', TO_DATE('2018-09-23','YYYY-MM-DD'), 'HP', 105456, 1, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-79989163/fee_786_587_png/HP-250-G6-sz%C3%BCrke-laptop-4BD80EA-%2815-6%22-FullHD-Celeron-4GB-128-GB-SSD-Windows10%29');
INSERT INTO Notebook VALUES (seq_products.currval, '250 G6 4BD80EA', 1278153, 'BLK', TO_DATE('2018-09-23','YYYY-MM-DD'), 'HP', 105456, 1, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-79989163/fee_786_587_png/HP-250-G6-sz%C3%BCrke-laptop-4BD80EA-%2815-6%22-FullHD-Celeron-4GB-128-GB-SSD-Windows10%29', '1920 x 1080', 15, 'IPS', 'Windows 10', 4, 'Intel® Celeron® N4000 processzor', 'SSD', '128' );
INSERT INTO Products VALUES (seq_products.nextval, 'IdeaPad 330 81DC00KQHV', 1277671, 'BLK', TO_DATE('2018-01-04','YYYY-MM-DD'), 'LENOVO', 120647, 5, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78229846/fee_786_587_png/LENOVO-IdeaPad-330-laptop-81DC00KQHV-%2815-6%22-HD-Core-i3-4GB-128-GB-SSD-Windows-10%29');
INSERT INTO Notebook VALUES (seq_products.currval, 'IdeaPad 330 81DC00KQHV', 1277671, 'BLK', TO_DATE('2018-01-04','YYYY-MM-DD'), 'LENOVO', 120647, 5, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78229846/fee_786_587_png/LENOVO-IdeaPad-330-laptop-81DC00KQHV-%2815-6%22-HD-Core-i3-4GB-128-GB-SSD-Windows-10%29', '1920 x 1080', 15, 'IPS', 'Windows 10', 4, 'Intel® Celeron® N4000 processzor', 'SSD', '128' );
INSERT INTO Products VALUES (seq_products.nextval, 'Stark NX14 PRO', 1267629, 'BLK,SILVER', TO_DATE('2018-10-03','YYYY-MM-DD'), 'NAVON', 54989, 0, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78590494/fee_786_587_png/NAVON-Stark-NX14-PRO-laptop-%2814-1%22-HD--Atom-X5-2GB-32-GB-eMMC-Windows10%29');
INSERT INTO Notebook VALUES (seq_products.currval, 'Stark NX14 PRO', 1267629, 'BLK,SILVER', TO_DATE('2018-10-03','YYYY-MM-DD'), 'NAVON', 54989, 0, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78590494/fee_786_587_png/NAVON-Stark-NX14-PRO-laptop-%2814-1%22-HD--Atom-X5-2GB-32-GB-eMMC-Windows10%29', '1920 x 1080', 15, 'IPS', 'Windows 10', 4, 'Intel® Celeron® N4000 processzor', 'SSD', '128' );
INSERT INTO Products VALUES (seq_products.nextval, 'TUF Gaming FX705GD-EW078', 1281545, 'GRAY', TO_DATE('2018-10-03','YYYY-MM-DD'), 'ASUS', 307989, 6, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-80273419/fee_786_587_png/ASUS-TUF-Gaming-FX705GD-EW078-gamer-laptop-%2817-3%22-FHD-Core-i7-8GB-256-GB-SSD-GTX-1050-OC-4GB-NoOS%29');
INSERT INTO Notebook VALUES (seq_products.currval, 'TUF Gaming FX705GD-EW078', 1281545, 'GRAY', TO_DATE('2018-10-03','YYYY-MM-DD'), 'ASUS', 307989, 6, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-80273419/fee_786_587_png/ASUS-TUF-Gaming-FX705GD-EW078-gamer-laptop-%2817-3%22-FHD-Core-i7-8GB-256-GB-SSD-GTX-1050-OC-4GB-NoOS%29', '1920 x 1080', 17, 'AMOLED', 'Windows 10', 8, 'Intel® Core™ i7-8750H processzor', 'SSD', '256' );
INSERT INTO Products VALUES (seq_products.nextval, 'Yoga 530 2in1 81EK00PQHV', 1278318, 'BLK,TITAN', TO_DATE('2018-10-03','YYYY-MM-DD'), 'LENOVO', 184011, 5, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78450228/fee_786_587_png/LENOVO-Yoga-530-2in1-eszk%C3%B6z-81EK00PQHV-%2814-1%22-FHD-Touch-Core-i3-4GB-256-GD-SSD-Windows-10%29');
INSERT INTO Notebook VALUES (seq_products.currval, 'Yoga 530 2in1 81EK00PQHV', 1278318, 'BLK,TITAN', TO_DATE('2018-10-03','YYYY-MM-DD'), 'LENOVO', 184011, 5, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78450228/fee_786_587_png/LENOVO-Yoga-530-2in1-eszk%C3%B6z-81EK00PQHV-%2814-1%22-FHD-Touch-Core-i3-4GB-256-GD-SSD-Windows-10%29', '1920 x 1080', 14, 'IPS', 'Windows 10', 4, 'Intel® Core™ i3-7130U processzor', 'SSD', '256' );
INSERT INTO Products VALUES (seq_products.nextval, 'V130 81HN00HKHV', 1284203, 'BLK', TO_DATE('2018-10-03','YYYY-MM-DD'), 'LENOVO', 125117, 3, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78913164/fee_786_587_png/LENOVO-V130-sz%C3%BCrke-laptop-81HN00HJHV-%2815-6%22-FullHD-Core-i3-4GB-128-GB-SSD-DOS%29');
INSERT INTO Notebook VALUES (seq_products.currval, 'V130 81HN00HKHV', 1284203, 'BLK', TO_DATE('2018-10-03','YYYY-MM-DD'), 'LENOVO', 125117, 3, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-78913164/fee_786_587_png/LENOVO-V130-sz%C3%BCrke-laptop-81HN00HJHV-%2815-6%22-FullHD-Core-i3-4GB-128-GB-SSD-DOS%29', '1920 x 1080', 15, 'IPS', 'Windows 10', 4, 'Intel® Core™ i3-6006U processzor', 'SSD', '128' );
INSERT INTO Products VALUES (seq_products.nextval, '15-ra048nh 3QT62EA', 1263166, 'BLK', TO_DATE('2018-10-03','YYYY-MM-DD'), 'HP', 76409, 14, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-76574989/fee_786_587_png/HP-15-ra048nh-laptop-3QT62EA-%2815-6%22-matt-Celeron-4GB-500GB-HDD-DOS%29');
INSERT INTO Notebook VALUES (seq_products.currval, '15-ra048nh 3QT62EA', 1263166, 'BLK', TO_DATE('2018-10-03','YYYY-MM-DD'), 'HP', 76409, 14, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-76574989/fee_786_587_png/HP-15-ra048nh-laptop-3QT62EA-%2815-6%22-matt-Celeron-4GB-500GB-HDD-DOS%29', '1366 x 768', 15, 'IPS', 'Windows 10', 4, 'Intel® Celeron® N3060 processzor', 'HDD', '500' );
INSERT INTO Products VALUES (seq_products.nextval, 'Pavilion x360 2in1 4TW27EA', 1270125, 'BLK,SILVER', TO_DATE('2018-10-03','YYYY-MM-DD'), 'HP', 249989, 12, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-76043215/fee_786_587_png/HP-Pavilion-x360-14-cd0003nh-ez%C3%BCst-2in1-eszk%C3%B6z-4TW27EA-%2814%22-FullHD-touch-Core-i5-8GB-256GB-Windows-10%29');
INSERT INTO Notebook VALUES (seq_products.currval, 'Pavilion x360 2in1 4TW27EA', 1270125, 'BLK,SILVER', TO_DATE('2018-10-03','YYYY-MM-DD'), 'HP', 249989, 12, 'notebook','https://picscdn.redblue.de/doi/pixelboxx-mss-76043215/fee_786_587_png/HP-Pavilion-x360-14-cd0003nh-ez%C3%BCst-2in1-eszk%C3%B6z-4TW27EA-%2814%22-FullHD-touch-Core-i5-8GB-256GB-Windows-10%29', '1366 x 768', 14, 'IPS', 'Windows 10', 8, 'Intel® Core™ i5-8250U processzor', 'SSD', '256' );




CREATE TABLE Rates(
	Product_Id int,
	User_Id int,
	RateValue int,
	FOREIGN KEY (Product_Id) REFERENCES Products(Id),
	FOREIGN KEY (User_Id) REFERENCES Users(Id),
	PRIMARY KEY (Product_Id, User_Id)
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
	Product_Id int,
	User_Id int,
	Content varchar(100),
	CommentDate Date,
	FOREIGN KEY (Product_Id) REFERENCES Products(Id),
	FOREIGN KEY (User_Id) REFERENCES Users(Id),
	PRIMARY KEY (Product_Id, User_Id)
);


INSERT INTO Comments VALUES (1,1,'Nagyon szuper termek, azt kaptam amit vartam, Koszonom!', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (2,1,'Az eddigi legszebb kepe van, amit valaha lattam!', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (3,1,'Strapabiro, eros es hatarozott a megjelenese.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (4,1,'Igazi elegans darab.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (5,1,'Nagyon tetszik!', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (6,1,'Jo vetel volt, nem bantam meg.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (7,1,'Ujra megvennem, eddigi legjobb amit vettem.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (8,1,'Csodalatos tueles kepe van, legjobb vetel.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (9,1,'Nagyon elegedett vagyok vele, es gyors pontos volt a szallitas.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (10,1,'Azt kaptam amit vartam, tokeletes ugyfelkiszolgalas.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (11,1,'Mindenkinek ajanlom! Z.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (12,1,'Eddigi legjobb.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (13,1,'Ar/ertek aranyban a legjobb.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (14,1,'Marha gyors, orom hasznalni.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (15,1,'Elegans darab, koszonom a preciz szallitast.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (16,1,'Mindenkinek ajanlom, legjobb vetel.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (17,1,'Ha vasarolni tervezel, ezt ajanlom.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (18,1,'A leheto legjobb ar ertek aranyu a penztiacon.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (19,1,'Nem csalodtam benne, nagyon olcso de mindent tud amit a dragabbak is.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (20,1,'Megeri a penzt, nagyon franko.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (21,1,'Rohadt jo !', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (22,1,'Tokeletes cucc, ajanlom hogy vegyetek vigyetek!', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (23,1,'Talan egy kicsit draga, de minden penzt meger.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (24,1,'Ha most tervezel venni, ez a legjobb dontes!', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (25,1,'Nalam 5/5!', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (26,1,'Sokadik vasarlasom innen, most sem csalodtam!', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (27,1,'Mindent tud amit kell, ennyi penzert.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (28,1,'Nagyon kiraly, ajanlom ! 10/10', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (29,1,'Nem jott be, allandoan lefagy :/ ', TO_DATE('2019-03-09', 'YYYY-MM-DD'));
INSERT INTO Comments VALUES (30,1,'Nem tul gyors, banom hogy nem masikat vettem.', TO_DATE('2019-03-09', 'YYYY-MM-DD'));

CREATE SEQUENCE seq_orders
MINVALUE 0
START WITH 0
INCREMENT BY 1
CACHE 10;


CREATE TABLE Orders(
	Id int PRIMARY KEY,
	User_Id int,
	Product_Id int,
	Quantity int DEFAULT 1,
	ShippingDate Date,
	Status varchar(15),
	FOREIGN KEY (Product_Id) REFERENCES Products(Id),
	FOREIGN KEY (User_Id) REFERENCES Users(Id)
);


INSERT INTO Orders VALUES (seq_orders.nextval,6,17,1,TO_DATE('2019-04-13', 'YYYY-MM-DD'),'Fizetve');
INSERT INTO Orders VALUES (seq_orders.nextval,7,13,1,TO_DATE('2019-04-20', 'YYYY-MM-DD'),'Szallitas alatt');
INSERT INTO Orders VALUES (seq_orders.nextval,8,1,1,TO_DATE('2019-04-19', 'YYYY-MM-DD'),'Fizetesre var');
INSERT INTO Orders VALUES (seq_orders.nextval,9,2,1,TO_DATE('2019-04-18', 'YYYY-MM-DD'),'Fizetesre var');
INSERT INTO Orders VALUES (seq_orders.nextval,4,30,1,TO_DATE('2019-04-15', 'YYYY-MM-DD'),'Fizetve');
INSERT INTO Orders VALUES (seq_orders.nextval,5,28,1,TO_DATE('2019-04-15', 'YYYY-MM-DD'),'Szallitasra var');
INSERT INTO Orders VALUES (seq_orders.nextval,6,30,1,TO_DATE('2019-04-17', 'YYYY-MM-DD'),'Szallitas alatt');
INSERT INTO Orders VALUES (seq_orders.nextval,7,27,1,TO_DATE('2019-04-11', 'YYYY-MM-DD'),'Fizetesre var');
INSERT INTO Orders VALUES (seq_orders.nextval,8,12,1,TO_DATE('2019-04-13', 'YYYY-MM-DD'),'Fizetve');
INSERT INTO Orders VALUES (seq_orders.nextval,2,10,1,TO_DATE('2019-04-14', 'YYYY-MM-DD'),'Fizetve');


CREATE SEQUENCE seq_bills
MINVALUE 0
START WITH 0
INCREMENT BY 1
CACHE 10;

CREATE TABLE Bills(
	Id int PRIMARY KEY ,
	Order_id int,
	VAT int DEFAULT 27,
	FOREIGN KEY (Order_id) REFERENCES Orders(Id)
);


INSERT INTO Bills VALUES (seq_bills.nextval,1,27);
INSERT INTO Bills VALUES (seq_bills.nextval,2,27);
INSERT INTO Bills VALUES (seq_bills.nextval,3,27);
INSERT INTO Bills VALUES (seq_bills.nextval,4,27);
INSERT INTO Bills VALUES (seq_bills.nextval,5,27);
INSERT INTO Bills VALUES (seq_bills.nextval,6,27);
INSERT INTO Bills VALUES (seq_bills.nextval,7,27);
INSERT INTO Bills VALUES (seq_bills.nextval,8,27);
INSERT INTO Bills VALUES (seq_bills.nextval,9,27);
INSERT INTO Bills VALUES (seq_bills.nextval,10,27);


