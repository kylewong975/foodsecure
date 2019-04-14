package main

import (
	"fmt"
	"log"
	"net/http"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"golang.org/x/net/context"
	"google.golang.org/api/option"
)

const PROJECT_ID = "foodsecure"

var CREDENTIAL_FILE_PATH = "src/github.com/maxwyb/HackSC2019-Backend-Go/foodsecure-a581e2b899a2.json"

var client *firestore.Client // Global Google Cloud Firestore client

type Food struct {
	name, description string
}

func handler(w http.ResponseWriter, r *http.Request) {
	switch urlPath := r.URL.Path[1:]; urlPath {
	case "search_foods":
		handle_search_foods(w, r, client)

	default:
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, nil)
	}
}

func main() {
	// Initialize Google Cloud Firestore API
	// Use the application default credentials
	conf := &firebase.Config{ProjectID: PROJECT_ID}
	ctx := context.Background()
	sa := option.WithCredentialsFile(CREDENTIAL_FILE_PATH)
	app, err := firebase.NewApp(ctx, conf, sa)
	if err != nil {
		log.Fatalln(err)
	}

	clientLocal, err := app.Firestore(ctx)
	client = clientLocal
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println("Firestore connection successful")

	// HTTP Server
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe(":8080", nil))

	defer client.Close()
}
