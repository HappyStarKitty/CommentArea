package db

import (
	"database/sql"
	//"fmt"
	//"log"
	//"os"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func InitDB() {
	var err error
	connStr := "longyue:longyue0511@tcp(127.0.0.1:3306)/Comments"
	db, err = sql.Open("mysql", connStr)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}
}
