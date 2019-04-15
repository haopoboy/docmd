package com.github.haopoboy.docmd.config

import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.Resource
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.resource.PathResourceResolver

@Configuration
class MvcConfig : WebMvcConfigurer {

    companion object {
        const val RESOURCE_PATH = "/static"
    }

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        val html5PathResolver = object : PathResourceResolver() {
            override fun getResource(resourcePath: String, location: Resource): Resource? {
                val requestedResource = location.createRelative(resourcePath)
                return if (requestedResource.exists() && requestedResource.isReadable) {
                    requestedResource
                } else {
                    ClassPathResource("$RESOURCE_PATH/index.html")
                }
            }
        }

        registry.addResourceHandler("/**/*")
                .addResourceLocations("classpath:$RESOURCE_PATH/")
                .resourceChain(true)
                .addResolver(html5PathResolver)
    }


}