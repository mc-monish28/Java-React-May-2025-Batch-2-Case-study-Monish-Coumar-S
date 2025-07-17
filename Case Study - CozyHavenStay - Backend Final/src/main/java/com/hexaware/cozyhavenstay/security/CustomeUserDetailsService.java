package com.hexaware.cozyhavenstay.security;


import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hexaware.cozyhavenstay.entity.User;
import com.hexaware.cozyhavenstay.repository.UserRepository;

@Service
public class CustomeUserDetailsService implements UserDetailsService{
	
	private UserRepository userRepo;
	

	public CustomeUserDetailsService(UserRepository userRepo) {
		super();
		this.userRepo = userRepo;
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    User user = userRepo.findByEmail(username);
	      
	    Set<GrantedAuthority> authorities = new HashSet<>();
	    authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));

	    return new org.springframework.security.core.userdetails.User(
	        user.getEmail(), user.getPassword(), authorities);
	}


}
