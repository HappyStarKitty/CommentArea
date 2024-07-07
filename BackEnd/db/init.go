package db

import (
	"database/sql"
	"fmt"
	//"log"
	//"os"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func InitDB() error {
	var err error
	connStr := "longyue:longyue0511@tcp(127.0.0.1:3306)/comment_db"
	db, err = sql.Open("mysql", connStr)
	if err != nil {
		return fmt.Errorf("failed to open database connection: %v", err)
	}

	err = db.Ping()
	if err != nil {
		return fmt.Errorf("failed to ping database: %v", err)
	}

	return nil
}
