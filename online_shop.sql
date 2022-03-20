drop database if exists `online_shop`;
create database `online_shop`;
use `online_shop`;

drop table if exists `categories`;
create table `categories`(
	`CatID` int(15) unsigned not null auto_increment,
    `CatName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    primary key (`CatID`) using btree
)engine=MyISAM auto_increment=1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;


insert into `categories`(`CatName`) values('Laptop');
insert into `categories`(`CatName`) values('Smart phone');
insert into `categories`(`CatName`) values('Sex toys');
insert into `categories`(`CatName`) values('Cooking utensils');
insert into `categories`(`CatName`) values('Furnitures');
insert into `categories`(`CatName`) values('Clothes');

drop table if exists `products`;
create table `products`(
	`ProductID` int(15) unsigned not null auto_increment,
    `ProductName` varchar(50) character set utf8 collate utf8_unicode_ci not null,
    `CatID` int(15) unsigned not null,
    primary key (`ProductID`) using btree
)engine=MyISAM auto_increment=1 character set = utf8 collate = utf8_unicode_ci;

ALTER TABLE `products`
add constraint fk_products_categories
FOREIGN KEY (`CatID`) REFERENCES `Categories`(`CatID`);

insert into `products`(`ProductName`, `CatID`) values('OPPO f4',3);
insert into `products`(`ProductName`, `CatID`) values('HP folio 9999',1);
insert into `products`(`ProductName`, `CatID`) values('Lồn nhựa',4);
