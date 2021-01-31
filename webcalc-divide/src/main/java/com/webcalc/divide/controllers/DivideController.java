package com.webcalc.divide.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

import com.webcalc.divide.Divide;

@RestController
public class DivideController {

	@GetMapping("/")
	public Map<String, Object> divide(@RequestParam(value = "x", defaultValue = "error") String x, @RequestParam(value = "y", defaultValue = "error") String y) {

		HashMap<String, Object> response = new HashMap<String, Object>();
		int a;
    int b;
    int answer;
    boolean error;

		if(x.equals("error") || y.equals("error")) {
			a = 0;
			b = 0;
			response.put("x", a);
			response.put("y", b);
			response.put("answer", 0);
			response.put("error", true);
			response.put("errorMessage", "Please enter both x and y values");
	
			return response;
		}

		if(y.equals("0")) {
			a = 0;
			b = 0;
			response.put("x", a);
			response.put("y", b);
			response.put("answer", 0);
			response.put("error", true);
			response.put("errorMessage", "You cannot divide by zero");
	
			return response;
		}

		a = Integer.parseInt(x);
		b = Integer.parseInt(y);

		Divide d = new Divide();

		answer = d.divide(a, b);

		response.put("x", a);
		response.put("y", b);
		response.put("answer", answer);
		response.put("error", false);

		return response;
	}

}