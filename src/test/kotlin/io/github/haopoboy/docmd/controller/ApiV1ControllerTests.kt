package io.github.haopoboy.docmd.controller

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ApiV1ControllerTests {

    private val baseUrl = ApiV1Controller.BASE_URI

    @Autowired
    private lateinit var testRestTemplate: TestRestTemplate

    @Test
    fun get() {
        val page = testRestTemplate.getForObject("$baseUrl/people", Map::class.java)
        assertThat(page["content"] as List<Any>).isEmpty()

    }
}