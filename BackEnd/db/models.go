package db

import (
//"database/sql"

)

//var db *sql.DB

type Comment struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Content string `json:"content"`
}

func GetComment(offset, size int) ([]Comment, error) {
	rows, err := db.Query("SELECT id,name,content FROM comments LIMIT ? OFFSET ?", size, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var comments []Comment
	for rows.Next() {
		var comment Comment
		if err := rows.Scan(&comment.ID, &comment.Name, &comment.Content); err != nil {
			return nil, err
		}
		comments = append(comments, comment)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return comments, nil
}

func AddComment(name string, content string) (int, error) {
	var id int
	err := db.QueryRow("INSERT INTO comments (name,content) VALUES(?,?) RETURNING id", name, content).Scan(&id)
	if err != nil {
		return 0, err
	}
	return id, nil
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
	return total, err
}
