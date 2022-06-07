PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE role (
	id INTEGER NOT NULL, 
	role VARCHAR(64), 
	description VARCHAR(200), 
	created_at DATETIME, 
	updated_at DATETIME, 
	PRIMARY KEY (id)
);
INSERT INTO role VALUES(1,'Super','User has super admin privileges','2022-04-28 02:09:01.149363','2022-04-28 02:09:01.149379');
INSERT INTO role VALUES(2,'Admin','User has Admin privileeges [Create store & staff]','2022-04-28 02:09:57.340246','2022-04-28 02:09:57.340257');
INSERT INTO role VALUES(3,'Manager','User has Manager privileges [Make requests and approve orders]','2022-04-28 02:11:56.347735','2022-04-28 02:11:56.347747');
CREATE TABLE category (
	id INTEGER NOT NULL, 
	category VARCHAR(64), 
	owner INTEGER, 
	created_at DATETIME, 
	updated_at DATETIME, 
	PRIMARY KEY (id)
);
INSERT INTO category VALUES(1,'Foods & Beverages',1,'2022-04-29 01:44:22.220763','2022-04-29 01:44:22.220773');
INSERT INTO category VALUES(2,'Style & Fashion',1,'2022-04-29 04:41:31.962015','2022-04-29 04:41:31.962026');
INSERT INTO category VALUES(3,'Medical health',4,'2022-04-29 05:42:56.600293','2022-04-29 05:42:56.600301');
INSERT INTO category VALUES(4,'Apparrel & Accessories',1,'2022-05-15 16:53:00.104464','2022-05-15 16:53:00.104475');
CREATE TABLE store (
	id INTEGER NOT NULL, 
	storename VARCHAR(128), 
	region VARCHAR(128), 
	owner INTEGER, 
	created_at DATETIME, 
	updated_at DATETIME, 
	PRIMARY KEY (id)
);
INSERT INTO store VALUES(1,'Pastries Kenya','Kamakwa',1,'2022-04-28 03:08:19.623773','2022-04-28 03:08:19.623780');
INSERT INTO store VALUES(2,'Peptang','Marakwet',1,'2022-04-29 03:28:14.239092','2022-04-29 03:28:14.239100');
INSERT INTO store VALUES(3,'Kasha','NAIROBI',4,'2022-04-29 05:41:47.747041','2022-04-29 05:41:47.747049');
INSERT INTO store VALUES(4,'Fresh Barida','Kisauni',1,'2022-05-01 05:14:29.466245','2022-05-01 05:14:29.466253');
INSERT INTO store VALUES(5,'Acronis','Bulgaria ',1,'2022-05-06 05:27:36.502823','2022-05-06 05:27:36.502832');
INSERT INTO store VALUES(6,'Tatu City Foods','Nakuru',1,'2022-05-06 05:42:53.156826','2022-05-06 05:42:53.156833');
INSERT INTO store VALUES(7,'Bikers Hub','NAIROBI',1,'2022-05-06 06:58:04.828081','2022-05-06 06:58:04.828089');
INSERT INTO store VALUES(8,'Kisii Groceries ','Nyakimincha ',1,'2022-05-06 07:18:35.533959','2022-05-06 07:18:35.533967');
INSERT INTO store VALUES(9,'Kariobangi customs','Nairobi',15,'2022-05-07 16:50:48.225059','2022-05-07 16:50:48.225067');
CREATE TABLE user (
	id INTEGER NOT NULL, 
	firstname VARCHAR(64), 
	lastname VARCHAR(64), 
	email VARCHAR(120), 
	phone INTEGER, 
	owner INTEGER, 
	created_at DATETIME, 
	updated_at DATETIME, 
	password_hash VARCHAR(128), 
	store_id INTEGER, 
	role_id INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY(store_id) REFERENCES store (id), 
	FOREIGN KEY(role_id) REFERENCES role (id)
);
INSERT INTO user VALUES(1,'Penninah','Njeri','pesh@gmail.com',123456789,1000,'2022-04-28 02:22:22.672349','2022-04-28 02:22:22.672356','pbkdf2:sha256:260000$E400TMHtH0qxMUNw$3dc01b2c8be468e523d5ba6102adcbb68522188386d296467eb22c55394a23d1',NULL,2);
INSERT INTO user VALUES(2,'Winnie','Ngugi','winnie@gmail.com',963852741,1,'2022-04-28 03:08:19.625319','2022-04-28 03:08:19.625324','pbkdf2:sha256:260000$zXSIyCcQC5TCpBOO$ee42bf92fae3e31b6e21a5acdd80451a9d14dbed5522e19152f3689acbff1640',1,3);
INSERT INTO user VALUES(3,'Michael','Mutisya','mike@gmail.com',14785645,1,'2022-04-29 03:28:14.240626','2022-04-29 03:28:14.240631','pbkdf2:sha256:260000$HNMYu1zwirxHaQ6H$03f234a23d9715b36d53491c2a5bb18a1c42d21d9eebd275d6a14aa67e16d003',2,3);
INSERT INTO user VALUES(4,'Kenneth','Theuri','ken@gmail.com',9865214,1000,'2022-04-29 05:40:14.265788','2022-04-29 05:40:14.265796','pbkdf2:sha256:260000$bLX4QYOzr7fEchmV$6e6704741fb4e88472bb6e1c01b929a4ae4915ecaa9362f061ca22feb68befb7',NULL,2);
INSERT INTO user VALUES(5,'Ken','Mkikuyu','theuri@gmail.com',124907315182656867,4,'2022-04-29 05:41:47.748173','2022-04-29 05:41:47.748178','pbkdf2:sha256:260000$SDnm34SlkUHeQl3b$5ab647fc05152686d1252bbc84b02b13971ab4e07a661a8f6b529189cc9c40d2',3,3);
INSERT INTO user VALUES(6,'Vivian','Wangare','vivi@gmail.com',711683883,1,'2022-04-30 05:13:21.276001','2022-04-30 05:13:21.276013','pbkdf2:sha256:260000$XIjWd59xPDLwqC18$5d486d7486e59686368db4a7fb4b000b802f0604e37de4eceae9ca7f15e22b26',1,3);
INSERT INTO user VALUES(7,'Simple','Boy','simpleboy@gmail.com',254721694124,1,'2022-05-01 05:14:29.468050','2022-05-01 05:14:29.468056','pbkdf2:sha256:260000$RDDj1smFkMYeFnfd$0bf9f6b94060ed4a2bb95ab611cacba6757e8d50634556824ecf4476062d98d7',4,3);
INSERT INTO user VALUES(9,'Robert','Kamande','gkamande@gmail.com',888646462622,1,'2022-05-05 06:43:52.811376','2022-05-05 06:43:52.811380','pbkdf2:sha256:260000$eJZgIH82yA8M7xtw$7df7e5e74cc3a8e2fb1256f290a8aa1de81befda9c03f40c769ff2e01fbbfde9',NULL,3);
INSERT INTO user VALUES(10,'Inga','Piass','inga@acronis.com',359889003990,1,'2022-05-06 05:27:36.504467','2022-05-06 05:27:36.504472','pbkdf2:sha256:260000$j1Q2UJbZpXfaMkpF$1e6628f8760e9077fd9dca52f4f087a6b31bf58b70a10ca3073698de766c5e6e',5,3);
INSERT INTO user VALUES(11,'Linnet','Wambui','linnet@gmail.com',254852147963,1,'2022-05-06 05:42:53.158451','2022-05-06 05:42:53.158456','pbkdf2:sha256:260000$HRz6KGrQ0nRVry7D$cc68b513cf7e9f325f75813d2024079c9bc52f85b64716c9df74ce7ce261b44d',6,3);
INSERT INTO user VALUES(12,'Simon','Lengala','lengala@gmail.com',254120100120,1,'2022-05-06 06:58:04.830148','2022-05-06 06:58:04.830154','pbkdf2:sha256:260000$hqmyIgV6gJWCXXOy$13c9bbfb62ad257a4bfc2a33e27294feb66f1cdc8217816b2344fd26c7c1782c',7,3);
INSERT INTO user VALUES(13,'Daphne','Kwamboka','daphne@gmail.com',254718354624,1,'2022-05-06 07:18:35.535450','2022-05-06 07:18:35.535455','pbkdf2:sha256:260000$SNuDQl3w3FU7K2US$5f998484346da0b0259eeb89af63e41ee1608be846d8b8ab544a830375ea133b',8,3);
INSERT INTO user VALUES(14,'Vivian','Gilberts','vivii@gmail.com',134621326545,1,'2022-05-06 07:18:35.535899','2022-05-06 07:18:35.535902',NULL,8,3);
INSERT INTO user VALUES(15,'Moha','Graffix','moha@gmail.com',254111111111,1000,'2022-05-07 16:36:18.473596','2022-05-07 16:36:18.473603','pbkdf2:sha256:260000$OzfG1rYhYfWcOw4h$11660becdb2a9a2799057a7fcae6b024cfbbd9ed155ef4f5bf8367d422c347eb',NULL,2);
INSERT INTO user VALUES(16,'Musa','Kartlewell','kartwell@gmail.com',999888665,15,'2022-05-07 16:50:48.226849','2022-05-07 16:50:48.226854','pbkdf2:sha256:260000$F426qAHCweZZJUIh$4581301e869e5153197d2e5ba158f28cd45c6b49509c68ce1c541c42a2c2ece1',9,3);
INSERT INTO user VALUES(17,'Edwin','Waigi','edu@gmail.com',111444777,NULL,'2022-05-07 16:52:04.226101','2022-05-07 16:52:04.226109','pbkdf2:sha256:260000$mNCLDKcUhXTuUY5m$a24f4db0a4ba4aa02d7160ba82b8e21860fc7ea2d8e66b6a18694f90ddf769f9',9,3);
CREATE TABLE product (
	id INTEGER NOT NULL, 
	productname VARCHAR(12), 
	description VARCHAR(256), 
	price INTEGER, 
	quantity INTEGER, 
	location VARCHAR(128), 
	owner INTEGER, 
	created_at DATETIME, 
	updated_at DATETIME, 
	category_id INTEGER, 
	store_id INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY(category_id) REFERENCES category (id), 
	FOREIGN KEY(store_id) REFERENCES store (id)
);
INSERT INTO product VALUES(1,'Vanilla cakes','Sweet & delicious ',1200,85,'Warehouse',1,'2022-04-29 01:44:22.222860','2022-05-02 16:25:16.872820',1,NULL);
INSERT INTO product VALUES(2,'Vanilla cakes','Sweet & delicious ',1200,5,'Pastries Kenya',1,'2022-04-29 03:26:04.456656','2022-04-29 03:26:04.456665',1,1);
INSERT INTO product VALUES(3,'Vanilla cakes','Sweet & delicious ',1200,324,'Peptang',1,'2022-04-29 03:28:37.003935','2022-05-02 15:50:45.236208',1,2);
INSERT INTO product VALUES(4,'Artificial Nails','Green, plastic & sparky',160,2000,'Warehouse',1,'2022-04-29 04:41:31.964084','2022-04-29 04:42:16.851676',2,NULL);
INSERT INTO product VALUES(5,'Artificial Nails','Green, plastic & sparky',160,1000,'Pastries Kenya',1,'2022-04-29 05:38:46.590763','2022-05-03 04:09:29.845736',2,1);
INSERT INTO product VALUES(6,'Female condoms','Latex',300,1350,'Warehouse',4,'2022-04-29 05:42:56.601486','2022-04-29 05:42:56.601494',3,NULL);
INSERT INTO product VALUES(7,'Female condoms','Latex',300,150,'Kasha',4,'2022-04-29 05:44:20.642690','2022-04-29 05:44:20.642701',3,3);
INSERT INTO product VALUES(8,'Facial scrub (fine)','Apricot with fine grains',1999,900,'Warehouse',1,'2022-04-30 04:15:53.407042','2022-05-03 04:10:50.773949',3,NULL);
INSERT INTO product VALUES(9,'Facial scrub','Apricot with fine grains',1999,100,'Pastries Kenya',1,'2022-04-30 04:16:14.164850','2022-04-30 04:16:14.164858',3,1);
INSERT INTO product VALUES(10,'Facial scrub','Apricot with fine grains',1999,20,'Peptang',1,'2022-04-30 04:35:20.803248','2022-04-30 04:35:20.803260',3,2);
INSERT INTO product VALUES(11,'Facial scrub','Apricot with fine grains',1999,18,'Fresh Barida',1,'2022-05-01 05:16:24.948984','2022-05-01 05:16:24.948996',3,4);
INSERT INTO product VALUES(13,'Face Mask','Removes blackheads and fungal infections',300,400,'Pastries Kenya',1,'2022-05-01 05:32:03.022732','2022-05-01 05:32:03.022742',3,1);
INSERT INTO product VALUES(14,'Mens Boxers','All colors - cotton',300,350,'Warehouse',1,'2022-05-01 05:47:49.944906','2022-05-02 16:34:36.090665',2,NULL);
INSERT INTO product VALUES(15,'Hot Lingerie','Victoria''s secret',4500,580,'Warehouse',1,'2022-05-01 05:48:36.050679','2022-05-02 16:27:51.038089',2,NULL);
INSERT INTO product VALUES(16,'Lingerie','Victoria''s secret',4500,200,'Peptang',1,'2022-05-02 15:51:21.953851','2022-05-02 15:51:21.953858',2,2);
INSERT INTO product VALUES(17,'Hot Lingerie','Victoria''s secret',4500,50,'Pastries Kenya',1,'2022-05-02 16:45:21.766258','2022-05-02 16:45:21.766268',2,1);
INSERT INTO product VALUES(18,'Mens Boxers','All colors - cotton',300,50,'Pastries Kenya',1,'2022-05-03 04:08:57.073394','2022-05-03 04:08:57.073402',2,1);
INSERT INTO product VALUES(19,'Facial scrub (fine)','Apricot with fine grains',1999,162,'Pastries Kenya',1,'2022-05-03 04:09:06.906207','2022-05-03 04:09:06.906215',3,1);
INSERT INTO product VALUES(20,'Hot Lingerie','Victoria''s secret',4500,150,'Fresh Barida',1,'2022-05-03 16:25:01.144435','2022-05-03 16:25:12.525745',2,4);
INSERT INTO product VALUES(21,'Facial scrub (fine)','Apricot with fine grains',1999,100,'Bikers Hub',1,'2022-05-08 10:32:56.270038','2022-05-08 10:32:56.270047',3,7);
INSERT INTO product VALUES(22,'Hot Lingerie','Victoria''s secret',4500,20,'Bikers Hub',1,'2022-05-08 10:33:33.956535','2022-05-08 10:33:33.956543',2,7);
INSERT INTO product VALUES(23,'Huggies Diapers','Soft, high quality diapers',1500,400,'Warehouse',1,'2022-05-15 16:53:00.107164','2022-05-15 16:53:00.107172',4,NULL);
CREATE TABLE IF NOT EXISTS "order" (
	id INTEGER NOT NULL, 
	quantity INTEGER, 
	timestamp DATETIME, 
	owner INTEGER, 
	status VARCHAR(128), 
	updated_at DATETIME, 
	store_id INTEGER, 
	product_id INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY(store_id) REFERENCES store (id), 
	FOREIGN KEY(product_id) REFERENCES product (id)
);
INSERT INTO "order" VALUES(1,5,'2022-04-29 03:26:04.458671',1,'Delivered','2022-04-29 05:17:38.483636',1,2);
INSERT INTO "order" VALUES(2,4,'2022-04-29 03:28:37.005026',1,'Delivered','2022-04-30 04:35:31.055625',2,3);
INSERT INTO "order" VALUES(3,30,'2022-04-29 05:38:46.593446',1,'Delivered','2022-04-30 06:20:00.494042',1,5);
INSERT INTO "order" VALUES(4,150,'2022-04-29 05:44:20.643723',4,'Pending','2022-04-29 05:44:20.643731',3,7);
INSERT INTO "order" VALUES(5,100,'2022-04-30 04:16:14.168262',1,'Approved','2022-05-01 05:32:35.316011',1,9);
INSERT INTO "order" VALUES(6,20,'2022-04-30 04:35:20.804370',1,'Approved','2022-05-02 15:29:03.715500',2,10);
INSERT INTO "order" VALUES(7,70,'2022-04-30 18:25:41.728964',1,'Approved','2022-05-03 04:17:28.455943',1,5);
INSERT INTO "order" VALUES(8,18,'2022-05-01 05:16:24.951622',1,'Pending','2022-05-01 05:16:24.951637',4,11);
INSERT INTO "order" VALUES(9,400,'2022-05-01 05:32:03.023735',1,'Approved','2022-05-01 05:32:45.149118',1,13);
INSERT INTO "order" VALUES(10,320,'2022-05-02 15:50:45.238255',1,'Approved','2022-05-02 15:52:07.786952',2,3);
INSERT INTO "order" VALUES(11,200,'2022-05-02 15:51:21.954765',1,'Pending','2022-05-02 15:51:21.954772',2,16);
INSERT INTO "order" VALUES(12,50,'2022-05-02 16:45:21.767150',1,'Pending','2022-05-02 16:45:21.767159',1,17);
INSERT INTO "order" VALUES(13,50,'2022-05-03 04:08:57.076585',1,'Pending','2022-05-03 04:08:57.076595',1,18);
INSERT INTO "order" VALUES(14,162,'2022-05-03 04:09:06.907175',1,'Pending','2022-05-03 04:09:06.907182',1,19);
INSERT INTO "order" VALUES(15,900,'2022-05-03 04:09:29.847183',1,'Pending','2022-05-03 04:09:29.847190',1,5);
INSERT INTO "order" VALUES(16,50,'2022-05-03 16:25:01.146459',1,'Approved','2022-05-08 16:11:25.924292',4,20);
INSERT INTO "order" VALUES(17,100,'2022-05-03 16:25:12.527949',1,'Approved','2022-05-05 12:17:26.797127',4,20);
INSERT INTO "order" VALUES(18,100,'2022-05-08 10:32:56.271990',1,'Approved','2022-05-08 11:05:09.714807',7,21);
INSERT INTO "order" VALUES(19,20,'2022-05-08 10:33:33.957437',1,'Approved','2022-05-08 11:05:20.396832',7,22);
CREATE UNIQUE INDEX ix_role_role ON role (role);
CREATE INDEX ix_role_created_at ON role (created_at);
CREATE INDEX ix_role_updated_at ON role (updated_at);
CREATE INDEX ix_category_owner ON category (owner);
CREATE INDEX ix_category_updated_at ON category (updated_at);
CREATE INDEX ix_category_category ON category (category);
CREATE INDEX ix_category_created_at ON category (created_at);
CREATE INDEX ix_store_region ON store (region);
CREATE INDEX ix_store_owner ON store (owner);
CREATE INDEX ix_store_created_at ON store (created_at);
CREATE INDEX ix_store_updated_at ON store (updated_at);
CREATE UNIQUE INDEX ix_store_storename ON store (storename);
CREATE INDEX ix_user_firstname ON user (firstname);
CREATE INDEX ix_user_owner ON user (owner);
CREATE INDEX ix_user_lastname ON user (lastname);
CREATE UNIQUE INDEX ix_user_email ON user (email);
CREATE UNIQUE INDEX ix_user_phone ON user (phone);
CREATE INDEX ix_user_updated_at ON user (updated_at);
CREATE INDEX ix_user_created_at ON user (created_at);
CREATE INDEX ix_product_price ON product (price);
CREATE INDEX ix_product_quantity ON product (quantity);
CREATE INDEX ix_product_location ON product (location);
CREATE INDEX ix_product_owner ON product (owner);
CREATE INDEX ix_product_created_at ON product (created_at);
CREATE INDEX ix_product_productname ON product (productname);
CREATE INDEX ix_product_updated_at ON product (updated_at);
CREATE INDEX ix_product_description ON product (description);
CREATE INDEX ix_order_status ON "order" (status);
CREATE INDEX ix_order_updated_at ON "order" (updated_at);
CREATE INDEX ix_order_quantity ON "order" (quantity);
CREATE INDEX ix_order_timestamp ON "order" (timestamp);
CREATE INDEX ix_order_owner ON "order" (owner);
COMMIT;
