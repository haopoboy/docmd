package com.github.haopoboy.docmd.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.support.Repositories
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/api/v1")
class ApiV1Controller {

    @Autowired
    private lateinit var repositories: Repositories

    private val nameMappings: Map<String, String> = mapOf("people" to "person")

    @GetMapping("/{name}/{id}")
    fun get(@PathVariable name: String, @PathVariable id: UUID): String {
        if (nameMappings.containsKey(name)) {
            return "${nameMappings[name]}/$id"
        } else {
            return "${name}s/$id"
        }
    }
}