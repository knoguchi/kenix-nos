import endpoints

from kenix.nos.purchase_order import PurchaseOrderApi
from kenix.users.services import UserApi
application = endpoints.api_server([UserApi, PurchaseOrderApi], restricted=False)
