from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb import EndpointsModel


class OnHandSkuModel(EndpointsModel):
    """
    id = SKU
    Same product can have multiple SKUs.
    Invisible to users
    """
    description = ndb.StringProperty()
    condition = ndb.StringProperty()
    uom = ndb.StringProperty()
    decimal_point = ndb.IntegerProperty()
    product = ndb.KeyProperty(kind='ProductModel')
    receipt_dt = ndb.DateTimeProperty()


class OnHandInventoryModel(EndpointsModel):
    """
    Keep qty of item identified by SKU,
    id: sku:location
    """
    sku = ndb.KeyProperty(kind='OnHandSkuModel')
    location_id = ndb.KeyProperty()
    qty = ndb.IntegerProperty()


class BookInvModel(EndpointsModel):
    """
    Book Inventory

    id: product
    """
    product = ndb.KeyProperty()
    warehouse = ndb.KeyProperty()
