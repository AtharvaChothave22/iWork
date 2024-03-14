package com.freelancing.webapplication.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserModel {

    private int id;

    private String name;

    private String email;

    private String mobileNumber;

    private String city;

    private String country;

    private String image;

    private String about;

    private List<String> roles = new ArrayList<>();


}
