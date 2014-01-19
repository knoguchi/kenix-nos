import endpoints
from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb import EndpointsModel


class UserModel(EndpointsModel):
    contact_person = ndb.StringProperty()
    email = ndb.StringProperty()
    phone = ndb.StringProperty()
    addr1 = ndb.StringProperty()
    addr2 = ndb.StringProperty()
    addr3 = ndb.StringProperty()
    addr4 = ndb.StringProperty()
    city = ndb.StringProperty()
    state = ndb.StringProperty()
    zip1 = ndb.StringProperty()
    zip2 = ndb.StringProperty()
    country = ndb.StringProperty()
