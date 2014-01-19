import endpoints
from protorpc import remote

from models import UserModel

@endpoints.api(name='users', version='v1')
class UserApi(remote.Service):
    """
    Users API v1
    """

    @UserModel.query_method(path='users', name='index')
    def index(self, query):
        """
        List of users
        """
        return query
