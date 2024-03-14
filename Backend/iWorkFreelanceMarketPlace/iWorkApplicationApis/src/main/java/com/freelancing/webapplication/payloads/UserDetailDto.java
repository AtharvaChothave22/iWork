package com.freelancing.webapplication.payloads;

import java.util.List;

import com.freelancing.webapplication.entities.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailDto {
    private String id;
    private String city;
    private String country;
    private String image;
    private String about;
    private String name;
    private String mobileNumber;

}
