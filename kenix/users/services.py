import logging

import endpoints
from protorpc import messages
from protorpc import remote
from google.appengine.api import users

from models import UserModel


log = logging.getLogger(__name__)


class AuthRequest(messages.Message):
    email = messages.StringField(1)
    password = messages.StringField(2)


class AuthToken(messages.Message):
    """
    Authentication Token
    """
    auth_token = messages.StringField(1)
    user = messages.StringField(2)
    logout_status = messages.BooleanField(3)

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

    # @UserModel.method(path='users', http_method='POST',
    #                   name='_auth')
    # def _auth(self, query):
    #     """
    #     Authenticate user by user id and password, or cookie.
    #     """
    #     log.error(query)
    #     current_user = endpoints.get_current_user()
    #     if not current_user:
    #         raise endpoints.NotFoundException('User not authenticated')
    #     return current_user

    # request_message=message_types.VoidMessage,
    # response_message=message_types.VoidMessage,
    # name=None,
    # path=None,
    # http_method='POST',
    # cache_control=None,
    # scopes=None,
    # audiences=None,
    # allowed_client_ids=None,
    # auth_level=None

    @endpoints.method(AuthRequest, AuthToken,
                      path='users.auth', http_method='POST',
                      name='auth')
    def auth(self, *args, **kw):
        log.error(args)
        log.error(kw)
        token = AuthToken()
        token.auth_token = 'aaa'
        token.user = 'kenji'
        return token

    @endpoints.method(AuthRequest, AuthToken,
                      path='users.logout', http_method='POST',
                      name='logout')
    def logout(selfself, *args, **kw):
        token = AuthToken()
        token.auth_token = ''
        token.user = ''
        token.logout_status = True
        return token
