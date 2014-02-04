Kenix NOS
=========

Order management system.


Services
========
Account
-------
* Terms & Conditions by date
 - Service Agreement
 - Posting rule based on the SLA

Users
-----
A user belongs to one or more accounts.

ERP
---
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

Audit trail
-----------
* Activity tracking
* Alert

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


Client Page Structure
=====================
header
------
receiving order
ship order
support

Account
-------
dashboard (view only)
 - account summary
 - shipping orders
 - inventory alerts
 - backorders
 - other open activity
 - general alert
warehouses
 actions
    - add order/upload orders -> ship -> ship from warehouse
    - configure carts -> sell -> manage selling tools
 - receiving
    - pending
       on-hold
         need tracking info
    - shipping
    - processing
 - shipping
    - pending
        on-hold
    - processing
    - shipping
 - returns
    - pending
        on-hold
    - shipping
    - processing
 - pending project
    - pending
    - processing

inventory
 - search by (text, warehouse, status)
    status=[Pending, Good, Backordered, Reserved, Sent, Shipped, Low Stock]
   result grid
     alert, SKU, W/H, pending, good, backorder, qty per day,
     (optional: reserved, damanged, shipping, shipped, shipped: 1 day, shipped 1 week, shipped 4 weeks, days on hand, unit cost, unit retail, cost x good, retail x good, in review)
 - set inventory alert
    list, add, delete, on/off
    wh or all wh
    product or all prod
    ignore products never received
    ignore products not shipped in the last 28 days
    NEXT->
    set QTY on hand
    set DAYS on hand
    count pending as on hand? yes/no
    email?
    NEXT->
    name alert

billing
 - opening balance (02/01/2014)
   availabe balance
 - anticipated charges
   (exclude on-hold items)
 - anticipated credits
 - anticipated funds available
   projected closing balance
 - download excel, email
 - previous statements.

activity history
account setup
* general settings
   email
   is_admin
   password
   name
   notifications (daily, real time, weekly, off)
 - developer tools
 - account access
   ask password before proceeed.
     - account type (user/api)
       email, name, notify instruction yes/no
* billing settings
 - company information
   country
   name
   address
   city, state/province
   postal code
   phone
   Employer ID (EIN) if import to US
 - prefs
   funding by exact, $100, $500, ...
 - payment method
   PayPal, CreditCard, Bank Account
 -

add money

Store
-----
  manage products
  send to warehouse (create ASN to own wh)
     sku
     form addr (country, contact name, addr1, addr2, city, region, postcode, phone, email, wh)
     how? # of box, qty sensitive, show # of pallets box
     send on our own, port pickup (carrier name, phone)
     additional service
       special handling note

Sell
----
This is where you can add, edit, or remove connections to 3rd party shopping cart connections, marketplaces, and other systems.
download connect programs, install.


shipping
--------
item, qty, wh
carrier with shipping charge
total

packaging details
dimension
weight
qty x item

from name
custom packing list (extra charge)


delight
-------
 confirmation email
 customer portal
 returns - activate return tool, alert if not returned in 2weeks
 shipping label - customize return label
