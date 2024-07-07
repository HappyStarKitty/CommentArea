package db

import (
//"database/sql"

)

//var db *sql.DB

type Comment struct {
	ID      int    `json:"ID"`
	Name    string `json:"Name"`
	Content string `json:"Content"`
}

func GetComment(page, size int) ([]Comment, int, error) {
	offset := (page - 1) * size
	rows, err := db.Query("SELECT id,name,content FROM comments LIMIT ? OFFSET ?", size, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var comments []Comment
	for rows.Next() {
		var comment Comment
		if err := rows.Scan(&comment.ID, &comment.Name, &comment.Content); err != nil {
			return nil, 0, err
		}
		comments = append(comments, comment)
	}

	if err := rows.Err(); err != nil {
		return nil, 0, err
	}

	total, err := GetTotalComments()
	if err != nil {
		return nil, 0, err
	}

	return comments, total, nil
}

func AddComment(name string, content string) (int, error) {
	result, err := db.Exec("INSERT INTO comments (name,content) VALUES (?,?)", name, content)
	if err != nil {
		return 0, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}
	return int(id), nil
}

func DeleteComment(commentID int) error {
	_, err := db.Exec("DELETE FROM comments WHERE id = ?", commentID)
	return err
}

func GetTotalComments() (int, error) {
	var total int
	err := db.QueryRow("SELECT COUNT(*) FROM comments").Scan(&total)
	if err != nil {
		return 0, err
	}
	return total, nil
}
