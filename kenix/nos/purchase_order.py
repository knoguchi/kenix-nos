import endpoints
from protorpc import remote

from models import PoModel, PoLineModel


@endpoints.api(name='po', version='v1')
class PurchaseOrderApi(remote.Service):
    """
    Purchase Order API v1
    """

    @PoModel.query_method(path='pos', name='index')
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

    @PoModel.method(path='pos', http_method='POST', name='create')
    def create(self, po_model):
        """
        Place a new purchase order
        """
        po_model.put()
        return po_model

    @PoLineModel.method(path='po_line_models/{parent}', http_method='POST', name='po_line_models.create')
    def create_line(self, po_line_model):
        """
        Create a line of item for a purchase order
        """
        if po_line_model.from_datastore:
            raise endpoints.BadRequestException(
                'MyModel %s with parent %s already exists.' %
                (po_line_model.id, po_line_model.parent))
        po_line_model.put()
        return po_line_model


    @PoLineModel.query_method(query_fields=('parent',), path='po_line_models/{parent}', name='po_line_model.index')
    def index_line(self, query):
        """
        Line of items of a purchase order
        """
        return query

