package com.hexaware.cozyhavenstay.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.hexaware.cozyhavenstay.entity.User;
import com.hexaware.cozyhavenstay.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTTokenProvider {

	@Autowired
	private UserRepository userRepository;

	@Value("${jwt-secret}")
	private String jwtSecret;
	@Value("${jwt-expiration}")
	private int jwtExpirationDate;

	// No constructor needed if no other dependencies
	public JWTTokenProvider() {
	}

	// to generate JWT Token
	public String generateToken(Authentication authentication) { // spring security authentication object

		String userName = authentication.getName();

		User user = userRepository.findByEmail(userName);

		Long userId = user.getUserId();
		Date currentDate = new Date();
		Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);

		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		String roles = authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));

		String jwtToken = Jwts.builder().setSubject(userName).claim("userId", userId).claim("role", roles)
				.setIssuedAt(new Date()).setExpiration(expireDate).signWith(key()).compact();

		// to return the jwt token
		return jwtToken;
	}

	// Utils functions or Helper functions

	// to create the digital signature with secret kety
	private Key key() {
//		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
		return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
	}

	// extra methods
	// get username from token
	public String getUsername(String token) {
		Claims claims = Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody();
		String userName = claims.getSubject();
		return userName;
	}

	public Long extractUserId(String token) {
		Claims claims = Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody();
		return claims.get("userId", Long.class);
	}

	// to validate token
	public boolean validateToken(String token) throws BadRequestException {
		try {
			Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
			return true;
		} catch (MalformedJwtException e) {
			throw new BadRequestException("Invalid JWT Token");
		}

	}
}
