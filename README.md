
Kenix NOS
=========

Order management system.

Client
======
Web client
iOS
Android
RF scanners


Market places
=============

External
* Amazon
* eBay

Shipping Carriers
=================
ASN
SCSS barcode

Small packages
* FedEx
* UPS

Large ship
* SCAC

International
* Nittsu
* Yamato


Technology Stack
================

Client

AngularJS
Bootstrap

Server

Google App Engine
Google Cloud Endpoint


Design
======

User security service should broadcast the current status.
Attache the service to $rootProvider.

Kenix API should be wrapped in a service class.

Use Promise, and make it async.


Public API
==========

Accounts
Users

Products

Orders

Reports

Email
=====

Sending
Bounce handling

Queues
======

email
printer

amazon pushing


Crons
=====

daily reports


UI Design
=========

http://themes.shamsoft.net/flaty/
