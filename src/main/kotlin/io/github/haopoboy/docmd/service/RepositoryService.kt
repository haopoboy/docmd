package io.github.haopoboy.docmd.service

import org.springframework.data.jpa.repository.JpaRepository

interface RepositoryService {
    fun forEntityName(name: String): JpaRepository<Any, Any>
    fun getEntityClass(name: String): Class<*>
}