import endpoints
from protorpc import remote
from models import BookInventoryModel, OnhandInventoryModel

@endpoints.api(name='inventory', version='v1')
class InventoryService(remote.Service):
    """
    Inventory API v1
    """

    @BookInventoryModel.query_method(path='book', name='index')
    def index(self, query):
        """
        List of purchase orders
        """
        return query

    @PoModel.method(request_fields=('id',), path='pos/{id}', http_method='GET', name='get')
    def get(self, po_model):
        """
        Get a purchase order
        """
        if not po_model.from_datastore:
            raise endpoints.NotFoundException('PO not found.')
        return po_model
