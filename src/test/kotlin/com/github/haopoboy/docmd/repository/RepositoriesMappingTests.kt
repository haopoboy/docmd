package com.github.haopoboy.docmd.repository

import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.support.Repositories
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest
class RepositoriesMappingTests {

    @Autowired
    lateinit var repos: Repositories

    @Before
    fun save() {
        repos.forEach {
            val repo = repos.getRepositoryFor(it).get() as JpaRepository<Any, *>
            repo.save(it.newInstance())
        }
    }

    @Test
    fun count() {
        repos.forEach {
            val repo = repos.getRepositoryFor(it).get() as JpaRepository<*, *>
            assertThat(repo.count())
                    .describedAs("Count of ${it.simpleName} repository cannot be zero, cause entity should be saved")
                    .isNotZero()
        }
    }
}

