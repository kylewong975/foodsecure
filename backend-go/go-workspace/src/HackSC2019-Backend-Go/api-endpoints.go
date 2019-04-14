package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"cloud.google.com/go/firestore"
	"golang.org/x/net/context"
	"google.golang.org/api/iterator"
)

func handle_search_foods(w http.ResponseWriter, r *http.Request, client *firestore.Client) {
	var searchResult []map[string]string
	iter := client.Collection("foods").Documents(context.Background())
	for {
		searchString := r.URL.Query().Get("search")
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Fatalf("Failed to iterate: %v", err)
		}
		data := doc.Data()
		if len(searchString) <= len(data["name"].(string)) &&
			data["name"].(string)[:len(searchString)] == searchString {

			foodItem := make(map[string]string)
			foodItem["name"] = data["name"].(string)
			foodItem["description"] = data["description"].(string)
			searchResult = append(searchResult, foodItem)
		}
	}
	searchResultJson, _ := json.Marshal(searchResult)
	fmt.Fprintf(w, string(searchResultJson))
}

// TODO: add two more API endpoints here
