package com.github.haopoboy.docmd.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.haopoboy.docmd.entity.Person
import com.github.haopoboy.docmd.service.RepositoryService
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.http.MediaType
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.util.*

@RunWith(SpringRunner::class)
@WebMvcTest(ApiV1Controller::class)
class ApiV1ControllerUnitTests {

    private val baseUrl = ApiV1Controller.BASE_URI

    @Autowired
    private lateinit var mvc: MockMvc

    @Autowired
    private lateinit var impl: ApiV1Controller

    @MockBean
    private lateinit var service: RepositoryService

    @MockBean
    private lateinit var repository: JpaRepository<Any, Any>

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @Test
    fun get() {
        val id = UUID.randomUUID()
        given(repository.findById(id)).willReturn(Optional.of(Person()))
        given(service.forEntityName("person")).willReturn(repository)

        mvc.perform(get("$baseUrl/people/$id"))
                .andExpect(status().isOk)
                .andExpect(content().json("{}"))
    }

    @Test
    fun find() {
        val content = listOf(given())
        val page = PageImpl(content) as Page<Any>
        given(repository.findAll(ArgumentMatchers.any(Pageable::class.java))).willReturn(page)

        val json = objectMapper.writeValueAsString(page)
        mvc.perform(get("$baseUrl/people"))
                .andExpect(status().isOk)
                .andExpect(content().json(json))
    }

    @Test
    fun postAndPut() {
        val person = given()
        val json = objectMapper.writeValueAsString(person)

        mvc.perform(post("$baseUrl/people").contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk)
                .andExpect(content().json(json))

        mvc.perform(put("$baseUrl/people").contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk)
                .andExpect(content().json(json))
    }

    @Test
    fun asEntitySimpleName() {
        assertThat(impl.asEntitySimpleName("people")).isEqualTo("person")
        assertThat(impl.asEntitySimpleName("documents")).isEqualTo("document")
    }

    private fun given(): Person {
        val person = Person()
        given(repository.save(person)).willReturn(person)
        given(service.forEntityName("person")).willReturn(repository)
        given(service.getEntityClass("person")).willReturn(Person::class.java)
        return person
    }
}