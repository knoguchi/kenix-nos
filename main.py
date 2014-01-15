import endpoints

from kenix.nos.purchase_order import PurchaseOrderApi
application = endpoints.api_server([PurchaseOrderApi], restricted=False)
