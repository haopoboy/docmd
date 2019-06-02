package io.github.haopoboy.docmd.config

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

    @Autowired
    private lateinit var testRestTemplate: TestRestTemplate

    @Test
    fun index() {
        val default = testRestTemplate.getForObject("/", String::class.java)
        assertThat(default).contains("OOPS")

        val index = testRestTemplate.getForObject("/index.html", String::class.java)
        assertThat(index).contains("OOPS")
    }

    @Test
    fun routingExistedResources() {
        val health = testRestTemplate.getForObject("/health", String::class.java)
        assertThat(health).contains("It's good to see you")
    }

    /**
     * Security checks
     */
    @Test
    fun applicationProperties() {
        val properties = testRestTemplate.getForObject("/application.properties", String::class.java)
        assertThat(properties).contains("OOPS")
        val yaml = testRestTemplate.getForObject("/application.yml", String::class.java)
        assertThat(yaml).contains("OOPS")
    }

    @Test
    fun routingToIndex() {
        val html = testRestTemplate.getForObject("/something", String::class.java)
        assertThat(html).contains("OOPS")
    }

    @Test
    fun routingSubToIndex() {
        val html = testRestTemplate.getForObject("/something/something", String::class.java)
        assertThat(html).contains("OOPS")
    }
}