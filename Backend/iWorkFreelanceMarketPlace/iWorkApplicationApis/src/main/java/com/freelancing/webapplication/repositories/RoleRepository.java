package com.freelancing.webapplication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freelancing.webapplication.entities.Role;
import com.freelancing.webapplication.entities.RoleType;

// RoleRepository

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByName(RoleType name);
}