import endpoints
from protorpc import remote
from models import OnHandInvModel
from kenix.wms.api import kenix_wms_api

@kenix_wms_api.api_class(resource_name='onhand')
class OnHandInvService(remote.Service):
    """
    On-hand Inventory API v1
    """

    @OnHandInvModel.query_method(path='onhand', name='index')
    def index(self, query):
        """
        List of on-hand inventories
        """
        return query

    @OnHandInvModel.method(request_fields=('id',), path='onhand/{id}', http_method='GET', name='get')
    def get(self, onhand):
        """
        Get on-hand inventories by SKU
        """
        if not onhand.from_datastore:
            raise endpoints.NotFoundException('On-hand inventory not found.')
        return onhand

    @OnHandInvModel.method(path='onhand', name='create')
    def create(self, onhand):
        """
        Createa an on-hand inventory
        """
        # do some validation
        onhand.put()
        return onhand

    @OnHandInvModel.method(path='onhand/{id}', http_method='PUT', name='update')
    def update(self, onhand):
        """
        Update an on-hand inventory
        """
        if not onhand.from_datastore:
            raise endpoints.NotFoundException('On-hand invnetory not found')
        onhand.put()
        return onhand
