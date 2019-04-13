from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from google.cloud import firestore
from geopy.distance import distance
from django.core import exceptions

from . import utils
db = firestore.Client()

# Create your views here.
def index_view(request):
  docs = db.collection('users').stream()
  for doc in docs:
    print('{} => {}'.format(doc.id, doc.to_dict()))
  return HttpResponse('k')
  # return JsonResponse({'hey':True})

def create_food_bank(request, lat, long):
  pass
  # 34.040670, -118.255870
  # db.
  location = firestore.GeoPoint(lat, long)
  doc_ref = db.collection('food_banks').document()
  doc_ref.set({
      'name': 'i love free stuff',
      'location': location
  })
  return HttpResponse('sure')

# returns 5 nearest
def user_get_nearest_centers(request):
  if request.method != "GET":
    raise exceptions.ViewDoesNotExist

  user_id = request.GET['user_id']
  if 'num_centers' in request.GET:
    num_centers = int(request.GET['num_centers'])
  else:
    num_centers = 3

  user = db.collection('users').document(user_id).get()
  if not user.exists:
    return HttpResponse(status_code=400, reason_phrase='user_id not found')

  docs = db.collection('food_banks').stream()
  bank1 = next(docs).get('location')
  bank2 = next(docs).get('location')
  bank1 = (bank1.latitude, bank1.longitude)
  bank2 = (bank2.latitude, bank2.longitude)
  print(distance(bank1, bank2).km)
  # ('location').location.compareTo(docs.stream().location))
  return HttpResponse('asd')  

