CREATE DATABASE IF NOT EXISTS `repeti_dev`;
CREATE DATABASE IF NOT EXISTS `repeti_homol`;
CREATE DATABASE IF NOT EXISTS `repeti_prod`;

# create users and grant rights
CREATE USER 'myuserdev'@'%' IDENTIFIED BY 'myuserdev';
GRANT ALL PRIVILEGES ON repeti_dev.* TO 'myuserdev'@'%';

CREATE USER 'myuserhomol'@'%' IDENTIFIED BY 'myuserhomol';
GRANT ALL PRIVILEGES ON repeti_homol.* TO 'myuserhomol'@'%';

CREATE USER 'myuserprod'@'%' IDENTIFIED BY 'myuserprod';
GRANT ALL PRIVILEGES ON repeti_prod.* TO 'myuserprod'@'%';

SHOW DATABASES;