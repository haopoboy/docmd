package com.github.haopoboy.docmd.config

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.web.ResourceProperties
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.Resource
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.resource.PathResourceResolver

@Configuration
class MvcConfig : WebMvcConfigurer {

    companion object {
        const val BASE_URI = "/static"
    }

    @Autowired
    lateinit var properties: ResourceProperties

    val logger = LoggerFactory.getLogger(MvcConfig::class.java)

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        val html5PathResolver = object : PathResourceResolver() {
            override fun getResource(resourcePath: String, location: Resource): Resource? {
                val requestedResource = super.getResource(resourcePath, location)
                return if (null != requestedResource && requestedResource.exists() && requestedResource.isReadable) {
                    requestedResource
                } else {
                    ClassPathResource("$BASE_URI/index.html")
                }
            }
        }

        registry.addResourceHandler("/**/*")
                .addResourceLocations(*properties.staticLocations)
                .resourceChain(true)
                .addResolver(html5PathResolver)
    }


}