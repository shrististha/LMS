# Installation Instructions

## Spring boot Project:

* [Spring boot initializer](https://start.spring.io/) has been used to set up the project structure with maven as the build tool
* Lombok
* Enable CORS
* Alter all the tables so that the id are auto-incremented:
  * create sequence loan_id_seq;
  * alter table loans alter loan_id set default nextval('loan_id_seq');