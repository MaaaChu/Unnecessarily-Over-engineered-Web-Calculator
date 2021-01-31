package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"strconv"
)

type Result struct {
  X int
	Y int
	Answer int
	Error bool
}

func main() {
	http.HandleFunc("/", handleModulo)
	http.HandleFunc("/favicon.ico", doNothing)
	http.ListenAndServe(":5001", nil)
}

func handleModulo(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	var result = Result{0, 0, 0, true}

	x := r.URL.Query().Get("x")
	y := r.URL.Query().Get("y")
  if x != "" && y != "" {
		a, err := strconv.Atoi(x)
		b, err := strconv.Atoi(y)
		if err != nil {
			fmt.Println("err:", err)
		} else {
			var mod = modulo(a, b)
			result = Result{a, b, mod, false}
		}
	} else {
		fmt.Println("Please give both x and y values")
		result = Result{0, 0, 0, true}
	}

	js, err := json.Marshal(result)
	if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
  w.Write(js)

}

func modulo(x, y int) int {
	return x % y;
}

func doNothing(w http.ResponseWriter, r *http.Request){}