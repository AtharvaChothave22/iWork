package com.freelancing.webapplication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freelancing.webapplication.entities.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {

}
