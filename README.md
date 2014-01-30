Kenix NOS
=========

Order management system.


Services
========
Order Management
----------------
* Customer Purchase Orders
* Cross Dock Purchase Orders
* Post Sales Orders
 - regular order
 - backorder
* Post Release(Ship) Orders
 - regular order
 - partial ship
 - cancel
 - multiple addresses
 - Book inventory allocation
* RMA (Return Materials Authorization)
* Freight Terms
 - Prepaid
 - Collect
 - 3rd party

Warehouse Management
--------------------
* Receiving
 - Inspection
 - Inventory Labels
 - Post on-hand inventory to location.
 - Post book inventory

* Shipping
 - Allocate on-hand
 - Pick plan
 - Loading Plan
 - Packing
 - Compliance Labels
 - Inspection
 - Bill of Lading (VICS format)
 - Deplete on-hand inventories
 - Post ship confirmation & deplete book inventories.
 - ASN (advance ship notice)
 - Issue invoice

* Inventories
 - SKU management
 - Location management
 - Book inventory
 - On-hand inventory
 - Bonded / Unbonded

* Kitting

* Physical count
 - Assisted counting
 - Blind counting
 - Double-team counting
 - Inventory adjustment request, approval, and execution
 
Payment
-------
* Invoices
* Receipts
* Credit limit


Markets Integration
==================
* Amazon
 - product listing
 - sales

* eBay
 - product listing
 - sales

Ship Carriers Integration
=========================
Small packages
--------------
* FedEx
* UPS

LTL, FTL shipment 
-----------------
* SCAC
* NMFC
* HS Code

International
-------------
* Nittsu
* Yamato

Tariff
------




Design
======
* Async
* Event driven
* Queue

User security service should broadcast the current status.
Attache the service to $rootProvider.
Kenix API should be wrapped in a service class.
Use Promise, and make it async.

UI Design
=========
Tile like screen. Something like
http://themes.shamsoft.net/flaty/

Public API
==========

* Accounts
* Users
* Products
* Orders
* Reports

Email
=====

* Sending
* Bounce handling

Queues
======

* email
* printer
* amazon pushing


Cron
====

daily reports


Supported Client
================
* Web client
* iOS
* Android
* RF scanners

Technology Stack
================

JavaScript Client
-----------------
* AngularJS
* Bootstrap
* Sass
* Coffeescript
* bower
* npm
* grunt

iOS Client
----------
Google Cloud Endpoint client

Android Client
--------------
Google Cloud Endpoint client

Server
------
* Google App Engine
* Google Cloud Endpoint
* Datastore
* Task Queue
* Memcache

