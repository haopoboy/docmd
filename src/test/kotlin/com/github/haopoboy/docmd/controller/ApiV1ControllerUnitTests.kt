package com.github.haopoboy.docmd.controller

import com.github.haopoboy.docmd.entity.Person
import com.github.haopoboy.docmd.service.RepositoryService
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.http.MediaType
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import sun.plugin2.util.PojoUtil.toJson
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

    @Test
    fun find() {
        given(repository.findAll()).willReturn(listOf())
        given(service.forEntityName("person")).willReturn(repository)

        mvc.perform(get("$baseUrl/people"))
                .andExpect(status().isOk)
                .andExpect(content().json("[]"))
    }

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
    fun postAndPut() {
        val person = Person()
        given(repository.save(person)).willReturn(person)
        given(service.forEntityName("person")).willReturn(repository)

        mvc.perform(post("$baseUrl/people").contentType(MediaType.APPLICATION_JSON).content(toJson(person)))
                .andExpect(status().isOk)
                .andExpect(content().json("{}"))

        mvc.perform(put("$baseUrl/people").contentType(MediaType.APPLICATION_JSON).content(toJson(person)))
                .andExpect(status().isOk)
                .andExpect(content().json("{}"))
    }


    @Test
    fun asEntitySimpleName() {
        assertThat(impl.asEntitySimpleName("people")).isEqualTo("person")
        assertThat(impl.asEntitySimpleName("documents")).isEqualTo("document")
    }
}