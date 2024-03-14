package com.freelancing.webapplication.payloads;

import com.freelancing.webapplication.entities.RoleType;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserModel {

    private String name;

    private String email;

    private String password;

    private String mobileNumber;

    private RoleType roleType;
    private String city;
    private String country;
    private String image;
    private String about;
}
