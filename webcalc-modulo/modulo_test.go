package main

import (
	"net/http"
	"testing"
	"fmt"
	"io/ioutil"
)

func TestModulo(t *testing.T) {
	ans := modulo(8, 3)
	if ans != 2 {
		t.Errorf("modulo(8, 3) = %d; want 2", ans)
    }
}

func TestHTTPReturnsCorrectResult(t *testing.T){

	resp, err := http.Get("http://webcalc-modulo.40176750.qpc.hal.davecutting.uk/?x=8&y=3")
	if err != nil {
		fmt.Println("err:", err)
	}

	defer resp.Body.Close()
	
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("err:", err)
	}

	expected := "{\"X\":8,\"Y\":3,\"Answer\":2,\"Error\":false}"

	if string(body) != expected {
		t.Errorf("Incorrect response")
  }
}