package server

import (
	"BackEnd/db"
	"encoding/json"
	//"github.com/rs/cors"
	"net/http"
	"strconv"
	//"sync"
)

type GetData struct {
	Total    int          `json:"total"`
	Comments []db.Comment `json:"comments"`
}

type AddCommentRequest struct {
	Name    string `json:"name"`
	Content string `json:"content"`
}

type GetCommentResponse struct {
	Code int     `json:"code"`
	Msg  string  `json:"msg"`
	Data GetData `json:"data"`
}

type AddCommentResponse struct {
	Code int        `json:"code"`
	Msg  string     `json:"msg"`
	Data db.Comment `json:"data"`
}

type DeleteCommentResponse struct {
	Code int        `json:"code"`
	Msg  string     `json:"msg"`
	Data db.Comment `json:"data"`
}

func GetComment(w http.ResponseWriter, r *http.Request) {
	pageStr := r.URL.Query().Get("page")
	sizeStr := r.URL.Query().Get("size")

	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
		page = 1
	}
	size, err := strconv.Atoi(sizeStr)
	if err != nil || size < 1 {
		size = 10
	}

	dbComments, err := db.GetComment(page, size)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	start := (page - 1) * size
	end := start + size
	if start > len(dbComments) {
		start = len(dbComments)
	}
	if end > len(dbComments) {
		end = len(dbComments)
	}
	pagedComments := dbComments[start:end]

	comments := make([]db.Comment, len(pagedComments))
	for i, c := range pagedComments {
		comments[i] = db.Comment{
			ID:      c.ID,
			Name:    c.Name,
			Content: c.Content,
		}
	}
	var response GetCommentResponse
	response.Code = 0
	response.Msg = "success"
	response.Data.Total = len(dbComments)
	response.Data.Comments = comments

	w.Header().Set("Content-Type", "application/json;charset=utf-8")
	json.NewEncoder(w).Encode(response)
}

func AddComment(w http.ResponseWriter, r *http.Request) {
	var req AddCommentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	id, err := db.AddComment(req.Name, req.Content)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	newComment := db.Comment{
		ID:      id,
		Name:    req.Name,
		Content: req.Content,
	}

	var response AddCommentResponse
	response.Data = newComment
	response.Code = 0
	response.Msg = "success"

	w.Header().Set("Content-Type", "application/json;charset=utf-8")
	json.NewEncoder(w).Encode(response)

}

func DeleteComment(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Query().Get("id")
	if idStr == "" {
		http.Error(w, "Missing id", http.StatusBadRequest)
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid id", http.StatusBadRequest)
		return
	}

	if err := db.DeleteComment(id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var response DeleteCommentResponse
	response.Code = 0
	response.Msg = "success"

	w.Header().Set("Content-Type", "application/json;charset=utf-8")
	json.NewEncoder(w).Encode(response)
}
