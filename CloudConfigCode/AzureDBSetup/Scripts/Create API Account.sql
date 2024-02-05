CREATE USER "hospital-at-home-api" FROM EXTERNAL PROVIDER;
ALTER ROLE db_datareader ADD MEMBER "hospital-at-home-api"
ALTER ROLE db_datawriter ADD MEMBER "hospital-at-home-api"