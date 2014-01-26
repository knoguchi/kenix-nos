import logging

import endpoints
from protorpc import remote

from models import UserModel


log = logging.getLogger(__name__)


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

    @UserModel.method(user_required=True, path='users', http_method='POST',
                      name='auth')
    def auth(self, query):
        """
        Authenticate user by user id and password, or cookie.
        """

        current_user = endpoints.get_current_user()
        log.error(current_user)
        return current_user
