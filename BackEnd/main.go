package main

import (
	"BackEnd/db"
	"BackEnd/server"
	"github.com/rs/cors"
	"log"
	"net/http"
)

func main() {
	db.InitDB()

	mux := http.NewServeMux()

	mux.HandleFunc("/comment/get", server.GetComment)
	mux.HandleFunc("/comment/add", server.AddComment)
	mux.HandleFunc("/comment/delete", server.DeleteComment)

	handler := cors.Default().Handler(mux)

	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
