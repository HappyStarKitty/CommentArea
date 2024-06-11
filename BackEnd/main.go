package main

import (
	"BackEnd/db"
	"BackEnd/server"
	"github.com/rs/cors"
	"log"
	"net/http"
)

func main() {
	if err := db.InitDB(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/comment/get", server.GetComment)
	mux.HandleFunc("/comment/add", server.AddComment)
	mux.HandleFunc("/comment/delete", server.DeleteComment)

	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	}).Handler(mux)

	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", corsHandler); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
