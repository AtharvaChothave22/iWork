package com.freelancing.webapplication.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.freelancing.webapplication.entities.User;
import com.freelancing.webapplication.repositories.UserRepo;

@Service
public class UserInfoService implements UserDetailsService {
    @Autowired
    private UserRepo userDao;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        User userdetails = userDao.findByEmail(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User with this email is not found"));

        return new UserInfoDetails(userdetails);
    }

}
