package com.github.haopoboy.docmd.config

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.ListableBeanFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.repository.support.Repositories

@Configuration
class JpaConfig {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(JpaConfig::class.java)
    }

    @Bean
    fun repositories(factory: ListableBeanFactory): Repositories {
        logger.info("Create repositories for factory")
        return Repositories(factory)
    }
}