package main

import (
    "fmt"
    "log"
    "net/http"
    "encoding/json"
    "golang.org/x/net/context"
    firebase "firebase.google.com/go"
    "cloud.google.com/go/firestore"
    "google.golang.org/api/option"
    "google.golang.org/api/iterator"
)

const PROJECT_ID = "foodsecure"
const CREDENTIAL_FILE_PATH = "src/HackSC2019-Backend-Go/foodsecure-a581e2b899a2.json"
var client *firestore.Client

type Food struct {
    name, description string
}

func handler(w http.ResponseWriter, r *http.Request) {
    switch urlPath := r.URL.Path[1:]; urlPath {
    case "search_foods":
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

                foodItem := make(map[string]string);
                foodItem["name"] = data["name"].(string)
                foodItem["description"] = data["description"].(string)
                searchResult = append(searchResult, foodItem)
            }
            /*
            for key, value := range data {
                fmt.Printf("key = %s, value = %s\n", key, value)
            }
            */
        }
        searchResultJson, _ := json.Marshal(searchResult)
        fmt.Fprintf(w, string(searchResultJson))
    default:
        w.WriteHeader(http.StatusBadRequest)
        fmt.Fprint(w, nil)
    }
}

func main() {
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

    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))

    defer client.Close()
}
