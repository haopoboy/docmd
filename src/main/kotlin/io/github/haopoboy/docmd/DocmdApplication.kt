package io.github.haopoboy.docmd

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DocmdApplication

fun main(args: Array<String>) {
	runApplication<DocmdApplication>(*args)
}

