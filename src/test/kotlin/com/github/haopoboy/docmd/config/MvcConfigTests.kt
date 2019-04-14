package com.github.haopoboy.docmd.config

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MvcConfigTests {

    final val baseUri = MvcConfig.BASE_URI

    @Autowired
    private lateinit var testRestTemplate: TestRestTemplate

    @Test
    fun index() {
        val default = testRestTemplate.getForObject("$baseUri", String::class.java)
        assertThat(default).contains("OOPS")

        val index = testRestTemplate.getForObject("$baseUri/index.html", String::class.java)
        assertThat(index).contains("OOPS")

    }

    @Test
    fun routingToIndex() {
        val html = testRestTemplate.getForObject("$baseUri/something", String::class.java)
        assertThat(html).contains("OOPS")
    }

    @Test
    fun routingSubToIndex() {
        val html = testRestTemplate.getForObject("$baseUri/something/something", String::class.java)
        assertThat(html).contains("OOPS")
    }
}