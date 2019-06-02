package io.github.haopoboy.docmd.service

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest
class RepositoryServiceTests {

    @Autowired
    private lateinit var impl: RepositoryService

    @Test
    fun contextLoads() {
        assertThat(impl.forEntityName("Document").count()).isZero();
    }

}

