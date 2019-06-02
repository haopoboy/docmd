package io.github.haopoboy.docmd.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.support.Repositories
import org.springframework.stereotype.Service
import javax.persistence.EntityManager

@Service
class RepositoryServiceImpl : RepositoryService {

    @Autowired
    private lateinit var repositories: Repositories

    @Autowired
    private lateinit var entityManager: EntityManager

    override fun forEntityName(name: String): JpaRepository<Any, Any> {
        @Suppress("UNCHECKED_CAST")
        return repositories.getRepositoryFor(getEntityClass(name)).get() as JpaRepository<Any, Any>
    }

    override fun getEntityClass(name: String): Class<*> {
        entityManager.metamodel.entities.forEach {
            if (name.toUpperCase() == it.name.toUpperCase()) {
                return it.javaType
            }
        }
        throw IllegalArgumentException("$name of repository not found")
    }
}