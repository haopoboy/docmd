package com.github.haopoboy.docmd.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.NoRepositoryBean

@NoRepositoryBean
interface UuidEntityRepository<T> : JpaRepository<T, String>