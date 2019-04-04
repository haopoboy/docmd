package com.github.haopoboy.docmd.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.haopoboy.docmd.service.RepositoryService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping(ApiV1Controller.BASE_URI)
class ApiV1Controller {

    companion object {
        const val BASE_URI = "/api/v1"
    }

    private val nameMappings: Map<String, String> = mapOf("people" to "person")

    @Autowired
    private lateinit var repositoryService: RepositoryService

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @GetMapping("/{name}")
    fun find(@PathVariable name: String, @PageableDefault pageable: Pageable): Any {
        val entitySimpleName = asEntitySimpleName(name)
        return repositoryService.forEntityName(entitySimpleName).findAll(pageable)
    }

    @GetMapping("/{name}/{id}")
    fun get(@PathVariable name: String, @PathVariable id: UUID): Any {
        val entitySimpleName = asEntitySimpleName(name)
        return repositoryService.forEntityName(entitySimpleName).findById(id)
    }

    @PostMapping("/{name}")
    fun post(@PathVariable name: String, @RequestBody body: Map<String, Object>): Any {
        val entitySimpleName = asEntitySimpleName(name)
        val clazz = repositoryService.getEntityClass(entitySimpleName)
        val obj = objectMapper.convertValue(body, clazz)
        return repositoryService.forEntityName(entitySimpleName).save(obj)
    }

    @PutMapping("/{name}")
    fun put(@PathVariable name: String, @RequestBody body: Map<String, Object>): Any {
        return post(name, body)
    }

    @DeleteMapping("/{name}/{id}")
    fun delete(@PathVariable name: String, @PathVariable id: UUID) {
        repositoryService.forEntityName(name).deleteById(id)
    }

    /**
     * @return singular as simple name of Entity
     */
    fun asEntitySimpleName(name: String): String {
        return "${nameMappings.getOrElse(name) { name.substringBeforeLast("s") }}"
    }

}
