from django.shortcuts import render, HttpResponse
from django.http import JsonResponse, HttpResponseNotFound
from google.cloud import firestore
from geopy.distance import distance
from django.core import exceptions
import datetime

from . import utils
db = firestore.Client()

# Create your views here.
def index_view(request):
  docs = db.collection("users").stream()
  for doc in docs:
    print("{} => {}".format(doc.id, doc.to_dict()))
  return HttpResponse("k")
  # return JsonResponse({"hey":True})

def create_food_bank(request, lat, long):
  pass
  # 34.040670, -118.255870
  # db.
  location = firestore.GeoPoint(lat, long)
  doc_ref = db.collection("food_banks").document()
  doc_ref.set({
      "name": "i love free stuff",
      "location": location
  })
  return HttpResponse("sure")

def create_order(request):
  if request.method != "POST":
    raise exceptions.ViewDoesNotExist

  farm_food_id = request.POST["farm_food_id"]
  food_bank_id = request.POST["food_bank_id"]
  user_id = request.POST["user_id"]
  qty = request.POST["qty"]

  # get documents
  farm_food = db.collection("farm_foods").document(farm_food_id).get()
  farm = farm_food.get("farm").get()
  food_bank = db.collection("food_banks").document(food_bank_id).get()
  user = db.collection("users").document(user_id).get()

  # get or create drop
  drop_gen = db.collection("drops").where("farm", "==", farm.reference).get()
  drop = None
  for d in drop_gen:
    drop = d
  if drop == None:
    # create new drop
    doc_ref = db.collection("drops").document()
    deadline = datetime.now() + datetime.timedelta(weeks=1)
    doc_ref.set({
      "deadline": deadline,
      "farm": farm.reference,
      "food_bank": food_bank.reference,
      "quota": 50
    })
    drop = doc_ref.get()

  # create order
  doc_ref = db.collection("orders").document()
  doc_ref.set({
    "drop": drop.reference,
    "farm_food": farm_food.reference,
    "user": user.reference,
    "qty": qty
  })
  doc_dict = doc_ref.get().to_dict()
  print(doc_dict)

  return HttpResponse("created")

# returns 5 nearest
def user_get_nearest_centers(request):
  if request.method != "GET":
    raise exceptions.ViewDoesNotExist

  user_id = request.GET["user_id"]
  if "num_centers" in request.GET:
    num_centers = int(request.GET["num_centers"])
  else:
    num_centers = 3

  user = db.collection("users").document(user_id).get()
  if not user.exists:
    return HttpResponse(status_code=400, reason_phrase="user_id not found")

  docs = db.collection("food_banks").stream()
  bank1 = next(docs).get("location")
  bank2 = next(docs).get("location")
  bank1 = (bank1.latitude, bank1.longitude)
  bank2 = (bank2.latitude, bank2.longitude)
  print(distance(bank1, bank2).km)
  return HttpResponse("asd")  

def get_bank_food(request, bank_id, food_id=None):
  if request.method != "GET":
    raise exceptions.ViewDoesNotExist

  query = db.collection("farm_foods")
  if food_id != None:
    food = db.collection("foods").document(food_id)
    query = query.where("food", "==", food)

  items = []
  for doc in query.stream(): # each doc is a farm_food
    item = {}
    item["farm_food_id"] = doc.id
    item["food_name"] = doc.get("food").get().get("name")
    farm = doc.get("farm").get()
    assert farm.exists
    item["farm_name"] = farm.get("name")
    farm_loc = (farm.get("location").latitude, farm.get("location").longitude)

    bank = db.collection("food_banks").document(bank_id).get()
    assert bank.exists
    bank_loc = (bank.get("location").latitude, bank.get("location").longitude)

    item["distance_km"] = distance(farm_loc, bank_loc).km
    drops_query = db.collection("drops").where("farm", "==", farm.reference).where("food_bank", "==", bank.reference)
    drop = None
    for drops_doc in drops_query.stream():
      drop = drops_doc # get one if exists
    if drop != None:
      qty = 0
      orders_query = db.collection("orders").where("farm_food", "==", doc.reference).where("drop", "==", drop.reference)
      for orders_doc in orders_query.stream():
        qty += orders_doc.get("qty")
      item["drop_qty"] = qty
      item["drop_quota"] = drop.get("quota")
      item["drop_deadline"] = drop.get("deadline")
    else: # no drop, assign default drop values
      item["drop_qty"] = 0
      item["drop_quota"] = 100 # TODO: parametrize in production
      item["drop_deadline"] = None

    item["drop_price"] = doc.get("price") + (50 / item["drop_quota"]) # simulate $50 truck delivery spread across truck capacity

    items += [item]

  return JsonResponse(items, safe=False)
