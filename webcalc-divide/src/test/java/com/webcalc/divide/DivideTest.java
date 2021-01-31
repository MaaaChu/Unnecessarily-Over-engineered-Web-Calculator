package com.webcalc.divide;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.webcalc.divide.Divide;

@SpringBootTest
class DivideTest {

	@Test
	public void contextLoads() throws Exception {
		Divide d = new Divide();
		assertThat(d.divide(12,4)).isEqualTo(3);
	}

	@Test
	public void divideByZeroReturnsZero() throws Exception {
		Divide d = new Divide();
		assertThat(d.divide(12,0)).isEqualTo(0);
	}

}
